import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Send, Users, MessageSquare, CheckCircle2 } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const AUDIENCES = ["All Members", "Youth & Parents", "Volunteers", "Leaders", "New Members"];

const RECIPIENT_EST: Record<string, number> = {
  "All Members": 842,
  "Youth & Parents": 148,
  Volunteers: 64,
  Leaders: 32,
  "New Members": 24,
};

function formatSent(when: "now" | "scheduled") {
  const d = new Date();
  if (when === "scheduled") d.setDate(d.getDate() + 1);
  return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function SMS() {
  const [draft, setDraft] = useState("");
  const [audience, setAudience] = useState("All Members");
  const smsMessages = useDemoState((s) => s.smsMessages);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();

  const stats = useMemo(
    () => [
      {
        label: "Sent This Month",
        value: String(smsMessages.length),
        change: `+${Math.min(smsMessages.length, 28)}`,
        trend: "up" as const,
        icon: Send,
        iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
        delay: 0.05,
      },
      {
        label: "Delivery Rate",
        value: "98.2%",
        change: "+0.4%",
        trend: "up" as const,
        icon: CheckCircle2,
        iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        delay: 0.1,
      },
      {
        label: "Opt-in Members",
        value: "842",
        change: "+36",
        trend: "up" as const,
        icon: Users,
        iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600",
        delay: 0.15,
      },
      {
        label: "Responses",
        value: "48",
        change: "+12",
        trend: "up" as const,
        icon: MessageSquare,
        iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600",
        delay: 0.2,
      },
    ],
    [smsMessages.length],
  );

  const sendSms = (scheduled: boolean) => {
    if (!draft.trim()) return;
    dispatch({
      type: "ADD_SMS",
      payload: {
        id: generateId("sms"),
        text: draft.trim(),
        audience,
        sent: formatSent(scheduled ? "scheduled" : "now"),
        recipients: RECIPIENT_EST[audience] ?? 100,
        status: scheduled ? "Scheduled" : "Delivered",
      },
    });
    success(scheduled ? "SMS scheduled" : "SMS sent", `Message queued for ${audience}`);
    setDraft("");
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader title="SMS" subtitle="Send text messages to members and groups" section="Communication" />
        <KpiGrid stats={stats} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.26 }}
            className="card-lumina overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
          >
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Compose Message
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label
                  className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Audience
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                >
                  {AUDIENCES.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Message
                </label>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value.slice(0, 160))}
                  rows={5}
                  placeholder="Type your message here..."
                  maxLength={160}
                  className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {draft.length}/160 characters
                </p>
              </div>
              <button
                type="button"
                disabled={!draft.trim()}
                onClick={() => sendSms(false)}
                className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Send Now
              </button>
              <button
                type="button"
                disabled={!draft.trim()}
                onClick={() => sendSms(true)}
                className="btn-secondary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm disabled:opacity-50"
              >
                Schedule for Later
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
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Recent Messages
              </h3>
            </div>
            <div className="divide-y divide-border/40">
              {smsMessages.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.36 + i * 0.06 }}
                  className="p-5 hover:bg-accent/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="text-sm text-foreground leading-relaxed">{m.text}</p>
                    <span className={`badge shrink-0 ${m.status === "Scheduled" ? "badge-amber" : "badge-green"}`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="badge badge-gray">{m.audience}</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>{m.recipients}</span>
                    </div>
                    <span>{m.sent}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageCanvas>
    </PageTransition>
  );
}
