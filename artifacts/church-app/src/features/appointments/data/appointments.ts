export type {
  AppointmentType,
  AppointmentHost,
  AvailableSlot,
  AppointmentToPlan,
  ScheduledAppointment,
} from "@/lib/demo-store/types";

import type { AppointmentHost } from "@/lib/demo-store/types";

export function getHostById(hosts: AppointmentHost[], id: string): AppointmentHost | undefined {
  return hosts.find((h) => h.id === id);
}
