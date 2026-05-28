import { motion } from "framer-motion";
import { Camera, Monitor, Image, Video } from "lucide-react";

const cues = [
  { time: "9:28", type: "Slides", label: "Pre-service loop", asset: "welcome_v3.pptx", owner: "Hugo R." },
  { time: "9:35", type: "Lyrics", label: "Song 1 — lower thirds", asset: "great_is_thy.faith", owner: "Clara F." },
  { time: "9:54", type: "Live", label: "Camera 1 — wide", asset: "Stream A", owner: "François B." },
  { time: "10:05", type: "Scripture", label: "Psalm 23 full-screen", asset: "ps23_en_fr.png", owner: "Hugo R." },
  { time: "10:40", type: "Offering", label: "Giving slide + QR", asset: "giving_may.png", owner: "Clara F." },
];

const typeIcon: Record<string, typeof Camera> = {
  Slides: Monitor,
  Lyrics: Image,
  Live: Video,
  Scripture: Image,
  Offering: Camera,
};

export function MediaRundownFeature() {
  return (
    <div className="card-lumina overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <Camera className="w-5 h-5 text-slate-700" />
        <h3 className="font-bold text-foreground">Service media rundown</h3>
      </div>
      <div className="relative">
        <div className="absolute left-[4.25rem] top-0 bottom-0 w-px bg-border" />
        <div className="divide-y divide-border/40">
          {cues.map((cue, i) => {
            const Icon = typeIcon[cue.type] ?? Camera;
            return (
              <motion.div
                key={cue.time + cue.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors"
              >
                <span className="w-14 text-xs font-bold text-primary shrink-0 pt-1">{cue.time}</span>
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 z-10">
                  <Icon className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="badge badge-gray">{cue.type}</span>
                    <p className="text-sm font-semibold text-foreground">{cue.label}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{cue.asset} · {cue.owner}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
