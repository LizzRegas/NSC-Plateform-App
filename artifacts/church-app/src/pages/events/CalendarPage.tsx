import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ChevronLeft, ChevronRight, CalendarDays, Clock, Users } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { TrendingUp, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Events This Month", value: "14", change: "+3", trend: "up" as const, icon: CalendarDays, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
  { label: "Total Attendees", value: "1,840", change: "+12%", trend: "up" as const, icon: Users, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
  { label: "Upcoming", value: "7", change: "", trend: "neutral" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.15 },
  { label: "Published", value: "11", change: "+2", trend: "up" as const, icon: CheckCircle2, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const events: Record<number, Array<{title: string; time: string; color: string}>> = {
  3: [{ title: "Prayer", time: "6pm", color: "bg-emerald-500" }],
  6: [{ title: "Sunday Service", time: "9:30am", color: "bg-blue-500" }, { title: "Sunday Service", time: "11am", color: "bg-blue-400" }],
  10: [{ title: "Youth Night", time: "7pm", color: "bg-violet-500" }],
  13: [{ title: "Palm Sunday", time: "9:30am", color: "bg-amber-500" }],
  15: [{ title: "Board Meeting", time: "7pm", color: "bg-gray-500" }],
  17: [{ title: "Good Friday", time: "6pm", color: "bg-rose-500" }],
  20: [{ title: "Easter Sunday", time: "9am", color: "bg-blue-600" }],
  24: [{ title: "Worship Night", time: "7pm", color: "bg-violet-500" }],
  27: [{ title: "Sunday Service", time: "9:30am", color: "bg-blue-500" }],
};

const upcomingEvents = [
  { title: "Sunday Service", date: "Apr 6", time: "9:30 AM", attendees: 320, color: "border-blue-200 bg-blue-50/40", dot: "bg-blue-500" },
  { title: "Youth Night", date: "Apr 10", time: "7:00 PM", attendees: 48, color: "border-violet-200 bg-violet-50/40", dot: "bg-violet-500" },
  { title: "Palm Sunday Special", date: "Apr 13", time: "9:30 AM", attendees: 380, color: "border-amber-200 bg-amber-50/40", dot: "bg-amber-500" },
  { title: "Good Friday Service", date: "Apr 17", time: "6:00 PM", attendees: 210, color: "border-rose-200 bg-rose-50/40", dot: "bg-rose-500" },
  { title: "Easter Sunday", date: "Apr 20", time: "9:00 AM", attendees: 520, color: "border-blue-200 bg-blue-50/40", dot: "bg-blue-500" },
];

export default function CalendarPage() {
  const [month] = useState("April 2026");

  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Calendar" subtitle="Schedule and manage all church events" section="Events"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> Create Event
            </button>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Calendar */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}
            className="xl:col-span-2 bg-card rounded-2xl border border-border overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
              <button className="icon-btn"><ChevronLeft className="w-4 h-4" /></button>
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>{month}</h3>
              <button className="icon-btn"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map(d => (
                  <div key={d} className="text-center text-xs font-bold text-muted-foreground py-1" style={{ fontFamily: "'Manrope', sans-serif" }}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {/* April 2026 starts on Wednesday (3 offset) */}
                {[...Array(3)].map((_, i) => <div key={`e-${i}`} />)}
                {[...Array(30)].map((_, i) => {
                  const day = i + 1;
                  const dayEvents = events[day] || [];
                  const isToday = day === 3;
                  return (
                    <motion.div key={day} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.01 }}
                      className={`min-h-[52px] sm:min-h-[64px] p-1.5 rounded-xl cursor-pointer transition-all duration-150 hover:bg-accent/60 border ${
                        isToday ? "border-primary/30 bg-primary/5" : "border-transparent hover:border-border/60"
                      }`}>
                      <div className={`text-xs font-bold mb-1 w-5 h-5 flex items-center justify-center rounded-full ${
                        isToday ? "bg-primary text-white" : "text-foreground/70"
                      }`} style={{ fontFamily: "'Manrope', sans-serif" }}>{day}</div>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map((e, ei) => (
                          <div key={ei} className={`w-full h-1.5 rounded-full ${e.color} opacity-80`} />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Upcoming */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.32 }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Upcoming Events</h3>
            </div>
            <div className="p-4 space-y-2">
              {upcomingEvents.map((e, i) => (
                <div key={i} className={`p-3 rounded-xl border cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-sm ${e.color}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-2 h-2 rounded-full ${e.dot}`} />
                    <p className="text-xs font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{e.title}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.date} · {e.time}</div>
                    <div className="flex items-center gap-1"><Users className="w-3 h-3" />{e.attendees}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
