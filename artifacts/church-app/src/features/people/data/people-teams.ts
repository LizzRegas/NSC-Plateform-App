import type { LucideIcon } from "lucide-react";
import {
  Music2, UserPlus, Coffee, Camera, Volume2, MonitorPlay, Megaphone,
  HeartHandshake, Languages, Wallet, GraduationCap,
} from "lucide-react";

export type PeopleTeamSlug =
  | "audiovisual"
  | "evangelism"
  | "finance"
  | "hospitality"
  | "integration"
  | "media"
  | "outreach"
  | "sound"
  | "sunday-school"
  | "translation"
  | "worship";

export type TeamFeatureId =
  | "worship-sets"
  | "visitor-follow-up"
  | "hospitality-suite"
  | "media-rundown"
  | "sound-checklist"
  | "av-signal-flow"
  | "outreach-calendar"
  | "evangelism-tracker"
  | "translation-glossary"
  | "finance-reconciliation"
  | "sunday-school-curriculum";

export interface PeopleTeam {
  slug: PeopleTeamSlug;
  name: string;
  category: string;
  categoryClass: string;
  desc: string;
  schedule: string;
  location: string;
  members: number;
  image: string;
  icon: LucideIcon;
  accent: string;
  featureId: TeamFeatureId;
  featureTitle: string;
  featureSubtitle: string;
}

