import { motion } from "framer-motion";
import { Download, Send, FileText, Calendar, Users, DollarSign, Search } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";

const stats = [
  { label: "Statements Ready", value: "284", change: "", trend: "neutral" as const, icon: FileText, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
  { label: "Sent This Year", value: "1,136", change: "+8%", trend: "up" as const, icon: Send, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
  { label: "Total Documented", value: "$154,200", change: "+22%", trend: "up" as const, icon: DollarSign, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.15 },
  { label: "Period", value: "Q1 2026", change: "", trend: "neutral" as const, icon: Calendar, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
];

const statements = [
  { name: "James Moreau", email: "j.moreau@email.com", total: 4800, gifts: 12, period: "Q1 2026", status: "Ready" },
  { name: "Sophie Chen", email: "s.chen@email.com", total: 1350, gifts: 9, period: "Q1 2026", status: "Sent" },
  { name: "David Okafor", email: "d.okafor@email.com", total: 3000, gifts: 6, period: "Q1 2026", status: "Ready" },
  { name: "Marie Dubois", email: "marie.d@email.com", total: 2400, gifts: 12, period: "Q1 2026", status: "Sent" },
  { name: "Thomas Blanc", email: "t.blanc@email.com", total: 900, gifts: 3, period: "Q1 2026", status: "Ready" },
  { name: "Amara Diallo", email: "a.diallo@email.com", total: 1800, gifts: 12, period: "Q1 2026", status: "Ready" },
  { name: "Lucas Martin", email: "l.martin@email.com", total: 1500, gifts: 3, period: "Q1 2026", status: "Sent" },
  { name: "Isabelle Roy", email: "i.roy@email.com", total: 600, gifts: 6, period: "Q1 2026", status: "Ready" },
];

const statusColors: Record<string, string> = { Ready: "badge badge-blue", Sent: "badge badge-green" };

export default function Statements() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Statements" subtitle="Generate and send annual giving statements" section="Giving"
          action={
            <div className="flex gap-2">
              <button className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Download className="w-4 h-4" /> Export All</button>
              <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Send className="w-4 h-4" /> Send All</button>
            </div>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.28 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
          <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-border">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Search donors..." className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
            <select className="ml-auto text-sm bg-background border border-border rounded-xl px-3 py-2 outline-none focus:border-primary transition-all">
              <option>Q1 2026</option><option>Q4 2025</option><option>Full Year 2025</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="bg-muted/30 border-b border-border/60">
                  {["Donor", "Email", "Total Given", "# Gifts", "Period", "Status", ""].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 sm:px-6 py-3"
                      style={{ fontFamily: "'Manrope', sans-serif" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {statements.map((s, i) => (
                  <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.32 + i * 0.04 }}
                    className="tr-hover group">
                    <td className="px-5 sm:px-6 py-3.5 text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{s.name}</td>
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{s.email}</td>
                    <td className="px-5 sm:px-6 py-3.5 text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>${s.total.toLocaleString()}</td>
                    <td className="px-5 sm:px-6 py-3.5 text-sm text-muted-foreground">{s.gifts}</td>
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{s.period}</td>
                    <td className="px-5 sm:px-6 py-3.5"><span className={statusColors[s.status]}>{s.status}</span></td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="icon-btn"><Download className="w-3.5 h-3.5" /></button>
                        <button className="icon-btn"><Send className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
