import type { DemoAction, DemoState } from "./types";
import { createSeedState } from "./seed";

function duplicateForm(state: DemoState, id: string): DemoState {
  const form = state.forms.find((f) => f.id === id);
  if (!form) return state;
  const copy = {
    ...form,
    id: `form-${Date.now()}`,
    name: `${form.name} (Copy)`,
    status: "Draft" as const,
    submissions: 0,
    lastSubmit: "—",
    fields: form.fields.map((f) => ({ ...f, id: `${f.id}-${Date.now()}` })),
  };
  return { ...state, forms: [...state.forms, copy] };
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "RESET":
      return createSeedState();

    case "ADD_MEMBER":
      return { ...state, members: [action.payload, ...state.members] };

    case "UPDATE_MEMBER":
      return {
        ...state,
        members: state.members.map((m) => (m.id === action.payload.id ? action.payload : m)),
      };

    case "IMPORT_MEMBERS":
      return { ...state, members: [...action.payload, ...state.members] };

    case "ADD_GROUP":
      return { ...state, groups: [action.payload, ...state.groups] };

    case "ADD_FOLLOW_UP":
      return { ...state, followUps: [action.payload, ...state.followUps] };

    case "UPDATE_FOLLOW_UP":
      return {
        ...state,
        followUps: state.followUps.map((f) => (f.id === action.payload.id ? action.payload : f)),
      };

    case "MOVE_FOLLOW_UP":
      return {
        ...state,
        followUps: state.followUps.map((f) =>
          f.id === action.payload.id ? { ...f, column: action.payload.column } : f,
        ),
      };

    case "BOOK_SLOT": {
      const slot = state.availableSlots.find((s) => s.id === action.payload.slotId);
      if (!slot || slot.spotsLeft <= 0) return state;
      const updatedSlots = state.availableSlots.map((s) =>
        s.id === action.payload.slotId ? { ...s, spotsLeft: s.spotsLeft - 1 } : s,
      );
      let plans = state.appointmentsToPlan;
      if (action.payload.planId) {
        plans = plans.filter((p) => p.id !== action.payload.planId);
      }
      return {
        ...state,
        availableSlots: updatedSlots,
        scheduledAppointments: [action.payload.appointment, ...state.scheduledAppointments],
        appointmentsToPlan: plans,
      };
    }

    case "UPDATE_SLOT":
      return {
        ...state,
        availableSlots: state.availableSlots.map((s) =>
          s.id === action.payload.id ? action.payload : s,
        ),
      };

    case "REMOVE_PLAN":
      return {
        ...state,
        appointmentsToPlan: state.appointmentsToPlan.filter((p) => p.id !== action.payload),
      };

    case "UPDATE_PLAN":
      return {
        ...state,
        appointmentsToPlan: state.appointmentsToPlan.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };

    case "CANCEL_APPOINTMENT":
      return {
        ...state,
        scheduledAppointments: state.scheduledAppointments.map((a) =>
          a.id === action.payload ? { ...a, status: "cancelled" as const } : a,
        ),
      };

    case "RESCHEDULE_APPOINTMENT": {
      const appt = state.scheduledAppointments.find((a) => a.id === action.payload.id);
      if (!appt) return state;
      const slot = action.payload.slot;
      const host = state.appointmentHosts.find((h) => h.id === slot.hostId);
      return {
        ...state,
        availableSlots: state.availableSlots.map((s) =>
          s.id === slot.id ? { ...s, spotsLeft: Math.max(0, s.spotsLeft - 1) } : s,
        ),
        scheduledAppointments: state.scheduledAppointments.map((a) =>
          a.id === action.payload.id
            ? {
                ...a,
                hostId: slot.hostId,
                hostName: host?.name ?? a.hostName,
                date: slot.date,
                dateLabel: slot.dateLabel,
                time: slot.time,
                duration: slot.duration,
                location: slot.location,
                type: slot.type,
                status: "confirmed",
              }
            : a,
        ),
      };
    }

    case "ADD_CONTRIBUTION":
      return { ...state, contributions: [action.payload, ...state.contributions] };

    case "ADD_PLEDGE":
      return { ...state, pledgeCampaigns: [action.payload, ...state.pledgeCampaigns] };

    case "UPDATE_STATEMENT":
      return {
        ...state,
        givingStatements: state.givingStatements.map((s) =>
          s.id === action.payload.id ? action.payload : s,
        ),
      };

    case "SEND_ALL_STATEMENTS":
      return {
        ...state,
        givingStatements: state.givingStatements.map((s) =>
          s.status === "Ready" ? { ...s, status: "Sent" as const } : s,
        ),
      };

    case "ADD_TRANSACTION": {
      const account = state.financeAccounts.find((a) => a.id === action.payload.accountId);
      const delta = action.payload.type === "income" ? action.payload.amount : -action.payload.amount;
      return {
        ...state,
        financeTransactions: [action.payload, ...state.financeTransactions],
        financeAccounts: state.financeAccounts.map((a) =>
          a.id === action.payload.accountId ? { ...a, balance: a.balance + delta } : a,
        ),
      };
    }

    case "ADD_BUDGET_CATEGORY":
      return { ...state, budgetCategories: [...state.budgetCategories, action.payload] };

    case "ADD_FORM":
      return { ...state, forms: [action.payload, ...state.forms] };

    case "UPDATE_FORM":
      return {
        ...state,
        forms: state.forms.map((f) => (f.id === action.payload.id ? action.payload : f)),
      };

    case "ARCHIVE_FORM":
      return {
        ...state,
        forms: state.forms.map((f) =>
          f.id === action.payload ? { ...f, status: "Archived" as const } : f,
        ),
      };

    case "DUPLICATE_FORM":
      return duplicateForm(state, action.payload);

    case "UPDATE_SUBMISSION":
      return {
        ...state,
        formSubmissions: state.formSubmissions.map((s) =>
          s.id === action.payload.id ? action.payload : s,
        ),
      };

    case "DELETE_SUBMISSION":
      return {
        ...state,
        formSubmissions: state.formSubmissions.filter((s) => s.id !== action.payload),
      };

    case "ADD_EVENT":
      return { ...state, calendarEvents: [action.payload, ...state.calendarEvents] };

    case "ADD_VOLUNTEER_SLOT":
      return {
        ...state,
        volunteerRoles: state.volunteerRoles.map((r) =>
          r.id === action.payload.roleId
            ? { ...r, slots: [...r.slots, action.payload] }
            : r,
        ),
      };

    case "ADD_CHECKIN":
      return { ...state, checkIns: [action.payload, ...state.checkIns] };

    case "ADD_EMAIL":
      return { ...state, emails: [action.payload, ...state.emails] };

    case "UPDATE_EMAIL":
      return {
        ...state,
        emails: state.emails.map((e) => (e.id === action.payload.id ? action.payload : e)),
      };

    case "DELETE_EMAIL":
      return { ...state, emails: state.emails.filter((e) => e.id !== action.payload) };

    case "ADD_SMS":
      return { ...state, smsMessages: [action.payload, ...state.smsMessages] };

    case "ADD_NOTIFICATION":
      return { ...state, notifications: [action.payload, ...state.notifications] };

    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n,
        ),
      };

    case "MARK_ALL_NOTIFICATIONS_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };

    case "ADD_SONG":
      return { ...state, worshipSongs: [action.payload, ...state.worshipSongs] };

    case "UPDATE_SONG":
      return {
        ...state,
        worshipSongs: state.worshipSongs.map((s) =>
          s.id === action.payload.id ? action.payload : s,
        ),
      };

    case "ADD_SERVICE_PLAN":
      return { ...state, servicePlans: [action.payload, ...state.servicePlans] };

    case "UPDATE_SERVICE_PLAN":
      return {
        ...state,
        servicePlans: state.servicePlans.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };

    case "UPDATE_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case "ADD_STAFF":
      return { ...state, staff: [...state.staff, action.payload] };

    case "UPDATE_STAFF":
      return {
        ...state,
        staff: state.staff.map((s) => (s.id === action.payload.id ? action.payload : s)),
      };

    default:
      return state;
  }
}
