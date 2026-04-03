import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  section?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, section, action }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        {section && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-xs text-muted-foreground font-medium">{section}</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
            <span className="text-xs text-primary font-semibold">{title}</span>
          </div>
        )}
        <h1
          className="text-2xl sm:text-[1.75rem] font-bold text-foreground leading-tight"
          style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.03em" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  );
}
