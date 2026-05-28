import { motion } from "framer-motion";
import type { ActivityItem } from "../data/activity-data";

interface ActivityFeedItemProps {
  item: ActivityItem;
  index?: number;
  compact?: boolean;
}

export function ActivityFeedItem({ item, index = 0, compact = false }: ActivityFeedItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.04 + index * 0.03 }}
      className="group/act flex items-start gap-4 px-5 sm:px-6 py-3.5 transition-all duration-200 hover:bg-slate-50/90 hover:shadow-[inset_3px_0_0_0_#5932EA] cursor-default"
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-200 group-hover/act:scale-105 ${item.bg}`}
      >
        <item.icon className={`w-4 h-4 transition-transform duration-200 group-hover/act:scale-110 ${item.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[13px] font-semibold text-zinc-800 leading-snug">{item.title}</p>
          {!compact && <span className="badge badge-gray text-[10px]">{item.category}</span>}
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">{item.desc}</p>
      </div>
      <div className="text-xs text-neutral-400 shrink-0 mt-0.5 whitespace-nowrap">{item.time}</div>
    </motion.div>
  );
}
