import { motion } from "framer-motion";
import { Music2, Plus, GripVertical, Clock, Mic2 } from "lucide-react";

const sets = [
  { service: "Apr 6 · 9:30 AM", theme: "Renew & Refresh", key: "G", bpm: 72, status: "Ready" },
  { service: "Apr 6 · 11:00 AM", theme: "Renew & Refresh", key: "D", bpm: 78, status: "Rehearsing" },
];

const songs = [
  { title: "Great Is Thy Faithfulness", artist: "Hymn", duration: "4:12", type: "Opener" },
  { title: "10,000 Reasons", artist: "Matt Redman", duration: "5:08", type: "Worship" },
  { title: "Way Maker", artist: "Sinach", duration: "6:45", type: "Peak" },
  { title: "Blessed Assurance", artist: "Hymn", duration: "3:40", type: "Response" },
];

export function WorshipSetsFeature() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sets.map((s, i) => (
          <motion.div
            key={s.service}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card-lumina p-5 border-l-4 border-l-violet-500"
          >
            <p className="text-xs text-muted-foreground">{s.service}</p>
            <h3 className="font-bold text-foreground mt-1">{s.theme}</h3>
            <div className="flex gap-3 mt-3 text-xs text-muted-foreground">
              <span>Key {s.key}</span>
              <span>{s.bpm} BPM</span>
              <span className="badge badge-green">{s.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="card-lumina overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Music2 className="w-5 h-5 text-violet-600" />
            <h3 className="font-bold text-foreground">Sunday Set — 9:30 AM</h3>
          </div>
          <button type="button" className="btn-secondary text-xs px-3 py-2 rounded-xl flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add song
          </button>
        </div>
        <div className="p-3 space-y-2">
          {songs.map((song, i) => (
            <motion.div
              key={song.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.04 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f9fb] border border-border/50 hover:border-primary/20 transition-colors"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground/50 cursor-grab" />
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                <Mic2 className="w-4 h-4 text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{song.title}</p>
                <p className="text-xs text-muted-foreground">{song.artist}</p>
              </div>
              <span className="badge badge-gray hidden sm:inline">{song.type}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {song.duration}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
