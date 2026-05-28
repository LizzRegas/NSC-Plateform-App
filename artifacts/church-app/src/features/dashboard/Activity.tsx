import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Download } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterChips } from "@/components/shared/FilterChips";
import { GlassSearchBar } from "@/components/shared/GlassSearchBar";
import { ActivityFeedItem } from "./components/ActivityFeedItem";
import { ACTIVITY_CATEGORIES, ACTIVITY_GROUPS, ACTIVITY_ITEMS } from "./data/activity-data";

const FILTER_OPTIONS = ["All", ...ACTIVITY_CATEGORIES];

export default function ActivityPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ACTIVITY_ITEMS.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const grouped = useMemo(() => {
    return ACTIVITY_GROUPS.map((group) => ({
      group,
      items: filtered.filter((item) => item.group === group),
    })).filter((section) => section.items.length > 0);
  }, [filtered]);

  const todayCount = ACTIVITY_ITEMS.filter((item) => item.group === "Today").length;

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Recent Activity"
          subtitle="Everything happening across your church — members, giving, events, and more"
          section="Dashboard"
          action={
            <button
              type="button"
              className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          }
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { label: "Today", value: String(todayCount) },
            { label: "This week", value: String(ACTIVITY_ITEMS.filter((i) => i.group !== "Earlier").length) },
            { label: "Categories", value: String(ACTIVITY_CATEGORIES.length) },
            { label: "Total entries", value: String(ACTIVITY_ITEMS.length) },
          ].map((stat) => (
            <div key={stat.label} className="card-lumina px-4 py-3.5">
              <p className="text-xs text-muted-foreground font-label">{stat.label}</p>
              <p className="text-xl font-metric text-foreground mt-1">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="space-y-3"
        >
          <GlassSearchBar
            placeholder="Search activity..."
            value={search}
            onChange={setSearch}
          >
            <FilterChips
              options={FILTER_OPTIONS}
              value={category}
              onChange={setCategory}
              className="md:max-w-[50%]"
            />
          </GlassSearchBar>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="card-lumina overflow-hidden"
        >
          {grouped.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#ede9fe] flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-[#5932ea]" />
              </div>
              <p className="text-sm font-semibold text-foreground">No activity found</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                Try adjusting your filters or search term.
              </p>
            </div>
          ) : (
            grouped.map((section) => (
              <div key={section.group}>
                <div className="px-5 sm:px-6 py-3 bg-slate-50/80 border-b border-zinc-100">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {section.group}
                  </h2>
                </div>
                <div className="divide-y divide-zinc-100">
                  {section.items.map((item, i) => (
                    <ActivityFeedItem key={item.id} item={item} index={i} />
                  ))}
                </div>
              </div>
            ))
          )}
        </motion.div>
      </PageCanvas>
    </PageTransition>
  );
}
