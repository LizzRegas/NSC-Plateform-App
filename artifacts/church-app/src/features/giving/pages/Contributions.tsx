import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Filter, Search, Plus, TrendingUp, CreditCard, Heart, Users } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass, selectClass } from "@/components/shared/forms/FormField";
import { useDemoState, useDemoDispatch, generateId, downloadCsv } from "@/lib/demo-store";
import type { Contribution } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const fundColors: Record<string, string> = {
  "General Tithe": "badge badge-blue",
  Missions: "badge badge-violet",
  "Building Campaign": "badge badge-amber",
};
const statusColors: Record<string, string> = { Completed: "badge badge-green", Pending: "badge badge-amber" };
const methodColors: Record<string, string> = {
  Online: "badge badge-blue",
  Check: "badge badge-gray",
  Cash: "badge badge-green",
  ACH: "badge badge-teal",
};

const FUNDS = ["General Tithe", "Missions", "Building Campaign"];
const METHODS = ["Online", "Check", "Cash", "ACH"];

export default function Contributions() {
  const contributions = useDemoState((s) => s.contributions);
  const members = useDemoState((s) => s.members);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", fund: FUNDS[0], amount: "", method: METHODS[0] });

  const filtered = useMemo(
    () =>
      contributions.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.id.includes(search) ||
          c.fund.toLowerCase().includes(search.toLowerCase()),
      ),
    [contributions, search],
  );

  const totalMonth = useMemo(() => contributions.reduce((s, c) => s + c.amount, 0), [contributions]);
  const uniqueGivers = useMemo(() => new Set(contributions.map((c) => c.name)).size, [contributions]);
  const avgGift = contributions.length ? Math.round(totalMonth / contributions.length) : 0;
  const onlineTotal = useMemo(
    () => contributions.filter((c) => c.method === "Online" || c.method === "ACH").reduce((s, c) => s + c.amount, 0),
    [contributions],
  );

  const stats = [
    {
      label: "Total This Month",
      value: `$${totalMonth.toLocaleString()}`,
      change: "+12%",
      trend: "up" as const,
      icon: Heart,
      iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      delay: 0.05,
    },
    {
      label: "Unique Givers",
      value: String(uniqueGivers),
      change: `+${Math.min(uniqueGivers, 18)}`,
      trend: "up" as const,
      icon: Users,
      iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      delay: 0.1,
    },
    {
      label: "Avg Gift Size",
      value: `$${avgGift}`,
      change: "+8%",
      trend: "up" as const,
      icon: TrendingUp,
      iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600",
      delay: 0.15,
    },
    {
      label: "Online Giving",
      value: `$${onlineTotal.toLocaleString()}`,
      change: totalMonth ? `${Math.round((onlineTotal / totalMonth) * 100)}%` : "—",
      trend: "up" as const,
      icon: CreditCard,
      iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600",
      delay: 0.2,
    },
  ];

  const handleExport = () => {
    downloadCsv(
      "contributions.csv",
      ["ID", "Donor", "Fund", "Amount", "Method", "Date", "Status"],
      filtered.map((c) => [
        c.id,
        c.name,
        c.fund,
        String(c.amount),
        c.method,
        c.date,
        c.status,
      ]),
    );
    success("Export started", "Contributions CSV downloaded.");
  };

  const handleRecordGift = () => {
    const amount = parseFloat(form.amount);
    if (!form.name.trim() || !amount || amount <= 0) return;
    const member = members.find((m) => m.name === form.name);
    const payload: Contribution = {
      id: generateId("c"),
      memberId: member?.id,
      name: form.name.trim(),
      fund: form.fund,
      amount,
      method: form.method,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Completed",
    };
    dispatch({ type: "ADD_CONTRIBUTION", payload });
    success("Gift recorded", `$${amount.toLocaleString()} to ${form.fund}`);
    setDialogOpen(false);
    setForm({ name: "", fund: FUNDS[0], amount: "", method: METHODS[0] });
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Contributions"
          subtitle="Track all giving records and donations"
          section="Giving"
          action={
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleExport}
                className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
              >
                <Download className="w-4 h-4" /> Export
              </button>
              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
              >
                <Plus className="w-4 h-4" /> Record Gift
              </button>
            </div>
          }
        />
        <KpiGrid stats={stats} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="card-lumina p-5 sm:p-6"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Monthly Giving Trend
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">6-month overview</p>
            </div>
          </div>
          <div className="flex items-end gap-2 sm:gap-3 h-32">
            {[28000, 32000, 29500, 35000, 34200, totalMonth || 38450].map((v, i) => {
              const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "May"];
              const pct = (v / 40000) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center" style={{ height: "6rem" }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${pct}%` }}
                      transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                      className={`w-full rounded-t-xl ${i === 5 ? "bg-gradient-to-t from-blue-600 to-blue-400" : "bg-muted"}`}
                      style={i === 5 ? { boxShadow: "0 4px 12px rgba(37,99,235,0.25)" } : {}}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-bold ${i === 5 ? "text-primary" : "text-muted-foreground"}`}
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {months[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="card-lumina overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 sm:px-6 py-4 border-b border-border">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search contributions..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <button type="button" className="btn-secondary flex items-center gap-2 px-3 py-2 rounded-xl text-sm ml-auto">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-muted/30 border-b border-border/60">
                  {["ID", "Donor", "Fund", "Amount", "Method", "Date", "Status"].map((h) => (
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
                {filtered.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.35 + i * 0.04 }}
                    className="tr-hover"
                  >
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground font-mono">{c.id}</td>
                    <td className="px-5 sm:px-6 py-3.5 text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {c.name}
                    </td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <span className={fundColors[c.fund] ?? "badge badge-gray"}>{c.fund}</span>
                    </td>
                    <td className="px-5 sm:px-6 py-3.5 text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      ${c.amount.toLocaleString()}
                    </td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <span className={methodColors[c.method] ?? "badge badge-gray"}>{c.method}</span>
                    </td>
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{c.date}</td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <span className={statusColors[c.status] ?? "badge badge-green"}>{c.status}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Record Gift"
          description="Add a new contribution to the ledger."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setDialogOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary px-4 py-2 rounded-xl text-sm" onClick={handleRecordGift}>
                Save Gift
              </button>
            </>
          }
        >
          <FormField label="Donor name" htmlFor="gift-name">
            <input
              id="gift-name"
              list="member-names"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              placeholder="Name or Anonymous"
            />
            <datalist id="member-names">
              {members.map((m) => (
                <option key={m.id} value={m.name} />
              ))}
              <option value="Anonymous" />
            </datalist>
          </FormField>
          <FormField label="Fund" htmlFor="gift-fund">
            <select id="gift-fund" value={form.fund} onChange={(e) => setForm({ ...form, fund: e.target.value })} className={selectClass}>
              {FUNDS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Amount ($)" htmlFor="gift-amount">
            <input
              id="gift-amount"
              type="number"
              min="1"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className={inputClass}
              placeholder="0.00"
            />
          </FormField>
          <FormField label="Method" htmlFor="gift-method">
            <select id="gift-method" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className={selectClass}>
              {METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </FormField>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
