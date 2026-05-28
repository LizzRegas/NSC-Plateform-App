import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  type DragEndEvent,
} from "@dnd-kit/core";
import { Plus, CheckCircle2, Clock, AlertCircle, User, CalendarDays, Target, TrendingUp } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiGrid } from "@/components/shared/KpiGrid";
import { FormDialog } from "@/components/shared/FormDialog";
import { DetailSheet } from "@/components/shared/DetailSheet";
import { FormField, inputClass, selectClass, textareaClass } from "@/components/shared/forms/FormField";
import {
  useDemoState,
  useDemoDispatch,
  generateId,
  type FollowUpItem,
  type FollowUpColumn,
  type FollowUpPriority,
} from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const columns: { id: FollowUpColumn; title: string; color: string }[] = [
  { id: "new", title: "New Visitors", color: "bg-blue-500" },
  { id: "inprogress", title: "In Progress", color: "bg-amber-500" },
  { id: "completed", title: "Completed", color: "bg-emerald-500" },
];

const priorityColors: Record<FollowUpPriority, string> = {
  High: "badge badge-red",
  Medium: "badge badge-amber",
  Low: "badge badge-gray",
};

function FollowUpCard({
  item,
  onClick,
}: {
  item: FollowUpItem;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item.id });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`bg-background border border-border/60 rounded-xl p-3.5 cursor-grab active:cursor-grabbing hover:border-primary/20 hover:shadow-sm transition-all duration-200 ${
        isDragging ? "opacity-50 shadow-md" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-semibold text-foreground leading-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
          {item.name}
        </p>
        <span className={`${priorityColors[item.priority]} shrink-0`}>{item.priority}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{item.note}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <User className="w-3 h-3" />
          <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500 }}>{item.assignee}</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarDays className="w-3 h-3" />
          <span>{item.due}</span>
        </div>
      </div>
    </motion.div>
  );
}

function KanbanColumn({
  col,
  items,
  onCardClick,
}: {
  col: (typeof columns)[0];
  items: FollowUpItem[];
  onCardClick: (item: FollowUpItem) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: col.id });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-lumina overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}
    >
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
          <span className="text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>
            {col.title}
          </span>
          <span className="badge badge-gray">{items.length}</span>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={`p-3 space-y-3 min-h-[120px] transition-colors ${isOver ? "bg-primary/5" : ""}`}
      >
        {items.map((item) => (
          <FollowUpCard key={item.id} item={item} onClick={() => onCardClick(item)} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Followup() {
  const followUps = useDemoState((s) => s.followUps);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<FollowUpItem | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [assignee, setAssignee] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState<FollowUpPriority>("Medium");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const stats = useMemo(() => {
    const active = followUps.filter((f) => f.column !== "completed").length;
    const completed = followUps.filter((f) => f.column === "completed").length;
    const high = followUps.filter((f) => f.priority === "High" && f.column !== "completed").length;
    return [
      { label: "Active Follow-ups", value: String(active), change: "+5", trend: "up" as const, icon: Target, iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600", delay: 0.05 },
      { label: "Completed", value: String(completed), change: "+4", trend: "up" as const, icon: CheckCircle2, iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600", delay: 0.1 },
      { label: "High priority", value: String(high), change: String(high), trend: "down" as const, icon: AlertCircle, iconGradient: "bg-gradient-to-br from-rose-500 to-rose-600", delay: 0.15 },
      { label: "In progress", value: String(followUps.filter((f) => f.column === "inprogress").length), change: "—", trend: "up" as const, icon: TrendingUp, iconGradient: "bg-gradient-to-br from-violet-500 to-violet-600", delay: 0.2 },
    ];
  }, [followUps]);

  const byColumn = useMemo(() => {
    const map: Record<FollowUpColumn, FollowUpItem[]> = { new: [], inprogress: [], completed: [] };
    followUps.forEach((f) => map[f.column].push(f));
    return map;
  }, [followUps]);

  const activeItem = activeId ? followUps.find((f) => f.id === activeId) : null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    const item = followUps.find((f) => f.id === active.id);
    const targetColumn = over.id as FollowUpColumn;
    if (!item || !["new", "inprogress", "completed"].includes(targetColumn)) return;
    if (item.column === targetColumn) return;
    dispatch({ type: "MOVE_FOLLOW_UP", payload: { id: item.id, column: targetColumn } });
    success("Card moved", `${item.name} → ${columns.find((c) => c.id === targetColumn)?.title ?? targetColumn}.`);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch({
      type: "ADD_FOLLOW_UP",
      payload: {
        id: generateId("f"),
        name: name.trim(),
        note: note.trim() || "—",
        assignee: assignee.trim() || "Unassigned",
        due: due.trim() || "TBD",
        priority,
        column: "new",
      },
    });
    success("Follow-up added", `${name.trim()} added to New Visitors.`);
    setAddOpen(false);
    setName("");
    setNote("");
    setAssignee("");
    setDue("");
    setPriority("Medium");
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Follow-up"
          subtitle="Track and manage visitor follow-ups"
          section="People"
          action={
            <button
              type="button"
              className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
              onClick={() => setAddOpen(true)}
            >
              <Plus className="w-4 h-4" /> Add Follow-up
            </button>
          }
        />
        <KpiGrid stats={stats} />

        <DndContext
          sensors={sensors}
          onDragStart={(e) => setActiveId(String(e.active.id))}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {columns.map((col) => (
              <KanbanColumn
                key={col.id}
                col={col}
                items={byColumn[col.id]}
                onCardClick={setDetailItem}
              />
            ))}
          </div>
          <DragOverlay>
            {activeItem ? (
              <div className="bg-background border border-primary/30 rounded-xl p-3.5 shadow-lg rotate-2 opacity-95">
                <p className="text-sm font-semibold text-foreground">{activeItem.name}</p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        <DetailSheet
          open={Boolean(detailItem)}
          onOpenChange={(open) => !open && setDetailItem(null)}
          title={detailItem?.name ?? ""}
          description="Follow-up details"
        >
          {detailItem && (
            <>
              <p className="text-sm text-muted-foreground leading-relaxed">{detailItem.note}</p>
              <div className="flex flex-wrap gap-2">
                <span className={priorityColors[detailItem.priority]}>{detailItem.priority}</span>
                <span className="badge badge-gray">{detailItem.column}</span>
              </div>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {detailItem.assignee}
                </li>
                <li className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Due {detailItem.due}
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Column: {columns.find((c) => c.id === detailItem.column)?.title}
                </li>
              </ul>
            </>
          )}
        </DetailSheet>

        <FormDialog
          open={addOpen}
          onOpenChange={setAddOpen}
          title="Add follow-up"
          description="Create a new visitor follow-up card."
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2.5 rounded-xl text-sm" onClick={() => setAddOpen(false)}>
                Cancel
              </button>
              <button type="submit" form="add-followup-form" className="btn-primary px-4 py-2.5 rounded-xl text-sm">
                Add card
              </button>
            </>
          }
        >
          <form id="add-followup-form" onSubmit={handleAdd} className="space-y-4">
            <FormField label="Name" htmlFor="fu-name">
              <input id="fu-name" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required />
            </FormField>
            <FormField label="Note" htmlFor="fu-note">
              <textarea id="fu-note" className={textareaClass} rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
            </FormField>
            <FormField label="Assignee" htmlFor="fu-assignee">
              <input id="fu-assignee" className={inputClass} value={assignee} onChange={(e) => setAssignee(e.target.value)} />
            </FormField>
            <FormField label="Due" htmlFor="fu-due">
              <input id="fu-due" className={inputClass} value={due} onChange={(e) => setDue(e.target.value)} />
            </FormField>
            <FormField label="Priority" htmlFor="fu-priority">
              <select id="fu-priority" className={selectClass} value={priority} onChange={(e) => setPriority(e.target.value as FollowUpPriority)}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </FormField>
          </form>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
