import { motion } from "framer-motion";
import { QrCode, Users, CheckCircle2, Clock, TrendingUp, Search } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";

const stats = [
  { label: "Checked In Today", value: "284", change: "+18", trend: "up" as const, icon: CheckCircle2, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.05 },
  { label: "Total Expected", value: "320", change: "", trend: "neutral" as const, icon: Users, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.1 },
  { label: "Check-in Rate", value: "88%", change: "+4%", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.15 },
  { label: "Avg Wait Time", value: "0.8 min", change: "-0.2", trend: "up" as const, icon: Clock, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
];

const recentCheckins = [
  { name: "Marie Dubois", time: "9:28 AM", event: "Sunday Service", type: "QR Code", avatar: "MD", color: "bg-blue-500" },
  { name: "James Moreau", time: "9:30 AM", event: "Sunday Service", type: "Manual", avatar: "JM", color: "bg-violet-500" },
  { name: "Sophie Chen", time: "9:31 AM", event: "Sunday Service", type: "QR Code", avatar: "SC", color: "bg-emerald-500" },
  { name: "David Okafor", time: "9:33 AM", event: "Sunday Service", type: "QR Code", avatar: "DO", color: "bg-amber-500" },
  { name: "Thomas Blanc", time: "9:35 AM", event: "Sunday Service", type: "QR Code", avatar: "TB", color: "bg-amber-500" },
  { name: "Amara Diallo", time: "9:38 AM", event: "Sunday Service", type: "Manual", avatar: "AD", color: "bg-teal-500" },
];

export default function Checkin() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Check-in" subtitle="Manage event attendance and self check-in" section="Events"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <QrCode className="w-4 h-4" /> Open Check-in Kiosk
            </button>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* QR Scanner */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}
            className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Self Check-in</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Sunday Service — April 6, 9:30 AM</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-48 h-48 border-2 border-dashed border-primary/40 rounded-3xl flex flex-col items-center justify-center gap-4 bg-primary/3 mb-6">
                <QrCode className="w-16 h-16 text-primary/60" strokeWidth={1} />
                <p className="text-xs text-muted-foreground text-center" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Scan member QR code
                </p>
              </div>
              <p className="text-xs text-muted-foreground mb-4">— or search manually —</p>
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input placeholder="Search by name..." className="w-full pl-9 pr-3 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
              </div>
            </div>
          </motion.div>

          {/* Recent */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.32 }}
            className="xl:col-span-2 bg-card rounded-2xl border border-border overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Recent Check-ins</h3>
              <span className="badge badge-green">Live</span>
            </div>
            <div className="divide-y divide-border/40">
              {recentCheckins.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.36 + i * 0.05 }}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-accent/30 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 ${c.color}`}
                    style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}>{c.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.event}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{c.time}</p>
                    <span className={c.type === "QR Code" ? "badge badge-blue" : "badge badge-gray"}>{c.type}</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
