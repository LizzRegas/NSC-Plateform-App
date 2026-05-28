import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Users, CheckCircle2, Clock, CalendarDays, Mail, Baby, Monitor, TrendingUp, type LucideIcon } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass, selectClass } from "@/components/shared/forms/FormField";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import type { VolunteerSlot } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const ROLE_ICONS: Record<string, LucideIcon> = {
  Users,
  Baby,
  Monitor,
};

const statusColors: Record<string, string> = {
  Confirmed: "badge badge-green",
  Pending: "badge badge-amber",
  Unconfirmed: "badge badge-red",
};

export default function Volunteers() {
  const volunteerRoles = useDemoState((s) => s.volunteerRoles);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeRoleId, setActiveRoleId] = useState(volunteerRoles[0]?.id ?? "");
  const [form, setForm] = useState({ name: "", event: "Sunday Service", date: "Jun 1", status: "Pending" as VolunteerSlot["status"] });

  const allSlots = useMemo(() => volunteerRoles.flatMap((r) => r.slots), [volunteerRoles]);
  const confirmed = allSlots.filter((s) => s.status === "Confirmed").length;
  const pending = allSlots.filter((s) => s.status === "Pending" || s.status === "Unconfirmed").length;

  const stats = [
    { label: "Total Volunteers", value: String(new Set(allSlots.map((s) => s.name)).size), change: "+12", trend: "up" as const, icon: Users, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
    { label: "Confirmed This Week", value: String(confirmed), change: "+8", trend: "up" as const, icon: CheckCircle2, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
    { label: "Pending Confirmation", value: String(pending), change: "-3", trend: "up" as const, icon: Clock, iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.15 },
    { label: "Avg Hours/Month", value: "8.4", change: "+1.2", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.2 },
  ];

  const openAddSlot = (roleId: string) => {
    setActiveRoleId(roleId);
    setForm({ name: "", event: "Sunday Service", date: "Jun 1", status: "Pending" });
    setDialogOpen(true);
  };

  const handleAddSlot = () => {
    if (!form.name.trim() || !activeRoleId) return;
    const role = volunteerRoles.find((r) => r.id === activeRoleId);
    const payload: VolunteerSlot = {
      id: generateId("vs"),
      roleId: activeRoleId,
      name: form.name.trim(),
      event: form.event.trim(),
      date: form.date.trim(),
      status: form.status,
    };
    dispatch({ type: "ADD_VOLUNTEER_SLOT", payload });
    success("Slot added", `${form.name} — ${role?.role ?? "Volunteer"}`);
    setDialogOpen(false);
  };

  const handleNotifyAll = () => {
    success("Notifications sent", `Reminders sent to ${allSlots.length} volunteer slots.`);
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Volunteers"
          subtitle="Volunteer scheduling and role assignments"
          section="Events"
          action={
            <div className="flex gap-2">
              <button type="button" onClick={handleNotifyAll} className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
                <Mail className="w-4 h-4" /> Notify All
              </button>
              <button type="button" onClick={() => openAddSlot(volunteerRoles[0]?.id ?? "")} className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
                <Plus className="w-4 h-4" /> Add Volunteer
              </button>
            </div>
          }
        />
        <KpiGrid stats={stats} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {volunteerRoles.map((team, ti) => {
            const Icon = ROLE_ICONS[team.icon] ?? Users;
            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.25 + ti * 0.08 }}
                className="card-lumina overflow-hidden"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
              >
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {team.role}
                    </h3>
                    <p className="text-xs text-muted-foreground">{team.slots.length} slots</p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {team.slots.map((slot) => (
                    <motion.div
                      key={slot.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-background border border-border/60 rounded-xl p-3.5 hover:border-primary/20 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                          {slot.name}
                        </p>
                        <span className={statusColors[slot.status]}>{slot.status}</span>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="w-3 h-3" />
                          {slot.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {slot.event}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <button type="button" onClick={() => openAddSlot(team.id)} className="w-full btn-secondary flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs mt-1">
                    <Plus className="w-3 h-3" /> Add Slot
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Add Volunteer Slot"
          description="Assign a volunteer to an event slot."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setDialogOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary px-4 py-2 rounded-xl text-sm" onClick={handleAddSlot}>
                Add Slot
              </button>
            </>
          }
        >
          <FormField label="Role" htmlFor="vol-role">
            <select id="vol-role" value={activeRoleId} onChange={(e) => setActiveRoleId(e.target.value)} className={selectClass}>
              {volunteerRoles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.role}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Volunteer name" htmlFor="vol-name">
            <input id="vol-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Event" htmlFor="vol-event">
            <input id="vol-event" value={form.event} onChange={(e) => setForm({ ...form, event: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Date" htmlFor="vol-date">
            <input id="vol-date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Status" htmlFor="vol-status">
            <select id="vol-status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as VolunteerSlot["status"] })} className={selectClass}>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Unconfirmed">Unconfirmed</option>
            </select>
          </FormField>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
