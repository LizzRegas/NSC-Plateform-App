import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, Filter, MoreHorizontal, Mail, Phone, ChevronRight } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { Users, UserCheck, UserX, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Members", value: "1,284", change: "+24", trend: "up" as const, icon: Users, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
  { label: "Active", value: "1,198", change: "93%", trend: "up" as const, icon: UserCheck, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
  { label: "Inactive", value: "86", change: "6.7%", trend: "down" as const, icon: UserX, iconGradient: "bg-gradient-to-br from-rose-500 to-rose-600", delay: 0.15 },
  { label: "New This Month", value: "24", change: "+8", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.2 },
];

const members = [
  { id: 1, name: "Marie Dubois", email: "marie.d@email.com", phone: "+1 555 0101", role: "Member", status: "Active", group: "Women's Ministry", joined: "Jan 2023", avatar: "MD" },
  { id: 2, name: "James Moreau", email: "j.moreau@email.com", phone: "+1 555 0102", role: "Elder", status: "Active", group: "Leadership", joined: "Mar 2019", avatar: "JM" },
  { id: 3, name: "Sophie Chen", email: "s.chen@email.com", phone: "+1 555 0103", role: "Volunteer", status: "Active", group: "Worship Team", joined: "Aug 2021", avatar: "SC" },
  { id: 4, name: "David Okafor", email: "d.okafor@email.com", phone: "+1 555 0104", role: "Deacon", status: "Active", group: "Youth Ministry", joined: "Feb 2020", avatar: "DO" },
  { id: 5, name: "Isabelle Roy", email: "i.roy@email.com", phone: "+1 555 0105", role: "Member", status: "Inactive", group: "Small Groups", joined: "Nov 2022", avatar: "IR" },
  { id: 6, name: "Thomas Blanc", email: "t.blanc@email.com", phone: "+1 555 0106", role: "Member", status: "Active", group: "Men's Ministry", joined: "May 2021", avatar: "TB" },
  { id: 7, name: "Amara Diallo", email: "a.diallo@email.com", phone: "+1 555 0107", role: "Volunteer", status: "Active", group: "Children's Ministry", joined: "Sep 2022", avatar: "AD" },
  { id: 8, name: "Lucas Martin", email: "l.martin@email.com", phone: "+1 555 0108", role: "Member", status: "Active", group: "Prayer Team", joined: "Jan 2024", avatar: "LM" },
];

const roleColors: Record<string, string> = {
  Member: "badge badge-gray", Elder: "badge badge-blue", Deacon: "badge badge-violet",
  Volunteer: "badge badge-green",
};
const statusColors: Record<string, string> = {
  Active: "badge badge-green", Inactive: "badge badge-amber",
};

const avatarColors = ["bg-blue-500","bg-violet-500","bg-emerald-500","bg-amber-500","bg-rose-500","bg-teal-500","bg-indigo-500","bg-orange-500"];

export default function Members() {
  const [search, setSearch] = useState("");
  const filtered = members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Members" subtitle="Manage your congregation profiles and records" section="People"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <UserPlus className="w-4 h-4" /> Add Member
            </button>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 sm:px-6 py-4 border-b border-border">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button className="btn-secondary flex items-center gap-2 px-3 py-2 rounded-xl text-sm">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{filtered.length} members</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-muted/30 border-b border-border/60">
                  {["Member", "Role", "Group", "Status", "Joined", ""].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 sm:px-6 py-3"
                      style={{ fontFamily: "'Manrope', sans-serif" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filtered.map((m, i) => (
                  <motion.tr key={m.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="tr-hover group">
                    <td className="px-5 sm:px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 ${avatarColors[i % avatarColors.length]}`}
                          style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}>
                          {m.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{m.name}</p>
                          <p className="text-xs text-muted-foreground">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 sm:px-6 py-3.5"><span className={roleColors[m.role]}>{m.role}</span></td>
                    <td className="px-5 sm:px-6 py-3.5 text-sm text-muted-foreground">{m.group}</td>
                    <td className="px-5 sm:px-6 py-3.5"><span className={statusColors[m.status]}>{m.status}</span></td>
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{m.joined}</td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="icon-btn"><Mail className="w-3.5 h-3.5" /></button>
                        <button className="icon-btn"><Phone className="w-3.5 h-3.5" /></button>
                        <button className="icon-btn"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
