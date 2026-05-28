import { Link } from "wouter";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Settings,
  Pencil,
  Heart,
  CalendarDays,
  BarChart3,
  ChevronRight,
  LayoutDashboard,
  Users,
  User,
  Mail,
  UsersRound,
  Target,
  Bell,
  FileSpreadsheet,
  Shield,
  Activity,
  CalendarClock,
} from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";

const GROUP_STACK = [
  { initials: "MD", className: "bg-emerald-100 text-emerald-800" },
  { initials: "JL", className: "bg-sky-100 text-sky-800" },
  { initials: "SR", className: "bg-violet-100 text-violet-800" },
];
const EVENT_STACK = [
  { initials: "YT", className: "bg-amber-100 text-amber-800" },
  { initials: "KW", className: "bg-rose-100 text-rose-800" },
  { initials: "AP", className: "bg-cyan-100 text-cyan-800" },
];

/** Most-used actions for church staff (aligned with dashboard priorities) */
const quickActions: {
  href: string;
  label: string;
  description: string;
  icon: React.ElementType;
  accent: string;
}[] = [
  {
    href: "/",
    label: "Dashboard",
    description: "Overview & KPIs",
    icon: LayoutDashboard,
    accent: "bg-violet-50 text-[#5932EA] ring-violet-100",
  },
  {
    href: "/members",
    label: "Members",
    description: "Profiles & records",
    icon: Users,
    accent: "bg-sky-50 text-sky-700 ring-sky-100",
  },
  {
    href: "/giving/contributions",
    label: "Contributions",
    description: "Giving & tithes",
    icon: Heart,
    accent: "bg-rose-50 text-rose-600 ring-rose-100",
  },
  {
    href: "/events/calendar",
    label: "Calendar",
    description: "Events & services",
    icon: CalendarDays,
    accent: "bg-amber-50 text-amber-700 ring-amber-100",
  },
  {
    href: "/comms/email",
    label: "Email",
    description: "Newsletters & blasts",
    icon: Mail,
    accent: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  },
  {
    href: "/teams",
    label: "Ministry teams",
    description: "Team workspaces",
    icon: Shield,
    accent: "bg-violet-50 text-violet-700 ring-violet-100",
  },
  {
    href: "/appointments/available",
    label: "Book a slot",
    description: "Pastoral appointments",
    icon: CalendarClock,
    accent: "bg-teal-50 text-teal-700 ring-teal-100",
  },
  {
    href: "/activity",
    label: "Activity feed",
    description: "Recent church events",
    icon: Activity,
    accent: "bg-slate-50 text-slate-700 ring-slate-100",
  },
];

/** Secondary destinations — chevron list */
const moreLinks: {
  href: string;
  label: string;
  icon: React.ElementType;
  iconBox: string;
}[] = [
  { href: "/directory", label: "Directory & contacts", icon: Users, iconBox: "rounded-lg bg-zinc-100 text-zinc-700" },
  { href: "/groups", label: "Groups & ministries", icon: UsersRound, iconBox: "rounded-lg bg-cyan-50 text-cyan-700" },
  { href: "/followup", label: "Visitor follow-up", icon: Target, iconBox: "rounded-lg bg-orange-50 text-orange-700" },
  { href: "/giving/pledges", label: "Pledges & campaigns", icon: Heart, iconBox: "rounded-lg bg-rose-50 text-rose-600" },
  { href: "/finance/reports", label: "Financial reports", icon: BarChart3, iconBox: "rounded-lg bg-violet-50 text-violet-700" },
  { href: "/giving/statements", label: "Giving statements", icon: FileSpreadsheet, iconBox: "rounded-lg bg-slate-100 text-slate-700" },
  { href: "/comms/notifications", label: "Notifications", icon: Bell, iconBox: "rounded-lg bg-amber-50 text-amber-700" },
  { href: "/settings", label: "Account & settings", icon: Settings, iconBox: "rounded-[10px] bg-zinc-100 text-zinc-700" },
];

