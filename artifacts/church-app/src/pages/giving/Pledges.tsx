import { motion } from "framer-motion";
import { Plus, Target, TrendingUp, Users, DollarSign } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";

const stats = [
  { label: "Total Pledged", value: "$285,000", change: "+$45k", trend: "up" as const, icon: Target, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
  { label: "Received", value: "$194,220", change: "68%", trend: "up" as const, icon: DollarSign, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
  { label: "Active Pledgers", value: "148", change: "+12", trend: "up" as const, icon: Users, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.15 },
  { label: "On Track", value: "91%", change: "+3%", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
];

const campaigns = [
  {
    name: "Building Campaign", goal: 120000, raised: 81600, pledgers: 68, deadline: "Dec 2026",
    color: "from-blue-500 to-blue-600", bg: "bg-blue-50", bar: "bg-gradient-to-r from-blue-500 to-blue-400",
    desc: "New sanctuary and multi-purpose hall construction",
  },
  {
    name: "Missions Fund 2026", goal: 85000, raised: 64600, pledgers: 52, deadline: "Dec 2026",
    color: "from-violet-500 to-violet-600", bg: "bg-violet-50", bar: "bg-gradient-to-r from-violet-500 to-violet-400",
    desc: "Supporting missionaries across 8 countries",
  },
  {
    name: "Youth Center", goal: 50000, raised: 33500, pledgers: 28, deadline: "Jun 2026",
    color: "from-amber-500 to-amber-600", bg: "bg-amber-50", bar: "bg-gradient-to-r from-amber-500 to-amber-400",
    desc: "Dedicated space for youth programs and activities",
  },
  {
    name: "Community Outreach", goal: 30000, raised: 14520, pledgers: 22, deadline: "Sep 2026",
    color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", bar: "bg-gradient-to-r from-emerald-500 to-emerald-400",
    desc: "Food bank, shelter support, and community programs",
  },
];

export default function Pledges() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Pledges" subtitle="Campaign pledge tracking and goal management" section="Giving"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> New Campaign
            </button>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {campaigns.map((c, i) => {
            const pct = Math.round((c.raised / c.goal) * 100);
            return (
              <motion.div key={c.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.25 + i * 0.07 }}
                className="card-premium p-6 group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>{c.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
                  </div>
                  <div className={`${c.bg} px-3 py-1.5 rounded-xl`}>
                    <span className="text-xs font-bold" style={{ fontFamily: "'Manrope', sans-serif",
                      color: c.color.includes("blue") ? "#2563EB" : c.color.includes("violet") ? "#7C3AED" : c.color.includes("amber") ? "#D97706" : "#059669" }}>
                      {pct}%
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Raised</span>
                    <span className="font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      ${c.raised.toLocaleString()} of ${c.goal.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                      className={`h-full rounded-full ${c.bar}`}
                      style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span style={{ fontFamily: "'Manrope', sans-serif" }}><span className="font-bold text-foreground">{c.pledgers}</span> pledgers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    <span>Due {c.deadline}</span>
                  </div>
                  <span className="font-semibold text-foreground">${(c.goal - c.raised).toLocaleString()} remaining</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
