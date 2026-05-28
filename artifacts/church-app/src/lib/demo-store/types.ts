export type MemberStatus = "Active" | "Inactive" | "Pending";
export type MemberRole = "Elder" | "Deacon" | "Member" | "Volunteer";
export type MembershipStage = "New" | "Regular" | "Leadership";

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: MemberRole;
  status: MemberStatus;
  stage: MembershipStage;
  joined: string;
  groups: string[];
  lastActivity: string;
  avatar?: string;
  initials?: string;
  needsReview?: boolean;
}

export interface Group {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryClass: string;
  desc: string;
  schedule: string;
  time?: string;
  location: string;
  members: number;
  memberIds: string[];
  image: string;
  featured?: boolean;
  active?: boolean;
}

export type FollowUpColumn = "new" | "inprogress" | "completed";
export type FollowUpPriority = "High" | "Medium" | "Low";

export interface FollowUpItem {
  id: string;
  name: string;
  note: string;
  assignee: string;
  due: string;
  priority: FollowUpPriority;
  column: FollowUpColumn;
}

export type AppointmentType = "Pastoral" | "Membership" | "Prayer" | "Counseling" | "New visitor";

export interface AppointmentHost {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  initials?: string;
}

export interface AvailableSlot {
  id: string;
  hostId: string;
  date: string;
  dateLabel: string;
  time: string;
  duration: string;
  type: AppointmentType;
  location: string;
  spotsLeft: number;
}

export interface AppointmentToPlan {
  id: string;
  personName: string;
  personEmail: string;
  personPhone?: string;
  preferredHost?: string;
  requestedWindow?: string;
  status: "needs-slot" | "pending-confirm" | "reschedule";
  type: AppointmentType;
  topic: string;
  notes?: string;
  createdAt: string;
}

export interface ScheduledAppointment {
  id: string;
  personName: string;
  personEmail: string;
  hostId: string;
  hostName: string;
  date: string;
  dateLabel: string;
  time: string;
  duration: string;
  type: AppointmentType;
  location: string;
  status: "confirmed" | "cancelled";
  topic: string;
}

export interface Contribution {
  id: string;
  memberId?: string;
  name: string;
  fund: string;
  amount: number;
  method: string;
  date: string;
  status: string;
}

export interface PledgeCampaign {
  id: string;
  name: string;
  goal: number;
  raised: number;
  pledgers: number;
  deadline: string;
  color: string;
  bg: string;
  bar: string;
  desc: string;
}

export interface GivingStatement {
  id: string;
  memberId?: string;
  name: string;
  email: string;
  total: number;
  gifts: number;
  period: string;
  status: "Ready" | "Sent";
}

export interface FinanceAccount {
  id: string;
  name: string;
  balance: number;
  color: string;
}

export interface FinanceTransaction {
  id: string;
  desc: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  accountId: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  budget: number;
  spent: number;
  color: string;
  status: "on-track" | "over-budget" | "under-budget";
}

export type FormFieldType = "text" | "email" | "phone" | "textarea" | "select" | "checkbox" | "date";

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  required?: boolean;
  options?: string[];
}

export interface FormDefinition {
  id: string;
  name: string;
  category: string;
  status: "Active" | "Draft" | "Archived";
  fields: FormField[];
  submissions: number;
  lastSubmit: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  form: string;
  name: string;
  email: string;
  submitted: string;
  status: "Reviewed" | "Pending";
  answers: Record<string, string>;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime?: string;
  attendees?: number;
  category: string;
  color: string;
  dot: string;
  location?: string;
  status?: "confirmed" | "draft";
}

export interface VolunteerSlot {
  id: string;
  roleId: string;
  name: string;
  event: string;
  date: string;
  status: "Confirmed" | "Pending" | "Unconfirmed";
}

export interface VolunteerRole {
  id: string;
  role: string;
  icon: string;
  slots: VolunteerSlot[];
}

export interface CheckIn {
  id: string;
  name: string;
  time: string;
  event: string;
  type: "QR Code" | "Manual";
  avatar: string;
  color: string;
}

export interface EmailMessage {
  id: string;
  subject: string;
  audience: string;
  body?: string;
  sent?: string;
  lastEdited?: string;
  opens?: number;
  clicks?: number;
  status: "Sent" | "Draft";
}

export interface SmsMessage {
  id: string;
  text: string;
  audience: string;
  sent: string;
  recipients: number;
  status: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  sent: string;
  type: string;
  icon: string;
  color: string;
  read: boolean;
  href?: string;
}

export interface WorshipSong {
  id: string;
  title: string;
  artist: string;
  key: string;
  tempo: string;
  tags: string[];
  lastPlayed: string;
}

export interface ServicePlanItem {
  id: string;
  time: string;
  duration: string;
  type: string;
  label: string;
  icon: string;
  color: string;
}