function AvatarStack({
  items,
  extra,
}: {
  items: { initials: string; className: string }[];
  extra: string;
}) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-2">
        {items.map((a, i) => (
          <div
            key={i}
            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold ${a.className}`}
          >
            {a.initials}
          </div>
        ))}
      </div>
      <span className="ml-2 text-xs font-medium text-black/40">{extra}</span>
    </div>
  );
}

function QuickActionTile({
  item,
  index,
}: {
  item: (typeof quickActions)[number];
  index: number;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.03 * index, duration: 0.2 }}
    >
      <Link
        href={item.href}
        className="group flex flex-col gap-2 rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm ring-1 ring-zinc-100/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5932EA]/25 hover:shadow-[0_10px_40px_rgba(226,236,249,0.55)] active:scale-[0.99] touch-manipulation"
      >
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${item.accent}`}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        <div>
          <p className="text-sm font-semibold text-zinc-900 group-hover:text-[#5932EA]">{item.label}</p>
          <p className="mt-0.5 text-xs text-neutral-500">{item.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const displayName = "Pastor Admin";
  const handle = "@lumina.pastor";
  const roleLabel = "Lead Pastor · Lumina Church";

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const avatarContent = photoPreview ? (
    <img src={photoPreview} alt="" className="h-full w-full object-cover" />
  ) : (
    <User className="h-12 w-12 text-white/95 lg:h-14 lg:w-14" strokeWidth={1.5} />
  );

  const mobileAvatarContent = photoPreview ? (
    <img src={photoPreview} alt="" className="h-full w-full object-cover" />
  ) : (
    <User className="h-10 w-10 text-white/95" strokeWidth={1.5} />
  );

  const photoButton = (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handlePhotoChange}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white text-blue-950 shadow-sm transition-transform hover:scale-105 active:scale-95 touch-manipulation"
        aria-label="Change profile photo"
      >
        <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </>
  );

  const identityCard = (
    <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_10px_60px_0_rgba(226,236,249,0.45)] lg:rounded-[1.5rem]">
      <div className="relative mx-auto flex w-fit flex-col items-center">
        <div className="relative">
          <div
            className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#5932EA] to-indigo-800 ring-4 ring-white lg:h-28 lg:w-28"
            style={{ boxShadow: "0 12px 32px rgba(89, 50, 234, 0.25)" }}
          >
            {avatarContent}
          </div>
          {photoButton}
        </div>
        <p className="mt-4 text-center text-xl font-semibold text-zinc-900 lg:text-2xl">{displayName}</p>
        <p className="mt-1 text-center text-xs font-medium text-black/60">{handle}</p>
        <p className="mt-2 max-w-xs text-center text-xs leading-snug text-neutral-500">{roleLabel}</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-6">
        <Link
          href="/groups"
          className="group rounded-xl border border-zinc-100 bg-slate-50/80 p-3 transition-all hover:border-[#5932EA]/25 hover:bg-violet-50/50"
        >
          <AvatarStack items={GROUP_STACK} extra="12+" />
          <p className="mt-2 text-sm font-semibold text-zinc-900 group-hover:text-[#5932EA]">Groups</p>
          <p className="text-[11px] text-neutral-500">Ministries</p>
        </Link>
        <Link
          href="/events/calendar"
          className="group rounded-xl border border-zinc-100 bg-slate-50/80 p-3 transition-all hover:border-[#5932EA]/25 hover:bg-violet-50/50"
        >
          <AvatarStack items={EVENT_STACK} extra="8+" />
          <p className="mt-2 text-sm font-semibold text-zinc-900 group-hover:text-[#5932EA]">Events</p>
          <p className="text-[11px] text-neutral-500">Serving</p>
        </Link>
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="relative w-full min-h-full pb-6 lg:pb-8">
        {/* ——— Mobile: full-bleed white (no card frame on slate) ——— */}
        <div className="w-full bg-white lg:hidden">
          <header className="sticky top-0 z-10 flex w-full items-center justify-between gap-2 border-b border-zinc-100 bg-white px-3 py-3 sm:px-4">
            <Link
              href="/"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-800/70 text-blue-950 transition-colors hover:bg-zinc-50 active:scale-95 touch-manipulation"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2} />
            </Link>
            <h1 className="min-w-0 flex-1 text-center text-lg font-semibold tracking-tight text-black">My profile</h1>
            <Link
              href="/settings"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-800/70 text-blue-950 transition-colors hover:bg-zinc-50 active:scale-95 touch-manipulation"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" strokeWidth={2} />
            </Link>
          </header>

          <div className="w-full px-3 pb-8 pt-3 sm:px-4">
            <div className="mb-6 flex flex-col items-center border-b border-zinc-100 pb-6">
              <div className="relative">
                <div
                  className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#5932EA] to-indigo-800 ring-4 ring-white shadow-lg"
                  style={{ boxShadow: "0 12px 32px rgba(89, 50, 234, 0.25)" }}
                >
                  {mobileAvatarContent}
                </div>
                {photoButton}
              </div>
              <p className="mt-3 text-center text-lg font-semibold text-zinc-900">{displayName}</p>
              <p className="mt-0.5 text-center text-xs font-medium text-black/60">{handle}</p>
              <p className="mt-1.5 text-center text-[11px] text-neutral-500">{roleLabel}</p>
            </div>

            <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-400">Quick access</h2>
            <div className="grid w-full grid-cols-2 gap-2.5">
              {quickActions.map((item, i) => (
                <QuickActionTile key={`${item.href}-${item.label}`} item={item} index={i} />
              ))}
            </div>

            <div className="mt-6 grid w-full grid-cols-2 gap-3 border-t border-zinc-100 pt-6">
              <Link
                href="/groups"
                className="group rounded-xl border border-zinc-100 bg-slate-50/80 p-3 text-left transition-all active:bg-slate-100"
              >
                <AvatarStack items={GROUP_STACK} extra="12+" />
                <p className="mt-2 text-sm font-semibold text-zinc-900">Groups</p>
                <p className="text-[11px] text-neutral-500">Ministries</p>
              </Link>
              <Link
                href="/events/calendar"
                className="group rounded-xl border border-zinc-100 bg-slate-50/80 p-3 text-left transition-all active:bg-slate-100"
              >
                <AvatarStack items={EVENT_STACK} extra="8+" />
                <p className="mt-2 text-sm font-semibold text-zinc-900">Events</p>
                <p className="text-[11px] text-neutral-500">Serving</p>
              </Link>
            </div>

            <h2 className="mb-2 mt-8 text-xs font-bold uppercase tracking-wider text-neutral-400">More</h2>
            <ul className="space-y-0.5">
              {moreLinks.map((item, i) => (
                <motion.li
                  key={item.href + item.label}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.02 * i, duration: 0.18 }}
                >
                  <Link
                    href={item.href}
                    className="flex min-h-[48px] w-full items-center gap-3 rounded-xl py-2 pl-1 pr-2 text-left transition-colors hover:bg-zinc-50 active:bg-zinc-100/80 touch-manipulation"
                  >
                    <span className={`flex h-10 w-12 shrink-0 items-center justify-center ${item.iconBox}`}>
                      <item.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-medium text-zinc-800">{item.label}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-neutral-400" strokeWidth={1.5} />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* ——— Desktop: wide dashboard-style layout ——— */}
        <div className="mx-auto hidden max-w-6xl px-4 py-6 lg:block xl:px-8">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 xl:text-3xl">Profile</h1>
              <p className="mt-1 text-sm text-neutral-500">Account overview, shortcuts, and church tools</p>
            </div>
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition-all hover:border-[#5932EA]/30 hover:text-[#5932EA] hover:shadow-md"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-6 xl:gap-8">
            <aside className="col-span-12 xl:col-span-4">{identityCard}</aside>

            <div className="col-span-12 flex flex-col gap-8 xl:col-span-8">
              <section>
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-400">Quick access</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {quickActions.map((item, i) => (
                    <QuickActionTile key={`d-${item.href}-${item.label}`} item={item} index={i} />
                  ))}
                </div>
              </section>

              <section className="rounded-[1.5rem] border border-zinc-100 bg-white p-6 shadow-[0_10px_60px_0_rgba(226,236,249,0.45)]">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-400">More</h2>
                <ul className="divide-y divide-zinc-100">
                  {moreLinks.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="group flex min-h-[52px] items-center gap-4 py-3 transition-colors hover:bg-slate-50/80 first:pt-0 last:pb-0"
                      >
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconBox}`}
                        >
                          <item.icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0 flex-1 text-sm font-medium text-zinc-800 group-hover:text-[#5932EA]">
                          {item.label}
                        </span>
                        <ChevronRight className="h-5 w-5 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#5932EA]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
