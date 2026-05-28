import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "wouter";
import {
  Search,
  Bell,
  Globe,
  ChevronDown,
  Menu,
  X,
  Church,
  UserPlus,
  Heart,
  Calendar,
  FileText,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDemoState, useDemoDispatch } from "@/lib/demo-store";

const languages = [
  { code: "en", label: "English", flag: "EN" },
  { code: "fr", label: "Français", flag: "FR" },
  { code: "es", label: "Español", flag: "ES" },
  { code: "pt", label: "Português", flag: "PT" },
  { code: "de", label: "Deutsch", flag: "DE" },
  { code: "it", label: "Italiano", flag: "IT" },
  { code: "zh", label: "中文", flag: "ZH" },
  { code: "ar", label: "العربية", flag: "AR" },
];

const NOTIF_ICONS: Record<string, LucideIcon> = {
  Bell,
  UserPlus,
  Heart,
  Calendar,
  FileText,
  CheckCircle2,
};

function openCommandPalette() {
  document.dispatchEvent(new CustomEvent("open-command-palette"));
}

interface TopBarProps {
  onMobileMenuToggle?: () => void;
}

export function TopBar({ onMobileMenuToggle }: TopBarProps) {
  const [lang, setLang] = useState(languages[0]);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const notifications = useDemoState((s) => s.notifications);
  const dispatch = useDemoDispatch();
  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  useEffect(() => {
    if (mobileSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [mobileSearchOpen]);

  const handleSearchFocus = () => {
    openCommandPalette();
  };

  return (
    <header className="topbar-shell relative z-20 h-[3.25rem] sm:h-[4.25rem] shrink-0 flex items-center gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#5932EA]/25 to-transparent"
        aria-hidden
      />

      <button
        type="button"
        aria-label="Open menu"
        className="topbar-icon-btn lg:hidden shrink-0"
        onClick={onMobileMenuToggle}
      >
        <Menu className="w-[18px] h-[18px]" strokeWidth={2} />
      </button>

      {!mobileSearchOpen && (
        <button
          type="button"
          aria-label="Search"
          className="topbar-icon-btn sm:hidden shrink-0"
          onClick={() => {
            setMobileSearchOpen(true);
            openCommandPalette();
          }}
        >
          <Search className="w-[18px] h-[18px]" strokeWidth={2} />
        </button>
      )}

      <div
        className={`min-w-0 flex-1 sm:max-w-md lg:max-w-lg ${
          mobileSearchOpen ? "flex" : "hidden sm:flex"
        }`}
      >
        <label className="topbar-search relative flex w-full items-center gap-2.5 rounded-2xl px-3.5 py-2 sm:py-2.5 cursor-text">
          <Search className="w-4 h-4 shrink-0 text-[#5932EA]/70" strokeWidth={2.25} />
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Search members, events, groups…"
            readOnly
            onClick={handleSearchFocus}
            onFocus={handleSearchFocus}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 outline-none tracking-tight cursor-pointer"
          />
          <kbd className="hidden md:inline-flex items-center gap-0.5 font-label text-[10px] font-semibold text-muted-foreground/90 bg-white/80 px-2 py-1 rounded-lg border border-[#c9c4d9]/50 shadow-sm">
            ⌘K
          </kbd>
          {mobileSearchOpen && (
            <button
              type="button"
              aria-label="Close search"
              className="topbar-icon-btn !w-8 !h-8 sm:hidden shrink-0"
              onClick={() => setMobileSearchOpen(false)}
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          )}
        </label>
      </div>

      <div
        className={`ml-auto flex shrink-0 items-center ${
          mobileSearchOpen ? "hidden sm:flex" : "flex"
        }`}
      >
        <div className="topbar-actions flex items-center gap-0.5 sm:gap-1 rounded-2xl p-1 sm:p-1.5">
          <div className="relative">
            <button
              type="button"
              title="Display only — translations not enabled"
              aria-label={`Language: ${lang.label}`}
              aria-expanded={langOpen}
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 h-9 sm:h-10 px-2 sm:px-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/80 border border-transparent hover:border-[#c9c4d9]/40 transition-all duration-200"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#5932EA]/8 text-[#5932EA]">
                <Globe className="w-3.5 h-3.5" strokeWidth={2.25} />
              </span>
              <span className="hidden sm:block font-label text-xs text-foreground/90 max-w-[4.5rem] truncate">
                {lang.label}
              </span>
              <ChevronDown
                className={`hidden sm:block w-3 h-3 text-muted-foreground/80 transition-transform duration-300 ease-out ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setLangOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                    className="topbar-dropdown absolute right-0 top-[calc(100%+0.5rem)] w-52 rounded-2xl overflow-hidden z-40 py-1.5"
                  >
                    <p className="label-caps px-4 pt-2 pb-2 text-muted-foreground/80">Language</p>
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className={`relative w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left ${
                          lang.code === l.code
                            ? "bg-[#5932EA]/6 text-primary font-semibold"
                            : "text-foreground hover:bg-[#5932EA]/4"
                        }`}
                      >
                        {lang.code === l.code && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-[#5932EA]" />
                        )}
                        <span className="font-label text-[10px] font-bold text-muted-foreground w-5 tabular-nums">
                          {l.flag}
                        </span>
                        <span className="tracking-tight">{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <Popover open={notifOpen} onOpenChange={setNotifOpen}>
            <PopoverTrigger asChild>
              <button type="button" aria-label="Notifications" className="topbar-icon-btn relative">
                <Bell className="w-[17px] h-[17px]" strokeWidth={2} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5932EA] opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-[#5932EA] to-[#4100cf] ring-2 ring-white" />
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 sm:w-96 p-0 rounded-2xl border-[#c9c4d9]/40">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <p className="font-label text-sm font-bold text-foreground">Notifications</p>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#5932EA] hover:underline"
                    onClick={() => dispatch({ type: "MARK_ALL_NOTIFICATIONS_READ" })}
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-border/40">
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No notifications</p>
                ) : (
                  notifications.slice(0, 8).map((n) => {
                    const Icon = NOTIF_ICONS[n.icon] ?? Bell;
                    const inner = (
                      <>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-semibold truncate ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>
                            {n.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{n.body}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{n.sent}</p>
                        </div>
                        {!n.read && <span className="w-2 h-2 rounded-full bg-[#5932EA] shrink-0 mt-1" />}
                      </>
                    );
                    return n.href ? (
                      <Link key={n.id} href={n.href}>
                        <button
                          type="button"
                          className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-accent/40 transition-colors"
                          onClick={() => {
                            dispatch({ type: "MARK_NOTIFICATION_READ", payload: n.id });
                            setNotifOpen(false);
                          }}
                        >
                          {inner}
                        </button>
                      </Link>
                    ) : (
                      <button
                        key={n.id}
                        type="button"
                        className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-accent/40 transition-colors"
                        onClick={() => dispatch({ type: "MARK_NOTIFICATION_READ", payload: n.id })}
                      >
                        {inner}
                      </button>
                    );
                  })
                )}
              </div>
              <div className="px-4 py-2.5 border-t border-border">
                <Link href="/comms/notifications">
                  <span
                    className="text-xs font-semibold text-[#5932EA] cursor-pointer hover:underline"
                    onClick={() => setNotifOpen(false)}
                  >
                    View all notifications
                  </span>
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          <div className="hidden sm:block w-px h-6 bg-gradient-to-b from-transparent via-[#c9c4d9]/60 to-transparent mx-0.5" />

          <Link
            href="/profile"
            className="group flex shrink-0 items-center gap-2 sm:gap-2.5 h-9 sm:h-10 pl-1 pr-2 sm:pr-3 rounded-xl hover:bg-white/80 border border-transparent hover:border-[#c9c4d9]/40 transition-all duration-200 touch-manipulation"
            aria-label="My profile"
          >
            <div className="relative shrink-0">
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-white font-label text-xs font-bold tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #5932ea 0%, #4100cf 100%)",
                  boxShadow: "0 4px 16px rgba(89, 50, 234, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                AD
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="hidden sm:flex flex-col items-start min-w-0">
              <span className="font-label text-[13px] font-bold text-foreground leading-none tracking-tight truncate max-w-[5.5rem]">
                Admin
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground leading-none mt-1">
                <Church className="w-2.5 h-2.5 text-[#5932EA]/70" />
                Pastor
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground/70 hidden sm:block group-hover:text-foreground transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  );
}