export interface ServicePlan {
  id: string;
  date: string;
  time: string;
  title: string;
  theme: string;
  leader: string;
  status: "confirmed" | "draft";
  items: ServicePlanItem[];
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited";
}

export interface DemoSettings {
  churchName: string;
  denomination: string;
  phone: string;
  email: string;
  address: string;
  mission: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  notificationPrefs: {
    newMember: boolean;
    formSubmission: boolean;
    givingReceived: boolean;
    volunteerConfirmation: boolean;
    weeklySummary: boolean;
  };
}

export interface DemoState {
  members: Member[];
  groups: Group[];
  followUps: FollowUpItem[];
  appointmentHosts: AppointmentHost[];
  availableSlots: AvailableSlot[];
  appointmentsToPlan: AppointmentToPlan[];
  scheduledAppointments: ScheduledAppointment[];
  contributions: Contribution[];
  pledgeCampaigns: PledgeCampaign[];
  givingStatements: GivingStatement[];
  financeAccounts: FinanceAccount[];
  financeTransactions: FinanceTransaction[];
  budgetCategories: BudgetCategory[];
  forms: FormDefinition[];
  formSubmissions: FormSubmission[];
  calendarEvents: CalendarEvent[];
  volunteerRoles: VolunteerRole[];
  checkIns: CheckIn[];
  emails: EmailMessage[];
  smsMessages: SmsMessage[];
  notifications: AppNotification[];
  worshipSongs: WorshipSong[];
  servicePlans: ServicePlan[];
  staff: StaffMember[];
  settings: DemoSettings;
}

export type DemoAction =
  | { type: "RESET" }
  | { type: "ADD_MEMBER"; payload: Member }
  | { type: "UPDATE_MEMBER"; payload: Member }
  | { type: "IMPORT_MEMBERS"; payload: Member[] }
  | { type: "ADD_GROUP"; payload: Group }
  | { type: "ADD_FOLLOW_UP"; payload: FollowUpItem }
  | { type: "UPDATE_FOLLOW_UP"; payload: FollowUpItem }
  | { type: "MOVE_FOLLOW_UP"; payload: { id: string; column: FollowUpColumn } }
  | { type: "BOOK_SLOT"; payload: { slotId: string; appointment: ScheduledAppointment; planId?: string } }
  | { type: "UPDATE_SLOT"; payload: AvailableSlot }
  | { type: "REMOVE_PLAN"; payload: string }
  | { type: "UPDATE_PLAN"; payload: AppointmentToPlan }
  | { type: "CANCEL_APPOINTMENT"; payload: string }
  | { type: "RESCHEDULE_APPOINTMENT"; payload: { id: string; slotId: string; slot: AvailableSlot } }
  | { type: "ADD_CONTRIBUTION"; payload: Contribution }
  | { type: "ADD_PLEDGE"; payload: PledgeCampaign }
  | { type: "UPDATE_STATEMENT"; payload: GivingStatement }
  | { type: "SEND_ALL_STATEMENTS" }
  | { type: "ADD_TRANSACTION"; payload: FinanceTransaction }
  | { type: "ADD_BUDGET_CATEGORY"; payload: BudgetCategory }
  | { type: "ADD_FORM"; payload: FormDefinition }
  | { type: "UPDATE_FORM"; payload: FormDefinition }
  | { type: "ARCHIVE_FORM"; payload: string }
  | { type: "DUPLICATE_FORM"; payload: string }
  | { type: "UPDATE_SUBMISSION"; payload: FormSubmission }
  | { type: "DELETE_SUBMISSION"; payload: string }
  | { type: "ADD_EVENT"; payload: CalendarEvent }
  | { type: "ADD_VOLUNTEER_SLOT"; payload: VolunteerSlot }
  | { type: "ADD_CHECKIN"; payload: CheckIn }
  | { type: "ADD_EMAIL"; payload: EmailMessage }
  | { type: "UPDATE_EMAIL"; payload: EmailMessage }
  | { type: "DELETE_EMAIL"; payload: string }
  | { type: "ADD_SMS"; payload: SmsMessage }
  | { type: "ADD_NOTIFICATION"; payload: AppNotification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "MARK_ALL_NOTIFICATIONS_READ" }
  | { type: "ADD_SONG"; payload: WorshipSong }
  | { type: "UPDATE_SONG"; payload: WorshipSong }
  | { type: "ADD_SERVICE_PLAN"; payload: ServicePlan }
  | { type: "UPDATE_SERVICE_PLAN"; payload: ServicePlan }
  | { type: "UPDATE_SETTINGS"; payload: Partial<DemoSettings> }
  | { type: "ADD_STAFF"; payload: StaffMember }
  | { type: "UPDATE_STAFF"; payload: StaffMember };
