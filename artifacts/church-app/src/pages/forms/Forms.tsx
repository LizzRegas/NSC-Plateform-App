import { motion } from "framer-motion";
import { Plus, FileText, Eye, BarChart3, Copy, Trash2, TrendingUp, CheckCircle2, Users } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";

const stats = [
  { label: "Active Forms", value: "12", change: "+2", trend: "up" as const, icon: FileText, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
  { label: "Submissions", value: "348", change: "+64", trend: "up" as const, icon: CheckCircle2, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
  { label: "This Week", value: "48", change: "+12", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.15 },
  { label: "Completion Rate", value: "84%", change: "+3%", trend: "up" as const, icon: Users, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
];

const forms = [
  { name: "New Member Registration", category: "Membership", submissions: 28, lastSubmit: "2 hours ago", status: "Active", fields: 14 },
  { name: "Prayer Request", category: "Pastoral", submissions: 124, lastSubmit: "30 min ago", status: "Active", fields: 4 },
  { name: "Volunteer Sign-up", category: "Events", submissions: 64, lastSubmit: "1 day ago", status: "Active", fields: 8 },
  { name: "Baptism Interest Form", category: "Ministry", submissions: 12, lastSubmit: "3 days ago", status: "Active", fields: 6 },
  { name: "Small Group Interest", category: "Groups", submissions: 48, lastSubmit: "1 day ago", status: "Active", fields: 5 },
  { name: "Event Registration — Youth Night", category: "Events", submissions: 48, lastSubmit: "4 hours ago", status: "Active", fields: 4 },
  { name: "Missions Trip Application", category: "Missions", submissions: 8, lastSubmit: "5 days ago", status: "Active", fields: 18 },
  { name: "Pastoral Care Request", category: "Pastoral", submissions: 16, lastSubmit: "2 days ago", status: "Draft", fields: 6 },
];

const catColors: Record<string, string> = {
  Membership: "badge badge-blue", Pastoral: "badge badge-violet", Events: "badge badge-amber",
  Ministry: "badge badge-green", Groups: "badge badge-teal", Missions: "badge badge-red",
};

export default function Forms() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Forms" subtitle="Build forms and collect responses from members" section="Forms"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> Create Form
            </button>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {forms.map((f, i) => (
            <motion.div key={f.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.24 + i * 0.05 }}
              className="card-premium p-5 group cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
                  style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.25)" }}>
                  <FileText className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <span className={f.status === "Active" ? "badge badge-green" : "badge badge-gray"}>{f.status}</span>
                </div>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{f.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className={catColors[f.category] || "badge badge-gray"}>{f.category}</span>
                <span className="text-xs text-muted-foreground">{f.fields} fields</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{f.submissions}</span> submissions
                </div>
                <span>Last: {f.lastSubmit}</span>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pt-3 border-t border-border">
                <button className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs flex-1 justify-center"><Eye className="w-3 h-3" /> View</button>
                <button className="icon-btn"><BarChart3 className="w-3.5 h-3.5" /></button>
                <button className="icon-btn"><Copy className="w-3.5 h-3.5" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
