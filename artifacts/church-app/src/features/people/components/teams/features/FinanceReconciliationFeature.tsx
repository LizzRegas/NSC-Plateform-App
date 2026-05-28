import { motion } from "framer-motion";
import { Wallet, AlertCircle, CheckCircle2 } from "lucide-react";

const batches = [
  { service: "May 18 · 9:30 AM", cash: 1240, card: 4820, expected: 6100, counted: 6060, status: "variance" },
  { service: "May 18 · 11:00 AM", cash: 890, card: 3210, expected: 4100, counted: 4100, status: "balanced" },
  { service: "May 11 · 9:30 AM", cash: 1105, card: 4550, expected: 5655, counted: 5655, status: "balanced" },
];

export function FinanceReconciliationFeature() {
  return (
    <div className="space-y-3">
      {batches.map((b, i) => (
        <motion.div
          key={b.service}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="card-lumina p-5"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-600" />
              <h4 className="font-bold text-foreground">{b.service}</h4>
            </div>
            {b.status === "balanced" ? (
              <span className="badge badge-green flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Balanced
              </span>
            ) : (
              <span className="badge badge-amber flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> −$40 variance
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              { label: "Cash", value: `$${b.cash}` },
              { label: "Card", value: `$${b.card}` },
              { label: "Expected", value: `$${b.expected}` },
              { label: "Counted", value: `$${b.counted}` },
            ].map((cell) => (
              <div key={cell.label} className="rounded-xl bg-[#f7f9fb] p-3">
                <p className="text-[10px] font-label text-muted-foreground uppercase">{cell.label}</p>
                <p className="text-sm font-bold text-foreground mt-0.5">{cell.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
