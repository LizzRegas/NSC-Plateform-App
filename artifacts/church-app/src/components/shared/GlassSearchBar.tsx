import { Search } from "lucide-react";

interface GlassSearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  sticky?: boolean;
  children?: React.ReactNode;
}

export function GlassSearchBar({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
  sticky = false,
  children,
}: GlassSearchBarProps) {
  return (
    <div
      className={`glass-panel rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-sm ${
        sticky ? "sticky top-4 z-20" : ""
      } ${className}`}
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#c9c4d9] bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-[15px] outline-none"
        />
      </div>
      {children}
    </div>
  );
}
