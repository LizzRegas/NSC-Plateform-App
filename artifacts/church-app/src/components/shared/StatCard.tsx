import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardBase {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  sub?: string;
}

/** Inline KPI row (dashboard band) */
type StatCardKpiProps = StatCardBase & {
  iconCircleClass: string;
  iconColorClass: string;
  iconGradient?: never;
  delay?: number;
};

/** Standalone KPI tile */
type StatCardLegacyProps = StatCardBase & {
  iconGradient?: string;
  iconCircleClass?: never;
  iconColorClass?: never;
  delay?: number;
};

export type StatCardProps = StatCardKpiProps | StatCardLegacyProps;

const trendPillClass = {
  up: "bg-[#e6f4ea] text-[#137333]",
  down: "bg-[#fce8e6] text-[#c5221f]",
  neutral: "bg-[#f2f4f6] text-[#484556]",
} as const;

export function StatCard(props: StatCardProps) {
  const { label, value, change, trend = "up", icon: Icon, sub } = props;
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  if ("iconCircleClass" in props && props.iconCircleClass) {
    const { iconCircleClass, iconColorClass } = props;
    return (
      <div className="flex items-start gap-4 sm:gap-5">
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl flex items-center justify-center transition-transform duration-300 ease-out group-hover/kpi:scale-[1.03] ${iconCircleClass}`}
        >
          <Icon
            className={`w-6 h-6 sm:w-7 sm:h-7 ${iconColorClass}`}
            strokeWidth={2}
          />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="font-label text-xs text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          <p className="font-metric text-2xl sm:text-[1.75rem] text-foreground leading-tight mt-1 tracking-tight">
            {value}
          </p>
          {(change || sub) && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {change && (
                <span
                  className={`inline-flex items-center gap-0.5 font-label text-[11px] px-2 py-0.5 rounded-full ${trendPillClass[trend]}`}
                >
                  <TrendIcon className="w-3 h-3" strokeWidth={2.5} />
                  {change}
                </span>
              )}
              {sub && (
                <span className="text-xs text-muted-foreground">{sub}</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  const delay = "delay" in props ? (props.delay ?? 0) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.4, 0, 0.2, 1] }}
      className="card-lumina card-lumina-interactive p-5 lg:p-6 h-full"
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="w-11 h-11 rounded-2xl bg-[#e5deff] flex items-center justify-center text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <Icon className="w-5 h-5" strokeWidth={2} />
        </div>
        {change && (
          <span
            className={`flex items-center gap-1 text-[11px] font-label px-2.5 py-1 rounded-full shrink-0 ${trendPillClass[trend]}`}
          >
            <TrendIcon className="w-3 h-3" strokeWidth={2.5} />
            {change}
          </span>
        )}
      </div>
      <p className="font-metric text-[1.65rem] lg:text-[1.75rem] leading-none text-foreground tracking-tight">
        {value}
      </p>
      <p className="font-label text-sm text-muted-foreground mt-2">{label}</p>
      {sub && <p className="text-xs text-muted-foreground/80 mt-1">{sub}</p>}
    </motion.div>
  );
}
