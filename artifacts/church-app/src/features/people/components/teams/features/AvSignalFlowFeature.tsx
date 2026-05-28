import { motion } from "framer-motion";
import { MonitorPlay, Circle, ArrowRight } from "lucide-react";

const nodes = [
  { id: "cam1", label: "Camera 1", status: "online", out: "SDI → Matrix" },
  { id: "cam2", label: "Camera 2", status: "online", out: "SDI → Matrix" },
  { id: "matrix", label: "Video Matrix", status: "online", out: "Program → ATEM" },
  { id: "atem", label: "ATEM Mini Pro", status: "online", out: "HDMI → Projector" },
  { id: "proj", label: "Main Projector", status: "standby", out: "Screen A" },
  { id: "stream", label: "Livestream Encoder", status: "online", out: "YouTube RTMP" },
];

export function AvSignalFlowFeature() {
  return (
    <div className="card-lumina p-6">
      <div className="flex items-center gap-2 mb-6">
        <MonitorPlay className="w-5 h-5 text-violet-600" />
        <h3 className="font-bold text-foreground">Live signal flow</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="relative p-4 rounded-2xl border border-border bg-gradient-to-br from-white to-[#f7f9fb]"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-foreground">{node.label}</p>
              <span className="flex items-center gap-1.5 text-xs">
                <Circle
                  className={`w-2 h-2 fill-current ${
                    node.status === "online" ? "text-emerald-500" : "text-amber-500"
                  }`}
                />
                {node.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowRight className="w-3 h-3 text-primary" />
              {node.out}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
