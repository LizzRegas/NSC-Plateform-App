import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Users, CheckCircle2, Clock, TrendingUp, Search } from "lucide-react";
import { Link } from "wouter";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass } from "@/components/shared/forms/FormField";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import type { CheckIn } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-teal-500",
  "from-violet-500 to-[#5932EA]",
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Checkin() {
  const checkIns = useDemoState((s) => s.checkIns);
  const members = useDemoState((s) => s.members);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [manualName, setManualName] = useState("");

  const filteredMembers = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return members.slice(0, 6);
    return members.filter((m) => m.name.toLowerCase().includes(q)).slice(0, 8);
  }, [members, search]);

  const stats = [
    { label: "Checked In Today", value: String(checkIns.length), change: `+${Math.min(checkIns.length, 18)}`, trend: "up" as const, icon: CheckCircle2, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.05 },
    { label: "Total Expected", value: "320", change: "", trend: "neutral" as const, icon: Users, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.1 },
    { label: "Check-in Rate", value: `${Math.min(99, Math.round((checkIns.length / 320) * 100))}%`, change: "+4%", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.15 },
    { label: "Avg Wait Time", value: "0.8 min", change: "-0.2", trend: "up" as const, icon: Clock, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.2 },
  ];

  const addCheckin = (name: string, type: CheckIn["type"]) => {
    const payload: CheckIn = {
      id: generateId("ci"),
      name,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      event: "Sunday Service",
      type,
      avatar: initials(name),
      color: AVATAR_COLORS[checkIns.length % AVATAR_COLORS.length],
    };
    dispatch({ type: "ADD_CHECKIN", payload });
    success("Checked in", name);
  };

  const handleManualCheckin = () => {
    if (!manualName.trim()) return;
    addCheckin(manualName.trim(), "Manual");
    setManualName("");
    setDialogOpen(false);
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Check-in"
          subtitle="Manage event attendance and self check-in"
          section="Events"
          action={
            <Link href="/events/checkin/kiosk" className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <QrCode className="w-4 h-4" /> Open Check-in Kiosk
            </Link>
          }
        />
        <KpiGrid stats={stats} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.26 }}
            className="card-lumina overflow-hidden flex flex-col"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
          >
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Manual Check-in
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Sunday Service — May 2026</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-48 h-48 border-2 border-dashed border-primary/40 rounded-3xl flex flex-col items-center justify-center gap-4 bg-primary/3 mb-6">
                <QrCode className="w-16 h-16 text-primary/60" strokeWidth={1} />
                <p className="text-xs text-muted-foreground text-center" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Search or check in manually
                </p>
              </div>
              <div className="relative w-full max-w-xs mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <div className="w-full max-w-xs space-y-2 mb-4">
                {filteredMembers.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => addCheckin(m.name, "Manual")}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-accent/50 transition-colors border border-border/50"
                  >
                    {m.name}
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => setDialogOpen(true)} className="btn-primary text-sm px-4 py-2 rounded-xl">
                Check in by name
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.32 }}
            className="xl:col-span-2 card-lumina overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Recent Check-ins
              </h3>
              <span className="badge badge-green">Live</span>
            </div>
            <div className="divide-y divide-border/40">
              {checkIns.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.36 + i * 0.05 }}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-accent/30 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 bg-gradient-to-br ${c.color}`}
                    style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}
                  >
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {c.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{c.event}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {c.time}
                    </p>
                    <span className={c.type === "QR Code" ? "badge badge-blue" : "badge badge-gray"}>{c.type}</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Manual Check-in"
          description="Enter a guest or member name to check in."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setDialogOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary px-4 py-2 rounded-xl text-sm" onClick={handleManualCheckin}>
                Check In
              </button>
            </>
          }
        >
          <FormField label="Full name" htmlFor="checkin-name">
            <input id="checkin-name" value={manualName} onChange={(e) => setManualName(e.target.value)} className={inputClass} placeholder="Guest name" />
          </FormField>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
