import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Users, UserCircle, UsersRound, BookOpen, Target,
  Heart, CreditCard, BarChart3, FileSpreadsheet, Receipt, Music2,
  CalendarRange, Headphones, CalendarDays, ClipboardList, QrCode,
  Mail, MessageSquare, Bell, FileText, Globe2, Settings, ChevronLeft,
  ChevronRight, ChevronDown, Building2, PieChart, Banknote, CheckSquare,
  Smartphone, X,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onMobileClose?: () => void;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface NavSection {
  label: string;
  icon: React.ElementType;
  items: NavItem[];
  defaultOpen?: boolean;
}

const topItem: NavItem = { icon: LayoutDashboard, label: "Dashboard", href: "/" };

const navSections: NavSection[] = [
  {
    label: "People", icon: Users, defaultOpen: true,
    items: [
      { icon: UserCircle, label: "Members", href: "/members" },
      { icon: UsersRound, label: "Groups", href: "/groups" },
      { icon: BookOpen, label: "Directory", href: "/directory" },
      { icon: Target, label: "Follow-up", href: "/followup" },
    ],
  },
  {
    label: "Giving", icon: Heart,
    items: [
      { icon: CreditCard, label: "Contributions", href: "/giving/contributions" },
      { icon: ClipboardList, label: "Pledges", href: "/giving/pledges" },
      { icon: FileSpreadsheet, label: "Statements", href: "/giving/statements" },
    ],
  },
  {
    label: "Finance", icon: Banknote,
    items: [
      { icon: BarChart3, label: "Accounting", href: "/finance/accounting" },
      { icon: PieChart, label: "Budget", href: "/finance/budget" },
      { icon: Receipt, label: "Reports", href: "/finance/reports" },
    ],
  },
  {
    label: "Worship", icon: Music2,
    items: [
      { icon: CalendarRange, label: "Service Planning", href: "/worship/planning" },
      { icon: Headphones, label: "Song Library", href: "/worship/songs" },
      { icon: UsersRound, label: "Teams", href: "/worship/teams" },
    ],
  },
  {
    label: "Events", icon: CalendarDays,
    items: [
      { icon: CalendarDays, label: "Calendar", href: "/events/calendar" },
      { icon: CheckSquare, label: "Volunteers", href: "/events/volunteers" },
      { icon: QrCode, label: "Check-in", href: "/events/checkin" },
    ],
  },
  {
    label: "Communication", icon: MessageSquare,
    items: [
      { icon: Mail, label: "Email", href: "/comms/email" },
      { icon: Smartphone, label: "SMS", href: "/comms/sms" },
      { icon: Bell, label: "Notifications", href: "/comms/notifications" },
    ],
  },
  {
    label: "Forms", icon: FileText,
    items: [
      { icon: FileText, label: "All Forms", href: "/forms" },
      { icon: BarChart3, label: "Submissions", href: "/forms/submissions" },
    ],
  },
  {
    label: "Member Portal", icon: Globe2,
    items: [
      { icon: Building2, label: "Page Builder", href: "/portal/builder" },
      { icon: BookOpen, label: "Blog", href: "/portal/blog" },
    ],
  },
];

const bottomItems: NavItem[] = [
  { icon: Settings, label: "Settings", href: "/settings" },
];

function NavLeaf({ item, collapsed, onClick }: { item: NavItem; collapsed: boolean; onClick?: () => void }) {
  const [location] = useLocation();
  const isActive = item.href === location;

  return (
    <Link href={item.href} onClick={onClick}>
      <div
        className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 select-none ${
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground/55 hover:text-foreground hover:bg-accent"
        } ${collapsed ? "justify-center" : ""}`}
        style={isActive ? { boxShadow: "0 2px 8px rgba(37,99,235,0.28), inset 0 1px 0 rgba(255,255,255,0.15)" } : {}}
        title={collapsed ? item.label : undefined}
      >
        <item.icon className={`shrink-0 ${collapsed ? "w-[18px] h-[18px]" : "w-4 h-4"}`} strokeWidth={2} />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.16 }}
              className="text-[13px] font-medium whitespace-nowrap overflow-hidden"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="absolute left-full ml-2.5 px-2.5 py-1.5 bg-foreground text-background text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500 }}>
            {item.label}
          </div>
        )}
      </div>
    </Link>
  );
}

function NavGroup({ section, collapsed, onLeafClick }: { section: NavSection; collapsed: boolean; onLeafClick?: () => void }) {
  const [open, setOpen] = useState(section.defaultOpen ?? false);
  const [location] = useLocation();
  const hasActive = section.items.some((i) => i.href === location);

  return (
    <div>
      <button
        onClick={() => !collapsed && setOpen(!open)}
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 group select-none ${
          hasActive ? "text-primary" : "text-foreground/40 hover:text-foreground/70"
        } ${collapsed ? "justify-center" : "justify-between"}`}
        title={collapsed ? section.label : undefined}
      >
        <div className="flex items-center gap-2.5">
          <section.icon className={`shrink-0 ${collapsed ? "w-[18px] h-[18px]" : "w-3.5 h-3.5"}`} strokeWidth={2} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.16 }}
                className="text-[10px] font-bold uppercase tracking-[0.1em] whitespace-nowrap overflow-hidden"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {section.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {!collapsed && (
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-3 h-3 opacity-40" />
          </motion.div>
        )}
        {collapsed && (
          <div className="absolute left-full ml-2.5 px-2.5 py-1.5 bg-foreground text-background text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500 }}>
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
            <div className={`mt-0.5 space-y-0.5 ${collapsed ? "" : "ml-2.5 pl-3 border-l border-border/50"}`}>
              {section.items.map((item) => (
                <NavLeaf key={item.label} item={item} collapsed={collapsed} onClick={onLeafClick} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar({ collapsed, onToggle, onMobileClose }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 252 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-full bg-sidebar border-r border-sidebar-border shrink-0 z-20 overflow-hidden sidebar-shadow"
    >
      {/* Logo */}
      <div className={`flex items-center h-16 shrink-0 px-4 border-b border-sidebar-border ${collapsed ? "justify-center" : "gap-3"}`}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)", boxShadow: "0 4px 12px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.2)" }}>
          <Building2 className="w-[18px] h-[18px] text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col overflow-hidden"
            >
              <span className="text-[15px] font-bold tracking-tight text-foreground leading-none"
                style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.02em" }}>
                Lumina
              </span>
              <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-[0.12em] leading-none mt-0.5"
                style={{ fontFamily: "'Manrope', sans-serif" }}>
                Church Platform
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Mobile close button */}
        {!collapsed && (
          <button className="ml-auto p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent lg:hidden" onClick={onMobileClose}>
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-2 space-y-1">
        <div className="mb-3">
          <NavLeaf item={topItem} collapsed={collapsed} onClick={onMobileClose} />
        </div>
        <div className="space-y-2.5">
          {navSections.map((section) => (
            <NavGroup key={section.label} section={section} collapsed={collapsed} onLeafClick={onMobileClose} />
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div className="shrink-0 border-t border-sidebar-border px-2 py-3 space-y-0.5">
        {bottomItems.map((item) => (
          <NavLeaf key={item.label} item={item} collapsed={collapsed} onClick={onMobileClose} />
        ))}
      </div>

      {/* Toggle */}
      <button
        onClick={onToggle}
        className="hidden lg:flex absolute -right-3 top-[4.5rem] w-6 h-6 rounded-full bg-card border border-border items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all z-30"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
