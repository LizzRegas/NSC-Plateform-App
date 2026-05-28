import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  Users,
  Heart,
  CalendarDays,
  UsersRound,
  TrendingUp,
  ArrowRight,
  MoreHorizontal,
  Clock,
  UserPlus,
  Bell,
  CreditCard,
  CircleDot,
  ChevronDown,
} from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { ActivityFeedItem } from "@/features/dashboard/components/ActivityFeedItem";
import { ACTIVITY_ITEMS, ACTIVITY_PREVIEW_COUNT } from "@/features/dashboard/data/activity-data";
import { useDemoState } from "@/lib/demo-store";

const activityPreview = ACTIVITY_ITEMS.slice(0, ACTIVITY_PREVIEW_COUNT);

const events = [
  { title: "Sunday Service", date: "Sun, Apr 6", time: "9:30 AM", attendees: 320, dot: "bg-blue-500", border: "border-blue-200/80 bg-blue-50/30", status: "confirmed" },
  { title: "Youth Night", date: "Fri, Apr 4", time: "7:00 PM", attendees: 48, dot: "bg-violet-500", border: "border-violet-200/80 bg-violet-50/30", status: "confirmed" },
  { title: "Prayer Meeting", date: "Wed, Apr 9", time: "6:00 PM", attendees: 22, dot: "bg-amber-500", border: "border-amber-200/80 bg-amber-50/30", status: "draft" },
  { title: "Worship Practice", date: "Sat, Apr 5", time: "10:00 AM", attendees: 14, dot: "bg-emerald-500", border: "border-emerald-200/80 bg-emerald-50/30", status: "confirmed" },
];

const funds = [
  { name: "General Tithe", amount: 24200, color: "bg-[#5932ea]" },
  { name: "Missions Fund", amount: 9100, color: "bg-[#00677d]" },
  { name: "Building Campaign", amount: 5150, color: "bg-[#7c6cf0]" },
];

const quickActions = [
  { icon: UserPlus, label: "Add Member", href: "/members", color: "text-[#5932ea] bg-[#f2efff] hover:bg-[#e5deff] border-[#e9e3fa]" },
  { icon: CreditCard, label: "Record Giving", href: "/giving/contributions", color: "text-[#00677d] bg-[#d4f0f7]/60 hover:bg-[#d4f0f7] border-[#b8e4ef]" },
  { icon: CalendarDays, label: "Create Event", href: "/events/calendar", color: "text-[#5932ea] bg-[#ede9fe] hover:bg-[#e5deff] border-[#e9e3fa]" },
  { icon: Bell, label: "Send Message", href: "/comms/email", color: "text-[#484556] bg-[#f2f4f6] hover:bg-[#eceef0] border-[#c9c4d9]/40" },
];

/** Relative bar heights (%) */
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const MONTH_HEIGHTS = [28, 36, 44, 32, 24, 32, 36, 52, 44, 36, 28, 40];
/** Share of peak month shown in tooltip on hover / focus */
const MONTH_SHARE_PCT = [22, 28, 35, 26, 19, 26, 31, 42, 35, 28, 22, 31];

