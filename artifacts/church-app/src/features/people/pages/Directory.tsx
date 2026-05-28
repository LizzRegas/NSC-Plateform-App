import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoState } from "@/lib/demo-store";
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Download,
  LayoutGrid,
  List,
  BookUser,
  Users,
  HeartHandshake,
  RefreshCw,
  MessageCircle,
  ExternalLink,
  Printer,
} from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { GlassSearchBar } from "@/components/shared/GlassSearchBar";
import { FilterChips } from "@/components/shared/FilterChips";

type DirectoryRole = "Leadership" | "Volunteer" | "Member";

interface DirectoryEntry {
  name: string;
  phone: string;
  email: string;
  address: string;
  letter: string;
  avatar: string;
  color: string;
  role: DirectoryRole;
  ministry?: string;
  household?: string;
  featured?: boolean;
  memberId?: string;
}

const BASE_DIRECTORY: DirectoryEntry[] = [
  { name: "Marie Dubois", phone: "+1 555 0101", email: "marie.d@email.com", address: "5 Walnut St", letter: "M", avatar: "MD", color: "from-violet-500 to-[#5932EA]", role: "Leadership", ministry: "Pastoral Care", household: "Dubois", featured: true },
  { name: "James Moreau", phone: "+1 555 0102", email: "j.moreau@email.com", address: "89 Poplar Ave", letter: "J", avatar: "JM", color: "from-indigo-500 to-violet-600", role: "Leadership", ministry: "Elders Board", household: "Moreau", featured: true },
  { name: "Sophie Chen", phone: "+1 555 0103", email: "s.chen@email.com", address: "108 Magnolia Dr", letter: "S", avatar: "SC", color: "from-emerald-500 to-teal-600", role: "Volunteer", ministry: "Worship Team", household: "Chen" },
  { name: "David Okafor", phone: "+1 555 0104", email: "d.okafor@email.com", address: "33 Maple Dr", letter: "D", avatar: "DO", color: "from-amber-500 to-orange-500", role: "Volunteer", ministry: "Youth", household: "Okafor" },
  { name: "Isabelle Roy", phone: "+1 555 0105", email: "i.roy@email.com", address: "67 Aspen Ct", letter: "I", avatar: "IR", color: "from-rose-500 to-pink-600", role: "Member", household: "Roy" },
  { name: "Thomas Blanc", phone: "+1 555 0106", email: "t.blanc@email.com", address: "71 Sycamore Rd", letter: "T", avatar: "TB", color: "from-amber-400 to-amber-600", role: "Member", household: "Blanc" },
  { name: "Amara Diallo", phone: "+1 555 0107", email: "a.diallo@email.com", address: "12 Oak St", letter: "A", avatar: "AD", color: "from-teal-500 to-cyan-600", role: "Volunteer", ministry: "Hospitality", household: "Diallo", featured: true },
  { name: "Lucas Martin", phone: "+1 555 0108", email: "l.martin@email.com", address: "32 Cherry Ln", letter: "L", avatar: "LM", color: "from-cyan-500 to-blue-500", role: "Member", household: "Martin" },
  { name: "Baptiste Lemaire", phone: "+1 555 0201", email: "b.lemaire@email.com", address: "45 Elm Ave", letter: "B", avatar: "BL", color: "from-indigo-400 to-indigo-600", role: "Member", household: "Lemaire" },
  { name: "Caroline Petit", phone: "+1 555 0202", email: "c.petit@email.com", address: "78 Pine Rd", letter: "C", avatar: "CP", color: "from-pink-500 to-rose-500", role: "Volunteer", ministry: "Children", household: "Petit" },
  { name: "Emma Fontaine", phone: "+1 555 0301", email: "e.fontaine@email.com", address: "90 Cedar Ln", letter: "E", avatar: "EF", color: "from-emerald-400 to-green-600", role: "Member", household: "Fontaine" },
  { name: "François Bernard", phone: "+1 555 0302", email: "f.bernard@email.com", address: "21 Birch Blvd", letter: "F", avatar: "FB", color: "from-orange-500 to-amber-600", role: "Member", household: "Bernard" },
  { name: "Grace Kim", phone: "+1 555 0401", email: "g.kim@email.com", address: "56 Willow Way", letter: "G", avatar: "GK", color: "from-purple-500 to-violet-600", role: "Volunteer", ministry: "Outreach", household: "Kim" },
  { name: "Hugo Renard", phone: "+1 555 0402", email: "h.renard@email.com", address: "14 Spruce St", letter: "H", avatar: "HR", color: "from-blue-500 to-indigo-500", role: "Member", household: "Renard" },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const roleFilterOptions = ["Leadership", "Volunteers", "Members"] as const;
type RoleFilterOption = (typeof roleFilterOptions)[number];

const roleFilterToRole: Record<RoleFilterOption, DirectoryRole> = {
  Leadership: "Leadership",
  Volunteers: "Volunteer",
  Members: "Member",
};

type ViewMode = "cards" | "list";

const roleBadge: Record<DirectoryRole, string> = {
  Leadership: "bg-[#e5deff] text-[#4100cf]",
  Volunteer: "bg-[#ffdbcd] text-[#6b2d00]",
  Member: "bg-[#eceef0] text-[#484556]",
};

function DirectoryName({ entry, className = "font-bold text-foreground text-sm truncate" }: { entry: DirectoryEntry; className?: string }) {
  if (entry.memberId) {
    return (
      <Link href={`/members/${entry.memberId}`}>
        <span className={`${className} hover:text-primary transition-colors cursor-pointer block`}>{entry.name}</span>
      </Link>
    );
  }
  return <p className={className}>{entry.name}</p>;
}

function ContactActions({ entry }: { entry: DirectoryEntry }) {
  return (
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
      <a
        href={`tel:${entry.phone.replace(/\s/g, "")}`}
        className="topbar-icon-btn !w-8 !h-8 text-[#5932EA]"
        aria-label={`Call ${entry.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Phone className="w-3.5 h-3.5" />
      </a>
      <a
        href={`mailto:${entry.email}`}
        className="topbar-icon-btn !w-8 !h-8 text-[#5932EA]"
        aria-label={`Email ${entry.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Mail className="w-3.5 h-3.5" />
      </a>
      <button
        type="button"
        className="topbar-icon-btn !w-8 !h-8 text-[#5932EA]"
        aria-label={`Message ${entry.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <MessageCircle className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function AvatarBadge({ entry, size = "md" }: { entry: DirectoryEntry; size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "w-14 h-14 text-sm" : size === "sm" ? "w-9 h-9 text-[10px]" : "w-11 h-11 text-xs";
  return (
    <div
      className={`${dim} rounded-2xl bg-gradient-to-br ${entry.color} flex items-center justify-center text-white font-label font-bold shrink-0 shadow-[0_4px_14px_rgba(89,50,234,0.2)]`}
    >
      {entry.avatar}
    </div>
  );
}

function enrichDirectory(entries: DirectoryEntry[], members: { id: string; name: string; email: string; status: string }[]): DirectoryEntry[] {
  return entries
    .filter((e) => {
      const member = members.find((m) => m.email.toLowerCase() === e.email.toLowerCase() || m.name === e.name);
      return !member || member.status !== "Inactive";
    })
    .map((e) => {
      const member = members.find((m) => m.email.toLowerCase() === e.email.toLowerCase() || m.name === e.name);
      return member ? { ...e, memberId: member.id } : e;
    });
}

export default function Directory() {
  const storeMembers = useDemoState((s) => s.members);
  const directory = useMemo(() => enrichDirectory(BASE_DIRECTORY, storeMembers), [storeMembers]);
  const stats = useMemo(
    () => [
      { label: "Contacts", value: String(directory.length), icon: BookUser, tint: "bg-[#e5deff]/50 text-[#5932EA]" },
      { label: "Households", value: "12", icon: Users, tint: "bg-[#b3ebff]/40 text-[#00677d]" },
      { label: "Volunteers", value: String(directory.filter((d) => d.role === "Volunteer").length), icon: HeartHandshake, tint: "bg-[#ffdbcd]/50 text-[#8b4513]" },
      { label: "Updated", value: "Today", icon: RefreshCw, tint: "bg-[#5932EA]/8 text-[#5932EA]" },
    ],
    [directory],
  );
  const [search, setSearch] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<RoleFilterOption[]>([]);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  const lettersWithEntries = useMemo(
    () => [...new Set(directory.map((d) => d.letter))].sort(),
    [directory],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return directory.filter((m) => {
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.ministry?.toLowerCase().includes(q) ||
        m.household?.toLowerCase().includes(q);
      const matchesRoles =
        selectedRoles.length === 0 ||
        selectedRoles.some((filter) => m.role === roleFilterToRole[filter]);
      const matchesLetter = !activeLetter || m.letter === activeLetter;
      return matchesSearch && matchesRoles && matchesLetter;
    });
  }, [search, selectedRoles, activeLetter]);

  const featured = useMemo(
    () => directory.filter((d) => d.featured),
    [directory],
  );

  const grouped = useMemo(() => {
    const letters = [...new Set(filtered.map((m) => m.letter))].sort();
    return letters.reduce(
      (acc, l) => {
        acc[l] = filtered.filter((m) => m.letter === l);
        return acc;
      },
      {} as Record<string, DirectoryEntry[]>,
    );
  }, [filtered]);

  const resultCount = filtered.length;

  return (
    <PageTransition>
      <PageCanvas className="pb-10">
        <PageHeader
          title="Connect Directory"
          subtitle="A pastoral contact hub for reaching members, volunteers, and leadership—fast."
          section="People"
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn-secondary hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button type="button" className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          }
        />

        {/* Hero — purpose & at-a-glance */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="card-lumina relative overflow-hidden p-6 sm:p-8"
        >
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#5932EA]/8 blur-2xl pointer-events-none" />
          <div className="absolute -left-8 bottom-0 w-40 h-40 rounded-full bg-[#54d6fa]/15 blur-xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="label-caps text-[#5932EA] mb-2 inline-flex items-center gap-1.5">
                <BookUser className="w-3.5 h-3.5" />
                Lumina Connect
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-snug">
                Every name, one tap away
              </h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Browse by letter, filter by ministry role, or jump to leadership contacts.
                Built for staff and volunteers who need warm, reliable outreach—not spreadsheets.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:max-w-xl shrink-0">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[#c9c4d9]/30 bg-white/80 px-4 py-3.5 backdrop-blur-sm"
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${s.tint}`}>
                    <s.icon className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <p className="font-metric text-xl font-bold text-foreground tracking-tight">{s.value}</p>
                  <p className="font-label text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <GlassSearchBar
          placeholder="Name, email, ministry, or household…"
          value={search}
          onChange={setSearch}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
            <div className="flex flex-col gap-2 min-w-0">
              <FilterChips
                multiple
                options={[...roleFilterOptions]}
                value={selectedRoles}
                onChange={(v) => setSelectedRoles(v as RoleFilterOption[])}
              />
              {selectedRoles.length > 0 && (
                <p className="font-label text-[11px] text-muted-foreground">
                  Showing {selectedRoles.join(" + ")}
                  <button
                    type="button"
                    className="ml-2 text-primary hover:underline"
                    onClick={() => setSelectedRoles([])}
                  >
                    Clear roles
                  </button>
                </p>
              )}
              {selectedRoles.length === 0 && (
                <p className="font-label text-[11px] text-muted-foreground/80 hidden sm:block">
                  No role filter — all contacts. Select one or more to combine.
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <span className="font-label text-xs text-muted-foreground hidden sm:inline">
                {resultCount} {resultCount === 1 ? "contact" : "contacts"}
              </span>
              <div className="flex rounded-xl border border-[#c9c4d9]/40 p-0.5 bg-white/90">
                <button
                  type="button"
                  aria-label="Card view"
                  onClick={() => setViewMode("cards")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "cards" ? "bg-[#5932EA] text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list" ? "bg-[#5932EA] text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </GlassSearchBar>

        {/* Leadership quick-access */}
        {selectedRoles.length === 0 && !search && !activeLetter && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-label text-sm text-foreground">Leadership & key contacts</h3>
              <button
                type="button"
                className="font-label text-xs text-primary hover:underline flex items-center gap-1"
                onClick={() => setSelectedRoles(["Leadership"])}
              >
                View all
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
              {featured.map((entry, i) => (
                <motion.article
                  key={entry.email}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-lumina card-lumina-interactive shrink-0 w-[min(100%,260px)] p-4 group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <AvatarBadge entry={entry} size="lg" />
                    <div className="min-w-0 flex-1">
                      <DirectoryName entry={entry} />
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{entry.ministry}</p>
                      <span className={`inline-block mt-2 font-label text-[10px] px-2 py-0.5 rounded-full ${roleBadge[entry.role]}`}>
                        {entry.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-[#e0e3e5]/60">
                    <a href={`tel:${entry.phone.replace(/\s/g, "")}`} className="flex-1 btn-primary text-center py-2 rounded-xl text-xs">
                      Call
                    </a>
                    <a href={`mailto:${entry.email}`} className="flex-1 btn-secondary text-center py-2 rounded-xl text-xs">
                      Email
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Alphabet index + results */}
        <div className="flex gap-4 lg:gap-6">
          <aside className="hidden lg:flex flex-col gap-0.5 sticky top-28 self-start py-2 pr-1 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin">
            <button
              type="button"
              onClick={() => setActiveLetter(null)}
              className={`w-8 h-8 rounded-lg text-[10px] font-label font-bold transition-all ${
                activeLetter === null ? "bg-[#5932EA] text-white shadow-md" : "text-muted-foreground hover:bg-[#5932EA]/10 hover:text-[#5932EA]"
              }`}
            >
              All
            </button>
            {ALPHABET.map((l) => {
              const hasEntries = lettersWithEntries.includes(l);
              return (
                <button
                  key={l}
                  type="button"
                  disabled={!hasEntries}
                  onClick={() => setActiveLetter(activeLetter === l ? null : l)}
                  className={`w-8 h-8 rounded-lg text-[10px] font-label font-bold transition-all ${
                    activeLetter === l
                      ? "bg-[#5932EA] text-white shadow-md"
                      : hasEntries
                        ? "text-foreground hover:bg-[#5932EA]/10 hover:text-[#5932EA]"
                        : "text-muted-foreground/30 cursor-not-allowed"
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </aside>

          <div className="min-w-0 flex-1 space-y-4">
            {/* Mobile / tablet alphabet strip */}
            <div className="lg:hidden flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
              <button
                type="button"
                onClick={() => setActiveLetter(null)}
                className={`shrink-0 px-3 py-1.5 rounded-full font-label text-xs transition-all ${
                  activeLetter === null ? "filter-chip filter-chip-active" : "filter-chip"
                }`}
              >
                All
              </button>
              {lettersWithEntries.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setActiveLetter(activeLetter === l ? null : l)}
                  className={`shrink-0 w-8 h-8 rounded-full font-label text-xs font-bold transition-all ${
                    activeLetter === l ? "filter-chip filter-chip-active" : "filter-chip !min-w-8 !px-0"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {resultCount === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="card-lumina p-12 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#5932EA]/10 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-[#5932EA]" />
                  </div>
                  <p className="font-bold text-foreground">No contacts found</p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                    Try a different search, category, or letter—or clear filters to see everyone.
                  </p>
                  <button
                    type="button"
                    className="btn-primary mt-5 px-5 py-2.5 rounded-xl text-sm"
                    onClick={() => {
                      setSearch("");
                      setSelectedRoles([]);
                      setActiveLetter(null);
                    }}
                  >
                    Clear filters
                  </button>
                </motion.div>
              ) : viewMode === "list" ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card-lumina overflow-hidden divide-y divide-[#e0e3e5]/50"
                >
                  {filtered.map((entry) => (
                    <article
                      key={entry.email}
                      className="group flex flex-col sm:flex-row sm:items-center gap-4 px-5 sm:px-6 py-4 hover:bg-[#f7f9fb]/90 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <AvatarBadge entry={entry} />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <DirectoryName entry={entry} />
                            <span className={`font-label text-[10px] px-2 py-0.5 rounded-full ${roleBadge[entry.role]}`}>
                              {entry.role}
                            </span>
                          </div>
                          {entry.ministry && (
                            <p className="text-xs text-muted-foreground mt-0.5">{entry.ministry}</p>
                          )}
                          {entry.household && (
                            <p className="text-[11px] text-muted-foreground/80 mt-0.5">Household · {entry.household}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground sm:flex-1">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#5932EA]/60 shrink-0" />
                          {entry.phone}
                        </span>
                        <span className="flex items-center gap-1.5 min-w-0 truncate">
                          <Mail className="w-3.5 h-3.5 text-[#5932EA]/60 shrink-0" />
                          <span className="truncate">{entry.email}</span>
                        </span>
                      </div>
                      <ContactActions entry={entry} />
                    </article>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                  {Object.entries(grouped).map(([letter, items], gi) => (
                    <section key={letter}>
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-sm font-label font-bold shrink-0"
                          style={{
                            background: "linear-gradient(135deg, #5932ea 0%, #4100cf 100%)",
                            boxShadow: "0 4px 14px rgba(89, 50, 234, 0.3)",
                          }}
                        >
                          {letter}
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-[#c9c4d9]/60 to-transparent" />
                        <span className="font-label text-xs text-muted-foreground tabular-nums">
                          {items.length}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {items.map((entry, i) => (
                          <motion.article
                            key={entry.email}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: gi * 0.04 + i * 0.03 }}
                            className="card-lumina card-lumina-interactive p-5 group cursor-pointer relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#5932EA]/5 -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-[#5932EA]/10 transition-colors" />
                            <div className="relative flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <AvatarBadge entry={entry} />
                                <div className="min-w-0">
                                  <DirectoryName entry={entry} />
                                  <span className={`inline-block mt-1.5 font-label text-[10px] px-2 py-0.5 rounded-full ${roleBadge[entry.role]}`}>
                                    {entry.role}
                                  </span>
                                </div>
                              </div>
                              <ContactActions entry={entry} />
                            </div>
                            {(entry.ministry || entry.household) && (
                              <p className="relative text-xs text-muted-foreground mt-3 pt-3 border-t border-[#e0e3e5]/50">
                                {entry.ministry && <span>{entry.ministry}</span>}
                                {entry.ministry && entry.household && " · "}
                                {entry.household && <span>{entry.household} household</span>}
                              </p>
                            )}
                            <ul className="relative mt-3 space-y-2 text-xs text-muted-foreground">
                              <li className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-[#5932EA]/70 shrink-0" />
                                <a href={`tel:${entry.phone.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">
                                  {entry.phone}
                                </a>
                              </li>
                              <li className="flex items-center gap-2 min-w-0">
                                <Mail className="w-3.5 h-3.5 text-[#5932EA]/70 shrink-0" />
                                <a href={`mailto:${entry.email}`} className="truncate hover:text-primary transition-colors">
                                  {entry.email}
                                </a>
                              </li>
                              <li className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-[#5932EA]/70 shrink-0" />
                                {entry.address}
                              </li>
                            </ul>
                          </motion.article>
                        ))}
                      </div>
                    </section>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </PageCanvas>
    </PageTransition>
  );
}
