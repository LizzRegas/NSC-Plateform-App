import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Target, TrendingUp, Users, DollarSign } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass, textareaClass } from "@/components/shared/forms/FormField";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import type { PledgeCampaign } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const CAMPAIGN_STYLES = [
  { color: "text-[#5932EA]", bg: "bg-[#e5deff]", bar: "bg-[#5932EA]" },
  { color: "text-[#00677d]", bg: "bg-[#d4f0f7]", bar: "bg-[#00677d]" },
  { color: "text-violet-700", bg: "bg-violet-50", bar: "bg-violet-600" },
  { color: "text-amber-800", bg: "bg-amber-50", bar: "bg-amber-500" },
];

export default function Pledges() {
  const campaigns = useDemoState((s) => s.pledgeCampaigns);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", goal: "", deadline: "Dec 2026", desc: "" });

  const totals = useMemo(() => {
    const goal = campaigns.reduce((s, c) => s + c.goal, 0);
    const raised = campaigns.reduce((s, c) => s + c.raised, 0);
    const pledgers = campaigns.reduce((s, c) => s + c.pledgers, 0);
    const onTrack = campaigns.filter((c) => c.raised / c.goal >= 0.5).length;
    return { goal, raised, pledgers, onTrack, pct: goal ? Math.round((raised / goal) * 100) : 0 };
  }, [campaigns]);

  const stats = [
    {
      label: "Total Pledged",
      value: `$${totals.goal.toLocaleString()}`,
      change: `+$${Math.round(totals.goal * 0.16).toLocaleString()}`,
      trend: "up" as const,
      icon: Target,
      iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      delay: 0.05,
    },
    {
      label: "Received",
      value: `$${totals.raised.toLocaleString()}`,
      change: `${totals.pct}%`,
      trend: "up" as const,
      icon: DollarSign,
      iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      delay: 0.1,
    },
    {
      label: "Active Pledgers",
      value: String(totals.pledgers),
      change: "+12",
      trend: "up" as const,
      icon: Users,
      iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600",
      delay: 0.15,
    },
    {
      label: "On Track",
      value: `${campaigns.length ? Math.round((totals.onTrack / campaigns.length) * 100) : 0}%`,
      change: "+3%",
      trend: "up" as const,
      icon: TrendingUp,
      iconGradient: "bg-gradient-to-br from-amber-500 to-amber-600",
      delay: 0.2,
    },
  ];

  const handleAddCampaign = () => {
    const goal = parseFloat(form.goal);
    if (!form.name.trim() || !goal || goal <= 0) return;
    const style = CAMPAIGN_STYLES[campaigns.length % CAMPAIGN_STYLES.length];
    const payload: PledgeCampaign = {
      id: generateId("pl"),
      name: form.name.trim(),
      goal,
      raised: 0,
      pledgers: 0,
      deadline: form.deadline.trim() || "Dec 2026",
      desc: form.desc.trim() || "New pledge campaign",
      ...style,
    };
    dispatch({ type: "ADD_PLEDGE", payload });
    success("Campaign created", form.name);
    setDialogOpen(false);
    setForm({ name: "", goal: "", deadline: "Dec 2026", desc: "" });
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Pledges"
          subtitle="Campaign pledge tracking and goal management"
          section="Giving"
          action={
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
            >
              <Plus className="w-4 h-4" /> New Campaign
            </button>
          }
        />
        <KpiGrid stats={stats} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {campaigns.map((c, i) => {
            const pct = Math.round((c.raised / c.goal) * 100);
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.25 + i * 0.07 }}
                className="card-lumina card-lumina-interactive p-6 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {c.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
                  </div>
                  <div className={`${c.bg} px-3 py-1.5 rounded-xl`}>
                    <span className={`text-xs font-bold ${c.color}`} style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {pct}%
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Raised</span>
                    <span className="font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      ${c.raised.toLocaleString()} of ${c.goal.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(pct, 100)}%` }}
                      transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                      className={`h-full rounded-full ${c.bar}`}
                      style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span style={{ fontFamily: "'Manrope', sans-serif" }}>
                      <span className="font-bold text-foreground">{c.pledgers}</span> pledgers
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    <span>Due {c.deadline}</span>
                  </div>
                  <span className="font-semibold text-foreground">${(c.goal - c.raised).toLocaleString()} remaining</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="New Campaign"
          description="Create a pledge campaign with a fundraising goal."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setDialogOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary px-4 py-2 rounded-xl text-sm" onClick={handleAddCampaign}>
                Create Campaign
              </button>
            </>
          }
        >
          <FormField label="Campaign name" htmlFor="pledge-name">
            <input
              id="pledge-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              placeholder="e.g. Building Campaign"
            />
          </FormField>
          <FormField label="Goal ($)" htmlFor="pledge-goal">
            <input
              id="pledge-goal"
              type="number"
              min="1"
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              className={inputClass}
            />
          </FormField>
          <FormField label="Deadline" htmlFor="pledge-deadline">
            <input
              id="pledge-deadline"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              className={inputClass}
            />
          </FormField>
          <FormField label="Description" htmlFor="pledge-desc">
            <textarea
              id="pledge-desc"
              rows={3}
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              className={textareaClass}
            />
          </FormField>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
