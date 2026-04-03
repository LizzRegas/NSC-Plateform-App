import { useState } from "react";
import { Search, Bell, Globe, ChevronDown, User, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

interface TopBarProps {
  onMobileMenuToggle?: () => void;
}

export function TopBar({ onMobileMenuToggle }: TopBarProps) {
  const [lang, setLang] = useState(languages[0]);
  const [langOpen, setLangOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-16 shrink-0 flex items-center gap-3 px-4 sm:px-6 bg-card border-b border-border"
      style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)" }}>

      {/* Mobile menu btn */}
      <button
        className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
        onClick={onMobileMenuToggle}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className={`relative flex items-center gap-2 rounded-xl border transition-all duration-200 px-3 py-2 ${
          searchFocused
            ? "border-primary bg-card shadow-sm ring-3 ring-primary/10"
            : "border-border bg-background hover:border-border/60"
        }`}>
          <Search className={`w-4 h-4 shrink-0 transition-colors ${searchFocused ? "text-primary" : "text-muted-foreground"}`} />
          <input
            type="search"
            placeholder="Search members, events, groups..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-semibold text-muted-foreground bg-muted/80 px-1.5 py-0.5 rounded-md border border-border/60"
            style={{ fontFamily: "'Manrope', sans-serif" }}>
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        {/* Language */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent border border-transparent hover:border-border/60 transition-all duration-150"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:block text-xs font-semibold">{lang.label}</span>
            <span className="sm:hidden text-xs font-bold">{lang.flag}</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setLangOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.14 }}
                  className="absolute right-0 top-full mt-2 w-44 bg-card border border-border rounded-2xl overflow-hidden z-40"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm transition-colors text-left ${
                        lang.code === l.code ? "bg-secondary text-primary font-semibold" : "text-foreground hover:bg-accent"
                      }`}
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      <span className="text-[10px] font-bold text-muted-foreground w-5">{l.flag}</span>
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent border border-transparent hover:border-border/60 transition-all duration-150">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-card" />
        </button>

        <div className="h-5 w-px bg-border mx-0.5" />

        {/* User */}
        <button className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-xl hover:bg-accent border border-transparent hover:border-border/60 transition-all duration-150">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)", boxShadow: "0 2px 8px rgba(37,99,235,0.25)" }}>
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-[13px] font-bold text-foreground leading-none"
              style={{ fontFamily: "'Manrope', sans-serif" }}>Admin</span>
            <span className="text-[10px] text-muted-foreground leading-none mt-0.5"
              style={{ fontFamily: "'Inter', sans-serif" }}>Pastor</span>
          </div>
          <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
