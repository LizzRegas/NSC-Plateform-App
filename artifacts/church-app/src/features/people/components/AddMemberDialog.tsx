import { useEffect, useState } from "react";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass, selectClass } from "@/components/shared/forms/FormField";
import { useDemoDispatch, generateId, type Member, type MemberRole, type MemberStatus, type MembershipStage } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const ROLES: MemberRole[] = ["Elder", "Deacon", "Member", "Volunteer"];
const STATUSES: MemberStatus[] = ["Active", "Inactive", "Pending"];
const STAGES: MembershipStage[] = ["New", "Regular", "Leadership"];

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member?: Member | null;
}

export function AddMemberDialog({ open, onOpenChange, member }: AddMemberDialogProps) {
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const isEdit = Boolean(member);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<MemberRole>("Member");
  const [status, setStatus] = useState<MemberStatus>("Active");
  const [stage, setStage] = useState<MembershipStage>("New");
  const [joined, setJoined] = useState("");

  useEffect(() => {
    if (!open) return;
    if (member) {
      setName(member.name);
      setEmail(member.email);
      setPhone(member.phone);
      setRole(member.role);
      setStatus(member.status);
      setStage(member.stage);
      setJoined(member.joined);
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setRole("Member");
      setStatus("Active");
      setStage("New");
      setJoined(new Date().toLocaleString("en-US", { month: "short", year: "numeric" }));
    }
  }, [open, member]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const payload: Member = {
      id: member?.id ?? generateId("m"),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || "—",
      role,
      status,
      stage,
      joined: joined.trim() || "—",
      groups: member?.groups ?? [],
      lastActivity: member?.lastActivity ?? "Today",
      avatar: member?.avatar,
      initials: member?.initials ?? initialsFromName(name),
      needsReview: status === "Pending" ? member?.needsReview ?? true : false,
    };

    if (isEdit) {
      dispatch({ type: "UPDATE_MEMBER", payload });
      success("Member updated", `${payload.name} was saved.`);
    } else {
      dispatch({ type: "ADD_MEMBER", payload });
      success("Member added", `${payload.name} joined the roster.`);
    }
    onOpenChange(false);
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Edit member" : "Add member"}
      description={isEdit ? "Update roster details for this person." : "Add a new person to your congregation roster."}
      footer={
        <>
          <button type="button" className="btn-secondary px-4 py-2.5 rounded-xl text-sm" onClick={() => onOpenChange(false)}>
            Cancel
          </button>
          <button type="submit" form="add-member-form" className="btn-primary px-4 py-2.5 rounded-xl text-sm">
            {isEdit ? "Save changes" : "Add member"}
          </button>
        </>
      }
    >
      <form id="add-member-form" onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Full name" htmlFor="member-name">
          <input
            id="member-name"
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormField>
        <FormField label="Email" htmlFor="member-email">
          <input
            id="member-email"
            type="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormField>
        <FormField label="Phone" htmlFor="member-phone">
          <input
            id="member-phone"
            className={inputClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <FormField label="Role" htmlFor="member-role">
            <select id="member-role" className={selectClass} value={role} onChange={(e) => setRole(e.target.value as MemberRole)}>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Status" htmlFor="member-status">
            <select
              id="member-status"
              className={selectClass}
              value={status}
              onChange={(e) => setStatus(e.target.value as MemberStatus)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Stage" htmlFor="member-stage">
            <select id="member-stage" className={selectClass} value={stage} onChange={(e) => setStage(e.target.value as MembershipStage)}>
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FormField>
        </div>
        <FormField label="Joined" htmlFor="member-joined">
          <input id="member-joined" className={inputClass} value={joined} onChange={(e) => setJoined(e.target.value)} />
        </FormField>
      </form>
    </FormDialog>
  );
}