export const PEOPLE_TEAMS: PeopleTeam[] = [
  {
    slug: "audiovisual",
    name: "Audiovisual Team",
    category: "Operations",
    categoryClass: "bg-[#e5deff] text-[#4404d7]",
    desc: "Projection, lighting, and live stream routing for every service and event.",
    schedule: "Sundays & special events",
    location: "Main Auditorium · AV Booth",
    members: 14,
    image: "https://images.unsplash.com/photo-1574717024654-61fd2cf4d44d?w=800&q=80",
    icon: MonitorPlay,
    accent: "from-violet-600 to-indigo-700",
    featureId: "av-signal-flow",
    featureTitle: "Signal Flow Studio",
    featureSubtitle: "Live routing map, input health, and failover paths",
  },
  {
    slug: "evangelism",
    name: "Evangelism Team",
    category: "Outreach",
    categoryClass: "bg-[#ffdbcd] text-[#360f00]",
    desc: "Street outreach, gospel conversations, and follow-up for new believers.",
    schedule: "Saturdays · Monthly trainings",
    location: "City Center · Campus Hub",
    members: 22,
    image: "https://images.unsplash.com/photo-1507692047035-45c960ef1f40?w=800&q=80",
    icon: HeartHandshake,
    accent: "from-rose-500 to-orange-600",
    featureId: "evangelism-tracker",
    featureTitle: "Gospel Conversations",
    featureSubtitle: "Track encounters, decisions, and discipleship handoffs",
  },
  {
    slug: "finance",
    name: "Finance Team",
    category: "Operations",
    categoryClass: "bg-[#b3ebff] text-[#001f27]",
    desc: "Stewardship of offerings, expenses, and transparent reporting for leadership.",
    schedule: "Weekly reconciliation",
    location: "Admin Office · Room 204",
    members: 8,
    image: "https://images.unsplash.com/photo-1554224311-0bef4256d870?w=800&q=80",
    icon: Wallet,
    accent: "from-emerald-600 to-teal-700",
    featureId: "finance-reconciliation",
    featureTitle: "Offering Reconciliation",
    featureSubtitle: "Count sheets, batches, and variance alerts",
  },
  {
    slug: "hospitality",
    name: "Hospitality Team",
    category: "Ministry",
    categoryClass: "bg-[#ffdbcd] text-[#360f00]",
    desc: "Welcome guests, serve refreshments, and steward a warm first impression.",
    schedule: "Every Sunday service",
    location: "Foyer · Welcome Desk",
    members: 28,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    icon: Coffee,
    accent: "from-amber-500 to-orange-600",
    featureId: "hospitality-suite",
    featureTitle: "Welcome & Inventory",
    featureSubtitle: "Guest follow-ups plus hospitality supply levels",
  },
  {
    slug: "integration",
    name: "Integration Team",
    category: "Ministry",
    categoryClass: "bg-[#e5deff] text-[#4404d7]",
    desc: "Onboard new visitors, connect them to groups, and guide their first steps.",
    schedule: "Ongoing · Sunday follow-ups",
    location: "Connection Lounge",
    members: 16,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    icon: UserPlus,
    accent: "from-blue-500 to-cyan-600",
    featureId: "visitor-follow-up",
    featureTitle: "Visitor Follow-up Board",
    featureSubtitle: "Kanban for new guests from first visit to integration",
  },
  {
    slug: "media",
    name: "Media Team",
    category: "Operations",
    categoryClass: "bg-[#e0e3e5] text-[#191c1e]",
    desc: "Slides, social content, photo/video capture, and sermon media assets.",
    schedule: "Sundays · Mid-week content sprints",
    location: "Media Suite · Studio B",
    members: 18,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    icon: Camera,
    accent: "from-slate-600 to-zinc-800",
    featureId: "media-rundown",
    featureTitle: "Service Media Rundown",
    featureSubtitle: "Slide cues, assets, and live switch responsibilities",
  },
  {
    slug: "outreach",
    name: "Outreach Team",
    category: "Outreach",
    categoryClass: "bg-[#ffdbcd] text-[#360f00]",
    desc: "Community partnerships, local missions, and seasonal serve projects.",
    schedule: "Monthly projects",
    location: "Eastside · Various sites",
    members: 34,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    icon: Megaphone,
    accent: "from-teal-500 to-emerald-600",
    featureId: "outreach-calendar",
    featureTitle: "Community Impact Map",
    featureSubtitle: "Partners, projects, and volunteer deployment",
  },
  {
    slug: "sound",
    name: "Sound Team",
    category: "Operations",
    categoryClass: "bg-[#b3ebff] text-[#001f27]",
    desc: "Front-of-house mix, monitors, and audio quality for worship and events.",
    schedule: "Sundays · Rehearsals Thu",
    location: "FOH Desk · Auditorium",
    members: 12,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    icon: Volume2,
    accent: "from-indigo-500 to-blue-700",
    featureId: "sound-checklist",
    featureTitle: "Pre-Service Checklist",
    featureSubtitle: "Line check, RF scan, and mix-ready verification",
  },
  {
    slug: "sunday-school",
    name: "Sunday School",
    category: "Ministry",
    categoryClass: "bg-[#e5deff] text-[#4404d7]",
    desc: "Age-graded classes, curriculum, and safe environments for children and youth.",
    schedule: "Sundays 10:00 AM",
    location: "Education Wing · Floors 1–2",
    members: 45,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0e?w=800&q=80",
    icon: GraduationCap,
    accent: "from-sky-500 to-blue-600",
    featureId: "sunday-school-curriculum",
    featureTitle: "Lesson Studio",
    featureSubtitle: "Weekly lessons, rooms, and teacher assignments",
  },
  {
    slug: "translation",
    name: "Translation Team",
    category: "Operations",
    categoryClass: "bg-[#e0e3e5] text-[#191c1e]",
    desc: "Simultaneous interpretation, sermon notes, and multilingual resources.",
    schedule: "Sundays · As needed",
    location: "Booth C · Interpretation",
    members: 10,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    icon: Languages,
    accent: "from-fuchsia-500 to-purple-700",
    featureId: "translation-glossary",
    featureTitle: "Keyword Glossary",
    featureSubtitle: "Shared terms across FR, EN, and other service languages",
  },
  {
    slug: "worship",
    name: "Worship Team",
    category: "Ministry",
    categoryClass: "bg-[#e5deff] text-[#4404d7]",
    desc: "Lead congregational worship, rehearse sets, and prepare the musical flow.",
    schedule: "Sundays · Thu rehearsal",
    location: "Main Stage",
    members: 24,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    icon: Music2,
    accent: "from-violet-500 to-purple-700",
    featureId: "worship-sets",
    featureTitle: "Worship Set Builder",
    featureSubtitle: "Keys, tempo, flow, and Sunday set lists",
  },
];

export const TEAM_FILTER_OPTIONS = ["All Teams", "Ministry", "Operations", "Outreach"] as const;

export function getTeamBySlug(slug: string): PeopleTeam | undefined {
  return PEOPLE_TEAMS.find((t) => t.slug === slug);
}

export function sortTeamsAlphabetically(teams: PeopleTeam[]): PeopleTeam[] {
  return [...teams].sort((a, b) => a.name.localeCompare(b.name));
}
