import { useEffect, useState, useMemo } from "react";
import { useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  Heart,
  CalendarDays,
  Mail,
  UserPlus,
  CreditCard,
  FileText,
  Search,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useDemoStore } from "@/lib/demo-store";

const pages = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/members", label: "Members", icon: Users },
  { href: "/groups", label: "Groups", icon: Users },
  { href: "/teams", label: "Ministry Teams", icon: Users },
  { href: "/directory", label: "Directory", icon: Users },
  { href: "/followup", label: "Follow-up", icon: Users },
  { href: "/appointments/available", label: "Book a slot", icon: CalendarDays },
  { href: "/giving/contributions", label: "Contributions", icon: Heart },
  { href: "/events/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/comms/email", label: "Email", icon: Mail },
  { href: "/forms", label: "Forms", icon: FileText },
  { href: "/settings", label: "Settings", icon: Search },
];

const quickActions = [
  { href: "/members", label: "Add member", icon: UserPlus, query: "?action=add" },
  { href: "/giving/contributions", label: "Record giving", icon: CreditCard, query: "?action=record" },
  { href: "/events/calendar", label: "Create event", icon: CalendarDays, query: "?action=create" },
  { href: "/comms/email/compose", label: "Compose email", icon: Mail, query: "" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { state } = useDemoStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    document.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, []);

  const memberResults = useMemo(
    () => state.members.slice(0, 8),
    [state.members],
  );

  const navigate = (href: string) => {
    setLocation(href);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, members, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick actions">
          {quickActions.map((a) => (
            <CommandItem key={a.label} onSelect={() => navigate(a.href + a.query)}>
              <a.icon className="mr-2 h-4 w-4" />
              {a.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Pages">
          {pages.map((p) => (
            <CommandItem key={p.href} onSelect={() => navigate(p.href)}>
              <p.icon className="mr-2 h-4 w-4" />
              {p.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Members">
          {memberResults.map((m) => (
            <CommandItem key={m.id} onSelect={() => navigate(`/members/${m.id}`)}>
              <Users className="mr-2 h-4 w-4" />
              {m.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
