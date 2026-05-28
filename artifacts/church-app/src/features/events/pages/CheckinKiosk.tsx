import { useMemo } from "react";
import { motion } from "framer-motion";
import { QrCode, CheckCircle2, X, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import type { CheckIn } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const GRADIENTS = [
  "from-violet-500 to-[#5932EA]",
  "from-indigo-500 to-violet-600",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-500",
  "from-teal-500 to-cyan-600",
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CheckinKiosk() {
  const checkIns = useDemoState((s) => s.checkIns);
  const members = useDemoState((s) => s.members);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();

  const recent = useMemo(() => checkIns.slice(0, 8), [checkIns]);

  const mockQrScan = () => {
    const pool = members.length > 0 ? members.map((m) => m.name) : ["Guest Visitor", "Walk-in Guest", "New Visitor"];
    const name = pool[Math.floor(Math.random() * pool.length)];
    const payload: CheckIn = {
      id: generateId("ci"),
      name,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      event: "Sunday Service",
      type: "QR Code",
      avatar: initials(name),
      color: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
    };
    dispatch({ type: "ADD_CHECKIN", payload });
    success("Welcome!", `${name} checked in`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a3e] via-[#2d1b69] to-[#5932EA] text-white flex flex-col">
      <header className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Lumina Check-in
            </p>
            <p className="text-xs text-white/70">Sunday Service · Kiosk Mode</p>
          </div>
        </div>
        <Link href="/events/checkin" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm transition-colors">
          <X className="w-4 h-4" /> Exit Kiosk
        </Link>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 p-6 sm:p-12 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center flex-1"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Scan to check in
          </h1>
          <p className="text-white/75 mb-10 max-w-md text-sm sm:text-base">
            Hold your member QR code in front of the scanner, or tap the button below to simulate a scan.
          </p>
          <button
            type="button"
            onClick={mockQrScan}
            className="group relative w-64 h-64 sm:w-80 sm:h-80 rounded-[2.5rem] border-2 border-dashed border-white/40 bg-white/5 hover:bg-white/10 hover:border-white/60 transition-all flex flex-col items-center justify-center gap-6"
          >
            <QrCode className="w-24 h-24 sm:w-28 sm:h-28 text-white/80 group-hover:scale-105 transition-transform" strokeWidth={1} />
            <span className="text-sm font-bold uppercase tracking-widest text-white/90">Tap to scan</span>
          </button>
          <p className="mt-8 text-xs text-white/50">{checkIns.length} checked in today</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="w-full lg:max-w-sm flex-1"
        >
          <h2 className="label-caps text-white/60 mb-4">Recent arrivals</h2>
          <div className="space-y-3 max-h-[50vh] overflow-y-auto scrollbar-thin pr-1">
            {recent.length === 0 ? (
              <p className="text-sm text-white/50">Waiting for first check-in…</p>
            ) : (
              recent.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-sm font-bold shrink-0`}>
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{c.name}</p>
                    <p className="text-xs text-white/60">{c.time}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
