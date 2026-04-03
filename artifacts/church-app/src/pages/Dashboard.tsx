import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Users, Heart, CalendarDays, UsersRound, TrendingUp, TrendingDown, ArrowRight, MoreHorizontal, CheckCircle2, Clock, UserPlus, Bell, Music2, CreditCard, CircleDot, Sparkles, Target } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { StatCard } from "@/components/shared/StatCard";

const stats = [
  { label: "Total Members", value: "1,284", change: "+24", trend: "up" as const, icon: Users, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", sub: "this month" },
  { label: "Giving This Month", value: "$38,450", change: "+12%", trend: "up" as const, icon: Heart, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", sub: "vs last month" },
  { label: "Upcoming Events", value: "7", change: "+2", trend: "up" as const, icon: CalendarDays, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", sub: "this week" },
  { label: "Active Groups", value: "34", change: "-1", trend: "down" as const, icon: UsersRound, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", sub: "active ministry groups" },
];

const activity = [
  { icon: UserPlus, bg: "bg-blue-50", color: "text-blue-500", title: "New member registered", desc: "Marie Dubois joined the congregation", time: "2 min ago" },
  { icon: CreditCard, bg: "bg-emerald-50", color: "text-emerald-500", title: "Contribution received", desc: "$250 — General Tithe from J. Moreau", time: "15 min ago" },
  { icon: Bell, bg: "bg-violet-50", color: "text-violet-500", title: "Event published", desc: "Youth Night — Friday 7pm · 28 registered", time: "1 hr ago" },
  { icon: Music2, bg: "bg-amber-50", color: "text-amber-500", title: "Service plan updated", desc: "Sunday Morning — Worship set finalized", time: "2 hr ago" },
  { icon: CheckCircle2, bg: "bg-teal-50", color: "text-teal-500", title: "Follow-up completed", desc: "3 new visitor follow-ups marked done", time: "3 hr ago" },
  { icon: Target, bg: "bg-rose-50", color: "text-rose-500", title: "Pledge campaign updated", desc: "Building Fund — 68% of $120k goal reached", time: "Yesterday" },
];

const events = [
  { title: "Sunday Service", date: "Sun, Apr 6", time: "9:30 AM", attendees: 320, dot: "bg-blue-500", border: "border-blue-200/80 bg-blue-50/30", status: "confirmed" },
  { title: "Youth Night", date: "Fri, Apr 4", time: "7:00 PM", attendees: 48, dot: "bg-violet-500", border: "border-violet-200/80 bg-violet-50/30", status: "confirmed" },
  { title: "Prayer Meeting", date: "Wed, Apr 9", time: "6:00 PM", attendees: 22, dot: "bg-amber-500", border: "border-amber-200/80 bg-amber-50/30", status: "draft" },
  { title: "Worship Practice", date: "Sat, Apr 5", time: "10:00 AM", attendees: 14, dot: "bg-emerald-500", border: "border-emerald-200/80 bg-emerald-50/30", status: "confirmed" },
];

const funds = [
  { name: "General Tithe", amount: 24200, color: "bg-blue-500" },
  { name: "Missions Fund", amount: 9100, color: "bg-violet-500" },
  { name: "Building Campaign", amount: 5150, color: "bg-emerald-500" },
];

const quickActions = [
  { icon: UserPlus, label: "Add Member", href: "/members", color: "text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-100 hover:border-blue-200" },
  { icon: CreditCard, label: "Record Giving", href: "/giving/contributions", color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-100 hover:border-emerald-200" },
  { icon: CalendarDays, label: "Create Event", href: "/events/calendar", color: "text-violet-600 bg-violet-50 hover:bg-violet-100 border-violet-100 hover:border-violet-200" },
  { icon: Bell, label: "Send Message", href: "/comms/email", color: "text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-100 hover:border-amber-200" },
];

export default function Dashboard() {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)", boxShadow: "0 2px 6px rgba(37,99,235,0.3)" }}>
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest"
                style={{ fontFamily: "'Manrope', sans-serif" }}>Overview</span>
            </div>
            <h1 className="text-[1.9rem] font-bold text-foreground leading-none"
              style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.03em" }}>
              Good morning, Pastor
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">{today}</p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            {quickActions.map((a) => (
              <Link key={a.label} href={a.href}>
                <button className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 hover:-translate-y-0.5 ${a.color}`}
                  style={{ fontFamily: "'Manrope', sans-serif" }}>
                  <a.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">{a.label}</span>
                </button>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.06} />)}
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* Activity */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.28 }}
            className="xl:col-span-2 bg-card rounded-2xl border border-border overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
              <div>
                <h2 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Recent Activity</h2>
                <p className="text-xs text-muted-foreground mt-0.5">What's happening in your church</p>
              </div>
              <Link href="/members">
                <button className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ fontFamily: "'Manrope', sans-serif" }}>View all <ArrowRight className="w-3.5 h-3.5" /></button>
              </Link>
            </div>
            <div className="divide-y divide-border/50">
              {activity.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.32 + i * 0.05 }}
                  className="flex items-start gap-4 px-5 sm:px-6 py-3.5 hover:bg-accent/30 transition-colors cursor-default">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${item.bg}`}
                    style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-foreground leading-snug" style={{ fontFamily: "'Manrope', sans-serif" }}>{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.desc}</p>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0 mt-0.5 whitespace-nowrap">{item.time}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <div className="space-y-5">
            {/* Giving */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.32 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div>
                  <h2 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Giving</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">April 2026</p>
                </div>
                <button className="icon-btn"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
              <div className="px-5 py-4">
                <p className="font-metric text-3xl text-foreground">$38,450</p>
                <div className="flex items-center gap-1.5 mt-1 mb-4">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-600" style={{ fontFamily: "'Manrope', sans-serif" }}>+12% vs last month</span>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden flex gap-0.5 mb-4">
                  {funds.map((f, i) => (
                    <motion.div key={i} initial={{ width: 0 }} animate={{ width: `${(f.amount / 38450) * 100}%` }}
                      transition={{ duration: 0.9, delay: 0.5 + i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                      className={`h-full rounded-full ${f.color}`} />
                  ))}
                </div>
                <div className="space-y-2.5">
                  {funds.map((f, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CircleDot className={`w-3 h-3 ${f.color.replace("bg-", "text-")}`} />
                        <span className="text-xs text-muted-foreground font-medium">{f.name}</span>
                      </div>
                      <span className="text-xs font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>${f.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Events */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.38 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div>
                  <h2 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Events</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Next 7 days</p>
                </div>
                <Link href="/events/calendar">
                  <button className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
                    style={{ fontFamily: "'Manrope', sans-serif" }}>Calendar <ArrowRight className="w-3.5 h-3.5" /></button>
                </Link>
              </div>
              <div className="px-4 py-3 space-y-2">
                {events.map((evt, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm ${evt.border}`}>
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${evt.dot}`}
                      style={{ boxShadow: `0 0 0 3px ${evt.dot.includes("blue") ? "rgba(59,130,246,0.15)" : "rgba(0,0,0,0.06)"}` }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground truncate" style={{ fontFamily: "'Manrope', sans-serif" }}>{evt.title}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[11px] text-muted-foreground">{evt.date} · {evt.time}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{evt.attendees}</p>
                      <p className="text-[10px] text-muted-foreground">ppl</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
