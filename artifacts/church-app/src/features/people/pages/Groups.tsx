import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Plus, CalendarDays, MapPin, Users, ArrowRight, Filter } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { GlassSearchBar } from "@/components/shared/GlassSearchBar";
import { FilterChips } from "@/components/shared/FilterChips";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass, selectClass, textareaClass } from "@/components/shared/forms/FormField";
import { useDemoState, useDemoDispatch, generateId, slugify } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const filterOptions = ["All Groups", "Bible Study", "Youth", "Outreach", "Support", "Young Adults"];

const CATEGORY_CLASSES: Record<string, string> = {
  "Bible Study": "bg-[#b3ebff] text-[#001f27]",
  Outreach: "bg-[#ffdbcd] text-[#360f00]",
  Support: "bg-[#e0e3e5] text-[#191c1e]",
  "Young Adults": "bg-[#e5deff] text-[#4404d7]",
};

export default function Groups() {
  const groups = useDemoState((s) => s.groups);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Groups");
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Bible Study");
  const [desc, setDesc] = useState("");
  const [schedule, setSchedule] = useState("");
  const [location, setLocation] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return groups.filter((g) => {
      const matchesFilter = filter === "All Groups" || g.category === filter;
      const matchesSearch =
        !q ||
        g.name.toLowerCase().includes(q) ||
        g.desc.toLowerCase().includes(q) ||
        g.location.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [groups, search, filter]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const slug = slugify(name);
    dispatch({
      type: "ADD_GROUP",
      payload: {
        id: generateId("g"),
        slug,
        name: name.trim(),
        category,
        categoryClass: CATEGORY_CLASSES[category] ?? "bg-[#e5deff] text-[#4404d7]",
        desc: desc.trim() || "New group in your community.",
        schedule: schedule.trim() || "TBD",
        location: location.trim() || "TBD",
        members: 0,
        memberIds: [],
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
      },
    });
    success("Group created", `${name.trim()} is now on your groups list.`);
    setCreateOpen(false);
    setName("");
    setDesc("");
    setSchedule("");
    setLocation("");
  };

  return (
    <PageTransition>
      <PageCanvas className="pb-8">
        <PageHeader
          title="Groups & Communities"
          subtitle="Manage and connect with active small groups across your organization."
          section="People"
          action={
            <button
              type="button"
              className="btn-primary hidden md:flex items-center gap-2 px-6 py-3 rounded-2xl text-sm"
              onClick={() => setCreateOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Create Group
            </button>
          }
        />

        <GlassSearchBar
          placeholder="Search groups by name, leader, or location..."
          value={search}
          onChange={setSearch}
        >
          <div className="flex gap-2 overflow-x-auto scrollbar-hide md:pb-0 pb-1">
            <FilterChips options={filterOptions} value={filter} onChange={setFilter} />
            <button type="button" className="filter-chip flex items-center gap-1 shrink-0">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </GlassSearchBar>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((g, i) => (
            <Link key={g.id} href={`/groups/${g.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={`card-lumina overflow-hidden flex flex-col cursor-pointer group hover:-translate-y-0.5 transition-all duration-300 h-full ${
                  g.featured ? "md:col-span-2 xl:col-span-2" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${g.featured ? "h-64 md:h-72" : "h-40"}`}>
                  <img
                    src={g.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {g.active && (
                    <span className="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-full font-label text-xs text-primary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Active Now
                    </span>
                  )}
                  {g.featured ? (
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="px-2.5 py-1 bg-white/20 backdrop-blur rounded text-[10px] font-extrabold uppercase tracking-widest mb-2 inline-block">
                        {g.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold">{g.name}</h3>
                    </div>
                  ) : null}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  {!g.featured && (
                    <>
                      <span
                        className={`inline-block w-fit px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest mb-2 ${
                          g.categoryClass ?? "bg-[#e5deff] text-[#4404d7]"
                        }`}
                      >
                        {g.category}
                      </span>
                      <h3 className="text-xl font-bold text-foreground mb-2">{g.name}</h3>
                    </>
                  )}
                  {g.featured && (
                    <p className="text-muted-foreground mb-6 line-clamp-2">{g.desc}</p>
                  )}
                  {!g.featured && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{g.desc}</p>
                  )}
                  <div className={`grid ${g.featured ? "grid-cols-2" : "grid-cols-1"} gap-3 mb-6 text-muted-foreground`}>
                    <div className="flex items-start gap-2">
                      <CalendarDays className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        {g.featured && (
                          <p className="font-label text-xs text-muted-foreground">{g.schedule}</p>
                        )}
                        <p className="text-sm text-foreground">
                          {g.featured ? g.time : g.schedule}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        {g.featured && (
                          <p className="font-label text-xs text-muted-foreground">Location</p>
                        )}
                        <p className="text-sm text-foreground">{g.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-[#e0e3e5] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-label text-xs">
                        {g.featured ? `+${g.members} Members` : `${g.members} Members`}
                      </span>
                    </div>
                    {g.featured ? (
                      <span className="px-4 py-2 rounded-full border border-[#c9c4d9] text-primary font-label text-sm">
                        View
                      </span>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#eceef0] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12 text-sm">No groups match your filters.</p>
        )}

        <button
          type="button"
          className="fixed bottom-6 right-5 md:hidden w-14 h-14 rounded-2xl btn-primary flex items-center justify-center shadow-lg z-30"
          aria-label="Create group"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="w-7 h-7" />
        </button>

        <FormDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          title="Create group"
          description="Add a new small group or community to your church."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2.5 rounded-xl text-sm" onClick={() => setCreateOpen(false)}>
                Cancel
              </button>
              <button type="submit" form="create-group-form" className="btn-primary px-4 py-2.5 rounded-xl text-sm">
                Create group
              </button>
            </>
          }
        >
          <form id="create-group-form" onSubmit={handleCreate} className="space-y-4">
            <FormField label="Group name" htmlFor="group-name">
              <input id="group-name" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required />
            </FormField>
            <FormField label="Category" htmlFor="group-category">
              <select id="group-category" className={selectClass} value={category} onChange={(e) => setCategory(e.target.value)}>
                {filterOptions.slice(1).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Description" htmlFor="group-desc">
              <textarea id="group-desc" className={textareaClass} rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} />
            </FormField>
            <FormField label="Schedule" htmlFor="group-schedule">
              <input id="group-schedule" className={inputClass} value={schedule} onChange={(e) => setSchedule(e.target.value)} />
            </FormField>
            <FormField label="Location" htmlFor="group-location">
              <input id="group-location" className={inputClass} value={location} onChange={(e) => setLocation(e.target.value)} />
            </FormField>
          </form>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
