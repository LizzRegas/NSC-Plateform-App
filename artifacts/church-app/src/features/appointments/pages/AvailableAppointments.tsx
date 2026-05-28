import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarClock,
  MapPin,
  Clock,
  User,
  CalendarPlus,
  Video,
  Building2,
} from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { FilterChips } from "@/components/shared/FilterChips";
import { GlassSearchBar } from "@/components/shared/GlassSearchBar";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";
import {
  getHostById,
  type AppointmentType,
  type AvailableSlot,
} from "@/features/appointments/data/appointments";

const typeFilters = ["All", "Pastoral", "Membership", "Prayer", "Counseling", "New visitor"] as const;

const typeBadge: Record<AppointmentType, string> = {
  Pastoral: "badge badge-violet",
  Membership: "badge badge-blue",
  Prayer: "badge badge-amber",
  Counseling: "badge badge-red",
  "New visitor": "badge badge-green",
};

function HostAvatar({ host }: { host: ReturnType<typeof getHostById> }) {
  if (!host) return null;
  if (host.avatar) {
    return (
      <img
        src={host.avatar}
        alt=""
        className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm"
      />
    );
  }
  return (
    <div className="w-11 h-11 rounded-full bg-[#e5deff] text-primary flex items-center justify-center font-bold text-sm">
      {host.initials}
    </div>
  );
}

