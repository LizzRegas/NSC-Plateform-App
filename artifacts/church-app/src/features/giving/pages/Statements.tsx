import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Send, FileText, Calendar, DollarSign, Search } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { useDemoState, useDemoDispatch, downloadCsv } from "@/lib/demo-store";
import type { GivingStatement } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const statusColors: Record<string, string> = { Ready: "badge badge-blue", Sent: "badge badge-green" };

export default function Statements() {
  const statements = useDemoState((s) => s.givingStatements);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("Q1 2026");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return statements.filter(
      (s) =>
        s.period === period &&
        (s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)),
    );
  }, [statements, search, period]);

  const readyCount = statements.filter((s) => s.status === "Ready").length;
  const sentCount = statements.filter((s) => s.status === "Sent").length;
  const totalDocumented = statements.reduce((sum, s) => sum + s.total, 0);

  const stats = [
    {
      label: "Statements Ready",
      value: String(readyCount),
      change: "",
      trend: "neutral" as const,
      icon: FileText,
      iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      delay: 0.05,
    },
    {
      label: "Sent This Year",
      value: String(sentCount),
      change: "+8%",
      trend: "up" as const,
      icon: Send,
      iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      delay: 0.1,
    },
    {
      label: "Total Documented",
      value: `$${totalDocumented.toLocaleString()}`,
      change: "+22%",
      trend: "up" as const,
      icon: DollarSign,
      iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600",
      delay: 0.15,
    },
    {
      label: "Period",
      value: period,
      change: "",
      trend: "neutral" as const,
      icon: Calendar,
      iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600",
      delay: 0.2,
    },
  ];

  const sendStatement = (stmt: GivingStatement) => {
    if (stmt.status === "Sent") return;
    dispatch({ type: "UPDATE_STATEMENT", payload: { ...stmt, status: "Sent" } });
    success("Statement sent", `Email sent to ${stmt.email}`);
  };

  const downloadStatement = (stmt: GivingStatement) => {
    downloadCsv(
      `statement-${stmt.name.replace(/\s+/g, "-")}.csv`,
      ["Donor", "Email", "Period", "Total", "Gifts"],
      [[stmt.name, stmt.email, stmt.period, String(stmt.total), String(stmt.gifts)]],
    );
    success("Download started", `Statement for ${stmt.name}`);
  };

  const handleSendAll = () => {
    dispatch({ type: "SEND_ALL_STATEMENTS" });
    success("Statements sent", "All ready statements marked as sent.");
  };

  const handleExportAll = () => {
    downloadCsv(
      "giving-statements.csv",
      ["Donor", "Email", "Total", "Gifts", "Period", "Status"],
      filtered.map((s) => [s.name, s.email, String(s.total), String(s.gifts), s.period, s.status]),
    );
    success("Export started", "Statements CSV downloaded.");
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Statements"
          subtitle="Generate and send annual giving statements"
          section="Giving"
          action={
            <div className="flex gap-2">
              <button type="button" onClick={handleExportAll} className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
                <Download className="w-4 h-4" /> Export All
              </button>
              <button type="button" onClick={handleSendAll} className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
                <Send className="w-4 h-4" /> Send All
              </button>
            </div>
          }
        />
        <KpiGrid stats={stats} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="card-lumina overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-border">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search donors..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="ml-auto text-sm bg-background border border-border rounded-xl px-3 py-2 outline-none focus:border-primary transition-all"
            >
              <option>Q1 2026</option>
              <option>Q4 2025</option>
              <option>Full Year 2025</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="bg-muted/30 border-b border-border/60">
                  {["Donor", "Email", "Total Given", "# Gifts", "Period", "Status", ""].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 sm:px-6 py-3"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filtered.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.32 + i * 0.04 }}
                    className="tr-hover group"
                  >
                    <td className="px-5 sm:px-6 py-3.5 text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {s.name}
                    </td>
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{s.email}</td>
                    <td className="px-5 sm:px-6 py-3.5 text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      ${s.total.toLocaleString()}
                    </td>
                    <td className="px-5 sm:px-6 py-3.5 text-sm text-muted-foreground">{s.gifts}</td>
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{s.period}</td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <span className={statusColors[s.status]}>{s.status}</span>
                    </td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button type="button" className="icon-btn" onClick={() => downloadStatement(s)} title="Download">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => sendStatement(s)}
                          disabled={s.status === "Sent"}
                          title="Send"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </PageCanvas>
    </PageTransition>
  );
}
