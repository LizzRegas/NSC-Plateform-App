import { motion } from "framer-motion";
import { Package, AlertTriangle, CheckCircle2, UserPlus, Coffee } from "lucide-react";

const inventory = [
  { item: "Welcome brochures", qty: 240, min: 100, status: "ok" },
  { item: "Guest gift bags", qty: 18, min: 40, status: "low" },
  { item: "Coffee pods (medium)", qty: 320, min: 150, status: "ok" },
  { item: "Paper cups (12oz)", qty: 45, min: 200, status: "critical" },
  { item: "Name tag rolls", qty: 12, min: 20, status: "low" },
];

const welcomeQueue = [
  { guest: "Rafael Torres", visit: "First time", host: "Clara F.", status: "Waiting" },
  { guest: "Fatima Al-Hassan", visit: "2nd visit", host: "James M.", status: "Seated" },
];

export function HospitalitySuiteFeature() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="card-lumina overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Package className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-foreground">Hospitality inventory</h3>
        </div>
        <div className="divide-y divide-border/60">
          {inventory.map((row, i) => (
            <motion.div
              key={row.item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-between px-5 py-3.5"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{row.item}</p>
                <p className="text-xs text-muted-foreground">
                  {row.qty} in stock · reorder at {row.min}
                </p>
              </div>
              {row.status === "ok" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <span className={`badge ${row.status === "critical" ? "badge-red" : "badge-amber"} flex items-center gap-1`}>
                  <AlertTriangle className="w-3 h-3" />
                  {row.status === "critical" ? "Order now" : "Low"}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="card-lumina overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Coffee className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-foreground">Today&apos;s welcome queue</h3>
        </div>
        <div className="p-4 space-y-3">
          {welcomeQueue.map((g) => (
            <div key={g.guest} className="flex items-center gap-3 p-4 rounded-2xl bg-[#fff8f0] border border-amber-100">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{g.guest}</p>
                <p className="text-xs text-muted-foreground">
                  {g.visit} · Host: {g.host}
                </p>
              </div>
              <span className="badge badge-amber">{g.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
