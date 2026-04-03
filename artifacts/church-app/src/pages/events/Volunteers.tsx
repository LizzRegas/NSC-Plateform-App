import { motion } from "framer-motion";
import { Plus, Users, CheckCircle2, Clock, CalendarDays, Mail } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Volunteers", value: "148", change: "+12", trend: "up" as const, icon: Users, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
  { label: "Confirmed This Week", value: "64", change: "+8", trend: "up" as const, icon: CheckCircle2, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
  { label: "Pending Confirmation", value: "12", change: "-3", trend: "up" as const, icon: Clock, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.15 },
  { label: "Avg Hours/Month", value: "8.4", change: "+1.2", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.2 },
];

const schedule = [
  {
    role: "Welcome Team", icon: "W", color: "bg-blue-500",
    slots: [
      { name: "Marie Dubois", event: "Sunday Service 9:30am", date: "Apr 6", status: "Confirmed" },
      { name: "Lucas Martin", event: "Sunday Service 9:30am", date: "Apr 6", status: "Confirmed" },
      { name: "Isabelle Roy", event: "Sunday Service 11am", date: "Apr 6", status: "Pending" },
    ],
  },
  {
    role: "Children's Ministry", icon: "C", color: "bg-emerald-500",
    slots: [
      { name: "Thomas Blanc", event: "Sunday Service 9:30am", date: "Apr 6", status: "Confirmed" },
      { name: "Amara Diallo", event: "Sunday Service 11am", date: "Apr 6", status: "Confirmed" },
      { name: "Sophie Chen", event: "Youth Night", date: "Apr 10", status: "Pending" },
    ],
  },
  {
    role: "Parking & Safety", icon: "P", color: "bg-amber-500",
    slots: [
      { name: "David Okafor", event: "Sunday Service 9:30am", date: "Apr 6", status: "Confirmed" },
      { name: "François Bernard", event: "Sunday Service 11am", date: "Apr 6", status: "Unconfirmed" },
    ],
  },
];

const statusColors: Record<string, string> = { Confirmed: "badge badge-green", Pending: "badge badge-amber", Unconfirmed: "badge badge-red" };

export default function Volunteers() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Volunteers" subtitle="Volunteer scheduling and role assignments" section="Events"
          action={
            <div className="flex gap-2">
              <button className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Mail className="w-4 h-4" /> Notify All</button>
              <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Plus className="w-4 h-4" /> Add Volunteer</button>
            </div>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {schedule.map((team, ti) => (
            <motion.div key={team.role} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.25 + ti * 0.08 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <div className={`w-9 h-9 rounded-xl ${team.color} flex items-center justify-center text-white text-sm font-bold`}
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>{team.icon}</div>
                <div>
                  <h3 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>{team.role}</h3>
                  <p className="text-xs text-muted-foreground">{team.slots.length} slots</p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {team.slots.map((slot, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: 0.3 + ti * 0.1 + i * 0.06 }}
                    className="bg-background border border-border/60 rounded-xl p-3.5 hover:border-primary/20 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{slot.name}</p>
                      <span className={statusColors[slot.status]}>{slot.status}</span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5"><CalendarDays className="w-3 h-3" />{slot.date}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{slot.event}</div>
                    </div>
                  </motion.div>
                ))}
                <button className="w-full btn-secondary flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs mt-1">
                  <Plus className="w-3 h-3" /> Add Slot
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
