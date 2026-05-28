import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Download, TrendingUp, Landmark, Hammer, Globe, Wallet } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass, selectClass } from "@/components/shared/forms/FormField";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import type { FinanceTransaction } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const accountIcons: Record<string, typeof Landmark> = {
  fa1: Landmark,
  fa2: Hammer,
  fa3: Globe,
  fa4: Wallet,
};

const CATEGORIES = ["Giving", "Payroll", "Facilities", "Missions", "Ministry", "Benevolence", "Transfer", "Outreach"];

export default function Accounting() {
  const accounts = useDemoState((s) => s.financeAccounts);
  const transactions = useDemoState((s) => s.financeTransactions);
  const budgetCategories = useDemoState((s) => s.budgetCategories);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    desc: "",
    category: CATEGORIES[0],
    amount: "",
    type: "income" as "income" | "expense",
    accountId: accounts[0]?.id ?? "fa1",
  });

  const budgetItems = useMemo(
    () =>
      budgetCategories.slice(0, 3).map((b) => ({
        label: b.name,
        spent: Math.round(b.spent / 1000),
        total: Math.round(b.budget / 1000),
        pct: Math.min(100, Math.round((b.spent / b.budget) * 100)),
        color: b.color,
      })),
    [budgetCategories],
  );

  const handleAddEntry = () => {
    const amount = parseFloat(form.amount);
    if (!form.desc.trim() || !amount || amount <= 0) return;
    const payload: FinanceTransaction = {
      id: generateId("t"),
      desc: form.desc.trim(),
      category: form.category,
      amount,
      type: form.type,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      accountId: form.accountId,
    };
    dispatch({ type: "ADD_TRANSACTION", payload });
    success("Entry added", form.desc);
    setDialogOpen(false);
    setForm({ desc: "", category: CATEGORIES[0], amount: "", type: "income", accountId: accounts[0]?.id ?? "fa1" });
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          display
          title="Finance Overview"
          subtitle="Real-time balances and ledger for Lumina Community Church."
          section="Finance"
          action={
            <div className="flex gap-3 w-full md:w-auto">
              <button type="button" className="btn-secondary flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                className="btn-primary flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Entry
              </button>
            </div>
          }
        />

        <div className="flex overflow-x-auto gap-6 pb-2 -mx-5 px-5 lg:mx-0 lg:px-0 snap-x scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-visible">
          {accounts.map((a, i) => {
            const Icon = accountIcons[a.id] ?? Landmark;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="min-w-[280px] lg:min-w-0 flex-1 card-lumina rounded-3xl p-6 snap-center relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-[100px] -mr-10 -mt-10 bg-primary/5 group-hover:scale-110 transition-transform" />
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className={`p-2 rounded-xl ${a.color}/10 text-primary`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="font-label text-sm text-muted-foreground">{a.name}</h3>
                  </div>
                </div>
                <p className="text-4xl font-bold text-foreground leading-tight relative z-10 tabular-nums">
                  ${Math.floor(a.balance).toLocaleString()}
                </p>
                {i === 0 && (
                  <div className="flex items-center gap-1 mt-2 text-[#00677d] relative z-10">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-label text-xs">+12% vs last month</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 card-lumina rounded-[30px] p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-xl font-bold">Recent Transactions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="label-caps text-muted-foreground border-b border-[#e0e3e5]">
                    <th className="pb-4 pr-4">Date</th>
                    <th className="pb-4 pr-4">Description</th>
                    <th className="pb-4 pr-4 hidden md:table-cell">Category</th>
                    <th className="pb-4 pr-4 hidden lg:table-cell">Account</th>
                    <th className="pb-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => {
                    const account = accounts.find((a) => a.id === t.accountId);
                    return (
                      <tr key={t.id} className="tr-hover border-b border-[#eceef0] last:border-0">
                        <td className="py-4 text-sm text-muted-foreground">{t.date}</td>
                        <td className="py-4 font-medium text-foreground">{t.desc}</td>
                        <td className="py-4 hidden md:table-cell">
                          <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-label bg-primary/10 text-primary">
                            {t.category}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-muted-foreground hidden lg:table-cell">{account?.name ?? "—"}</td>
                        <td className={`py-4 text-right font-bold ${t.type === "income" ? "text-[#00677d]" : "text-foreground"}`}>
                          {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-lumina rounded-[30px] p-6 lg:p-8"
          >
            <h3 className="text-xl font-bold mb-6">Budget vs Actual</h3>
            <div className="flex flex-col gap-8">
              {budgetItems.map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="font-label text-sm font-bold">{b.label}</p>
                      <p className="text-sm text-muted-foreground">
                        ${b.spent}k / ${b.total}k
                      </p>
                    </div>
                    <span className="font-label text-xs px-2 py-1 rounded bg-primary/10 text-primary">{b.pct}%</span>
                  </div>
                  <div className="w-full bg-[#e0e3e5] rounded-full h-2.5 overflow-hidden">
                    <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Add Entry"
          description="Record an income or expense transaction."
          className="sm:max-w-md"
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setDialogOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary px-4 py-2 rounded-xl text-sm" onClick={handleAddEntry}>
                Save Entry
              </button>
            </>
          }
        >
          <FormField label="Description" htmlFor="tx-desc">
            <input id="tx-desc" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Type" htmlFor="tx-type">
            <select id="tx-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "income" | "expense" })} className={selectClass}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </FormField>
          <FormField label="Amount ($)" htmlFor="tx-amount">
            <input id="tx-amount" type="number" min="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Category" htmlFor="tx-cat">
            <select id="tx-cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={selectClass}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Account" htmlFor="tx-account">
            <select id="tx-account" value={form.accountId} onChange={(e) => setForm({ ...form, accountId: e.target.value })} className={selectClass}>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </FormField>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
