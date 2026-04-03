import { motion } from "framer-motion";
import { Download, BarChart3, FileText, TrendingUp, PieChart, Calendar } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";

const reports = [
  { title: "Annual Giving Report", desc: "Complete giving summary for the year, by donor and fund", icon: BarChart3, color: "from-blue-500 to-blue-600", period: "2025 Full Year", format: "PDF, Excel" },
  { title: "Budget Variance Report", desc: "Budget vs. actual spending analysis by category", icon: PieChart, color: "from-violet-500 to-violet-600", period: "Q1 2026", format: "PDF" },
  { title: "Monthly Financial Summary", desc: "Income, expenses, and net balance for the month", icon: TrendingUp, color: "from-emerald-500 to-emerald-600", period: "March 2026", format: "PDF, Excel" },
  { title: "Donor Statements", desc: "Individual giving statements for tax purposes", icon: FileText, color: "from-amber-500 to-amber-600", period: "Q1 2026", format: "PDF (bulk)" },
  { title: "Fund Breakdown Report", desc: "Detailed analysis of each fund and restricted gift", icon: BarChart3, color: "from-teal-500 to-teal-600", period: "March 2026", format: "Excel" },
  { title: "Year-to-Date Comparison", desc: "This year vs. last year income/expense comparison", icon: Calendar, color: "from-rose-500 to-rose-600", period: "Jan–Mar 2026 vs 2025", format: "PDF" },
];

const recent = [
  { name: "Q4 2025 Financial Summary", date: "Jan 15, 2026", size: "2.4 MB" },
  { name: "Annual Giving Report 2025", date: "Jan 12, 2026", size: "5.1 MB" },
  { name: "Budget Report Q4 2025", date: "Jan 10, 2026", size: "1.8 MB" },
  { name: "Donor Statements — Q4 2025", date: "Jan 8, 2026", size: "12.3 MB" },
];

export default function Reports() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Reports" subtitle="Generate and download financial reports" section="Finance"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <BarChart3 className="w-4 h-4" /> Custom Report
            </button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {reports.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
              className="card-premium p-5 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center`}
                  style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)" }}>
                  <r.icon className="w-5 h-5 text-white" />
                </div>
                <button className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all">
                  <Download className="w-3 h-3" /> Generate
                </button>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{r.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{r.desc}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="badge badge-gray">{r.period}</span>
                <span>{r.format}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
          <div className="px-5 sm:px-6 py-4 border-b border-border">
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Recent Downloads</h3>
          </div>
          <div className="divide-y divide-border/40">
            {recent.map((r, i) => (
              <div key={i} className="flex items-center justify-between px-5 sm:px-6 py-3.5 hover:bg-accent/30 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.date} · {r.size}</p>
                  </div>
                </div>
                <button className="icon-btn opacity-0 group-hover:opacity-100 transition-opacity"><Download className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
