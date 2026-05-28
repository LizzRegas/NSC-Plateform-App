import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Music2, Heart, Headphones, TrendingUp, Pencil } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass } from "@/components/shared/forms/FormField";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import type { WorshipSong } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const tagColors: Record<string, string> = {
  Hymn: "badge badge-amber",
  Worship: "badge badge-blue",
  Contemporary: "badge badge-violet",
  Classic: "badge badge-gray",
  Praise: "badge badge-green",
  Opening: "badge badge-teal",
  Closing: "badge badge-teal",
};

const keyColors = ["bg-blue-100 text-blue-700", "bg-violet-100 text-violet-700", "bg-amber-100 text-amber-700", "bg-emerald-100 text-emerald-700"];

export default function Songs() {
  const songs = useDemoState((s) => s.worshipSongs);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<WorshipSong | null>(null);
  const [form, setForm] = useState({ title: "", artist: "", key: "G", tempo: "72 BPM", tags: "Worship" });

  const filtered = useMemo(
    () =>
      songs.filter(
        (s) =>
          s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase()),
      ),
    [songs, search],
  );

  const mostPlayed = songs[0]?.title ?? "—";

  const stats = [
    { label: "Total Songs", value: String(songs.length), change: `+${Math.min(songs.length, 12)}`, trend: "up" as const, icon: Music2, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.05 },
    { label: "Used This Month", value: String(Math.min(songs.length, 34)), change: "+8", trend: "up" as const, icon: Headphones, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.1 },
    { label: "Favorites", value: "62", change: "+3", trend: "up" as const, icon: Heart, iconGradient: "bg-gradient-to-br from-rose-500 to-rose-600", delay: 0.15 },
    { label: "Most Played", value: mostPlayed, change: "", trend: "neutral" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
  ];

  const openAdd = () => {
    setEditing(null);
    setForm({ title: "", artist: "", key: "G", tempo: "72 BPM", tags: "Worship" });
    setDialogOpen(true);
  };

  const openEdit = (song: WorshipSong) => {
    setEditing(song);
    setForm({ title: song.title, artist: song.artist, key: song.key, tempo: song.tempo, tags: song.tags.join(", ") });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.artist.trim()) return;
    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
    if (editing) {
      dispatch({
        type: "UPDATE_SONG",
        payload: { ...editing, title: form.title.trim(), artist: form.artist.trim(), key: form.key, tempo: form.tempo, tags },
      });
      success("Song updated", form.title);
    } else {
      const payload: WorshipSong = {
        id: generateId("ws"),
        title: form.title.trim(),
        artist: form.artist.trim(),
        key: form.key,
        tempo: form.tempo,
        tags,
        lastPlayed: "—",
      };
      dispatch({ type: "ADD_SONG", payload });
      success("Song added", form.title);
    }
    setDialogOpen(false);
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Song Library"
          subtitle="Manage your worship music collection"
          section="Worship"
          action={
            <button type="button" onClick={openAdd} className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> Add Song
            </button>
          }
        />
        <KpiGrid stats={stats} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26 }}
          className="card-lumina overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-border">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search songs..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
          </div>
          <div className="divide-y divide-border/40">
            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.3 + i * 0.04 }}
                className="flex items-center gap-4 px-5 sm:px-6 py-3.5 hover:bg-accent/30 transition-colors cursor-pointer group"
              >
                <div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0"
                  style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.25)" }}
                >
                  <Music2 className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.artist}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {s.tags.map((t) => (
                    <span key={t} className={tagColors[t] ?? "badge badge-gray"}>
                      {t}
                    </span>
                  ))}
                </div>
                <div
                  className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold shrink-0 ${keyColors[i % 4]}`}
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {s.key}
                </div>
                <div className="hidden md:block text-xs text-muted-foreground shrink-0 w-16 text-right">{s.lastPlayed}</div>
                <button type="button" className="icon-btn opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => openEdit(s)}>
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={editing ? "Edit Song" : "Add Song"}
          description={editing ? "Update song details in the library." : "Add a new song to the worship library."}
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setDialogOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary px-4 py-2 rounded-xl text-sm" onClick={handleSave}>
                {editing ? "Save Changes" : "Add Song"}
              </button>
            </>
          }
        >
          <FormField label="Title" htmlFor="song-title">
            <input id="song-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Artist" htmlFor="song-artist">
            <input id="song-artist" value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Key" htmlFor="song-key">
            <input id="song-key" value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Tempo" htmlFor="song-tempo">
            <input id="song-tempo" value={form.tempo} onChange={(e) => setForm({ ...form, tempo: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Tags (comma-separated)" htmlFor="song-tags">
            <input id="song-tags" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className={inputClass} />
          </FormField>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
