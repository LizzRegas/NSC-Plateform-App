import { useState } from "react";
import { Search, Bell, Globe, ChevronDown, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", label: "English", flag: "EN" },
  { code: "fr", label: "Français", flag: "FR" },
  { code: "es", label: "Español", flag: "ES" },
  { code: "pt", label: "Português", flag: "PT" },
  { code: "de", label: "Deutsch", flag: "DE" },
  { code: "it", label: "Italiano", flag: "IT" },
];

export function TopBar() {
  const [lang, setLang] = useState(languages[0]);
  const [langOpen, setLangOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifications] = useState(3);

  return (
    <header className="h-16 shrink-0 flex items-center gap-4 px-6 bg-card border-b border-border z-10">
      {/* Search */}
      <div className="flex-1 max-w-lg">
        <div
          className={`relative flex items-center gap-2 rounded-xl border transition-all duration-200 px-3 py-2 ${
            searchFocused
              ? "border-primary bg-card shadow-sm ring-2 ring-primary/10"
              : "border-border bg-background hover:border-border/80"
          }`}
        >
          <Search className={`w-4 h-4 shrink-0 transition-colors ${searchFocused ? "text-primary" : "text-muted-foreground"}`} />
          <input
            type="search"
            placeholder="Search members, events, groups..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <kbd className="hidden sm:flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md border border-border">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent border border-transparent hover:border-border transition-all duration-150"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:block">{lang.label}</span>
            <span className="sm:hidden text-xs font-semibold">{lang.flag}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setLangOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-40"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors text-left ${
                        lang.code === l.code
                          ? "bg-secondary text-primary font-medium"
                          : "text-foreground hover:bg-accent"
                      }`}
                    >
                      <span className="text-xs font-bold text-muted-foreground w-6">{l.flag}</span>
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-foreground/60 hover:text-foreground hover:bg-accent border border-transparent hover:border-border transition-all duration-150">
          <Bell className="w-4.5 h-4.5" />
          {notifications > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-card" />
          )}
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-border" />

        {/* User Avatar */}
        <button className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl hover:bg-accent border border-transparent hover:border-border transition-all duration-150">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-semibold text-foreground leading-none">Admin</span>
            <span className="text-[11px] text-muted-foreground leading-none mt-0.5">Pastor</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
