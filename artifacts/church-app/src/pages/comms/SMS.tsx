import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Send, Plus, Users, MessageSquare } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { TrendingUp, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Sent This Month", value: "156", change: "+28", trend: "up" as const, icon: Send, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
  { label: "Delivery Rate", value: "98.2%", change: "+0.4%", trend: "up" as const, icon: CheckCircle2, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
  { label: "Opt-in Members", value: "842", change: "+36", trend: "up" as const, icon: Users, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.15 },
  { label: "Responses", value: "48", change: "+12", trend: "up" as const, icon: MessageSquare, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
];

const messages = [
  { text: "Reminder: Youth Night is tomorrow at 7pm in the Youth Room. See you there!", audience: "Youth & Parents", sent: "Apr 9, 10am", recipients: 148, status: "Delivered" },
  { text: "Sunday Service starts in 1 hour! Come early for coffee and fellowship. See you soon.", audience: "All Members", sent: "Apr 6, 8:30am", recipients: 842, status: "Delivered" },
  { text: "Palm Sunday Special Service this Sunday — extra chairs will be available. Bring a friend!", audience: "All Members", sent: "Apr 3, 9am", recipients: 842, status: "Delivered" },
  { text: "Your volunteer shift for Sunday service is confirmed. Thank you for serving!", audience: "Volunteers", sent: "Apr 2, 4pm", recipients: 64, status: "Delivered" },
];

export default function SMS() {
  const [draft, setDraft] = useState("");
  const [audience, setAudience] = useState("All Members");

  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="SMS" subtitle="Send text messages to members and groups" section="Communication"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> New Message
            </button>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Compose */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Compose Message</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block"
                  style={{ fontFamily: "'Manrope', sans-serif" }}>Audience</label>
                <select value={audience} onChange={e => setAudience(e.target.value)}
                  className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all">
                  <option>All Members</option><option>Youth & Parents</option><option>Volunteers</option>
                  <option>Leaders</option><option>New Members</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block"
                  style={{ fontFamily: "'Manrope', sans-serif" }}>Message</label>
                <textarea value={draft} onChange={e => setDraft(e.target.value.slice(0, 160))} rows={5}
                  placeholder="Type your message here..." maxLength={160}
                  className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none" />
                <p className="text-xs text-muted-foreground mt-1 text-right" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {draft.length}/160 characters
                </p>
              </div>
              <button className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm">
                <Send className="w-4 h-4" /> Send Now
              </button>
              <button className="btn-secondary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm">
                Schedule for Later
              </button>
            </div>
          </motion.div>

          {/* History */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.32 }}
            className="xl:col-span-2 bg-card rounded-2xl border border-border overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Recent Messages</h3>
            </div>
            <div className="divide-y divide-border/40">
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.36 + i * 0.06 }}
                  className="p-5 hover:bg-accent/30 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="text-sm text-foreground leading-relaxed">{m.text}</p>
                    <span className="badge badge-green shrink-0">{m.status}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="badge badge-gray">{m.audience}</span>
                    <div className="flex items-center gap-1"><Users className="w-3 h-3" />
                      <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>{m.recipients}</span>
                    </div>
                    <span>{m.sent}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
