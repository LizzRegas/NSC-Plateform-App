import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Download, AlertCircle } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass } from "@/components/shared/forms/FormField";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import type { BudgetCategory } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";
import { Banknote, PieChart, CheckCircle2 } from "lucide-react";

export default function Budget() {
  const categories = useDemoState((s) => s.budgetCategories);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", budget: "" });

  const totals = useMemo(() => {
    const budget = categories.reduce((s, c) => s + c.budget, 0);
    const spent = categories.reduce((s, c) => s + c.spent, 0);
    const onTrack = categories.filter((c) => c.status === "on-track" || c.status === "under-budget").length;
    const over = categories.filter((c) => c.status === "over-budget").length;
    return { budget, spent, onTrack, over };
  }, [categories]);

  const stats = [
    {
      label: "Annual Budget",
      value: `$${totals.budget.toLocaleString()}`,
      change: "",
      trend: "neutral" as const,
      icon: Banknote,
      iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      delay: 0.05,
    },
    {
      label: "YTD Spend",
      value: `$${totals.spent.toLocaleString()}`,
      change: totals.budget ? `${Math.round((totals.spent / totals.budget) * 100)}%` : "—",
      trend: "up" as const,
      icon: PieChart,
      iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600",
      delay: 0.1,
    },
    {
      label: "On Track",
      value: `${totals.onTrack}/${categories.length}`,
      change: "",
      trend: "neutral" as const,
      icon: CheckCircle2,
      iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      delay: 0.15,
    },
    {
      label: "Over Budget",
      value: String(totals.over),
      change: "",
      trend: "down" as const,
      icon: AlertCircle,
      iconGradient: "bg-gradient-to-br from-rose-500 to-rose-600",
      delay: 0.2,
    },
  ];

  const handleAddCategory = () => {
    const budget = parseFloat(form.budget);
    if (!form.name.trim() || !budget || budget <= 0) return;
    const payload: BudgetCategory = {
      id: generateId("b"),
      name: form.name.trim(),
      budget,
      spent: 0,
      color: "bg-blue-500",
      status: "on-track",
    };
    dispatch({ type: "ADD_BUDGET_CATEGORY", payload });
    success("Category added", form.name);
    setDialogOpen(false);
    setForm({ name: "", budget: "" });
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Budget"
          subtitle="Annual budget planning and variance tracking"
          section="Finance"
          action={
            <div className="flex gap-2">
              <button type="button" className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
                <Download className="w-4 h-4" /> Report
              </button>
              <button type="button" onClick={() => setDialogOpen(true)} className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
                <Plus className="w-4 h-4" /> Add Category
              </button>
            </div>
          }
        />
        <KpiGrid stats={stats} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26 }}
          className="card-lumina overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Budget vs Actual (2026)
            </h3>
            <select className="text-sm bg-background border border-border rounded-xl px-3 py-2 outline-none focus:border-primary transition-all">
              <option>Annual 2026</option>
              <option>Q1 2026</option>
            </select>
          </div>
          <div className="p-5 sm:p-6 space-y-4">
            {categories.map((c, i) => {
              const pct = Math.round((c.spent / c.budget) * 100);
              const isOver = c.status === "over-budget";
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.3 + i * 0.04 }}
                >
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <span className="text-sm font-semibold text-foreground truncate" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {c.name}
                    </span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground">
                        ${c.spent.toLocaleString()} / ${c.budget.toLocaleString()}
                      </span>
                      {isOver && <AlertCircle className="w-3.5 h-3.5 text-rose-500" />}
                      <span className={`text-xs font-bold ${isOver ? "text-rose-500" : "text-foreground"}`} style={{ fontFamily: "'Manrope', sans-serif" }}>
                        {pct}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(pct, 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.35 + i * 0.04, ease: [0.4, 0, 0.2, 1] }}
                      className={`h-full rounded-full ${isOver ? "bg-gradient-to-r from-rose-500 to-rose-400" : `${c.color}`}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Add Category"
          description="Add a new budget line item for the year."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setDialogOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary px-4 py-2 rounded-xl text-sm" onClick={handleAddCategory}>
                Add Category
              </button>
            </>
          }
        >
          <FormField label="Category name" htmlFor="budget-name">
            <input id="budget-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Annual budget ($)" htmlFor="budget-amount">
            <input id="budget-amount" type="number" min="1" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputClass} />
          </FormField>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
