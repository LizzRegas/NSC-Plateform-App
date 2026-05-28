import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Mail,
  MapPin,
  Clock,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Video,
} from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { FilterChips } from "@/components/shared/FilterChips";
import { GlassSearchBar } from "@/components/shared/GlassSearchBar";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { FormDialog } from "@/components/shared/FormDialog";
import { useDemoState, useDemoDispatch } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";
import {
  getHostById,
  type AppointmentType,
  type ScheduledAppointment,
} from "@/features/appointments/data/appointments";

const statusFilters = ["All", "Confirmed", "Cancelled"] as const;

const typeBadge: Record<AppointmentType, string> = {
  Pastoral: "badge badge-violet",
  Membership: "badge badge-blue",
  Prayer: "badge badge-amber",
  Counseling: "badge badge-red",
  "New visitor": "badge badge-green",
};

export default function ScheduledAppointments() {
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const scheduledAppointments = useDemoState((s) => s.scheduledAppointments);
  const availableSlots = useDemoState((s) => s.availableSlots);
  const appointmentHosts = useDemoState((s) => s.appointmentHosts);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [cancelTarget, setCancelTarget] = useState<ScheduledAppointment | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<ScheduledAppointment | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");

  const stats = useMemo(
    () => [
      {
        label: "Confirmed",
        value: String(scheduledAppointments.filter((a) => a.status === "confirmed").length),
        change: "+1",
        trend: "up" as const,
        icon: CheckCircle2,
        iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        delay: 0.05,
      },
      {
        label: "This week",
        value: String(
          scheduledAppointments.filter((a) => a.status === "confirmed" && a.dateLabel.includes("May")).length,
        ),
        change: "—",
        trend: "up" as const,
        icon: CalendarDays,
        iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600",
        delay: 0.1,
      },
      {
        label: "Cancelled",
        value: String(scheduledAppointments.filter((a) => a.status === "cancelled").length),
        change: "0",
        trend: "down" as const,
        icon: XCircle,
        iconGradient: "bg-gradient-to-br from-rose-500 to-rose-600",
        delay: 0.15,
      },
      {
        label: "Open slots",
        value: String(availableSlots.filter((s) => s.spotsLeft > 0).length),
        change: "+2",
        trend: "up" as const,
        icon: Clock,
        iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600",
        delay: 0.2,
      },
    ],
    [scheduledAppointments, availableSlots],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return scheduledAppointments.filter((appt) => {
      const matchesSearch =
        !q ||
        appt.personName.toLowerCase().includes(q) ||
        appt.personEmail.toLowerCase().includes(q) ||
        appt.hostName.toLowerCase().includes(q) ||
        appt.topic.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Confirmed" && appt.status === "confirmed") ||
        (statusFilter === "Cancelled" && appt.status === "cancelled");
      return matchesSearch && matchesStatus;
    });
  }, [scheduledAppointments, search, statusFilter]);

  const rescheduleSlots = useMemo(() => {
    return availableSlots.filter((s) => s.spotsLeft > 0);
  }, [availableSlots]);

  const handleCancel = () => {
    if (!cancelTarget) return;
    dispatch({ type: "CANCEL_APPOINTMENT", payload: cancelTarget.id });
    success("Appointment cancelled", `${cancelTarget.personName}'s appointment has been cancelled.`);
    setCancelTarget(null);
  };

  const handleReschedule = () => {
    if (!rescheduleTarget || !selectedSlotId) return;
    const slot = availableSlots.find((s) => s.id === selectedSlotId);
    if (!slot) return;

    dispatch({
      type: "RESCHEDULE_APPOINTMENT",
      payload: { id: rescheduleTarget.id, slotId: slot.id, slot },
    });
    success("Appointment rescheduled", `Moved to ${slot.dateLabel} at ${slot.time}.`);
    setRescheduleTarget(null);
    setSelectedSlotId("");
  };

  const openReschedule = (appt: ScheduledAppointment) => {
    setRescheduleTarget(appt);
    setSelectedSlotId(rescheduleSlots[0]?.id ?? "");
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Scheduled appointments"
          subtitle="View, reschedule, or cancel confirmed bookings."
          section="Appointments"
        />

        <KpiGrid stats={stats} />

        <GlassSearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by person, host, or topic..."
        />

        <FilterChips options={[...statusFilters]} value={statusFilter} onChange={setStatusFilter} />

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="card-lumina p-10 text-center text-muted-foreground text-sm">
              No scheduled appointments match your filters.
            </div>
          ) : (
            filtered.map((appt, i) => {
              const host = getHostById(appointmentHosts, appt.hostId);
              const isCancelled = appt.status === "cancelled";
              return (
                <motion.article
                  key={appt.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                  className={`card-lumina p-5 ${isCancelled ? "opacity-60" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p
                            className="text-sm font-bold text-foreground"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                          >
                            {appt.personName}
                          </p>
                          <p className="text-xs text-muted-foreground">{appt.topic}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={typeBadge[appt.type]}>{appt.type}</span>
                          <span
                            className={
                              appt.status === "confirmed" ? "badge badge-green" : "badge badge-gray"
                            }
                          >
                            {appt.status === "confirmed" ? "Confirmed" : "Cancelled"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {appt.dateLabel} · {appt.time} ({appt.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{appt.personEmail}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {appt.location.toLowerCase().includes("zoom") ? (
                            <Video className="w-3.5 h-3.5 shrink-0 text-primary" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                          )}
                          <span>{appt.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>With {host?.name ?? appt.hostName}</span>
                        </div>
                      </div>
                    </div>

                    {!isCancelled && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => openReschedule(appt)}
                          className="btn-secondary flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Reschedule
                        </button>
                        <button
                          type="button"
                          onClick={() => setCancelTarget(appt)}
                          className="btn-secondary flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-rose-600 hover:text-rose-700"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })
          )}
        </div>

        <ConfirmDialog
          open={!!cancelTarget}
          onOpenChange={(open) => !open && setCancelTarget(null)}
          title="Cancel appointment"
          description={
            cancelTarget
              ? `Cancel ${cancelTarget.personName}'s appointment on ${cancelTarget.dateLabel} at ${cancelTarget.time}?`
              : ""
          }
          confirmLabel="Cancel appointment"
          destructive
          onConfirm={handleCancel}
        />

        <FormDialog
          open={!!rescheduleTarget}
          onOpenChange={(open) => {
            if (!open) {
              setRescheduleTarget(null);
              setSelectedSlotId("");
            }
          }}
          title="Reschedule appointment"
          description={
            rescheduleTarget
              ? `Pick a new slot for ${rescheduleTarget.personName}.`
              : undefined
          }
          footer={
            <>
              <button
                type="button"
                className="btn-secondary px-4 py-2 rounded-xl text-sm"
                onClick={() => {
                  setRescheduleTarget(null);
                  setSelectedSlotId("");
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-primary px-4 py-2 rounded-xl text-sm"
                disabled={!selectedSlotId}
                onClick={handleReschedule}
              >
                Confirm reschedule
              </button>
            </>
          }
        >
          {rescheduleSlots.length === 0 ? (
            <p className="text-sm text-muted-foreground">No open slots available.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {rescheduleSlots.map((slot) => {
                const host = getHostById(appointmentHosts, slot.hostId);
                return (
                  <label
                    key={slot.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      selectedSlotId === slot.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reschedule-slot"
                      value={slot.id}
                      checked={selectedSlotId === slot.id}
                      onChange={() => setSelectedSlotId(slot.id)}
                      className="mt-1"
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">
                        {slot.dateLabel} · {slot.time}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {host?.name} · {slot.type} · {slot.location}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
