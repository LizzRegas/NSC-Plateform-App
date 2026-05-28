import { motion } from "framer-motion";
import { Plus, Music2, Mic, Volume2, Users, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { useDemoToast } from "@/hooks/useDemoToast";

const teams = [
  {
    name: "Worship Band",
    icon: Music2,
    color: "from-violet-500 to-violet-600",
    members: [
      { name: "Amara Diallo", role: "Worship Leader", avatar: "AD", color: "bg-teal-500", status: "Available" },
      { name: "Sophie Chen", role: "Keys / Piano", avatar: "SC", color: "bg-emerald-500", status: "Available" },
      { name: "Lucas Martin", role: "Guitar", avatar: "LM", color: "bg-cyan-500", status: "Available" },
      { name: "David Chen", role: "Bass Guitar", avatar: "DC", color: "bg-amber-500", status: "Unavailable" },
      { name: "Michael Roberts", role: "Drums", avatar: "MR", color: "bg-amber-500", status: "Available" },
    ],
  },
  {
    name: "Choir",
    icon: Mic,
    color: "from-blue-500 to-blue-600",
    members: [
      { name: "Marie Dubois", role: "Soprano Lead", avatar: "MD", color: "bg-blue-500", status: "Available" },
      { name: "Emily Wong", role: "Soprano", avatar: "EW", color: "bg-rose-500", status: "Available" },
      { name: "James Moreau", role: "Tenor Lead", avatar: "JM", color: "bg-violet-500", status: "Unavailable" },
      { name: "Sarah Jenkins", role: "Alto", avatar: "SJ", color: "bg-indigo-500", status: "Available" },
    ],
  },
  {
    name: "Sound & Media",
    icon: Volume2,
    color: "from-amber-500 to-amber-600",
    members: [
      { name: "Hugo Renard", role: "Sound Engineer", avatar: "HR", color: "bg-blue-500", status: "Available" },
      { name: "Nadia Kouassi", role: "Media / Slides", avatar: "NK", color: "bg-orange-500", status: "Available" },
      { name: "Sophie Chen", role: "Livestream", avatar: "SC", color: "bg-purple-500", status: "Available" },
    ],
  },
];

const statusColors: Record<string, string> = { Available: "badge badge-green", Unavailable: "badge badge-red" };

export default function WorshipTeams() {
  const { success } = useDemoToast();

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Worship Teams"
          subtitle="Manage worship teams and scheduling"
          section="Worship"
          action={
            <div className="flex gap-2">
              <Link href="/teams/worship" className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
                <ArrowUpRight className="w-4 h-4" /> Ministry Team
              </Link>
              <button
                type="button"
                onClick={() => success("Invitation sent", "Add members from the Worship ministry team page.")}
                className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
              >
                <Plus className="w-4 h-4" /> Add Member
              </button>
            </div>
          }
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {teams.map((team, ti) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.1 + ti * 0.1 }}
              className="card-lumina overflow-hidden"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
            >
              <div className="px-5 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${team.color} flex items-center justify-center`}
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                  >
                    <team.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {team.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{team.members.length} members</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {team.members.map((m, i) => (
                  <motion.div
                    key={`${m.name}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: 0.2 + ti * 0.1 + i * 0.05 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent/40 transition-colors cursor-pointer group"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 ${m.color}`}
                      style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}
                    >
                      {m.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        {m.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{m.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={statusColors[m.status]}>{m.status}</span>
                      <button type="button" className="icon-btn opacity-0 group-hover:opacity-100 transition-opacity">
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="px-4 pb-4">
                <Link href="/teams/worship" className="w-full btn-secondary flex items-center justify-center gap-2 py-2 rounded-xl text-xs">
                  <Users className="w-3.5 h-3.5" /> Schedule Team
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </PageCanvas>
    </PageTransition>
  );
}
