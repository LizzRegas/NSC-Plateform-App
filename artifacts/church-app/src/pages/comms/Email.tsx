import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Plus, Users, Eye, Trash2, Search } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { TrendingUp, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Sent This Month", value: "24", change: "+6", trend: "up" as const, icon: Send, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
  { label: "Open Rate", value: "68%", change: "+4%", trend: "up" as const, icon: Eye, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
  { label: "Subscribers", value: "1,148", change: "+24", trend: "up" as const, icon: Users, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.15 },
  { label: "Click Rate", value: "24%", change: "+2%", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
];

const emails = [
  { subject: "This Week at Lumina Church", audience: "All Members", sent: "Apr 1, 2026", opens: 824, clicks: 312, status: "Sent" },
  { subject: "Easter Sunday Details & Schedule", audience: "All Members", sent: "Mar 28, 2026", opens: 968, clicks: 524, status: "Sent" },
  { subject: "Youth Night Reminder — Friday", audience: "Youth & Parents", sent: "Mar 27, 2026", opens: 148, clicks: 84, status: "Sent" },
  { subject: "Building Campaign Update", audience: "Pledgers", sent: "Mar 20, 2026", opens: 312, clicks: 148, status: "Sent" },
  { subject: "Welcome New Members — March Class", audience: "New Members", sent: "Mar 15, 2026", opens: 68, clicks: 44, status: "Sent" },
];

const drafts = [
  { subject: "Palm Sunday Special Service", audience: "All Members", lastEdited: "2 hours ago" },
  { subject: "Good Friday Vigil — April 17", audience: "All Members", lastEdited: "Yesterday" },
];

export default function Email() {
  const [tab, setTab] = useState<"sent" | "drafts">("sent");

  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Email" subtitle="Send newsletters and announcements to your congregation" section="Communication"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> Compose Email
            </button>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
            <div className="flex gap-1 bg-muted rounded-xl p-1">
              {(["sent", "drafts"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${tab === t ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {t}
                </button>
              ))}
            </div>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Search emails..." className="w-48 pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary transition-all" />
            </div>
          </div>

          {tab === "sent" ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead><tr className="bg-muted/30 border-b border-border/60">
                  {["Subject", "Audience", "Sent", "Opens", "Clicks", "Status"].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 sm:px-6 py-3"
                      style={{ fontFamily: "'Manrope', sans-serif" }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody className="divide-y divide-border/40">
                  {emails.map((e, i) => (
                    <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.3 + i * 0.04 }} className="tr-hover">
                      <td className="px-5 sm:px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{e.subject}</span>
                        </div>
                      </td>
                      <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{e.audience}</td>
                      <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{e.sent}</td>
                      <td className="px-5 sm:px-6 py-3.5 text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{e.opens.toLocaleString()}</td>
                      <td className="px-5 sm:px-6 py-3.5 text-sm text-muted-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{e.clicks}</td>
                      <td className="px-5 sm:px-6 py-3.5"><span className="badge badge-green">{e.status}</span></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5 space-y-3">
              {drafts.map((d, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-background border border-border rounded-xl hover:border-primary/20 transition-all cursor-pointer group">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{d.subject}</p>
                    <p className="text-xs text-muted-foreground">{d.audience} · Edited {d.lastEdited}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="btn-secondary px-3 py-1.5 rounded-lg text-xs">Edit</button>
                    <button className="icon-btn"><Trash2 className="w-3.5 h-3.5 text-rose-400" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}
