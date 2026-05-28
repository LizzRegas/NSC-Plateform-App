import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Plus, CalendarDays, MapPin, Users, ArrowRight, Filter } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { GlassSearchBar } from "@/components/shared/GlassSearchBar";
import { FilterChips } from "@/components/shared/FilterChips";
import {
  PEOPLE_TEAMS,
  TEAM_FILTER_OPTIONS,
  sortTeamsAlphabetically,
} from "@/features/people/data/people-teams";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass } from "@/components/shared/forms/FormField";
import { useDemoToast } from "@/hooks/useDemoToast";

export default function Teams() {
  const { success } = useDemoToast();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("All Teams");
  const [createOpen, setCreateOpen] = useState(false);
  const [teamName, setTeamName] = useState("");

  const displayed = useMemo(() => {
    let list = sortTeamsAlphabetically(PEOPLE_TEAMS);

    if (filter !== "All Teams") {
      list = list.filter((t) => t.category === filter);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.desc.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [search, filter]);

  return (
    <PageTransition>
      <PageCanvas className="pb-8">
        <PageHeader
          title="Teams"
          subtitle="Ministry and operations teams across your church — organized and ready to serve."
          section="People"
          action={
            <button
              type="button"
              className="btn-primary hidden md:flex items-center gap-2 px-6 py-3 rounded-2xl text-sm"
              onClick={() => setCreateOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Create Team
            </button>
          }
        />

        <GlassSearchBar
          placeholder="Search teams by name, category, or location..."
          value={search}
          onChange={setSearch}
        >
          <div className="flex gap-2 overflow-x-auto scrollbar-hide md:pb-0 pb-1">
            <FilterChips
              options={[...TEAM_FILTER_OPTIONS]}
              value={filter}
              onChange={setFilter}
            />
            <button type="button" className="filter-chip flex items-center gap-1 shrink-0">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </GlassSearchBar>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayed.map((team, i) => (
            <Link key={team.slug} href={`/teams/${team.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="card-lumina overflow-hidden flex flex-col cursor-pointer group hover:-translate-y-0.5 transition-all duration-300 h-full"
              >
                <div className="relative overflow-hidden h-40">
                  <img
                    src={team.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span
                    className={`inline-block w-fit px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest mb-2 ${team.categoryClass}`}
                  >
                    {team.category}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-2">{team.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{team.desc}</p>
                  <div className="grid grid-cols-1 gap-3 mb-6 text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <CalendarDays className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">{team.schedule}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">{team.location}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-[#e0e3e5] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-label text-xs">{team.members} Members</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#eceef0] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {displayed.length === 0 && (
          <p className="text-center text-muted-foreground py-12 text-sm">No teams match your search.</p>
        )}

        <button
          type="button"
          className="fixed bottom-6 right-5 md:hidden w-14 h-14 rounded-2xl btn-primary flex items-center justify-center shadow-lg z-30"
          aria-label="Create team"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="w-7 h-7" />
        </button>

        <FormDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          title="Create team"
          description="Teams are configured in demo mode — submit to preview the flow."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2.5 rounded-xl text-sm" onClick={() => setCreateOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary px-4 py-2.5 rounded-xl text-sm"
                onClick={() => {
                  if (!teamName.trim()) return;
                  success("Team created", `${teamName.trim()} will appear after admin review (demo).`);
                  setCreateOpen(false);
                  setTeamName("");
                }}
              >
                Create team
              </button>
            </>
          }
        >
          <FormField label="Team name" htmlFor="team-name">
            <input
              id="team-name"
              className={inputClass}
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. Sunday Welcome Team"
            />
          </FormField>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