export default function Dashboard() {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const [periodOpen, setPeriodOpen] = useState(false);

  const members = useDemoState((s) => s.members);
  const groups = useDemoState((s) => s.groups);
  const calendarEvents = useDemoState((s) => s.calendarEvents);
  const contributions = useDemoState((s) => s.contributions);

  const stats = useMemo(() => {
    const activeMembers = members.filter((m) => m.status === "Active").length;
    const pendingMembers = members.filter((m) => m.status === "Pending").length;
    const now = new Date();
    const weekAhead = new Date(now);
    weekAhead.setDate(weekAhead.getDate() + 7);
    const upcomingEvents = calendarEvents.filter((e) => {
      const d = new Date(e.date);
      return d >= now && d <= weekAhead;
    }).length;
    const activeGroups = groups.filter((g) => g.active !== false).length;
    const givingTotal = contributions.reduce((sum, c) => sum + c.amount, 0);

    return [
      {
        label: "Total Members",
        value: activeMembers.toLocaleString(),
        change: pendingMembers > 0 ? `+${pendingMembers}` : "+0",
        trend: "up" as const,
        icon: Users,
        iconCircleClass: "bg-[#e5deff]",
        iconColorClass: "text-[#5932ea]",
        sub: "active in roster",
      },
      {
        label: "Giving This Month",
        value: `$${givingTotal.toLocaleString()}`,
        change: "+12%",
        trend: "up" as const,
        icon: Heart,
        iconCircleClass: "bg-[#d4f0f7]",
        iconColorClass: "text-[#00677d]",
        sub: "from contributions",
      },
      {
        label: "Upcoming Events",
        value: String(upcomingEvents),
        change: upcomingEvents > 0 ? `+${upcomingEvents}` : "0",
        trend: "up" as const,
        icon: CalendarDays,
        iconCircleClass: "bg-[#ede9fe]",
        iconColorClass: "text-[#5932ea]",
        sub: "next 7 days",
      },
      {
        label: "Active Groups",
        value: String(activeGroups),
        change: String(groups.length - activeGroups),
        trend: activeGroups >= groups.length ? ("up" as const) : ("down" as const),
        icon: UsersRound,
        iconCircleClass: "bg-[#f2f4f6]",
        iconColorClass: "text-[#484556]",
        sub: "ministry groups",
      },
    ];
  }, [members, groups, calendarEvents, contributions]);

  return (
    <PageTransition>
      <PageCanvas>

        <PageHeader
          title="Hello, Pastor 👋"
          subtitle={today}
          action={
            <div className="flex flex-wrap gap-2">
              {quickActions.map((a) => (
                <Link key={a.label} href={a.href}>
                  <button
                    type="button"
                    className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-label border transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] touch-manipulation ${a.color}`}
                  >
                    <a.icon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                    <span className="hidden sm:block">{a.label}</span>
                  </button>
                </Link>
              ))}
            </div>
          }
        />

        <KpiGrid stats={stats} unified />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="xl:col-span-2 card-lumina card-lumina-hover overflow-hidden"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between px-5 pt-5 sm:px-6 sm:pt-6">
              <div>
                <h2 className="text-xl font-bold text-foreground tracking-tight">Overview</h2>
                <p className="text-sm text-muted-foreground mt-1">Monthly giving</p>
              </div>
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setPeriodOpen(!periodOpen)}
                  className="flex items-center gap-2 rounded-[10px] border border-zinc-200 bg-slate-50 px-3 py-2 text-xs text-zinc-500 min-w-[7.5rem] justify-between transition-all duration-200 hover:border-[#5932EA]/35 hover:bg-white hover:text-zinc-700 hover:shadow-sm active:scale-[0.98] touch-manipulation"
                >
                  Quarterly
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${periodOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
            <div className="px-2 pb-6 pt-4 sm:px-6 sm:pb-8">
              <div className="flex items-end justify-between gap-0.5 sm:gap-2 min-h-[200px] sm:min-h-[220px] pt-8 sm:pt-10">
                {MONTH_LABELS.map((m, i) => {
                  const h = MONTH_HEIGHTS[i] ?? 30;
                  const pct = MONTH_SHARE_PCT[i] ?? 35;
                  return (
                    <button
                      key={m}
                      type="button"
                      className="group/bar flex flex-1 min-w-0 max-w-full flex-col items-center gap-2 rounded-xl px-0.5 py-1 sm:px-1 -mx-0.5 border-0 bg-transparent cursor-pointer touch-manipulation outline-none transition-colors duration-200 hover:bg-violet-50/60 focus-visible:bg-violet-50/60 focus-visible:ring-2 focus-visible:ring-[#5932EA]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      aria-label={`${m}: ${pct}% of annual peak`}
                    >
                      <div className="relative flex h-[140px] w-full sm:h-[168px] items-end justify-center">
                        <div
                          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 flex -translate-x-1/2 translate-y-1 items-center gap-1 whitespace-nowrap rounded-md bg-black px-2 py-1 text-white shadow-md opacity-0 transition-all duration-200 ease-out group-hover/bar:translate-y-0 group-hover/bar:opacity-100 group-focus-visible/bar:translate-y-0 group-focus-visible/bar:opacity-100"
                          aria-hidden
                        >
                          <span className="text-[11px] font-semibold sm:text-xs">{pct}%</span>
                          <TrendingUp className="w-3 h-3 text-[#00AC4F]" strokeWidth={2.5} />
                        </div>
                        <div
                          className="w-[70%] max-w-[1.75rem] sm:max-w-[2rem] rounded-lg bg-violet-50 transition-all duration-200 ease-out group-hover/bar:bg-[#5932EA] group-hover/bar:shadow-[0px_8px_12px_0px_rgba(135,145,233,0.35)] group-hover/bar:scale-y-[1.03] group-focus-visible/bar:bg-[#5932EA] group-focus-visible/bar:shadow-[0px_8px_12px_0px_rgba(135,145,233,0.35)] origin-bottom"
                          style={{ height: `${h}%`, minHeight: 10 }}
                        />
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-normal text-neutral-600 tabular-nums transition-all duration-200 group-hover/bar:font-bold group-hover/bar:text-[#5932EA] group-focus-visible/bar:font-bold group-focus-visible/bar:text-[#5932EA]">
                        {m}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="card-lumina card-lumina-hover px-5 py-5 sm:px-6 sm:py-6"
          >
            <h2 className="text-xl font-bold text-foreground tracking-tight">Visitors</h2>
            <p className="text-sm text-muted-foreground mt-1">First-time guests this quarter</p>
            <div className="mt-6 flex justify-center">
              <div className="group/donut relative h-52 w-52 sm:h-56 sm:w-56 shrink-0 cursor-default rounded-full p-1 transition-transform duration-300 ease-out hover:scale-[1.02] motion-reduce:hover:scale-100">
                <div
                  className="absolute inset-0 rounded-full shadow-[0px_10px_60px_0px_rgba(226,236,249,0.5)] transition-shadow duration-300 group-hover/donut:shadow-[0px_14px_48px_0px_rgba(89,50,234,0.18)]"
                  style={{
                    background: `conic-gradient(from -90deg, #5932EA 0deg ${65 * 3.6}deg, #EEF2FF ${65 * 3.6}deg 360deg)`,
                  }}
                />
                <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full bg-white text-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] px-3 transition-transform duration-300 group-hover/donut:scale-[1.02] motion-reduce:group-hover/donut:scale-100">
                  <span className="text-2xl font-metric text-foreground leading-none">65%</span>
                  <span className="mt-1 text-xs leading-snug text-muted-foreground">New first-time visitors</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="xl:col-span-2 card-lumina card-lumina-hover overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-zinc-100">
              <div>
                <h2 className="text-xl font-bold text-foreground tracking-tight">Recent Activity</h2>
                <p className="text-sm text-muted-foreground mt-0.5">What&apos;s happening in your church</p>
              </div>
              <Link href="/activity">
                <button
                  type="button"
                  className="group/va text-xs font-semibold text-[#5932EA] flex items-center gap-1 rounded-lg px-1.5 py-1 -mr-1 transition-all hover:gap-2 hover:bg-[#5932EA]/5 active:scale-[0.98] touch-manipulation"
                >
                  View all{" "}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/va:translate-x-0.5" />
                </button>
              </Link>
            </div>
            <div className="divide-y divide-zinc-100">
              {activityPreview.map((item, i) => (
                <ActivityFeedItem key={item.id} item={item} index={i} compact />
              ))}
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="card-lumina card-lumina-hover overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
                <div>
                  <h2 className="text-xl font-bold text-foreground tracking-tight">Giving</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">April 2026</p>
                </div>
                <button
                  type="button"
                  className="icon-btn rounded-xl transition-all duration-200 hover:scale-105 hover:bg-[#5932EA]/10 hover:text-[#5932EA] active:scale-95"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="px-5 py-4">
                <p className="font-metric text-3xl text-zinc-800 transition-colors duration-200">$38,450</p>
                <div className="flex items-center gap-1.5 mt-1 mb-4">
                  <span className="text-xs font-label text-[#137333] bg-[#e6f4ea] px-2 py-0.5 rounded-full">+12% vs last month</span>
                </div>
                <div className="h-2.5 w-full rounded-full overflow-hidden flex gap-0.5 mb-4 p-px bg-zinc-100/80">
                  {funds.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ width: 0 }}
                      animate={{ width: `${(f.amount / 38450) * 100}%` }}
                      transition={{ duration: 0.9, delay: 0.45 + i * 0.12, ease: [0.4, 0, 0.2, 1] }}
                      className={`group/seg relative h-full min-w-0 rounded-full ${f.color} transition-all duration-200 hover:brightness-110 hover:ring-2 hover:ring-white/90 hover:z-10 hover:shadow-sm cursor-default`}
                      title={f.name}
                    />
                  ))}
                </div>
                <div className="space-y-1">
                  {funds.map((f, i) => (
                    <div
                      key={i}
                      className="group/fund flex items-center justify-between text-xs rounded-lg px-2 py-2 -mx-2 transition-all duration-200 hover:bg-violet-50/70 hover:translate-x-0.5"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <CircleDot
                          className={`w-3 h-3 shrink-0 transition-transform duration-200 group-hover/fund:scale-125 ${f.color.replace("bg-", "text-")}`}
                        />
                        <span className="text-neutral-500 font-medium truncate group-hover/fund:text-zinc-700">{f.name}</span>
                      </div>
                      <span className="font-bold text-zinc-800 tabular-nums shrink-0">${f.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.34 }}
              className="card-lumina card-lumina-hover overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
                <div>
                  <h2 className="text-xl font-bold text-foreground tracking-tight">Events</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">Next 7 days</p>
                </div>
                <Link href="/events/calendar">
                  <button
                    type="button"
                    className="group/cal text-xs font-semibold text-[#5932EA] flex items-center gap-1 rounded-lg px-1.5 py-1 -mr-1 transition-all hover:gap-2 hover:bg-[#5932EA]/5 active:scale-[0.98] touch-manipulation"
                  >
                    Calendar{" "}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cal:translate-x-0.5" />
                  </button>
                </Link>
              </div>
              <div className="px-4 py-3 space-y-2">
                {events.map((evt, i) => (
                  <div
                    key={i}
                    className={`group/evt flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-200/90 active:translate-y-0 active:scale-[0.99] touch-manipulation ${evt.border}`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-200 group-hover/evt:scale-125 ${evt.dot}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-zinc-800 truncate">{evt.title}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        <span className="text-[11px] text-neutral-500">
                          {evt.date} · {evt.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-zinc-800">{evt.attendees}</p>
                      <p className="text-[10px] text-neutral-400">ppl</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </PageCanvas>
    </PageTransition>
  );
}
