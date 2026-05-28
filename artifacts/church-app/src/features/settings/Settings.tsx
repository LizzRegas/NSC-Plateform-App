import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Bell,
  Lock,
  Globe,
  CreditCard,
  Users,
  Palette,
  ChevronRight,
  Save,
  Monitor,
  Sun,
  Moon,
  Plus,
  Laptop,
} from "lucide-react";
import { useTheme } from "next-themes";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormDialog } from "@/components/shared/FormDialog";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import type { DemoSettings } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const sections = [
  { id: "church", icon: Building2, label: "Church Profile", color: "text-blue-500 bg-blue-50" },
  { id: "notifications", icon: Bell, label: "Notifications", color: "text-amber-500 bg-amber-50" },
  { id: "security", icon: Lock, label: "Security & Access", color: "text-rose-500 bg-rose-50" },
  { id: "localization", icon: Globe, label: "Localization", color: "text-emerald-500 bg-emerald-50" },
  { id: "billing", icon: CreditCard, label: "Billing", color: "text-violet-500 bg-violet-50" },
  { id: "team", icon: Users, label: "Team & Roles", color: "text-teal-500 bg-teal-50" },
  { id: "appearance", icon: Palette, label: "Appearance", color: "text-indigo-500 bg-indigo-50" },
];

const NOTIF_ITEMS: { key: keyof DemoSettings["notificationPrefs"]; label: string; desc: string }[] = [
  { key: "newMember", label: "New member registration", desc: "Get notified when a new member registers" },
  { key: "formSubmission", label: "Form submissions", desc: "Receive alerts for new form responses" },
  { key: "givingReceived", label: "Giving received", desc: "Be notified of each new contribution" },
  { key: "volunteerConfirmation", label: "Volunteer confirmations", desc: "Alerts when volunteers confirm or decline" },
  { key: "weeklySummary", label: "Weekly summary email", desc: "Receive a weekly overview of activity" },
];

const TIMEZONES = ["America/Montreal", "America/New_York", "America/Chicago", "America/Los_Angeles", "Europe/London"];
const DATE_FORMATS = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];
const CURRENCIES = ["CAD", "USD", "EUR", "GBP"];

const SESSIONS = [
  { device: "Chrome on Windows", location: "Montreal, QC", lastActive: "Active now", current: true },
  { device: "Safari on iPhone", location: "Montreal, QC", lastActive: "2 hours ago", current: false },
  { device: "Firefox on MacBook", location: "Toronto, ON", lastActive: "Yesterday", current: false },
];

