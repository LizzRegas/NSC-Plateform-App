import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, CalendarDays, MapPin, Users, Mail, Tag } from "lucide-react";
import type { PeopleTeam } from "@/features/people/data/people-teams";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";

const roster = [
  { name: "Amara Diallo", role: "Team Lead", avatar: "AD", color: "bg-teal-500" },
  { name: "Sophie Chen", role: "Coordinator", avatar: "SC", color: "bg-emerald-500" },
  { name: "Lucas Martin", role: "Volunteer", avatar: "LM", color: "bg-cyan-500" },
  { name: "David Okafor", role: "Volunteer", avatar: "DO", color: "bg-amber-500" },
];

interface TeamDetailShellProps {
  team: PeopleTeam;
  children: React.ReactNode;
}

export function TeamDetailShell({ team, children }: TeamDetailShellProps) {
  const Icon = team.icon;

  return (
    <PageTransition>
      <PageCanvas className="pb-10">
        <Link
          href="/teams"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          All Teams
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden mb-8 min-h-[220px] md:min-h-[280px]"
          style={{ boxShadow: "0 24px 48px -12px rgba(89, 50, 234, 0.18)" }}
        >
          <img src={team.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
          <div className={`absolute inset-0 bg-gradient-to-br ${team.accent} opacity-30 mix-blend-soft-light`} />
          <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-widest mb-3">
                <Tag className="w-3 h-3" />
                {team.category}
              </span>
              <div className="flex items-center gap-4 mb-3">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${team.accent} flex items-center justify-center shrink-0`}
                  style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{team.name}</h1>
              </div>
              <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl">{team.desc}</p>
              <div className="flex flex-wrap gap-4 mt-5 text-white/90 text-sm">
                <span className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-white/70" />
                  {team.schedule}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white/70" />
                  {team.location}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-white/70" />
                  {team.members} members
                </span>
              </div>
            </div>
            <button type="button" className="btn-primary shrink-0 px-6 py-3 rounded-2xl text-sm self-start md:self-auto">
              Manage Roster
            </button>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.08 }}
          >
            <div className="mb-5">
              <p className="font-label text-xs text-primary uppercase tracking-widest mb-1">Team workspace</p>
              <h2 className="text-xl font-bold text-foreground">{team.featureTitle}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{team.featureSubtitle}</p>
            </div>
            {children}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.38, delay: 0.14 }}
            className="card-lumina overflow-hidden h-fit xl:sticky xl:top-24"
          >
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-bold text-foreground">Active roster</h3>
              <p className="text-xs text-muted-foreground">Quick contact & roles</p>
            </div>
            <div className="p-3 space-y-1">
              {roster.map((m, i) => (
                <div
                  key={m.name}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent/40 transition-colors group"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold ${m.color}`}
                  >
                    {m.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                  <button type="button" className="icon-btn opacity-0 group-hover:opacity-100 transition-opacity">
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </PageCanvas>
    </PageTransition>
  );
}
