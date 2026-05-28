import { useMemo } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, MapPin, Users } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { useDemoState } from "@/lib/demo-store";
import { roleStyles, statusStyles } from "@/features/people/components/MemberDetailPanel";
import NotFound from "@/features/common/NotFound";

export default function GroupDetail() {
  const [, params] = useRoute("/groups/:slug");
  const groups = useDemoState((s) => s.groups);
  const members = useDemoState((s) => s.members);

  const group = useMemo(
    () => groups.find((g) => g.slug === params?.slug),
    [groups, params?.slug],
  );

  const groupMembers = useMemo(() => {
    if (!group) return [];
    return group.memberIds
      .map((id) => members.find((m) => m.id === id))
      .filter((m): m is NonNullable<typeof m> => Boolean(m));
  }, [group, members]);

  if (!params?.slug) return <NotFound />;
  if (!group) return <NotFound />;

  return (
    <PageTransition>
      <PageCanvas className="pb-10">
        <div className="mb-6">
          <Link href="/groups">
            <span className="inline-flex items-center gap-2 text-sm font-label font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Groups
            </span>
          </Link>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-lumina overflow-hidden mb-8"
        >
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img src={group.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span
                className={`inline-block px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest mb-2 ${group.categoryClass}`}
              >
                {group.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold">{group.name}</h1>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{group.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-start gap-2 text-sm">
                <CalendarDays className="w-5 h-5 text-[#5932EA] shrink-0 mt-0.5" />
                <div>
                  <p className="font-label text-xs text-muted-foreground">Schedule</p>
                  <p className="font-medium text-foreground">
                    {group.schedule}
                    {group.time ? ` · ${group.time}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-5 h-5 text-[#5932EA] shrink-0 mt-0.5" />
                <div>
                  <p className="font-label text-xs text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">{group.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Users className="w-5 h-5 text-[#5932EA] shrink-0 mt-0.5" />
                <div>
                  <p className="font-label text-xs text-muted-foreground">Roster</p>
                  <p className="font-medium text-foreground">
                    {groupMembers.length} linked · {group.members} total
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Members in this group</h2>
          {groupMembers.length === 0 ? (
            <div className="card-lumina p-10 text-center text-sm text-muted-foreground">
              No linked members yet. Add people from the member roster.
            </div>
          ) : (
            <div className="card-lumina overflow-hidden divide-y divide-[#e0e3e5]/50">
              {groupMembers.map((m) => (
                <Link key={m.id} href={`/members/${m.id}`}>
                  <div className="flex items-center gap-4 px-5 py-4 hover:bg-[#f7f9fb]/90 transition-colors cursor-pointer">
                    {m.avatar ? (
                      <img src={m.avatar} alt="" className="w-11 h-11 rounded-2xl object-cover" />
                    ) : (
                      <div className="w-11 h-11 rounded-2xl bg-[#e5deff] text-primary flex items-center justify-center font-label font-bold text-xs">
                        {m.initials}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                    </div>
                    <span className={`font-label text-[10px] px-2 py-0.5 rounded-lg ${roleStyles[m.role]}`}>
                      {m.role}
                    </span>
                    <span className={`font-label text-xs flex items-center gap-1 ${statusStyles[m.status].text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[m.status].dot}`} />
                      {m.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </PageCanvas>
    </PageTransition>
  );
}
