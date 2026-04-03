import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Music2, Heart, MoreHorizontal } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { Headphones, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Songs", value: "248", change: "+12", trend: "up" as const, icon: Music2, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.05 },
  { label: "Used This Month", value: "34", change: "+8", trend: "up" as const, icon: Headphones, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.1 },
  { label: "Favorites", value: "62", change: "+3", trend: "up" as const, icon: Heart, iconGradient: "bg-gradient-to-br from-rose-500 to-rose-600", delay: 0.15 },
  { label: "Most Played", value: "Way Maker", change: "", trend: "neutral" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
];

const songs = [
  { title: "Great Is Thy Faithfulness", artist: "Thomas Chisholm", key: "G", tempo: 72, tags: ["Hymn", "Praise"], lastPlayed: "Apr 3" },
  { title: "10,000 Reasons", artist: "Matt Redman", key: "G", tempo: 74, tags: ["Worship", "Contemporary"], lastPlayed: "Apr 3" },
  { title: "Way Maker", artist: "Sinach", key: "Bb", tempo: 68, tags: ["Worship", "Contemporary"], lastPlayed: "Mar 31" },
  { title: "Blessed Assurance", artist: "Fanny Crosby", key: "D", tempo: 96, tags: ["Hymn"], lastPlayed: "Mar 31" },
  { title: "Cornerstone", artist: "Hillsong Worship", key: "A", tempo: 74, tags: ["Worship", "Contemporary"], lastPlayed: "Mar 24" },
  { title: "What a Beautiful Name", artist: "Hillsong Worship", key: "D", tempo: 72, tags: ["Worship"], lastPlayed: "Mar 17" },
  { title: "How Great Thou Art", artist: "Carl Boberg", key: "Bb", tempo: 60, tags: ["Hymn", "Classic"], lastPlayed: "Mar 10" },
  { title: "King of My Heart", artist: "Bethel Music", key: "E", tempo: 82, tags: ["Worship"], lastPlayed: "Mar 3" },
  { title: "Goodness of God", artist: "Bethel Music", key: "E", tempo: 66, tags: ["Worship", "Contemporary"], lastPlayed: "Feb 24" },
  { title: "Amazing Grace (My Chains)", artist: "Chris Tomlin", key: "G", tempo: 76, tags: ["Hymn", "Contemporary"], lastPlayed: "Feb 17" },
];

const tagColors: Record<string, string> = {
  Hymn: "badge badge-amber", Worship: "badge badge-blue", Contemporary: "badge badge-violet", Classic: "badge badge-gray", Praise: "badge badge-green",
};

const keyColors = ["bg-blue-100 text-blue-700", "bg-violet-100 text-violet-700", "bg-amber-100 text-amber-700", "bg-emerald-100 text-emerald-700"];

export default function Songs() {
  const [search, setSearch] = useState("");
  const filtered = songs.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Song Library" subtitle="Manage your worship music collection" section="Worship"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> Add Song
            </button>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
          <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-border">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search songs..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
          </div>
          <div className="divide-y divide-border/40">
            {filtered.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.3 + i * 0.04 }}
                className="flex items-center gap-4 px-5 sm:px-6 py-3.5 hover:bg-accent/30 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0"
                  style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.25)" }}>
                  <Music2 className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.artist}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {s.tags.map(t => <span key={t} className={tagColors[t]}>{t}</span>)}
                </div>
                <div className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold shrink-0 ${keyColors[i % 4]}`}
                  style={{ fontFamily: "'Manrope', sans-serif" }}>{s.key}</div>
                <div className="hidden md:block text-xs text-muted-foreground shrink-0 w-16 text-right">{s.lastPlayed}</div>
                <button className="icon-btn opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="w-3.5 h-3.5" /></button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
