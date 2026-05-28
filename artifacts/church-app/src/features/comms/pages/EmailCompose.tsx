import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Save } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import type { EmailMessage } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const AUDIENCES = ["All Members", "Youth & Parents", "Volunteers", "Leaders", "New Members", "Pledgers"];

function formatNow() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function EmailCompose() {
  const [, navigate] = useLocation();
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const emails = useDemoState((s) => s.emails);

  const editId = useMemo(() => new URLSearchParams(window.location.search).get("id"), []);
  const existing = useMemo(
    () => (editId ? emails.find((e) => e.id === editId && e.status === "Draft") : undefined),
    [emails, editId],
  );

  const [subject, setSubject] = useState("");
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [body, setBody] = useState("");

  useEffect(() => {
    if (existing) {
      setSubject(existing.subject);
      setAudience(existing.audience);
      setBody(existing.body ?? "");
    }
  }, [existing]);

  const persist = (status: EmailMessage["status"]) => {
    if (!subject.trim()) return;

    const now = formatNow();
    if (existing) {
      const payload: EmailMessage = {
        ...existing,
        subject: subject.trim(),
        audience,
        body: body.trim(),
        status,
        ...(status === "Sent"
          ? { sent: now, opens: 0, clicks: 0, lastEdited: undefined }
          : { lastEdited: "Just now" }),
      };
      dispatch({ type: "UPDATE_EMAIL", payload });
    } else {
      const payload: EmailMessage = {
        id: generateId("em"),
        subject: subject.trim(),
        audience,
        body: body.trim(),
        status,
        ...(status === "Sent"
          ? { sent: now, opens: 0, clicks: 0 }
          : { lastEdited: "Just now" }),
      };
      dispatch({ type: "ADD_EMAIL", payload });
    }

    success(status === "Sent" ? "Email sent" : "Draft saved", subject.trim());
    navigate("/comms/email");
  };

  return (
    <PageTransition>
      <PageCanvas>
        <div className="mb-4">
          <Link href="/comms/email">
            <span className="inline-flex items-center gap-2 text-sm font-label font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Email
            </span>
          </Link>
        </div>

        <PageHeader
          title={existing ? "Edit draft" : "Compose email"}
          subtitle="Write and send newsletters or save as a draft"
          section="Communication"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-lumina overflow-hidden max-w-3xl"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="p-6 space-y-5">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block"
                style={{ fontFamily: "'Manrope', sans-serif" }}>
                Subject
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject line"
                className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block"
                style={{ fontFamily: "'Manrope', sans-serif" }}>
                Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              >
                {AUDIENCES.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block"
                style={{ fontFamily: "'Manrope', sans-serif" }}>
                Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={12}
                placeholder="Write your message…"
                className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-y min-h-[200px]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
              <button
                type="button"
                disabled={!subject.trim()}
                onClick={() => persist("Sent")}
                className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Send
              </button>
              <button
                type="button"
                disabled={!subject.trim()}
                onClick={() => persist("Draft")}
                className="btn-secondary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> Save draft
              </button>
              <Link href="/comms/email">
                <button type="button" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2.5">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </PageCanvas>
    </PageTransition>
  );
}
