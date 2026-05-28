import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  ChevronRight,
  Music2,
  Clock,
  Mic,
  BookOpen,
  Users,
  Trash2,
  Megaphone,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass } from "@/components/shared/forms/FormField";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import type { ServicePlan, ServicePlanItem } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const ICON_MAP: Record<string, LucideIcon> = {
  Music: Music2,
  Megaphone,
  BookOpen,
  Heart,
  Mic,
  Users,
};

const TYPE_STYLES: Record<string, string> = {
  worship: "text-violet-600 bg-violet-50",
  announcement: "text-blue-600 bg-blue-50",
  sermon: "text-amber-600 bg-amber-50",
  offering: "text-emerald-600 bg-emerald-50",
  prayer: "text-amber-500 bg-amber-50",
  reading: "text-emerald-500 bg-emerald-50",
  song: "text-violet-500 bg-violet-50",
  message: "text-blue-500 bg-blue-50",
  opening: "text-blue-500 bg-blue-50",
  closing: "text-emerald-500 bg-emerald-50",
};

const statusColors: Record<string, string> = {
  confirmed: "badge badge-green",
  draft: "badge badge-gray",
};

export default function Planning() {
  const servicePlans = useDemoState((s) => s.servicePlans);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [planForm, setPlanForm] = useState({ date: "", time: "9:30 AM", title: "Sunday Morning Service", theme: "", leader: "" });
  const [itemForm, setItemForm] = useState({ time: "9:30", duration: "5 min", label: "", type: "worship" });

  const selectedPlan = useMemo(() => {
    const id = selectedId ?? servicePlans[0]?.id;
    return servicePlans.find((p) => p.id === id) ?? servicePlans[0];
  }, [servicePlans, selectedId]);

  const handleNewPlan = () => {
    if (!planForm.date.trim() || !planForm.leader.trim()) return;
    const payload: ServicePlan = {
      id: generateId("sp"),
      date: planForm.date.trim(),
      time: planForm.time.trim(),
      title: planForm.title.trim(),
      theme: planForm.theme.trim() || "TBD",
      leader: planForm.leader.trim(),
      status: "draft",
      items: [],
    };
    dispatch({ type: "ADD_SERVICE_PLAN", payload });
    setSelectedId(payload.id);
    success("Service plan created", planForm.date);
    setPlanDialogOpen(false);
    setPlanForm({ date: "", time: "9:30 AM", title: "Sunday Morning Service", theme: "", leader: "" });
  };

  const handleAddItem = () => {
    if (!selectedPlan || !itemForm.label.trim()) return;
    const iconName = itemForm.type === "sermon" ? "BookOpen" : itemForm.type === "worship" || itemForm.type === "song" ? "Music" : "Megaphone";
    const newItem: ServicePlanItem = {
      id: generateId("i"),
      time: itemForm.time,
      duration: itemForm.duration,
      type: itemForm.type,
      label: itemForm.label.trim(),
      icon: iconName,
      color: TYPE_STYLES[itemForm.type]?.split(" ")[0] ?? "text-violet-600",
    };
    dispatch({
      type: "UPDATE_SERVICE_PLAN",
      payload: { ...selectedPlan, items: [...selectedPlan.items, newItem] },
    });
    success("Item added", itemForm.label);
    setItemDialogOpen(false);
    setItemForm({ time: "9:30", duration: "5 min", label: "", type: "worship" });
  };

  const handleRemoveItem = (itemId: string) => {
    if (!selectedPlan) return;
    dispatch({
      type: "UPDATE_SERVICE_PLAN",
      payload: { ...selectedPlan, items: selectedPlan.items.filter((i) => i.id !== itemId) },
    });
    success("Item removed");
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Service Planning"
          subtitle="Build and manage worship service orders"
          section="Worship"
          action={
            <button type="button" onClick={() => setPlanDialogOpen(true)} className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> New Service Plan
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {servicePlans.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 + i * 0.08 }}
              onClick={() => setSelectedId(s.id)}
              className={`card-lumina card-lumina-interactive p-5 cursor-pointer group ${
                selectedPlan?.id === s.id ? "ring-2 ring-primary/30" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {s.date}
                  </p>
                  <p className="text-xs font-bold text-primary" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {s.time}
                  </p>
                </div>
                <span className={statusColors[s.status]}>{s.status === "confirmed" ? "Published" : "Draft"}</span>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {s.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-1">
                Theme: <span className="font-medium text-foreground">{s.theme}</span>
              </p>
              <p className="text-xs text-muted-foreground mb-4">Led by {s.leader}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.items.length} items</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.34 }}
            className="card-lumina overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
          >
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
              <div>
                <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Service Order — {selectedPlan.date} ({selectedPlan.time})
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{selectedPlan.items.length} items · {selectedPlan.theme}</p>
              </div>
              <button type="button" onClick={() => setItemDialogOpen(true)} className="btn-secondary flex items-center gap-2 px-3 py-2 rounded-xl text-sm">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="p-4 space-y-2">
              {selectedPlan.items.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No items yet. Add your first service element.</p>
              ) : (
                selectedPlan.items.map((item, i) => {
                  const Icon = ICON_MAP[item.icon] ?? Music2;
                  const colorClass = TYPE_STYLES[item.type] ?? `${item.color} bg-muted/30`;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.38 + i * 0.04 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/30 transition-colors group border border-transparent hover:border-border/60"
                    >
                      <div className="w-12 text-right shrink-0">
                        <span className="text-xs font-bold text-muted-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                          {item.time}
                        </span>
                      </div>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                          {item.label}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
                          {item.duration}
                        </span>
                      </div>
                      <button type="button" className="icon-btn opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleRemoveItem(item.id)}>
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}

        <FormDialog
          open={planDialogOpen}
          onOpenChange={setPlanDialogOpen}
          title="New Service Plan"
          description="Schedule a new worship service."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setPlanDialogOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary px-4 py-2 rounded-xl text-sm" onClick={handleNewPlan}>
                Create Plan
              </button>
            </>
          }
        >
          <FormField label="Date" htmlFor="plan-date">
            <input id="plan-date" value={planForm.date} onChange={(e) => setPlanForm({ ...planForm, date: e.target.value })} className={inputClass} placeholder="Jun 15, 2026" />
          </FormField>
          <FormField label="Time" htmlFor="plan-time">
            <input id="plan-time" value={planForm.time} onChange={(e) => setPlanForm({ ...planForm, time: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Title" htmlFor="plan-title">
            <input id="plan-title" value={planForm.title} onChange={(e) => setPlanForm({ ...planForm, title: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Theme" htmlFor="plan-theme">
            <input id="plan-theme" value={planForm.theme} onChange={(e) => setPlanForm({ ...planForm, theme: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Leader" htmlFor="plan-leader">
            <input id="plan-leader" value={planForm.leader} onChange={(e) => setPlanForm({ ...planForm, leader: e.target.value })} className={inputClass} />
          </FormField>
        </FormDialog>

        <FormDialog
          open={itemDialogOpen}
          onOpenChange={setItemDialogOpen}
          title="Add Service Item"
          description="Add an element to the service order."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setItemDialogOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary px-4 py-2 rounded-xl text-sm" onClick={handleAddItem}>
                Add Item
              </button>
            </>
          }
        >
          <FormField label="Label" htmlFor="item-label">
            <input id="item-label" value={itemForm.label} onChange={(e) => setItemForm({ ...itemForm, label: e.target.value })} className={inputClass} placeholder="Opening Songs" />
          </FormField>
          <FormField label="Time" htmlFor="item-time">
            <input id="item-time" value={itemForm.time} onChange={(e) => setItemForm({ ...itemForm, time: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Duration" htmlFor="item-duration">
            <input id="item-duration" value={itemForm.duration} onChange={(e) => setItemForm({ ...itemForm, duration: e.target.value })} className={inputClass} placeholder="5 min" />
          </FormField>
          <FormField label="Type" htmlFor="item-type">
            <input id="item-type" value={itemForm.type} onChange={(e) => setItemForm({ ...itemForm, type: e.target.value })} className={inputClass} placeholder="worship, sermon, offering" />
          </FormField>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
