import { motion } from "framer-motion";
import { Plus, Download, TrendingUp, TrendingDown, Banknote, Receipt } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";

const stats = [
  { label: "Total Income", value: "$38,450", change: "+12%", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.05 },
  { label: "Total Expenses", value: "$24,310", change: "+5%", trend: "down" as const, icon: TrendingDown, iconGradient: "bg-gradient-to-br from-rose-500 to-rose-600", delay: 0.1 },
  { label: "Net Balance", value: "$14,140", change: "+28%", trend: "up" as const, icon: Banknote, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.15 },
  { label: "Transactions", value: "142", change: "+18", trend: "up" as const, icon: Receipt, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.2 },
];

const transactions = [
  { id: "T-0142", desc: "Sunday Offering — Apr 3", category: "Tithe Income", amount: 8240, type: "income", date: "Apr 3" },
  { id: "T-0141", desc: "Utilities — Church Building", category: "Operations", amount: -1200, type: "expense", date: "Apr 2" },
  { id: "T-0140", desc: "Online Giving — Apr 2", category: "Tithe Income", amount: 3180, type: "income", date: "Apr 2" },
  { id: "T-0139", desc: "Sound Equipment Purchase", category: "Worship", amount: -4800, type: "expense", date: "Apr 1" },
  { id: "T-0138", desc: "Building Fund Pledge — Okafor", category: "Building", amount: 1000, type: "income", date: "Apr 1" },
  { id: "T-0137", desc: "Pastor Salary — March", category: "Payroll", amount: -6500, type: "expense", date: "Mar 31" },
  { id: "T-0136", desc: "Sunday Offering — Mar 31", category: "Tithe Income", amount: 7820, type: "income", date: "Mar 31" },
  { id: "T-0135", desc: "Missions Transfer — March", category: "Missions", amount: -2000, type: "expense", date: "Mar 30" },
];

const accounts = [
  { name: "General Fund", balance: 42300, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Building Fund", balance: 81600, color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "Missions Account", balance: 14200, color: "text-violet-600", bg: "bg-violet-50" },
  { name: "Payroll Account", balance: 18500, color: "text-amber-600", bg: "bg-amber-50" },
];

export default function Accounting() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Accounting" subtitle="Fund ledger and financial transactions" section="Finance"
          action={
            <div className="flex gap-2">
              <button className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Download className="w-4 h-4" /> Export</button>
              <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Plus className="w-4 h-4" /> Add Entry</button>
            </div>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Fund Accounts */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Fund Accounts</h3>
            </div>
            <div className="p-4 space-y-3">
              {accounts.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.3 + i * 0.06 }}
                  className={`flex items-center justify-between p-3.5 ${a.bg} rounded-xl border border-transparent hover:border-current/20 transition-all cursor-pointer`}>
                  <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{a.name}</span>
                  <span className={`text-sm font-bold ${a.color}`} style={{ fontFamily: "'Manrope', sans-serif" }}>${a.balance.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Transactions */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
            className="xl:col-span-2 bg-card rounded-2xl border border-border overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Recent Transactions</h3>
              <span className="text-xs text-muted-foreground">April 2026</span>
            </div>
            <div className="divide-y divide-border/40">
              {transactions.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.34 + i * 0.04 }}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-accent/30 transition-colors">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${t.type === "income" ? "bg-emerald-50" : "bg-rose-50"}`}>
                    {t.type === "income" ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <TrendingDown className="w-4 h-4 text-rose-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate" style={{ fontFamily: "'Manrope', sans-serif" }}>{t.desc}</p>
                    <p className="text-xs text-muted-foreground">{t.category} · {t.date}</p>
                  </div>
                  <span className={`text-sm font-bold shrink-0 ${t.type === "income" ? "text-emerald-600" : "text-rose-500"}`}
                    style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {t.type === "income" ? "+" : ""}${Math.abs(t.amount).toLocaleString()}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
