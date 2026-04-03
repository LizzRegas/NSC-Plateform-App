import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  iconGradient: string;
  delay?: number;
  sub?: string;
}

export function StatCard({ label, value, change, trend = "up", icon: Icon, iconGradient, delay = 0, sub }: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-emerald-600 bg-emerald-50" : trend === "down" ? "text-red-500 bg-red-50" : "text-muted-foreground bg-muted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay, ease: [0.4, 0, 0.2, 1] }}
      className="card-stat p-5 group cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm ${iconGradient}`}
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)" }}>
          <Icon className="w-5 h-5 text-white" strokeWidth={2.2} />
        </div>
        {change && (
          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trendColor}`}
            style={{ fontFamily: "'Manrope', sans-serif" }}>
            <TrendIcon className="w-3 h-3" />
            {change}
          </span>
        )}
      </div>
      <p className="font-metric text-[1.6rem] leading-none text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
      {sub && <p className="text-xs text-muted-foreground/70 mt-1">{sub}</p>}
    </motion.div>
  );
}
