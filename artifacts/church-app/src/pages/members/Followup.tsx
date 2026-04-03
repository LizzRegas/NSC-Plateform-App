import { motion } from "framer-motion";
import { Plus, CheckCircle2, Clock, AlertCircle, User, CalendarDays } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { Target, TrendingUp } from "lucide-react";

const stats = [
  { label: "Active Follow-ups", value: "38", change: "+5", trend: "up" as const, icon: Target, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
  { label: "Completed This Week", value: "12", change: "+4", trend: "up" as const, icon: CheckCircle2, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
  { label: "Overdue", value: "6", change: "-2", trend: "down" as const, icon: AlertCircle, iconGradient: "bg-gradient-to-br from-rose-500 to-rose-600", delay: 0.15 },
  { label: "Avg Response Time", value: "2.4d", change: "-0.5d", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.2 },
];

const columns = [
  { id: "new", title: "New Visitors", color: "bg-blue-500", light: "bg-blue-50 border-blue-200" },
  { id: "inprogress", title: "In Progress", color: "bg-amber-500", light: "bg-amber-50 border-amber-200" },
  { id: "completed", title: "Completed", color: "bg-emerald-500", light: "bg-emerald-50 border-emerald-200" },
];

const items: Record<string, Array<{name: string; note: string; assignee: string; due: string; priority: string}>> = {
  new: [
    { name: "Paul & Anna Schmidt", note: "Visited Sunday, interested in young families group", assignee: "David O.", due: "Apr 5", priority: "High" },
    { name: "Nadia Kouassi", note: "First-time visitor, moved from Lyon last month", assignee: "Sophie C.", due: "Apr 6", priority: "Medium" },
    { name: "Rafael Torres", note: "Attended with friend, asked about baptism class", assignee: "James M.", due: "Apr 7", priority: "High" },
  ],
  inprogress: [
    { name: "Mei Zhang", note: "Second call scheduled for Thursday", assignee: "Marie D.", due: "Apr 4", priority: "Medium" },
    { name: "Kevin O'Brien", note: "Connected to men's group, following up on membership", assignee: "Thomas B.", due: "Apr 8", priority: "Low" },
    { name: "Fatima Al-Hassan", note: "Email sent, awaiting response on small group interest", assignee: "Amara D.", due: "Apr 3", priority: "High" },
  ],
  completed: [
    { name: "Lucas & Émilie Petit", note: "Joined women's and men's groups, fully integrated", assignee: "David O.", due: "Apr 1", priority: "Low" },
    { name: "George Mensah", note: "Completed new member class, baptized March 31", assignee: "James M.", due: "Mar 31", priority: "Medium" },
    { name: "Clara Fontaine", note: "Connected to worship team, very engaged", assignee: "Sophie C.", due: "Mar 28", priority: "Low" },
  ],
};

const priorityColors: Record<string, string> = { High: "badge badge-red", Medium: "badge badge-amber", Low: "badge badge-gray" };

export default function Followup() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Follow-up" subtitle="Track and manage visitor follow-ups" section="People"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> Add Follow-up
            </button>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((col, ci) => (
            <motion.div key={col.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 + ci * 0.08 }}>
              <div className="bg-card rounded-2xl border border-border overflow-hidden"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                    <span className="text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{col.title}</span>
                    <span className="badge badge-gray">{items[col.id].length}</span>
                  </div>
                  <button className="icon-btn"><Plus className="w-3.5 h-3.5" /></button>
                </div>
                <div className="p-3 space-y-3">
                  {items[col.id].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: 0.3 + i * 0.06 }}
                      className="bg-background border border-border/60 rounded-xl p-3.5 cursor-pointer hover:border-primary/20 hover:shadow-sm transition-all duration-200 group">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-sm font-semibold text-foreground leading-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>{item.name}</p>
                        <span className={`${priorityColors[item.priority]} shrink-0`}>{item.priority}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{item.note}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3" />
                          <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500 }}>{item.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          <span>{item.due}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
