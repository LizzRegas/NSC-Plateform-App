import { useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Activity, Mail, Phone, Calendar } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { MemberDetailPanel } from "@/features/people/components/MemberDetailPanel";
import { AddMemberDialog } from "@/features/people/components/AddMemberDialog";
import { useDemoState, useDemoDispatch } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";
import NotFound from "@/features/common/NotFound";

const SAMPLE_ACTIVITY = [
  { label: "Checked in — Sunday Service", when: "2 days ago" },
  { label: "Joined Morning Men's Study", when: "1 week ago" },
  { label: "Profile updated", when: "2 weeks ago" },
];

export default function MemberDetail() {
  const [, params] = useRoute("/members/:id");
  const [, navigate] = useLocation();
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const members = useDemoState((s) => s.members);
  const member = useMemo(() => members.find((m) => m.id === params?.id), [members, params?.id]);

  const [editOpen, setEditOpen] = useState(false);
  const [inactiveOpen, setInactiveOpen] = useState(false);

  if (!params?.id) return <NotFound />;
  if (!member) return <NotFound />;

  const markInactive = () => {
    dispatch({
      type: "UPDATE_MEMBER",
      payload: { ...member, status: "Inactive", needsReview: false },
    });
    success("Marked inactive", `${member.name} is now inactive.`);
    setInactiveOpen(false);
  };

  return (
    <PageTransition>
      <PageCanvas className="pb-10">
        <div className="mb-6">
          <Link href="/members">
            <span className="inline-flex items-center gap-2 text-sm font-label font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Members
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_1fr] gap-6">
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-lumina p-5 h-fit lg:sticky lg:top-28"
          >
            <MemberDetailPanel
              member={member}
              onEdit={() => setEditOpen(true)}
              onMarkInactive={() => setInactiveOpen(true)}
              onScheduleAppointment={() => navigate("/appointments/available")}
            />
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="space-y-6"
          >
            <div className="card-lumina p-6">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#5932EA]" />
                Activity
              </h2>
              <p className="text-sm text-muted-foreground mt-1 mb-5">
                Recent engagement and roster events for {member.name}.
              </p>
              <ul className="space-y-3">
                {SAMPLE_ACTIVITY.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between gap-4 py-3 border-b border-[#e0e3e5]/50 last:border-0"
                  >
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="font-label text-xs text-muted-foreground shrink-0">{item.when}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-lumina p-6">
              <h3 className="font-label text-xs text-muted-foreground uppercase tracking-wide mb-4">
                Contact snapshot
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#5932EA]/70" />
                  <a href={`mailto:${member.email}`} className="hover:text-primary">
                    {member.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#5932EA]/70" />
                  {member.phone}
                </li>
                <li className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#5932EA]/70" />
                  Joined {member.joined}
                </li>
              </ul>
            </div>
          </motion.section>
        </div>

        <AddMemberDialog open={editOpen} onOpenChange={setEditOpen} member={member} />
        <ConfirmDialog
          open={inactiveOpen}
          onOpenChange={setInactiveOpen}
          title="Mark as inactive?"
          description={`${member.name} will remain in roster history but won't appear in default directory exports.`}
          confirmLabel="Mark inactive"
          destructive
          onConfirm={markInactive}
        />
      </PageCanvas>
    </PageTransition>
  );
}
