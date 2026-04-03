import { motion } from "framer-motion";
import { Plus, Users, MapPin, ChevronRight } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { UsersRound, UserCheck, CalendarDays, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Groups", value: "34", change: "+3", trend: "up" as const, icon: UsersRound, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
  { label: "Members in Groups", value: "892", change: "+45", trend: "up" as const, icon: UserCheck, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
  { label: "Meetings This Week", value: "12", change: "+2", trend: "up" as const, icon: CalendarDays, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.15 },
  { label: "New Groups", value: "3", change: "+1", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
];

const groups = [
  { name: "Women in Faith", category: "Ministry", leader: "Sophie Chen", members: 24, meets: "Tuesdays 7pm", location: "Room A", color: "from-rose-500 to-pink-500", icon: "W" },
  { name: "Men's Brotherhood", category: "Ministry", leader: "James Moreau", members: 18, meets: "Saturdays 9am", location: "Main Hall", color: "from-blue-500 to-blue-600", icon: "M" },
  { name: "Youth Connect", category: "Youth", leader: "David Okafor", members: 35, meets: "Fridays 6pm", location: "Youth Room", color: "from-violet-500 to-purple-500", icon: "Y" },
  { name: "Worship Team", category: "Service", leader: "Amara Diallo", members: 14, meets: "Saturdays 10am", location: "Sanctuary", color: "from-amber-500 to-orange-500", icon: "WT" },
  { name: "Prayer Warriors", category: "Prayer", leader: "Isabelle Roy", members: 22, meets: "Wednesdays 6pm", location: "Chapel", color: "from-teal-500 to-emerald-500", icon: "P" },
  { name: "Children's Ministry", category: "Children", leader: "Thomas Blanc", members: 12, meets: "Sundays 9am", location: "Kids Room", color: "from-emerald-500 to-green-500", icon: "C" },
  { name: "Senior Fellowship", category: "Fellowship", leader: "Marie Dubois", members: 28, meets: "Thursdays 2pm", location: "Fellowship Hall", color: "from-indigo-500 to-blue-500", icon: "SF" },
  { name: "Community Outreach", category: "Outreach", leader: "Lucas Martin", members: 16, meets: "Monthly", location: "Various", color: "from-orange-500 to-red-500", icon: "CO" },
];

const categoryColors: Record<string, string> = {
  Ministry: "badge badge-blue", Youth: "badge badge-violet", Service: "badge badge-amber",
  Prayer: "badge badge-green", Children: "badge badge-green", Fellowship: "badge badge-gray",
  Outreach: "badge badge-red",
};

export default function Groups() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Groups" subtitle="Ministry groups and small communities" section="People"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> Create Group
            </button>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {groups.map((g, i) => (
            <motion.div key={g.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.24 + i * 0.05 }}
              className="card-premium group cursor-pointer overflow-hidden">
              <div className={`h-2 w-full bg-gradient-to-r ${g.color}`} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center text-white text-sm font-bold`}
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                    {g.icon}
                  </div>
                  <span className={categoryColors[g.category]}>{g.category}</span>
                </div>
                <h3 className="text-base font-bold text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{g.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">Led by {g.leader}</p>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" />
                    <span style={{ fontFamily: "'Manrope', sans-serif" }}><span className="font-bold text-foreground">{g.members}</span> members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{g.meets}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{g.location}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <button className="text-xs font-semibold text-primary hover:underline" style={{ fontFamily: "'Manrope', sans-serif" }}>View Members</button>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
