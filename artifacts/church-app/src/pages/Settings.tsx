import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Bell, Lock, Globe, CreditCard, Users, Palette, ChevronRight, Save } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";

const sections = [
  { id: "church", icon: Building2, label: "Church Profile", color: "text-blue-500 bg-blue-50" },
  { id: "notifications", icon: Bell, label: "Notifications", color: "text-amber-500 bg-amber-50" },
  { id: "security", icon: Lock, label: "Security & Access", color: "text-rose-500 bg-rose-50" },
  { id: "localization", icon: Globe, label: "Localization", color: "text-emerald-500 bg-emerald-50" },
  { id: "billing", icon: CreditCard, label: "Billing", color: "text-violet-500 bg-violet-50" },
  { id: "team", icon: Users, label: "Team & Roles", color: "text-teal-500 bg-teal-50" },
  { id: "appearance", icon: Palette, label: "Appearance", color: "text-indigo-500 bg-indigo-50" },
];

export default function Settings() {
  const [active, setActive] = useState("church");

  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Settings" subtitle="Configure your Lumina platform preferences" />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
          {/* Sidebar */}
          <motion.nav initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border overflow-hidden xl:h-fit"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
            <div className="divide-y divide-border/40">
              {sections.map((s, i) => (
                <motion.button key={s.id} onClick={() => setActive(s.id)}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.12 + i * 0.05 }}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 transition-all duration-150 text-left ${active === s.id ? "bg-primary/5" : "hover:bg-accent/40"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                      <s.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-sm font-semibold ${active === s.id ? "text-primary" : "text-foreground"}`}
                      style={{ fontFamily: "'Manrope', sans-serif" }}>{s.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-all ${active === s.id ? "text-primary rotate-90" : "text-muted-foreground"}`} />
                </motion.button>
              ))}
            </div>
          </motion.nav>

          {/* Content */}
          <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:col-span-3 bg-card rounded-2xl border border-border overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {sections.find(s => s.id === active)?.label}
              </h3>
            </div>
            <div className="p-6 space-y-5">
              {active === "church" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Manrope', sans-serif" }}>Church Name</label>
                      <input defaultValue="Lumina Community Church" className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Manrope', sans-serif" }}>Denomination</label>
                      <input defaultValue="Non-denominational" className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Manrope', sans-serif" }}>Phone</label>
                      <input defaultValue="+1 555 001 0000" className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Manrope', sans-serif" }}>Email</label>
                      <input defaultValue="hello@luminachurch.org" className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Manrope', sans-serif" }}>Address</label>
                      <input defaultValue="123 Faith Avenue, Montreal, QC, Canada H1A 2B3" className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Manrope', sans-serif" }}>Mission Statement</label>
                      <textarea rows={3} defaultValue="Connecting people to God, to each other, and to their purpose through authentic community and transformational faith."
                        className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none" />
                    </div>
                  </div>
                </>
              )}

              {active === "notifications" && (
                <div className="space-y-4">
                  {[
                    { label: "New member registration", desc: "Get notified when a new member registers" },
                    { label: "Form submissions", desc: "Receive alerts for new form responses" },
                    { label: "Giving received", desc: "Be notified of each new contribution" },
                    { label: "Volunteer confirmations", desc: "Alerts when volunteers confirm or decline" },
                    { label: "Weekly summary email", desc: "Receive a weekly overview of activity" },
                  ].map((n, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
                      <div>
                        <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{n.label}</p>
                        <p className="text-xs text-muted-foreground">{n.desc}</p>
                      </div>
                      <button className="relative w-11 h-6 rounded-full bg-primary transition-all cursor-pointer shrink-0"
                        style={{ boxShadow: "0 2px 6px rgba(37,99,235,0.3)" }}>
                        <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {(active === "security" || active === "localization" || active === "billing" || active === "team" || active === "appearance") && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                    {(() => { const s = sections.find(s => s.id === active); return s ? <s.icon className="w-7 h-7 text-muted-foreground" /> : null; })()}
                  </div>
                  <p className="text-base font-bold text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {sections.find(s => s.id === active)?.label} Settings
                  </p>
                  <p className="text-sm text-muted-foreground">This section is available in the full version.</p>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-border">
                <button className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
