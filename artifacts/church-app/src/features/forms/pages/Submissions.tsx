import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Search, CheckCircle2, Trash2 } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { DetailSheet } from "@/components/shared/DetailSheet";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useDemoState, useDemoDispatch, downloadCsv } from "@/lib/demo-store";
import type { FormSubmission } from "@/lib/demo-store/types";
import { useDemoToast } from "@/hooks/useDemoToast";

const statusColors: Record<string, string> = { Reviewed: "badge badge-green", Pending: "badge badge-amber" };

export default function Submissions() {
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const formSubmissions = useDemoState((s) => s.formSubmissions);
  const forms = useDemoState((s) => s.forms);

  const [search, setSearch] = useState("");
  const [formFilter, setFormFilter] = useState("All Forms");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selected, setSelected] = useState<FormSubmission | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FormSubmission | null>(null);

  const formOptions = useMemo(
    () => ["All Forms", ...forms.map((f) => f.name)],
    [forms],
  );

  const filtered = useMemo(() => {
    return formSubmissions.filter((s) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.form.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q);
      const matchesForm = formFilter === "All Forms" || s.form === formFilter;
      const matchesStatus =
        statusFilter === "All Status" || s.status === statusFilter;
      return matchesSearch && matchesForm && matchesStatus;
    });
  }, [formSubmissions, search, formFilter, statusFilter]);

  const handleMarkReviewed = (submission: FormSubmission) => {
    if (submission.status === "Reviewed") return;
    dispatch({
      type: "UPDATE_SUBMISSION",
      payload: { ...submission, status: "Reviewed" },
    });
    success("Marked reviewed", `Submission from ${submission.name} is now reviewed.`);
    if (selected?.id === submission.id) {
      setSelected({ ...submission, status: "Reviewed" });
    }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    dispatch({ type: "DELETE_SUBMISSION", payload: deleteTarget.id });
    success("Submission deleted", `${deleteTarget.id} has been removed.`);
    if (selected?.id === deleteTarget.id) setSelected(null);
    setDeleteTarget(null);
  };

  const handleExport = () => {
    const answerKeys = Array.from(new Set(filtered.flatMap((s) => Object.keys(s.answers))));
    const headers = ["ID", "Form", "Name", "Email", "Submitted", "Status", ...answerKeys];
    const rows = filtered.map((s) => [
      s.id,
      s.form,
      s.name,
      s.email,
      s.submitted,
      s.status,
      ...answerKeys.map((k) => s.answers[k] ?? ""),
    ]);
    downloadCsv("form-submissions.csv", headers, rows);
    success("Export complete", `${filtered.length} submissions exported to CSV.`);
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Submissions"
          subtitle="Review all form submission responses"
          section="Forms"
          action={
            <button
              type="button"
              onClick={handleExport}
              className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          }
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="card-lumina overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 px-5 sm:px-6 py-4 border-b border-border">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search submissions..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <select
                value={formFilter}
                onChange={(e) => setFormFilter(e.target.value)}
                className="text-sm bg-background border border-border rounded-xl px-3 py-2 outline-none focus:border-primary transition-all"
              >
                {formOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm bg-background border border-border rounded-xl px-3 py-2 outline-none focus:border-primary transition-all"
              >
                <option>All Status</option>
                <option>Pending</option>
                <option>Reviewed</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-muted/30 border-b border-border/60">
                  {["ID", "Form", "Submitted By", "Date", "Status", ""].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 sm:px-6 py-3"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filtered.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.18 + i * 0.04 }}
                    className="tr-hover group cursor-pointer"
                    onClick={() => setSelected(s)}
                  >
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground font-mono">{s.id}</td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <span className="badge badge-violet">{s.form}</span>
                    </td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <p
                        className="text-sm font-semibold text-foreground"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {s.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{s.email}</p>
                    </td>
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{s.submitted}</td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <span className={statusColors[s.status]}>{s.status}</span>
                    </td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <div
                        className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {s.status === "Pending" && (
                          <button
                            type="button"
                            className="icon-btn"
                            aria-label="Mark reviewed"
                            onClick={() => handleMarkReviewed(s)}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          </button>
                        )}
                        <button
                          type="button"
                          className="icon-btn"
                          aria-label="Delete submission"
                          onClick={() => setDeleteTarget(s)}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <DetailSheet
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
          title={selected?.name ?? "Submission"}
          description={selected ? `${selected.form} · ${selected.submitted}` : undefined}
        >
          {selected && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <span className={statusColors[selected.status]}>{selected.status}</span>
                <span className="text-muted-foreground">{selected.email}</span>
              </div>
              <div className="space-y-3">
                {Object.entries(selected.answers).map(([key, value]) => (
                  <div key={key} className="card-lumina p-3">
                    <p
                      className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {key}
                    </p>
                    <p className="text-sm text-foreground">{value || "—"}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2">
                {selected.status === "Pending" && (
                  <button
                    type="button"
                    onClick={() => handleMarkReviewed(selected)}
                    className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark reviewed
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDeleteTarget(selected)}
                  className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-rose-600"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </DetailSheet>

        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title="Delete submission"
          description={
            deleteTarget
              ? `Permanently delete submission ${deleteTarget.id} from ${deleteTarget.name}?`
              : ""
          }
          confirmLabel="Delete"
          destructive
          onConfirm={handleDelete}
        />
      </PageCanvas>
    </PageTransition>
  );
}
