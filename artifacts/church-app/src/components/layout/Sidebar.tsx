import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  UsersRound,
  BookOpen,
  Target,
  Heart,
  CreditCard,
  BarChart3,
  FileSpreadsheet,
  Receipt,
  Music2,
  CalendarRange,
  Headphones,
  CalendarDays,
  ClipboardList,
  QrCode,
  Mail,
  MessageSquare,
  Bell,
  FileText,
  Globe2,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Building2,
  PieChart,
  Banknote,
  CheckSquare,
  Smartphone,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  badge?: string | number;
}

interface NavSection {
  label: string;
  icon: React.ElementType;
  items: NavItem[];
  defaultOpen?: boolean;
}

const topItem: NavItem = {
  icon: LayoutDashboard,
  label: "Dashboard",
  href: "/",
};

const navSections: NavSection[] = [
  {
    label: "People",
    icon: Users,
    defaultOpen: true,
    items: [
      { icon: UserCircle, label: "Members", href: "/members" },
      { icon: UsersRound, label: "Groups", href: "/groups" },
      { icon: BookOpen, label: "Directory", href: "/directory" },
      { icon: Target, label: "Follow-up", href: "/followup" },
    ],
  },
  {
    label: "Giving",
    icon: Heart,
    items: [
      { icon: CreditCard, label: "Contributions", href: "/giving/contributions" },
      { icon: ClipboardList, label: "Pledges", href: "/giving/pledges" },
      { icon: FileSpreadsheet, label: "Statements", href: "/giving/statements" },
    ],
  },
  {
    label: "Finance",
    icon: Banknote,
    items: [
      { icon: BarChart3, label: "Accounting", href: "/finance/accounting" },
      { icon: PieChart, label: "Budget", href: "/finance/budget" },
      { icon: Receipt, label: "Reports", href: "/finance/reports" },
    ],
  },
  {
    label: "Worship",
    icon: Music2,
    items: [
      { icon: CalendarRange, label: "Service Planning", href: "/worship/planning" },
      { icon: Headphones, label: "Song Library", href: "/worship/songs" },
      { icon: UsersRound, label: "Teams", href: "/worship/teams" },
    ],
  },
  {
    label: "Events",
    icon: CalendarDays,
    items: [
      { icon: CalendarDays, label: "Calendar", href: "/events/calendar" },
      { icon: CheckSquare, label: "Volunteers", href: "/events/volunteers" },
      { icon: QrCode, label: "Check-in", href: "/events/checkin" },
    ],
  },
  {
    label: "Communication",
    icon: MessageSquare,
    items: [
      { icon: Mail, label: "Email", href: "/comms/email" },
      { icon: Smartphone, label: "SMS", href: "/comms/sms" },
      { icon: Bell, label: "Notifications", href: "/comms/notifications" },
    ],
  },
  {
    label: "Forms",
    icon: FileText,
    items: [
      { icon: FileText, label: "All Forms", href: "/forms" },
      { icon: BarChart3, label: "Submissions", href: "/forms/submissions" },
    ],
  },
  {
    label: "Member Portal",
    icon: Globe2,
    items: [
      { icon: Building2, label: "Page Builder", href: "/portal/builder" },
      { icon: BookOpen, label: "Blog", href: "/portal/blog" },
    ],
  },
];

const bottomItems: NavItem[] = [
  { icon: Settings, label: "Settings", href: "/settings" },
];

function SectionItem({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const [location] = useLocation();
  const isActive = item.href === location;

  return (
    <Link href={item.href ?? "/"}>
      <motion.div
        whileHover={{ x: collapsed ? 0 : 2 }}
        className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 select-none ${
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground/60 hover:text-foreground hover:bg-accent"
        }`}
        title={collapsed ? item.label : undefined}
      >
        <item.icon className={`shrink-0 ${collapsed ? "w-5 h-5" : "w-4 h-4"}`} />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.18 }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="absolute left-full ml-3 px-2 py-1 bg-foreground text-background text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
            {item.label}
          </div>
        )}
      </motion.div>
    </Link>
  );
}

function NavGroup({ section, collapsed }: { section: NavSection; collapsed: boolean }) {
  const [open, setOpen] = useState(section.defaultOpen ?? false);
  const [location] = useLocation();
  const hasActive = section.items.some((i) => i.href === location);

  return (
    <div>
      <button
        onClick={() => !collapsed && setOpen(!open)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group select-none ${
          hasActive ? "text-primary" : "text-foreground/50 hover:text-foreground"
        } ${collapsed ? "justify-center" : "justify-between"}`}
        title={collapsed ? section.label : undefined}
      >
        <div className="flex items-center gap-3">
          <section.icon className={`shrink-0 ${collapsed ? "w-5 h-5" : "w-4 h-4"}`} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap overflow-hidden"
              >
                {section.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {!collapsed && (
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3.5 h-3.5 opacity-50" />
          </motion.div>
        )}
        {collapsed && (
          <div className="absolute left-full ml-3 px-2 py-1 bg-foreground text-background text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
            {section.label}
          </div>
        )}
      </button>

      <AnimatePresence>
        {(open || collapsed) && (
          <motion.div
            initial={collapsed ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={collapsed ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`mt-0.5 space-y-0.5 ${collapsed ? "" : "ml-3 pl-3 border-l border-border/60"}`}>
              {section.items.map((item) => (
                <SectionItem key={item.label} item={item} collapsed={collapsed} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-full bg-sidebar border-r border-sidebar-border shrink-0 z-20 overflow-hidden"
    >
      {/* Logo */}
      <div className={`flex items-center h-16 shrink-0 px-4 border-b border-sidebar-border ${collapsed ? "justify-center" : "gap-3"}`}>
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-sm">
          <Building2 className="w-4.5 h-4.5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col overflow-hidden"
            >
              <span className="text-[15px] font-bold tracking-tight text-foreground leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Lumina
              </span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none mt-0.5">
                Church
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-2 space-y-1">
        {/* Dashboard — top level */}
        <div className="mb-3">
          <SectionItem item={topItem} collapsed={collapsed} />
        </div>

        <div className="space-y-3">
          {navSections.map((section) => (
            <NavGroup key={section.label} section={section} collapsed={collapsed} />
          ))}
        </div>
      </nav>

      {/* Bottom items */}
      <div className="shrink-0 border-t border-sidebar-border px-2 py-3 space-y-0.5">
        {bottomItems.map((item) => (
          <SectionItem key={item.label} item={item} collapsed={collapsed} />
        ))}
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors z-30"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
