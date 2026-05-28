import { useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Plus, FileText, Eye, BarChart3, Copy, Archive, TrendingUp, CheckCircle2, Users } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { useDemoState, useDemoDispatch } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const catColors: Record<string, string> = {
  Membership: "badge badge-blue",
  Pastoral: "badge badge-violet",
  Events: "badge badge-amber",
  Ministry: "badge badge-green",
  Groups: "badge badge-teal",
  Missions: "badge badge-red",
};

export default function Forms() {
  const [, navigate] = useLocation();
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const forms = useDemoState((s) => s.forms);
  const formSubmissions = useDemoState((s) => s.formSubmissions);

  const stats = useMemo(
    () => [
      {
        label: "Active Forms",
        value: String(forms.filter((f) => f.status === "Active").length),
        change: "+2",
        trend: "up" as const,
        icon: FileText,
        iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
        delay: 0.05,
      },
      {
        label: "Submissions",
        value: String(formSubmissions.length),
        change: "+64",
        trend: "up" as const,
        icon: CheckCircle2,
        iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        delay: 0.1,
      },
      {
        label: "Pending review",
        value: String(formSubmissions.filter((s) => s.status === "Pending").length),
        change: "+12",
        trend: "up" as const,
        icon: TrendingUp,
        iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600",
        delay: 0.15,
      },
      {
        label: "Draft forms",
        value: String(forms.filter((f) => f.status === "Draft").length),
        change: "—",
        trend: "up" as const,
        icon: Users,
        iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600",
        delay: 0.2,
      },
    ],
    [forms, formSubmissions],
  );

  const visibleForms = forms.filter((f) => f.status !== "Archived");

  const handleDuplicate = (id: string, name: string) => {
    dispatch({ type: "DUPLICATE_FORM", payload: id });
    success("Form duplicated", `"${name}" was copied as a draft.`);
  };

  const handleArchive = (id: string, name: string) => {
    dispatch({ type: "ARCHIVE_FORM", payload: id });
    success("Form archived", `"${name}" has been archived.`);
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Forms"
          subtitle="Build forms and collect responses from members"
          section="Forms"
          action={
            <button
              type="button"
              onClick={() => navigate("/forms/new")}
              className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
            >
              <Plus className="w-4 h-4" /> Create Form
            </button>
          }
        />
        <KpiGrid stats={stats} />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {visibleForms.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.24 + i * 0.05 }}
              className="card-lumina card-lumina-interactive p-5 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
                  style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.25)" }}
                >
                  <FileText className="w-4.5 h-4.5 text-white" />
                </div>
                <span className={f.status === "Active" ? "badge badge-green" : "badge badge-gray"}>
                  {f.status}
                </span>
              </div>
              <h3
                className="text-sm font-bold text-foreground mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {f.name}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <span className={catColors[f.category] || "badge badge-gray"}>{f.category}</span>
                <span className="text-xs text-muted-foreground">{f.fields.length} fields</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {f.submissions}
                  </span>{" "}
                  submissions
                </div>
                <span>Last: {f.lastSubmit}</span>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => navigate(`/forms/${f.id}/edit`)}
                  className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs flex-1 justify-center"
                >
                  <Eye className="w-3 h-3" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/forms/submissions")}
                  className="icon-btn"
                  aria-label="View submissions"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDuplicate(f.id, f.name)}
                  className="icon-btn"
                  aria-label="Duplicate form"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleArchive(f.id, f.name)}
                  className="icon-btn"
                  aria-label="Archive form"
                >
                  <Archive className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleForms.length === 0 && (
          <div className="card-lumina p-10 text-center text-muted-foreground text-sm">
            No forms yet. Create your first form to get started.
          </div>
        )}
      </PageCanvas>
    </PageTransition>
  );
}
