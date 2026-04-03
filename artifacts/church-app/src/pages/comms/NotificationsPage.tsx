import { motion } from "framer-motion";
import { Bell, Plus, Eye, Users, TrendingUp, Send, CheckCircle2 } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";

const stats = [
  { label: "Sent This Month", value: "48", change: "+12", trend: "up" as const, icon: Send, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
  { label: "Open Rate", value: "82%", change: "+6%", trend: "up" as const, icon: Eye, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
  { label: "Push Subscribers", value: "648", change: "+24", trend: "up" as const, icon: Users, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.15 },
  { label: "Action Rate", value: "31%", change: "+4%", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
];

const notifications = [
  { title: "Easter Sunday Service Reminder", body: "Join us this Sunday for a special Easter celebration!", sent: "Apr 5, 10am", type: "Event", icon: Bell, color: "text-blue-500 bg-blue-50" },
  { title: "New Blog Post: Faith & Community", body: "Read our latest post on building community in your faith journey.", sent: "Apr 3, 2pm", type: "Content", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50" },
  { title: "Volunteer Confirmation", body: "Your volunteer slot has been confirmed for Sunday 9:30am.", sent: "Apr 2, 4pm", type: "Action", icon: Users, color: "text-violet-500 bg-violet-50" },
  { title: "Giving Statement Available", body: "Your Q1 2026 giving statement is ready to download.", sent: "Apr 1, 9am", type: "Finance", icon: TrendingUp, color: "text-amber-500 bg-amber-50" },
];

export default function NotificationsPage() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Notifications" subtitle="Push notifications for the member portal and app" section="Communication"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> Create Notification
            </button>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Sent Notifications</h3>
          </div>
          <div className="divide-y divide-border/40">
            {notifications.map((n, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.3 + i * 0.06 }}
                className="flex items-start gap-4 px-5 py-4 hover:bg-accent/30 transition-colors cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                  <n.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="badge badge-gray">{n.type}</span>
                    <span className="text-xs text-muted-foreground">{n.sent}</span>
                  </div>
                </div>
                <span className="badge badge-green shrink-0">Sent</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
