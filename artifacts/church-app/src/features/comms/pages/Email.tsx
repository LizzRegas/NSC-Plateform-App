import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, Send, Plus, Users, Eye, Trash2, Search, TrendingUp } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { useDemoState, useDemoDispatch } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

export default function Email() {
  const [tab, setTab] = useState<"sent" | "drafts">("sent");
  const [search, setSearch] = useState("");
  const emails = useDemoState((s) => s.emails);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();

  const sent = useMemo(() => emails.filter((e) => e.status === "Sent"), [emails]);
  const drafts = useMemo(() => emails.filter((e) => e.status === "Draft"), [emails]);

  const filteredSent = useMemo(
    () =>
      sent.filter(
        (e) =>
          e.subject.toLowerCase().includes(search.toLowerCase()) ||
          e.audience.toLowerCase().includes(search.toLowerCase()),
      ),
    [sent, search],
  );

  const stats = useMemo(
    () => [
      {
        label: "Sent This Month",
        value: String(sent.length),
        change: `+${Math.min(sent.length, 6)}`,
        trend: "up" as const,
        icon: Send,
        iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
        delay: 0.05,
      },
      {
        label: "Open Rate",
        value: sent.length
          ? `${Math.round(sent.reduce((s, e) => s + (e.opens ?? 0), 0) / sent.length / 10)}%`
          : "—",
        change: "+4%",
        trend: "up" as const,
        icon: Eye,
        iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        delay: 0.1,
      },
      {
        label: "Subscribers",
        value: "1,148",
        change: "+24",
        trend: "up" as const,
        icon: Users,
        iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600",
        delay: 0.15,
      },
      {
        label: "Click Rate",
        value: sent.length
          ? `${Math.round(sent.reduce((s, e) => s + (e.clicks ?? 0), 0) / sent.length / 4)}%`
          : "—",
        change: "+2%",
        trend: "up" as const,
        icon: TrendingUp,
        iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600",
        delay: 0.2,
      },
    ],
    [sent],
  );

  const deleteDraft = (id: string, subject: string) => {
    dispatch({ type: "DELETE_EMAIL", payload: id });
    success("Draft deleted", subject);
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Email"
          subtitle="Send newsletters and announcements to your congregation"
          section="Communication"
          action={
            <Link href="/comms/email/compose">
              <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
                <Plus className="w-4 h-4" /> Compose Email
              </button>
            </Link>
          }
        />
        <KpiGrid stats={stats} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26 }}
          className="card-lumina overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
            <div className="flex gap-1 bg-muted rounded-xl p-1">
              {(["sent", "drafts"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                    tab === t ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {t} {t === "drafts" && drafts.length > 0 ? `(${drafts.length})` : ""}
                </button>
              ))}
            </div>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search emails..."
                className="w-48 pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          {tab === "sent" ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="bg-muted/30 border-b border-border/60">
                    {["Subject", "Audience", "Sent", "Opens", "Clicks", "Status"].map((h) => (
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
                  {filteredSent.map((e, i) => (
                    <motion.tr
                      key={e.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.3 + i * 0.04 }}
                      className="tr-hover"
                    >
                      <td className="px-5 sm:px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                            {e.subject}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{e.audience}</td>
                      <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{e.sent}</td>
                      <td className="px-5 sm:px-6 py-3.5 text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        {(e.opens ?? 0).toLocaleString()}
                      </td>
                      <td className="px-5 sm:px-6 py-3.5 text-sm text-muted-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        {e.clicks ?? 0}
                      </td>
                      <td className="px-5 sm:px-6 py-3.5">
                        <span className="badge badge-green">{e.status}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5 space-y-3">
              {drafts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No drafts yet.</p>
              ) : (
                drafts.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-4 p-4 bg-background border border-border rounded-xl hover:border-primary/20 transition-all group"
                  >
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        {d.subject}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {d.audience} · Edited {d.lastEdited ?? "recently"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Link href={`/comms/email/compose?id=${d.id}`}>
                        <button type="button" className="btn-secondary px-3 py-1.5 rounded-lg text-xs">
                          Edit
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label="Delete draft"
                        onClick={() => deleteDraft(d.id, d.subject)}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </PageCanvas>
    </PageTransition>
  );
}
