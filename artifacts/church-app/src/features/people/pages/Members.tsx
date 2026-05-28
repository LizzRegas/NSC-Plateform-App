import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { AddMemberDialog } from "@/features/people/components/AddMemberDialog";
import { roleStyles, stageStyles, statusStyles } from "@/features/people/components/MemberDetailPanel";
import {
  useDemoState,
  useDemoDispatch,
  downloadCsv,
  generateId,
  type Member,
  type MemberRole,
  type MembershipStage,
} from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";
import {
  UserPlus,
  Users,
  UserCheck,
  UserX,
  Sparkles,
  Upload,
  Download,
  ArrowUpRight,
  ClipboardList,
  AlertCircle,
  X,
  Crown,
  Clock,
} from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { GlassSearchBar } from "@/components/shared/GlassSearchBar";
import { KpiGrid } from "@/components/shared/KpiGrid";

type RosterView = "all" | "active" | "pending" | "inactive" | "leadership";

const ALL_ROLES: MemberRole[] = ["Elder", "Deacon", "Member", "Volunteer"];
const ALL_STAGES: MembershipStage[] = ["New", "Regular", "Leadership"];

const rosterViews: {
  id: RosterView;
  label: string;
  hint: string;
  icon: React.ElementType;
  accent: string;
  count: (data: Member[]) => number;
  match: (m: Member) => boolean;
}[] = [
  {
    id: "all",
    label: "Full roster",
    hint: "Everyone",
    icon: Users,
    accent: "from-[#5932EA]/15 to-[#5932EA]/5 text-[#5932EA]",
    count: (d) => d.length,
    match: () => true,
  },
  {
    id: "active",
    label: "Active",
    hint: "In good standing",
    icon: UserCheck,
    accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-700",
    count: (d) => d.filter((m) => m.status === "Active").length,
    match: (m) => m.status === "Active",
  },
  {
    id: "pending",
    label: "Pending",
    hint: "Needs review",
    icon: Clock,
    accent: "from-amber-500/20 to-amber-500/5 text-amber-800",
    count: (d) => d.filter((m) => m.status === "Pending").length,
    match: (m) => m.status === "Pending",
  },
  {
    id: "inactive",
    label: "Inactive",
    hint: "Archived",
    icon: UserX,
    accent: "from-rose-400/15 to-rose-400/5 text-rose-700",
    count: (d) => d.filter((m) => m.status === "Inactive").length,
    match: (m) => m.status === "Inactive",
  },
  {
    id: "leadership",
    label: "Leadership",
    hint: "Elders & deacons",
    icon: Crown,
    accent: "from-violet-500/15 to-violet-500/5 text-violet-800",
    count: (d) => d.filter((m) => m.stage === "Leadership").length,
    match: (m) => m.stage === "Leadership",
  },
];

const PAGE_SIZE = 8;

function buildKpiStats(members: Member[]) {
  const active = members.filter((m) => m.status === "Active").length;
  const inactive = members.filter((m) => m.status === "Inactive").length;
  const pending = members.filter((m) => m.status === "Pending").length;
  const pct = members.length ? Math.round((active / members.length) * 100) : 0;
  return [
    {
      label: "Total Members",
      value: members.length.toLocaleString(),
      change: `+${pending}`,
      trend: "up" as const,
      icon: Users,
      iconGradient: "bg-gradient-to-br from-[#5932EA] to-[#4100cf]",
      delay: 0.05,
    },
    {
      label: "Active",
      value: active.toLocaleString(),
      change: `${pct}%`,
      trend: "up" as const,
      icon: UserCheck,
      sub: "of roster",
      iconGradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
      delay: 0.1,
    },
    {
      label: "Inactive",
      value: inactive.toLocaleString(),
      change: String(inactive),
      trend: "down" as const,
      icon: UserX,
      iconGradient: "bg-gradient-to-br from-rose-400 to-rose-600",
      delay: 0.15,
    },
    {
      label: "Pending",
      value: pending.toLocaleString(),
      change: `${members.filter((m) => m.needsReview).length} review`,
      trend: "up" as const,
      icon: Sparkles,
      sub: "needs review",
      iconGradient: "bg-gradient-to-br from-amber-400 to-orange-500",
      delay: 0.2,
    },
  ];
}

