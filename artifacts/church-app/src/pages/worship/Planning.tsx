import { motion } from "framer-motion";
import { Plus, ChevronRight, Music2, Clock, Mic, BookOpen, Users, Edit } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";

const services = [
  { date: "Sunday, April 6, 2026", time: "9:30 AM", title: "Morning Worship Service", theme: "Renew & Refresh", leader: "Pastor James", status: "Published" },
  { date: "Sunday, April 6, 2026", time: "11:00 AM", title: "Contemporary Service", theme: "Renew & Refresh", leader: "Pastor Marc", status: "In Progress" },
  { date: "Sunday, April 13, 2026", time: "9:30 AM", title: "Palm Sunday Service", theme: "Triumph of the King", leader: "Pastor James", status: "Draft" },
];

const serviceOrder = [
  { time: "9:30", duration: 5, type: "opening", label: "Welcome & Announcements", icon: Mic, color: "text-blue-500 bg-blue-50" },
  { time: "9:35", duration: 8, type: "song", label: "Great Is Thy Faithfulness", icon: Music2, color: "text-violet-500 bg-violet-50" },
  { time: "9:43", duration: 6, type: "song", label: "10,000 Reasons", icon: Music2, color: "text-violet-500 bg-violet-50" },
  { time: "9:49", duration: 5, type: "song", label: "Way Maker", icon: Music2, color: "text-violet-500 bg-violet-50" },
  { time: "9:54", duration: 8, type: "prayer", label: "Pastoral Prayer", icon: Users, color: "text-amber-500 bg-amber-50" },
  { time: "10:02", duration: 3, type: "reading", label: "Scripture Reading — Psalm 23", icon: BookOpen, color: "text-emerald-500 bg-emerald-50" },
  { time: "10:05", duration: 35, type: "message", label: "Sermon — The Shepherd's Care", icon: Mic, color: "text-blue-500 bg-blue-50" },
  { time: "10:40", duration: 5, type: "song", label: "Closing — Blessed Assurance", icon: Music2, color: "text-violet-500 bg-violet-50" },
  { time: "10:45", duration: 5, type: "closing", label: "Communion & Benediction", icon: BookOpen, color: "text-emerald-500 bg-emerald-50" },
];

const statusColors: Record<string, string> = {
  Published: "badge badge-green", "In Progress": "badge badge-amber", Draft: "badge badge-gray",
};

export default function Planning() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Service Planning" subtitle="Build and manage worship service orders" section="Worship"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> New Service Plan
            </button>
          }
        />

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 + i * 0.08 }}
              className="card-premium p-5 cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{s.date}</p>
                  <p className="text-xs font-bold text-primary" style={{ fontFamily: "'Manrope', sans-serif" }}>{s.time}</p>
                </div>
                <span className={statusColors[s.status]}>{s.status}</span>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{s.title}</h3>
              <p className="text-xs text-muted-foreground mb-1">Theme: <span className="font-medium text-foreground">{s.theme}</span></p>
              <p className="text-xs text-muted-foreground mb-4">Led by {s.leader}</p>
              <div className="flex items-center justify-between">
                <button className="icon-btn"><Edit className="w-3.5 h-3.5" /></button>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service order */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.34 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
            <div>
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Service Order — Apr 6 (9:30 AM)</h3>
              <p className="text-xs text-muted-foreground mt-0.5">75 minutes total · Renew & Refresh</p>
            </div>
            <button className="btn-secondary flex items-center gap-2 px-3 py-2 rounded-xl text-sm"><Plus className="w-4 h-4" /> Add Item</button>
          </div>
          <div className="p-4 space-y-2">
            {serviceOrder.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.38 + i * 0.04 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/30 transition-colors cursor-pointer group border border-transparent hover:border-border/60">
                <div className="w-12 text-right shrink-0">
                  <span className="text-xs font-bold text-muted-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{item.time}</span>
                </div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{item.label}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{item.duration} min</span>
                </div>
                <button className="icon-btn opacity-0 group-hover:opacity-100 transition-opacity"><Edit className="w-3.5 h-3.5" /></button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
