import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Plus, Eye, Users, TrendingUp, Send, CheckCircle2, Heart, Calendar, FileText, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { FormDialog } from "@/components/shared/FormDialog";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const ICON_MAP: Record<string, LucideIcon> = {
  Bell,
  UserPlus,
  Heart,
  Calendar,
  FileText,
  CheckCircle2,
};

const NOTIF_TYPES = ["Event", "Content", "Action", "Finance"];

export default function NotificationsPage() {
  const notifications = useDemoState((s) => s.notifications);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", type: NOTIF_TYPES[0] });

  const stats = useMemo(
    () => [
      {
        label: "Sent This Month",
        value: String(notifications.length),
        change: "+12",
        trend: "up" as const,
        icon: Send,
        iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
        delay: 0.05,
      },
      {
        label: "Open Rate",
        value: "82%",
        change: "+6%",
        trend: "up" as const,
        icon: Eye,
        iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        delay: 0.1,
      },
      {
        label: "Push Subscribers",
        value: "648",
        change: "+24",
        trend: "up" as const,
        icon: Users,
        iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600",
        delay: 0.15,
      },
      {
        label: "Action Rate",
        value: "31%",
        change: "+4%",
        trend: "up" as const,
        icon: TrendingUp,
        iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600",
        delay: 0.2,
      },
    ],
    [notifications.length],
  );

  const createNotification = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: generateId("n"),
        title: form.title.trim(),
        body: form.body.trim(),
        sent: "Just now",
        type: form.type,
        icon: form.type === "Event" ? "Calendar" : form.type === "Finance" ? "Heart" : form.type === "Action" ? "UserPlus" : "FileText",
        color: "text-[#5932EA] bg-[#5932EA]/10",
        read: false,
        href: "/comms/notifications",
      },
    });
    success("Notification created", form.title.trim());
    setForm({ title: "", body: "", type: NOTIF_TYPES[0] });
    setDialogOpen(false);
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Notifications"
          subtitle="Push notifications for the member portal and app"
          section="Communication"
          action={
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
            >
              <Plus className="w-4 h-4" /> Create Notification
            </button>
          }
        />
        <KpiGrid stats={stats} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26 }}
          className="card-lumina overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Sent Notifications
            </h3>
          </div>
          <div className="divide-y divide-border/40">
            {notifications.map((n, i) => {
              const Icon = ICON_MAP[n.icon] ?? Bell;
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.3 + i * 0.06 }}
                  className="flex items-start gap-4 px-5 py-4 hover:bg-accent/30 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {n.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="badge badge-gray">{n.type}</span>
                      <span className="text-xs text-muted-foreground">{n.sent}</span>
                    </div>
                  </div>
                  <span className="badge badge-green shrink-0">Sent</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Create notification"
          description="Send a push notification to member portal subscribers."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setDialogOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary px-4 py-2 rounded-xl text-sm"
                disabled={!form.title.trim() || !form.body.trim()}
                onClick={createNotification}
              >
                Send notification
              </button>
            </>
          }
        >
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary"
              placeholder="Notification title"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Message</label>
            <textarea
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              rows={3}
              className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary resize-none"
              placeholder="Notification body"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary"
            >
              {NOTIF_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
