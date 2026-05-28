import type { LucideIcon } from "lucide-react";
import {
  UserPlus,
  CreditCard,
  Bell,
  Music2,
  CheckCircle2,
  Target,
  CalendarDays,
  Mail,
  FileText,
  UsersRound,
  Heart,
  ClipboardList,
} from "lucide-react";

export type ActivityCategory =
  | "People"
  | "Giving"
  | "Events"
  | "Worship"
  | "Follow-up"
  | "Communication";

export type ActivityGroup = "Today" | "Yesterday" | "This week" | "Earlier";

export interface ActivityItem {
  id: string;
  icon: LucideIcon;
  bg: string;
  color: string;
  title: string;
  desc: string;
  time: string;
  category: ActivityCategory;
  group: ActivityGroup;
}

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  "People",
  "Giving",
  "Events",
  "Worship",
  "Follow-up",
  "Communication",
];

export const ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: "1",
    icon: UserPlus,
    bg: "bg-[#e5deff]",
    color: "text-[#5932ea]",
    title: "New member registered",
    desc: "Marie Dubois joined the congregation",
    time: "2 min ago",
    category: "People",
    group: "Today",
  },
  {
    id: "2",
    icon: CreditCard,
    bg: "bg-[#d4f0f7]",
    color: "text-[#00677d]",
    title: "Contribution received",
    desc: "$250 — General Tithe from J. Moreau",
    time: "15 min ago",
    category: "Giving",
    group: "Today",
  },
  {
    id: "3",
    icon: Bell,
    bg: "bg-[#ede9fe]",
    color: "text-[#5932ea]",
    title: "Event published",
    desc: "Youth Night — Friday 7pm · 28 registered",
    time: "1 hr ago",
    category: "Events",
    group: "Today",
  },
  {
    id: "4",
    icon: Music2,
    bg: "bg-[#f2f4f6]",
    color: "text-[#484556]",
    title: "Service plan updated",
    desc: "Sunday Morning — Worship set finalized",
    time: "2 hr ago",
    category: "Worship",
    group: "Today",
  },
  {
    id: "5",
    icon: CheckCircle2,
    bg: "bg-[#d4f0f7]",
    color: "text-[#00677d]",
    title: "Follow-up completed",
    desc: "3 new visitor follow-ups marked done",
    time: "3 hr ago",
    category: "Follow-up",
    group: "Today",
  },
  {
    id: "6",
    icon: Target,
    bg: "bg-[#ffdad6]/50",
    color: "text-[#c5221f]",
    title: "Pledge campaign updated",
    desc: "Building Fund — 68% of $120k goal reached",
    time: "Yesterday",
    category: "Giving",
    group: "Yesterday",
  },
  {
    id: "7",
    icon: UsersRound,
    bg: "bg-[#e5deff]",
    color: "text-[#5932ea]",
    title: "Group membership updated",
    desc: "Young Adults — 4 new members added",
    time: "Yesterday",
    category: "People",
    group: "Yesterday",
  },
  {
    id: "8",
    icon: Mail,
    bg: "bg-[#f2f4f6]",
    color: "text-[#484556]",
    title: "Email campaign sent",
    desc: "Easter Sunday invitation — 842 recipients",
    time: "Yesterday",
    category: "Communication",
    group: "Yesterday",
  },
  {
    id: "9",
    icon: CalendarDays,
    bg: "bg-[#ede9fe]",
    color: "text-[#5932ea]",
    title: "Volunteer schedule published",
    desc: "Sunday Service — 18 volunteers confirmed",
    time: "Apr 4",
    category: "Events",
    group: "This week",
  },
  {
    id: "10",
    icon: Heart,
    bg: "bg-[#d4f0f7]",
    color: "text-[#00677d]",
    title: "Recurring gift set up",
    desc: "Sophie Chen — $100/month Missions Fund",
    time: "Apr 4",
    category: "Giving",
    group: "This week",
  },
  {
    id: "11",
    icon: FileText,
    bg: "bg-[#f2f4f6]",
    color: "text-[#484556]",
    title: "Form submission received",
    desc: "New Member Interest — Clara Fontaine",
    time: "Apr 3",
    category: "People",
    group: "This week",
  },
  {
    id: "12",
    icon: CheckCircle2,
    bg: "bg-[#d4f0f7]",
    color: "text-[#00677d]",
    title: "Visitor follow-up assigned",
    desc: "Paul & Anna Schmidt — assigned to David O.",
    time: "Apr 3",
    category: "Follow-up",
    group: "This week",
  },
  {
    id: "13",
    icon: Music2,
    bg: "bg-[#f2f4f6]",
    color: "text-[#484556]",
    title: "Song added to library",
    desc: "Great Is Thy Faithfulness — key of G",
    time: "Apr 2",
    category: "Worship",
    group: "This week",
  },
  {
    id: "14",
    icon: Bell,
    bg: "bg-[#ede9fe]",
    color: "text-[#5932ea]",
    title: "Push notification sent",
    desc: "Prayer Meeting reminder — 648 subscribers",
    time: "Apr 2",
    category: "Communication",
    group: "This week",
  },
  {
    id: "15",
    icon: ClipboardList,
    bg: "bg-[#ffdad6]/50",
    color: "text-[#c5221f]",
    title: "Monthly giving report generated",
    desc: "March 2026 — $38,450 total recorded",
    time: "Apr 1",
    category: "Giving",
    group: "Earlier",
  },
  {
    id: "16",
    icon: UserPlus,
    bg: "bg-[#e5deff]",
    color: "text-[#5932ea]",
    title: "Bulk import completed",
    desc: "12 members imported from CSV",
    time: "Mar 31",
    category: "People",
    group: "Earlier",
  },
];

export const ACTIVITY_PREVIEW_COUNT = 6;

export const ACTIVITY_GROUPS: ActivityGroup[] = ["Today", "Yesterday", "This week", "Earlier"];
