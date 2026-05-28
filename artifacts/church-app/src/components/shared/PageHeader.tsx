import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  section?: string;
  action?: React.ReactNode;
  /** Large display title (Finance, Executive pages) */
  display?: boolean;
}

export function PageHeader({ title, subtitle, section, action, display }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-4"
    >
      <div>
        {section && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-xs text-muted-foreground font-label">{section}</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
            <span className="text-xs text-primary font-label">{title}</span>
          </div>
        )}
        <h1
          className={
            display
              ? "text-3xl sm:text-[2.5rem] font-extrabold text-foreground leading-tight tracking-tight"
              : "text-2xl sm:text-[1.75rem] font-bold text-foreground leading-tight tracking-tight"
          }
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-muted-foreground mt-1.5 max-w-2xl">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0 self-start md:self-auto">{action}</div>}
    </motion.div>
  );
}