export default function Settings() {
  const [active, setActive] = useState("church");
  const storeSettings = useDemoState((s) => s.settings);
  const staff = useDemoState((s) => s.staff);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const { theme, setTheme } = useTheme();

  const [churchForm, setChurchForm] = useState({
    churchName: storeSettings.churchName,
    denomination: storeSettings.denomination,
    phone: storeSettings.phone,
    email: storeSettings.email,
    address: storeSettings.address,
    mission: storeSettings.mission,
  });
  const [notifPrefs, setNotifPrefs] = useState<DemoSettings["notificationPrefs"]>({
    ...storeSettings.notificationPrefs,
  });
  const [localization, setLocalization] = useState({
    timezone: storeSettings.timezone,
    dateFormat: storeSettings.dateFormat,
    currency: storeSettings.currency,
  });
  const [passwordForm, setPasswordForm] = useState({ current: "", next: "", confirm: "" });
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", role: "Admin Assistant" });

  useEffect(() => {
    setChurchForm({
      churchName: storeSettings.churchName,
      denomination: storeSettings.denomination,
      phone: storeSettings.phone,
      email: storeSettings.email,
      address: storeSettings.address,
      mission: storeSettings.mission,
    });
    setNotifPrefs({ ...storeSettings.notificationPrefs });
    setLocalization({
      timezone: storeSettings.timezone,
      dateFormat: storeSettings.dateFormat,
      currency: storeSettings.currency,
    });
  }, [storeSettings]);

  const saveSettings = (patch: Partial<DemoSettings>, message = "Settings saved") => {
    dispatch({ type: "UPDATE_SETTINGS", payload: patch });
    success(message);
  };

  const handleSave = () => {
    if (active === "church") {
      saveSettings(churchForm, "Church profile updated");
    } else if (active === "notifications") {
      saveSettings({ notificationPrefs: notifPrefs }, "Notification preferences saved");
    } else if (active === "localization") {
      saveSettings(localization, "Localization settings saved");
    } else if (active === "security") {
      if (passwordForm.next && passwordForm.next === passwordForm.confirm) {
        success("Password updated", "Your password has been changed (demo).");
        setPasswordForm({ current: "", next: "", confirm: "" });
      } else {
        success("Security settings saved");
      }
    } else {
      success("Settings saved");
    }
  };

  const inviteStaff = () => {
    if (!inviteForm.name.trim() || !inviteForm.email.trim()) return;
    dispatch({
      type: "ADD_STAFF",
      payload: {
        id: generateId("stf"),
        name: inviteForm.name.trim(),
        email: inviteForm.email.trim(),
        role: inviteForm.role,
        status: "Invited",
      },
    });
    success("Invitation sent", `${inviteForm.name} will receive an email invite.`);
    setInviteForm({ name: "", email: "", role: "Admin Assistant" });
    setInviteOpen(false);
  };

  const showSave =
    active === "church" ||
    active === "notifications" ||
    active === "localization" ||
    active === "security";

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader title="Settings" subtitle="Configure your Lumina platform preferences" />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
          <motion.nav
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="card-lumina overflow-hidden xl:h-fit"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
          >
            <div className="divide-y divide-border/40">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.12 + i * 0.05 }}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 transition-all duration-150 text-left ${
                    active === s.id ? "bg-primary/5" : "hover:bg-accent/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                      <s.icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-sm font-semibold ${active === s.id ? "text-primary" : "text-foreground"}`}
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-all ${active === s.id ? "text-primary rotate-90" : "text-muted-foreground"}`}
                  />
                </motion.button>
              ))}
            </div>
          </motion.nav>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:col-span-3 card-lumina overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
          >
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {sections.find((s) => s.id === active)?.label}
              </h3>
            </div>
            <div className="p-6 space-y-5">
              {active === "church" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(
                    [
                      ["Church Name", "churchName"],
                      ["Denomination", "denomination"],
                      ["Phone", "phone"],
                      ["Email", "email"],
                    ] as const
                  ).map(([label, key]) => (
                    <div key={key}>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        {label}
                      </label>
                      <input
                        value={churchForm[key]}
                        onChange={(e) => setChurchForm((f) => ({ ...f, [key]: e.target.value }))}
                        className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                      Address
                    </label>
                    <input
                      value={churchForm.address}
                      onChange={(e) => setChurchForm((f) => ({ ...f, address: e.target.value }))}
                      className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                      Mission Statement
                    </label>
                    <textarea
                      rows={3}
                      value={churchForm.mission}
                      onChange={(e) => setChurchForm((f) => ({ ...f, mission: e.target.value }))}
                      className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {active === "notifications" && (
                <div className="space-y-4">
                  {NOTIF_ITEMS.map((n) => (
                    <div
                      key={n.key}
                      className="flex items-center justify-between p-4 bg-background border border-border rounded-xl"
                    >
                      <div>
                        <p className="text-sm font-semibold text-foreground">{n.label}</p>
                        <p className="text-xs text-muted-foreground">{n.desc}</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={notifPrefs[n.key]}
                        onClick={() => setNotifPrefs((p) => ({ ...p, [n.key]: !p[n.key] }))}
                        className={`relative w-11 h-6 rounded-full transition-all cursor-pointer shrink-0 ${
                          notifPrefs[n.key] ? "bg-primary" : "bg-muted"
                        }`}
                        style={notifPrefs[n.key] ? { boxShadow: "0 2px 6px rgba(37,99,235,0.3)" } : undefined}
                      >
                        <div
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${
                            notifPrefs[n.key] ? "right-0.5" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {active === "security" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-4">Change password</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                          Current password
                        </label>
                        <input
                          type="password"
                          value={passwordForm.current}
                          onChange={(e) => setPasswordForm((f) => ({ ...f, current: e.target.value }))}
                          className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                          New password
                        </label>
                        <input
                          type="password"
                          value={passwordForm.next}
                          onChange={(e) => setPasswordForm((f) => ({ ...f, next: e.target.value }))}
                          className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                          Confirm password
                        </label>
                        <input
                          type="password"
                          value={passwordForm.confirm}
                          onChange={(e) => setPasswordForm((f) => ({ ...f, confirm: e.target.value }))}
                          className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-4">Active sessions</h4>
                    <div className="space-y-3">
                      {SESSIONS.map((s) => (
                        <div
                          key={s.device}
                          className="flex items-center justify-between p-4 bg-background border border-border rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                              <Laptop className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{s.device}</p>
                              <p className="text-xs text-muted-foreground">
                                {s.location} · {s.lastActive}
                              </p>
                            </div>
                          </div>
                          {s.current ? (
                            <span className="badge badge-green">Current</span>
                          ) : (
                            <button type="button" className="text-xs text-rose-500 font-semibold hover:underline">
                              Revoke
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {active === "localization" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                      Timezone
                    </label>
                    <select
                      value={localization.timezone}
                      onChange={(e) => setLocalization((l) => ({ ...l, timezone: e.target.value }))}
                      className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary"
                    >
                      {TIMEZONES.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                      Date format
                    </label>
                    <select
                      value={localization.dateFormat}
                      onChange={(e) => setLocalization((l) => ({ ...l, dateFormat: e.target.value }))}
                      className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary"
                    >
                      {DATE_FORMATS.map((df) => (
                        <option key={df} value={df}>
                          {df}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                      Currency
                    </label>
                    <select
                      value={localization.currency}
                      onChange={(e) => setLocalization((l) => ({ ...l, currency: e.target.value }))}
                      className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary"
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {active === "billing" && (
                <div className="max-w-md">
                  <div className="p-6 rounded-2xl border border-[#5932EA]/20 bg-gradient-to-br from-[#5932EA]/5 to-violet-50/50">
                    <p className="label-caps text-[#5932EA] mb-2">Current plan</p>
                    <h4 className="text-2xl font-bold text-foreground mb-1">Lumina Pro</h4>
                    <p className="text-sm text-muted-foreground mb-4">Up to 2,000 members · All modules included</p>
                    <p className="font-metric text-3xl text-foreground mb-6">
                      $89<span className="text-base font-normal text-muted-foreground">/mo</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => success("Upgrade request received", "Our team will contact you within 1 business day.")}
                      className="btn-primary w-full py-2.5 rounded-xl text-sm"
                    >
                      Upgrade to Enterprise
                    </button>
                  </div>
                </div>
              )}

              {active === "team" && (
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setInviteOpen(true)}
                      className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                    >
                      <Plus className="w-4 h-4" /> Invite staff
                    </button>
                  </div>
                  <div className="card-lumina overflow-hidden divide-y divide-border/40">
                    {staff.map((s) => (
                      <div key={s.id} className="flex items-center justify-between px-5 py-4">
                        <div>
                          <p className="text-sm font-bold text-foreground">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground">{s.role}</span>
                          <span className={`badge ${s.status === "Active" ? "badge-green" : "badge-amber"}`}>
                            {s.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {active === "appearance" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
                  {(
                    [
                      { value: "light", label: "Light", icon: Sun },
                      { value: "dark", label: "Dark", icon: Moon },
                      { value: "system", label: "System", icon: Monitor },
                    ] as const
                  ).map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setTheme(value)}
                      className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all ${
                        theme === value
                          ? "border-[#5932EA] bg-[#5932EA]/5"
                          : "border-border hover:border-[#5932EA]/30"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${theme === value ? "text-[#5932EA]" : "text-muted-foreground"}`} />
                      <span className="text-sm font-semibold">{label}</span>
                    </button>
                  ))}
                </div>
              )}

              {showSave && (
                <div className="flex justify-end pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <FormDialog
          open={inviteOpen}
          onOpenChange={setInviteOpen}
          title="Invite staff member"
          description="Send an invitation to join your Lumina workspace."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setInviteOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary px-4 py-2 rounded-xl text-sm"
                disabled={!inviteForm.name.trim() || !inviteForm.email.trim()}
                onClick={inviteStaff}
              >
                Send invite
              </button>
            </>
          }
        >
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Name</label>
            <input
              value={inviteForm.name}
              onChange={(e) => setInviteForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Email</label>
            <input
              type="email"
              value={inviteForm.email}
              onChange={(e) => setInviteForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Role</label>
            <select
              value={inviteForm.role}
              onChange={(e) => setInviteForm((f) => ({ ...f, role: e.target.value }))}
              className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary"
            >
              <option>Admin Assistant</option>
              <option>Associate Pastor</option>
              <option>Membership Director</option>
              <option>Finance Admin</option>
            </select>
          </div>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
