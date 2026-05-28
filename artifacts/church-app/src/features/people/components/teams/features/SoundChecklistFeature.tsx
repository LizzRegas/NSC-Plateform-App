import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, CheckCircle2, Circle } from "lucide-react";

const sections = [
  {
    title: "Pre-service (T-60)",
    items: ["Power on FOH & stage racks", "RF scan — clear channels", "Line check all vocal mics", "DI boxes guitar & keys"],
  },
  {
    title: "Sound check (T-30)",
    items: ["Drums — kick & snare gain", "Worship leader IEM mix", "House EQ reference track", "Record multitrack armed"],
  },
  {
    title: "Live (T-0)",
    items: ["Walk-in music level set", "Sermon mic on preset", "Monitor mix confirmed", "Backup wireless ready"],
  },
];

export function SoundChecklistFeature() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setChecked((c) => ({ ...c, [key]: !c[key] }));

  const total = sections.reduce((n, s) => n + s.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="card-lumina p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
            <Volume2 className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Sunday readiness</p>
            <p className="text-xs text-muted-foreground">
              {done} of {total} checks complete
            </p>
          </div>
        </div>
        <div className="w-32 h-2 rounded-full bg-slate-100 overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${total ? (done / total) * 100 : 0}%` }}
          />
        </div>
      </div>
      {sections.map((sec, si) => (
        <motion.div
          key={sec.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.06 }}
          className="card-lumina overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-border bg-[#f7f9fb]">
            <h3 className="text-sm font-bold text-foreground">{sec.title}</h3>
          </div>
          <ul className="p-2">
            {sec.items.map((item) => {
              const key = `${sec.title}-${item}`;
              const isOn = checked[key];
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent/30 text-left transition-colors"
                  >
                    {isOn ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={`text-sm ${isOn ? "text-muted-foreground line-through" : "text-foreground font-medium"}`}>
                      {item}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
