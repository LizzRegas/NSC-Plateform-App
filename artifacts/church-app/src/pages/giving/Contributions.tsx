import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Filter, Search, Plus, TrendingUp, CreditCard, Heart, Users } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";

const stats = [
  { label: "Total This Month", value: "$38,450", change: "+12%", trend: "up" as const, icon: Heart, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.05 },
  { label: "Unique Givers", value: "284", change: "+18", trend: "up" as const, icon: Users, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.1 },
  { label: "Avg Gift Size", value: "$135", change: "+8%", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.15 },
  { label: "Online Giving", value: "$24,200", change: "63%", trend: "up" as const, icon: CreditCard, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
];

const contributions = [
  { id: "C-001", name: "James Moreau", fund: "General Tithe", amount: 500, method: "Online", date: "Apr 3, 2026", status: "Cleared" },
  { id: "C-002", name: "Sophie Chen", fund: "Missions Fund", amount: 150, method: "Check", date: "Apr 3, 2026", status: "Cleared" },
  { id: "C-003", name: "Marie Dubois", fund: "General Tithe", amount: 250, method: "Online", date: "Apr 2, 2026", status: "Cleared" },
  { id: "C-004", name: "David Okafor", fund: "Building Campaign", amount: 1000, method: "Online", date: "Apr 2, 2026", status: "Cleared" },
  { id: "C-005", name: "Anonymous", fund: "General Tithe", amount: 100, method: "Cash", date: "Apr 1, 2026", status: "Cleared" },
  { id: "C-006", name: "Thomas Blanc", fund: "Missions Fund", amount: 200, method: "Online", date: "Apr 1, 2026", status: "Pending" },
  { id: "C-007", name: "Amara Diallo", fund: "General Tithe", amount: 350, method: "Check", date: "Mar 31, 2026", status: "Cleared" },
  { id: "C-008", name: "Lucas Martin", fund: "Building Campaign", amount: 500, method: "Online", date: "Mar 30, 2026", status: "Cleared" },
];

const fundColors: Record<string, string> = { "General Tithe": "badge badge-blue", "Missions Fund": "badge badge-violet", "Building Campaign": "badge badge-amber" };
const statusColors: Record<string, string> = { Cleared: "badge badge-green", Pending: "badge badge-amber" };
const methodColors: Record<string, string> = { Online: "badge badge-blue", Check: "badge badge-gray", Cash: "badge badge-green" };

export default function Contributions() {
  const [search, setSearch] = useState("");
  const filtered = contributions.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search));

  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Contributions" subtitle="Track all giving records and donations" section="Giving"
          action={
            <div className="flex gap-2">
              <button className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Download className="w-4 h-4" /> Export</button>
              <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Plus className="w-4 h-4" /> Record Gift</button>
            </div>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Monthly bar chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.24 }}
          className="bg-card rounded-2xl border border-border p-5 sm:p-6"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Monthly Giving Trend</h3>
              <p className="text-xs text-muted-foreground mt-0.5">6-month overview</p>
            </div>
          </div>
          <div className="flex items-end gap-2 sm:gap-3 h-32">
            {[28000, 32000, 29500, 35000, 34200, 38450].map((v, i) => {
              const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
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
                  <span className={`text-[10px] font-bold ${i === 5 ? "text-primary" : "text-muted-foreground"}`}
                    style={{ fontFamily: "'Manrope', sans-serif" }}>{months[i]}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 sm:px-6 py-4 border-b border-border">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contributions..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
            <button className="btn-secondary flex items-center gap-2 px-3 py-2 rounded-xl text-sm ml-auto"><Filter className="w-4 h-4" /> Filter</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-muted/30 border-b border-border/60">
                  {["ID", "Donor", "Fund", "Amount", "Method", "Date", "Status"].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 sm:px-6 py-3"
                      style={{ fontFamily: "'Manrope', sans-serif" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filtered.map((c, i) => (
                  <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.35 + i * 0.04 }}
                    className="tr-hover">
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground font-mono">{c.id}</td>
                    <td className="px-5 sm:px-6 py-3.5 text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{c.name}</td>
                    <td className="px-5 sm:px-6 py-3.5"><span className={fundColors[c.fund]}>{c.fund}</span></td>
                    <td className="px-5 sm:px-6 py-3.5 text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>${c.amount.toLocaleString()}</td>
                    <td className="px-5 sm:px-6 py-3.5"><span className={methodColors[c.method]}>{c.method}</span></td>
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{c.date}</td>
                    <td className="px-5 sm:px-6 py-3.5"><span className={statusColors[c.status]}>{c.status}</span></td>
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
