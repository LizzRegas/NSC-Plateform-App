import { motion } from "framer-motion";
import {
  Users,
  Heart,
  CalendarDays,
  UsersRound,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  UserPlus,
  Bell,
  Music2,
  CreditCard,
  CircleDot,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] },
  }),
};

const stats = [
  {
    label: "Total Members",
    value: "1,284",
    change: "+24",
    up: true,
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    label: "Giving This Month",
    value: "$38,450",
    change: "+12%",
    up: true,
    icon: Heart,
    color: "bg-emerald-50 text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    label: "Upcoming Events",
    value: "7",
    change: "+2 this week",
    up: true,
    icon: CalendarDays,
    color: "bg-violet-50 text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    label: "Active Groups",
    value: "34",
    change: "-1",
    up: false,
    icon: UsersRound,
    color: "bg-amber-50 text-amber-600",
    iconBg: "bg-amber-100",
  },
];

const recentActivity = [
  {
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-50",
    title: "New member registered",
    desc: "Marie Dubois joined the congregation",
    time: "2 min ago",
  },
  {
    icon: CreditCard,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    title: "Contribution received",
    desc: "$250 — General Tithe from J. Moreau",
    time: "15 min ago",
  },
  {
    icon: Bell,
    color: "text-violet-500",
    bg: "bg-violet-50",
    title: "Event published",
    desc: "Youth Night — Friday 7pm registered 28 attendees",
    time: "1 hr ago",
  },
  {
    icon: Music2,
    color: "text-amber-500",
    bg: "bg-amber-50",
    title: "Service plan updated",
    desc: "Sunday Morning — Worship set finalized",
    time: "2 hr ago",
  },
  {
    icon: CheckCircle2,
    color: "text-teal-500",
    bg: "bg-teal-50",
    title: "Follow-up completed",
    desc: "David Chen marked follow-up with 3 new visitors",
    time: "3 hr ago",
  },
  {
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-50",
    title: "Group created",
    desc: "\"Women in Faith\" group launched with 12 members",
    time: "Yesterday",
  },
];

const upcomingEvents = [
  {
    title: "Sunday Service",
    date: "Sun, Apr 6",
    time: "9:30 AM",
    attendees: 320,
    status: "confirmed",
    color: "border-blue-200 bg-blue-50/50",
    dot: "bg-blue-500",
  },
  {
    title: "Youth Night",
    date: "Fri, Apr 4",
    time: "7:00 PM",
    attendees: 48,
    status: "confirmed",
    color: "border-violet-200 bg-violet-50/50",
    dot: "bg-violet-500",
  },
  {
    title: "Prayer Meeting",
    date: "Wed, Apr 9",
    time: "6:00 PM",
    attendees: 22,
    status: "draft",
    color: "border-amber-200 bg-amber-50/50",
    dot: "bg-amber-500",
  },
  {
    title: "Worship Team Practice",
    date: "Sat, Apr 5",
    time: "10:00 AM",
    attendees: 14,
    status: "confirmed",
    color: "border-emerald-200 bg-emerald-50/50",
    dot: "bg-emerald-500",
  },
];

const givingFunds = [
  { name: "General Tithe", amount: 24200, total: 38450, color: "bg-blue-500" },
  { name: "Missions Fund", amount: 9100, total: 38450, color: "bg-violet-500" },
  { name: "Building Campaign", amount: 5150, total: 38450, color: "bg-emerald-500" },
];

const quickActions = [
  { icon: UserPlus, label: "Add Member", color: "text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-100" },
  { icon: CreditCard, label: "Record Giving", color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-100" },
  { icon: CalendarDays, label: "Create Event", color: "text-violet-600 bg-violet-50 hover:bg-violet-100 border-violet-100" },
  { icon: Bell, label: "Send Message", color: "text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-100" },
];

export default function Dashboard() {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto">

      {/* Header */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Good morning, Pastor
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{today}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {quickActions.map((a) => (
            <button
              key={a.label}
              className={`hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border transition-all duration-150 ${a.color}`}
            >
              <a.icon className="w-4 h-4" />
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-card rounded-2xl border border-card-border p-5 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color.split(" ")[1]}`} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${stat.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                  {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Activity */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="xl:col-span-2">
          <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Recent Activity
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">What's happening in your church</p>
              </div>
              <button className="text-xs text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="divide-y divide-border/60">
              {recentActivity.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i + 6}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex items-start gap-4 px-6 py-4 hover:bg-accent/40 transition-colors"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${item.bg}`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-snug">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.desc}</p>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0 mt-0.5">{item.time}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="space-y-6">

          {/* Giving Overview */}
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
            <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div>
                  <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Giving Overview
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">April 2026</p>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="px-6 py-5">
                <div className="mb-6">
                  <p className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    $38,450
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-600">+12% vs last month</span>
                  </div>
                </div>

                {/* Stacked bar */}
                <div className="h-3 w-full rounded-full overflow-hidden flex gap-0.5 mb-5">
                  {givingFunds.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ width: 0 }}
                      animate={{ width: `${(f.amount / f.total) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                      className={`h-full rounded-full ${f.color}`}
                    />
                  ))}
                </div>

                <div className="space-y-3">
                  {givingFunds.map((f, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <CircleDot className={`w-3 h-3 ${f.color.replace("bg-", "text-")}`} />
                        <span className="text-foreground/70 font-medium">{f.name}</span>
                      </div>
                      <span className="font-semibold text-foreground">
                        ${f.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible">
            <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div>
                  <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Upcoming Events
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Next 7 days</p>
                </div>
                <button className="text-xs text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Calendar <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="px-4 py-3 space-y-2">
                {upcomingEvents.map((evt, i) => (
                  <motion.div
                    key={i}
                    custom={i + 8}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150 hover:shadow-sm ${evt.color}`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${evt.dot}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{evt.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{evt.date} · {evt.time}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground">{evt.attendees}</p>
                      <p className="text-[10px] text-muted-foreground">attendees</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions mobile */}
      <motion.div custom={12} variants={fadeUp} initial="hidden" animate="visible" className="lg:hidden">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((a) => (
            <button
              key={a.label}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium border transition-all duration-150 ${a.color}`}
            >
              <a.icon className="w-5 h-5" />
              {a.label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
