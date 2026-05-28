export { DemoStoreProvider, useDemoStore, useDemoState, useDemoDispatch } from "./DemoStoreProvider";

export function generateId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function downloadCsv(filename: string, headers: string[], rows: string[][]) {
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const content = [headers.map(escape).join(","), ...rows.map((r) => r.map(escape).join(","))].join("\n");
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export type {
  DemoState,
  DemoAction,
  Member,
  MemberRole,
  MemberStatus,
  MembershipStage,
  Group,
  FollowUpItem,
  FollowUpColumn,
  FollowUpPriority,
  FormDefinition,
  FormSubmission,
  FormFieldType,
  Contribution,
  PledgeCampaign,
  GivingStatement,
  FinanceTransaction,
  FinanceAccount,
  BudgetCategory,
  CalendarEvent,
  VolunteerSlot,
  CheckIn,
  EmailMessage,
  SmsMessage,
  AppNotification,
  WorshipSong,
  ServicePlan,
  ServicePlanItem,
  DemoSettings,
  ScheduledAppointment,
  AvailableSlot,
  AppointmentToPlan,
  AppointmentType,
} from "./types";