function RefineToggle({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-3 py-1.5 rounded-lg text-xs font-label font-semibold border transition-all ${
        active
          ? "border-[#5932EA] bg-[#5932EA]/8 text-[#4100cf] shadow-[inset_0_0_0_1px_rgba(89,50,234,0.12)]"
          : "border-[#e0e3e5] bg-white text-muted-foreground hover:border-[#c9c4d9] hover:text-foreground"
      }`}
    >
      {children ?? label}
    </button>
  );
}

export default function Members() {
  const membersData = useDemoState((s) => s.members);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const importRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [rosterView, setRosterView] = useState<RosterView>("all");
  const [refineRoles, setRefineRoles] = useState<MemberRole[]>([]);
  const [refineStages, setRefineStages] = useState<MembershipStage[]>([]);
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);

  const kpiStats = useMemo(() => buildKpiStats(membersData), [membersData]);
  const pendingReview = useMemo(() => membersData.filter((m) => m.needsReview), [membersData]);

  const viewDef = rosterViews.find((v) => v.id === rosterView)!;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return membersData.filter((m) => {
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.phone.includes(q);
      const matchesView = viewDef.match(m);
      const matchesRoles = refineRoles.length === 0 || refineRoles.includes(m.role);
      const matchesStages = refineStages.length === 0 || refineStages.includes(m.stage);
      return matchesSearch && matchesView && matchesRoles && matchesStages;
    });
  }, [search, rosterView, refineRoles, refineStages, viewDef]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const refineTags = useMemo(() => {
    const tags: { key: string; label: string; clear: () => void }[] = [];
    refineRoles.forEach((r) => {
      tags.push({
        key: `role-${r}`,
        label: r,
        clear: () => setRefineRoles((prev) => prev.filter((x) => x !== r)),
      });
    });
    refineStages.forEach((s) => {
      tags.push({
        key: `stage-${s}`,
        label: s,
        clear: () => setRefineStages((prev) => prev.filter((x) => x !== s)),
      });
    });
    return tags;
  }, [refineRoles, refineStages]);

  const hasRefine = refineRoles.length > 0 || refineStages.length > 0;
  const hasExtraFilters = search.trim() !== "" || rosterView !== "all" || hasRefine;

  const toggleRefineRole = (role: MemberRole) => {
    setRefineRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
    setPage(1);
  };

  const toggleRefineStage = (stage: MembershipStage) => {
    setRefineStages((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage],
    );
    setPage(1);
  };

  const clearAllFilters = () => {
    setSearch("");
    setRosterView("all");
    setRefineRoles([]);
    setRefineStages([]);
    setPage(1);
  };

  const handleExport = () => {
    downloadCsv(
      "lumina-members.csv",
      ["Name", "Email", "Phone", "Role", "Status", "Stage", "Joined"],
      membersData.map((m) => [m.name, m.email, m.phone, m.role, m.status, m.stage, m.joined]),
    );
    success("Export started", "Member roster downloaded as CSV.");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      if (lines.length < 2) {
        success("Import skipped", "CSV needs a header row and at least one member.");
        return;
      }
      const imported: Member[] = lines.slice(1).map((line) => {
        const cols = line.split(",").map((c) => c.replace(/^"|"$/g, "").trim());
        const [name = "Imported Member", email = "", phone = "", role = "Member", status = "Pending", stage = "New", joined = "—"] = cols;
        return {
          id: generateId("m"),
          name,
          email: email || `${generateId("import")}@example.com`,
          phone: phone || "—",
          role: (ALL_ROLES.includes(role as MemberRole) ? role : "Member") as MemberRole,
          status: (["Active", "Inactive", "Pending"].includes(status) ? status : "Pending") as Member["status"],
          stage: (["New", "Regular", "Leadership"].includes(stage) ? stage : "New") as MembershipStage,
          joined,
          groups: [],
          lastActivity: "—",
          initials: name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase(),
          needsReview: true,
        };
      });
      dispatch({ type: "IMPORT_MEMBERS", payload: imported });
      success("Import complete", `${imported.length} member(s) added to roster.`);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <PageTransition>
      <PageCanvas className="pb-10">
        <PageHeader
          title="Members"
          subtitle="Your congregation roster—membership status, roles, and lifecycle in one operational view."
          section="People"
          action={
            <div className="flex items-center gap-2">
              <input
                ref={importRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={handleImportFile}
              />
              <button
                type="button"
                className="btn-secondary hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                onClick={() => importRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button
                type="button"
                className="btn-secondary hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                onClick={handleExport}
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                type="button"
                className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                onClick={() => setAddOpen(true)}
              >
                <UserPlus className="w-4 h-4" />
                Add member
              </button>
            </div>
          }
        />

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="card-lumina relative overflow-hidden p-6 sm:p-8"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#5932EA]/6 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-start">
            <div className="max-w-2xl">
              <span className="label-caps text-[#5932EA] mb-2 inline-flex items-center gap-1.5">
                <ClipboardList className="w-3.5 h-3.5" />
                Lumina Roster
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-snug">
                System of record for your congregation
              </h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Pick a roster view, refine by role or stage, then select a row to review or act on that
                member&apos;s record.
              </p>
            </div>

            {pendingReview.length > 0 && (
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4 w-full lg:max-w-sm shrink-0">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-amber-950">
                      {pendingReview.length} pending review
                    </p>
                    <button
                      type="button"
                      className="mt-3 font-label text-xs font-semibold text-amber-900 hover:underline inline-flex items-center gap-1"
                      onClick={() => {
                        setRosterView("pending");
                        setRefineRoles([]);
                        setRefineStages([]);
                        setPage(1);
                      }}
                    >
                      Open pending view
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.section>

        <KpiGrid stats={kpiStats} />

        <GlassSearchBar
          placeholder="Search by name, email, or phone…"
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />

        {/* Roster views — primary filter (replaces chip rows) */}
        <section className="space-y-3" aria-label="Roster views">
          <div className="flex items-center justify-between gap-3">
            <p className="font-label text-xs text-muted-foreground uppercase tracking-wide">
              Roster view
            </p>
            {hasExtraFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="font-label text-xs text-primary hover:underline"
              >
                Reset all
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {rosterViews.map((view) => {
              const active = rosterView === view.id;
              const count = view.count(membersData);
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => {
                    setRosterView(view.id);
                    setPage(1);
                  }}
                  className={`relative text-left rounded-2xl border p-3.5 sm:p-4 transition-all duration-200 ${
                    active
                      ? "border-[#5932EA] bg-[#5932EA]/[0.06] shadow-[0_0_0_1px_rgba(89,50,234,0.25),0_8px_24px_rgba(89,50,234,0.12)]"
                      : "border-[#e0e3e5]/80 bg-white hover:border-[#c9c4d9] hover:shadow-sm"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${view.accent} flex items-center justify-center mb-3`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <p className="font-bold text-sm text-foreground leading-tight">{view.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{view.hint}</p>
                  <p className="font-metric text-lg font-bold text-foreground mt-2 tabular-nums">
                    {count}
                  </p>
                  {active && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#5932EA]" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Refine — secondary, additive filters */}
        <div className="card-lumina p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="font-label text-xs text-muted-foreground uppercase tracking-wide">
                Refine within view
              </p>
              <p className="text-[11px] text-muted-foreground/80 mt-0.5">
                Optional—narrows the current roster slice
              </p>
            </div>
            {hasRefine && (
              <button
                type="button"
                onClick={() => {
                  setRefineRoles([]);
                  setRefineStages([]);
                  setPage(1);
                }}
                className="font-label text-xs text-muted-foreground hover:text-primary"
              >
                Clear refine
              </button>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="font-label text-xs text-muted-foreground w-20 shrink-0">Role</span>
              <div className="flex flex-wrap gap-1.5">
                {ALL_ROLES.map((role) => (
                  <RefineToggle
                    key={role}
                    label={role}
                    active={refineRoles.includes(role)}
                    onClick={() => toggleRefineRole(role)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="font-label text-xs text-muted-foreground w-20 shrink-0">Stage</span>
              <div className="flex flex-wrap gap-1.5">
                {ALL_STAGES.map((stage) => (
                  <RefineToggle
                    key={stage}
                    label={stage}
                    active={refineStages.includes(stage)}
                    onClick={() => toggleRefineStage(stage)}
                  />
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {(refineTags.length > 0 || search.trim()) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#e0e3e5]/60"
              >
                <span className="font-label text-[11px] text-muted-foreground shrink-0">Applied:</span>
                {search.trim() && (
                  <span className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-lg bg-[#5932EA]/10 text-[#4100cf] text-xs font-label">
                    &quot;{search.trim()}&quot;
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="p-0.5 rounded hover:bg-[#5932EA]/20"
                      aria-label="Clear search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {refineTags.map((tag) => (
                  <span
                    key={tag.key}
                    className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-lg bg-[#f7f9fb] border border-[#e0e3e5] text-xs font-label text-foreground"
                  >
                    {tag.label}
                    <button
                      type="button"
                      onClick={tag.clear}
                      className="p-0.5 rounded hover:bg-[#eceef0]"
                      aria-label={`Remove ${tag.label}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <span className="text-[11px] text-muted-foreground ml-1">
                  {filtered.length} match{filtered.length !== 1 ? "es" : ""} in sample
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="font-label text-[11px] text-muted-foreground -mt-2">
          Select a row to open the full member record.
        </p>

        <div className="card-lumina overflow-hidden rounded-3xl min-w-0">
            <div className="hidden lg:grid grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_auto_auto_auto_auto] gap-3 px-6 py-3.5 border-b border-[#e0e3e5] label-caps text-muted-foreground bg-[#f7f9fb]/60">
              <div>Member</div>
              <div>Contact</div>
              <div>Stage</div>
              <div>Role</div>
              <div>Status</div>
              <div className="text-right">Joined</div>
            </div>

            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-12 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#5932EA]/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-[#5932EA]" />
                  </div>
                  <p className="font-bold text-foreground">No members in this view</p>
                  <button
                    type="button"
                    className="btn-primary mt-5 px-5 py-2.5 rounded-xl text-sm"
                    onClick={clearAllFilters}
                  >
                    Reset filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="rows"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="divide-y divide-[#e0e3e5]/50"
                >
                  {paged.map((m) => {
                    const isActive = m.status === "Active";
                    return (
                      <Link key={m.id} href={`/members/${m.id}`}>
                      <div
                        className={`w-full text-left grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_auto_auto_auto_auto] gap-3 px-5 lg:px-6 py-4 items-center transition-colors hover:bg-[#f7f9fb]/90 border-l-[3px] border-l-transparent cursor-pointer ${
                          !isActive && m.status !== "Pending" ? "opacity-75" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative shrink-0">
                            {m.avatar ? (
                              <img
                                src={m.avatar}
                                alt=""
                                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-sm"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-2xl bg-[#e5deff] text-primary flex items-center justify-center font-label font-bold text-sm">
                                {m.initials}
                              </div>
                            )}
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${statusStyles[m.status].dot}`}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-bold text-foreground text-sm truncate">{m.name}</p>
                              {m.needsReview && (
                                <span className="font-label text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                                  Review
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 lg:hidden truncate">
                              {m.email}
                            </p>
                          </div>
                        </div>

                        <div className="hidden lg:block min-w-0 text-left">
                          <p className="text-sm text-foreground truncate">{m.email}</p>
                          <p className="text-xs text-muted-foreground truncate">{m.phone}</p>
                        </div>

                        <div className="hidden lg:block">
                          <span
                            className={`font-label text-[10px] px-2.5 py-1 rounded-full border ${stageStyles[m.stage]}`}
                          >
                            {m.stage}
                          </span>
                        </div>

                        <div className="hidden lg:block">
                          <span
                            className={`font-label text-xs px-3 py-1.5 rounded-lg inline-block ${roleStyles[m.role]}`}
                          >
                            {m.role}
                          </span>
                        </div>

                        <div className="hidden lg:flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${statusStyles[m.status].dot}`} />
                          <span className={`font-label text-sm ${statusStyles[m.status].text}`}>
                            {m.status}
                          </span>
                        </div>

                        <div className="hidden lg:block text-right">
                          <p className="font-label text-sm text-foreground">{m.joined}</p>
                          <p className="text-[11px] text-muted-foreground">{m.lastActivity}</p>
                        </div>

                        <div className="lg:hidden flex flex-wrap items-center gap-2 col-span-full -mt-1">
                          <span
                            className={`font-label text-[10px] px-2 py-0.5 rounded-full border ${stageStyles[m.stage]}`}
                          >
                            {m.stage}
                          </span>
                          <span
                            className={`font-label text-[10px] px-2 py-0.5 rounded-lg ${roleStyles[m.role]}`}
                          >
                            {m.role}
                          </span>
                        </div>
                      </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {filtered.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#e0e3e5]/50 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#f7f9fb]/50">
                <p className="text-sm text-muted-foreground">
                  {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of{" "}
                  {filtered.length.toLocaleString()}
                  <span className="text-muted-foreground/70"> · {viewDef.label}</span>
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="w-9 h-9 rounded-lg border border-[#c9c4d9] flex items-center justify-center disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    ‹
                  </button>
                  <span className="font-label text-xs tabular-nums">
                    {safePage}/{pageCount}
                  </span>
                  <button
                    type="button"
                    disabled={safePage >= pageCount}
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    className="w-9 h-9 rounded-lg border border-[#c9c4d9] flex items-center justify-center disabled:opacity-40"
                    aria-label="Next page"
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </div>

        <AddMemberDialog open={addOpen} onOpenChange={setAddOpen} />
      </PageCanvas>
    </PageTransition>
  );
}
