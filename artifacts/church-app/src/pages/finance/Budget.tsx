import { motion } from "framer-motion";
import { Plus, Download, TrendingUp, AlertCircle } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { Banknote, PieChart, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Annual Budget", value: "$480,000", change: "", trend: "neutral" as const, icon: Banknote, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
  { label: "YTD Spend", value: "$115,240", change: "24%", trend: "up" as const, icon: PieChart, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.1 },
  { label: "On Track", value: "8/10", change: "", trend: "neutral" as const, icon: CheckCircle2, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.15 },
  { label: "Over Budget", value: "2", change: "", trend: "down" as const, icon: AlertCircle, iconGradient: "bg-gradient-to-br from-rose-500 to-rose-600", delay: 0.2 },
];

const categories = [
  { name: "Pastoral Staff", budget: 120000, spent: 30000, color: "bg-gradient-to-r from-blue-500 to-blue-400", status: "on" },
  { name: "Worship & Music", budget: 24000, spent: 9800, color: "bg-gradient-to-r from-violet-500 to-violet-400", status: "on" },
  { name: "Building & Utilities", budget: 60000, spent: 18400, color: "bg-gradient-to-r from-amber-500 to-amber-400", status: "on" },
  { name: "Missions & Outreach", budget: 48000, spent: 14200, color: "bg-gradient-to-r from-emerald-500 to-emerald-400", status: "on" },
  { name: "Youth Programs", budget: 18000, spent: 6800, color: "bg-gradient-to-r from-teal-500 to-teal-400", status: "on" },
  { name: "Children's Ministry", budget: 15000, spent: 4200, color: "bg-gradient-to-r from-pink-500 to-pink-400", status: "on" },
  { name: "Administrative", budget: 30000, spent: 11200, color: "bg-gradient-to-r from-indigo-500 to-indigo-400", status: "on" },
  { name: "Events & Hospitality", budget: 20000, spent: 8400, color: "bg-gradient-to-r from-orange-500 to-orange-400", status: "over" },
  { name: "Technology", budget: 12000, spent: 5400, color: "bg-gradient-to-r from-cyan-500 to-cyan-400", status: "on" },
  { name: "Benevolence Fund", budget: 24000, spent: 6840, color: "bg-gradient-to-r from-rose-500 to-rose-400", status: "over" },
];

export default function Budget() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Budget" subtitle="Annual budget planning and variance tracking" section="Finance"
          action={
            <div className="flex gap-2">
              <button className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Download className="w-4 h-4" /> Report</button>
              <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Plus className="w-4 h-4" /> Add Category</button>
            </div>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Budget vs Actual (2026)</h3>
            <select className="text-sm bg-background border border-border rounded-xl px-3 py-2 outline-none focus:border-primary transition-all">
              <option>Annual 2026</option><option>Q1 2026</option>
            </select>
          </div>
          <div className="p-5 sm:p-6 space-y-4">
            {categories.map((c, i) => {
              const pct = Math.round((c.spent / c.budget) * 100);
              const isOver = c.status === "over";
              return (
                <motion.div key={c.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.3 + i * 0.04 }}>
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <span className="text-sm font-semibold text-foreground truncate" style={{ fontFamily: "'Manrope', sans-serif" }}>{c.name}</span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground">${c.spent.toLocaleString()} / ${c.budget.toLocaleString()}</span>
                      {isOver && <AlertCircle className="w-3.5 h-3.5 text-rose-500" />}
                      <span className={`text-xs font-bold ${isOver ? "text-rose-500" : "text-foreground"}`}
                        style={{ fontFamily: "'Manrope', sans-serif" }}>{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(pct, 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.35 + i * 0.04, ease: [0.4, 0, 0.2, 1] }}
                      className={`h-full rounded-full ${isOver ? "bg-gradient-to-r from-rose-500 to-rose-400" : c.color}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