export default function AvailableAppointments() {
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const availableSlots = useDemoState((s) => s.availableSlots);
  const appointmentHosts = useDemoState((s) => s.appointmentHosts);
  const scheduledAppointments = useDemoState((s) => s.scheduledAppointments);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [hostFilter, setHostFilter] = useState<string>("All");
  const [pendingSlot, setPendingSlot] = useState<AvailableSlot | null>(null);

  const stats = useMemo(
    () => [
      {
        label: "Open slots this week",
        value: String(availableSlots.filter((s) => s.spotsLeft > 0).length),
        change: "+3",
        trend: "up" as const,
        icon: CalendarClock,
        iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600",
        delay: 0.05,
      },
      {
        label: "Staff available",
        value: String(appointmentHosts.length),
        change: "—",
        trend: "up" as const,
        icon: User,
        iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
        delay: 0.1,
      },
      {
        label: "Booked today",
        value: String(
          scheduledAppointments.filter((a) => a.status === "confirmed" && a.dateLabel.includes("May 28")).length,
        ),
        change: "+2",
        trend: "up" as const,
        icon: CalendarPlus,
        iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        delay: 0.15,
      },
      {
        label: "Avg. wait time",
        value: "3.2d",
        change: "-0.8d",
        trend: "up" as const,
        icon: Clock,
        iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600",
        delay: 0.2,
      },
    ],
    [availableSlots, appointmentHosts, scheduledAppointments],
  );

  const hostOptions = useMemo(
    () => ["All", ...appointmentHosts.map((h) => h.name)],
    [appointmentHosts],
  );

  const filtered = useMemo(() => {
    return availableSlots.filter((slot) => {
      if (slot.spotsLeft <= 0) return false;
      const host = getHostById(appointmentHosts, slot.hostId);
      if (!host) return false;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        host.name.toLowerCase().includes(q) ||
        slot.type.toLowerCase().includes(q) ||
        slot.location.toLowerCase().includes(q);
      const matchesType = typeFilter === "All" || slot.type === typeFilter;
      const matchesHost = hostFilter === "All" || host.name === hostFilter;
      return matchesSearch && matchesType && matchesHost;
    });
  }, [availableSlots, appointmentHosts, search, typeFilter, hostFilter]);

  const groupedByHost = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const slot of filtered) {
      const list = map.get(slot.hostId) ?? [];
      list.push(slot);
      map.set(slot.hostId, list);
    }
    return Array.from(map.entries()).map(([hostId, slots]) => ({
      host: getHostById(appointmentHosts, hostId)!,
      slots,
    }));
  }, [filtered, appointmentHosts]);

  const handleConfirmBook = () => {
    if (!pendingSlot) return;
    const host = getHostById(appointmentHosts, pendingSlot.hostId);
    if (!host) return;

    dispatch({
      type: "BOOK_SLOT",
      payload: {
        slotId: pendingSlot.id,
        appointment: {
          id: generateId("sa"),
          personName: "Guest Booking",
          personEmail: "guest@example.com",
          hostId: pendingSlot.hostId,
          hostName: host.name,
          date: pendingSlot.date,
          dateLabel: pendingSlot.dateLabel,
          time: pendingSlot.time,
          duration: pendingSlot.duration,
          type: pendingSlot.type,
          location: pendingSlot.location,
          status: "confirmed",
          topic: `${pendingSlot.type} appointment`,
        },
      },
    });

    success("Slot booked", `${pendingSlot.dateLabel} at ${pendingSlot.time} with ${host.name}`);
    setPendingSlot(null);
  };

  const pendingHost = pendingSlot ? getHostById(appointmentHosts, pendingSlot.hostId) : null;

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Book a slot"
          subtitle="Choose an available time with a specific staff member or pastor."
          section="Appointments"
          action={
            <button type="button" className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <CalendarPlus className="w-4 h-4" />
              Request custom time
            </button>
          }
        />

        <KpiGrid stats={stats} />

        <GlassSearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by person, type, or location..."
        />

        <div className="space-y-3">
          <FilterChips options={[...typeFilters]} value={typeFilter} onChange={setTypeFilter} />
          <FilterChips options={hostOptions} value={hostFilter} onChange={setHostFilter} />
        </div>

        <div className="space-y-6">
          {groupedByHost.length === 0 ? (
            <div className="card-lumina p-10 text-center text-muted-foreground text-sm">
              No open slots match your filters. Try another type or staff member.
            </div>
          ) : (
            groupedByHost.map(({ host, slots }, gi) => (
              <motion.section
                key={host.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + gi * 0.06 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <HostAvatar host={host} />
                  <div>
                    <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {host.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {host.role} · {host.department}
                    </p>
                  </div>
                  <span className="badge badge-gray ml-auto">
                    {slots.length} slot{slots.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {slots.map((slot, si) => (
                    <motion.article
                      key={slot.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: 0.15 + si * 0.04 }}
                      className="card-lumina p-4 flex flex-col gap-3 hover:border-primary/25 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{slot.dateLabel}</p>
                          <p className="text-lg font-bold text-foreground tracking-tight">{slot.time}</p>
                          <p className="text-xs text-muted-foreground">{slot.duration}</p>
                        </div>
                        <span className={typeBadge[slot.type]}>{slot.type}</span>
                      </div>

                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          {slot.location.toLowerCase().includes("zoom") ? (
                            <Video className="w-3.5 h-3.5 shrink-0 text-primary" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                          )}
                          <span className="leading-snug">{slot.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {slot.spotsLeft} spot{slot.spotsLeft > 1 ? "s" : ""} left
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setPendingSlot(slot)}
                        className="btn-primary w-full py-2.5 rounded-xl text-sm mt-auto opacity-90 group-hover:opacity-100"
                      >
                        Book with {host.name.split(" ").slice(-1)[0]}
                      </button>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            ))
          )}
        </div>

        <ConfirmDialog
          open={!!pendingSlot}
          onOpenChange={(open) => !open && setPendingSlot(null)}
          title="Confirm booking"
          description={
            pendingSlot && pendingHost
              ? `Book ${pendingSlot.type} on ${pendingSlot.dateLabel} at ${pendingSlot.time} with ${pendingHost.name}?`
              : ""
          }
          confirmLabel="Book slot"
          onConfirm={handleConfirmBook}
        />
      </PageCanvas>
    </PageTransition>
  );
}
