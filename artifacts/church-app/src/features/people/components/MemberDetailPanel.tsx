import { Link } from "wouter";
import {
  MoreHorizontal,
  Calendar,
  Shield,
  Mail,
  Phone,
  X,
  BookUser,
  Pencil,
  CheckCircle2,
  UserX,
  CalendarClock,
} from "lucide-react";
import type { Member, MemberRole, MemberStatus, MembershipStage } from "@/lib/demo-store";

export const roleStyles: Record<MemberRole, string> = {
  Elder: "bg-[#e5deff] text-[#4100cf]",
  Deacon: "bg-[#58d8fd]/30 text-[#005c70]",
  Member: "bg-[#eceef0] text-[#484556]",
  Volunteer: "bg-[#ffdbcd] text-[#6b2d00]",
};

export const statusStyles: Record<MemberStatus, { dot: string; text: string }> = {
  Active: { dot: "bg-emerald-500", text: "text-[#137333]" },
  Inactive: { dot: "bg-[#797587]", text: "text-muted-foreground" },
  Pending: { dot: "bg-amber-400", text: "text-amber-800" },
};

export const stageStyles: Record<MembershipStage, string> = {
  New: "bg-amber-50 text-amber-800 border-amber-200/80",
  Regular: "bg-[#f7f9fb] text-[#484556] border-[#e0e3e5]",
  Leadership: "bg-[#e5deff]/60 text-[#4100cf] border-[#c9c4d9]/50",
};

export interface MemberDetailPanelProps {
  member: Member;
  onClose?: () => void;
  showClose?: boolean;
  onEdit?: () => void;
  onMarkInactive?: () => void;
  onScheduleAppointment?: () => void;
}

export function MemberDetailPanel({
  member,
  onClose,
  showClose,
  onEdit,
  onMarkInactive,
  onScheduleAppointment,
}: MemberDetailPanelProps) {
  const groupCount = member.groups?.length ?? 0;

  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <p className="label-caps text-muted-foreground">Member record</p>
        {showClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="icon-btn rounded-full -mr-1"
            aria-label="Close member details"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex items-start gap-4">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt=""
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white shadow-md"
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5932EA] to-[#4100cf] text-white flex items-center justify-center font-label font-bold text-lg">
            {member.initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-foreground leading-tight">{member.name}</h3>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span
              className={`font-label text-[10px] px-2 py-0.5 rounded-full border ${stageStyles[member.stage]}`}
            >
              {member.stage}
            </span>
            <span className={`font-label text-[10px] px-2 py-0.5 rounded-lg ${roleStyles[member.role]}`}>
              {member.role}
            </span>
            <span
              className={`font-label text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${statusStyles[member.status].text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[member.status].dot}`} />
              {member.status}
            </span>
          </div>
        </div>
        <button type="button" className="icon-btn rounded-full shrink-0" aria-label="More actions">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <ul className="mt-5 space-y-3 text-sm">
        <li className="flex items-center gap-3 text-muted-foreground">
          <Mail className="w-4 h-4 text-[#5932EA]/70 shrink-0" />
          <a
            href={`mailto:${member.email}`}
            className="truncate text-foreground hover:text-primary transition-colors"
          >
            {member.email}
          </a>
        </li>
        <li className="flex items-center gap-3 text-muted-foreground">
          <Phone className="w-4 h-4 text-[#5932EA]/70 shrink-0" />
          <a
            href={`tel:${member.phone.replace(/\D/g, "")}`}
            className="text-foreground hover:text-primary transition-colors"
          >
            {member.phone}
          </a>
        </li>
        <li className="flex items-center gap-3 text-muted-foreground">
          <Calendar className="w-4 h-4 text-[#5932EA]/70 shrink-0" />
          Joined {member.joined}
        </li>
        {member.role === "Elder" || member.role === "Deacon" ? (
          <li className="flex items-center gap-3 text-muted-foreground">
            <Shield className="w-4 h-4 text-[#5932EA]/70 shrink-0" />
            {member.role} — leadership role
          </li>
        ) : null}
      </ul>

      <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-[#e0e3e5]/60">
        <div className="rounded-xl bg-[#f7f9fb] px-3 py-2.5">
          <p className="font-metric text-lg font-bold text-foreground">{groupCount}</p>
          <p className="font-label text-[11px] text-muted-foreground">Groups</p>
        </div>
        <div className="rounded-xl bg-[#f7f9fb] px-3 py-2.5">
          <p className="font-label text-sm font-bold text-foreground truncate">{member.lastActivity}</p>
          <p className="font-label text-[11px] text-muted-foreground">Last activity</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {member.needsReview ? (
          <>
            <button
              type="button"
              className="btn-primary w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
              onClick={onEdit}
            >
              <CheckCircle2 className="w-4 h-4" />
              Approve membership
            </button>
            <button type="button" className="btn-secondary w-full py-2.5 rounded-xl text-sm">
              Request more info
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn-primary w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
              onClick={onEdit}
            >
              <Pencil className="w-4 h-4" />
              Edit record
            </button>
            <Link href="/directory">
              <span className="btn-secondary w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer">
                <BookUser className="w-4 h-4" />
                Open in Directory
              </span>
            </Link>
            {onScheduleAppointment && (
              <button
                type="button"
                className="btn-secondary w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
                onClick={onScheduleAppointment}
              >
                <CalendarClock className="w-4 h-4" />
                Schedule appointment
              </button>
            )}
            {member.status === "Active" && onMarkInactive && (
              <button
                type="button"
                className="w-full py-2.5 rounded-xl text-sm font-label font-semibold text-muted-foreground border border-[#e0e3e5] hover:border-rose-200 hover:text-rose-700 hover:bg-rose-50/50 transition-colors flex items-center justify-center gap-2"
                onClick={onMarkInactive}
              >
                <UserX className="w-4 h-4" />
                Mark inactive
              </button>
            )}
          </>
        )}
      </div>

      {member.status === "Inactive" && (
        <p className="mt-4 text-xs text-muted-foreground leading-relaxed rounded-xl bg-[#f7f9fb] px-3 py-2.5 border border-[#e0e3e5]/60">
          Inactive members stay in roster history but are hidden from default directory exports.
        </p>
      )}
    </>
  );
}
