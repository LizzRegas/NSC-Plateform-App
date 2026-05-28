import { useEffect, useMemo, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowLeft,
  GripVertical,
  Plus,
  Trash2,
  Type,
  Mail,
  Phone,
  AlignLeft,
  List,
  CheckSquare,
  Calendar,
  Save,
} from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormField, inputClass, selectClass } from "@/components/shared/forms/FormField";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import type { FormField as FormFieldDef, FormFieldType, FormDefinition } from "@/lib/demo-store/types";
import { useDemoToast } from "@/hooks/useDemoToast";
import NotFound from "@/features/common/NotFound";

const FIELD_PALETTE: { type: FormFieldType; label: string; icon: typeof Type }[] = [
  { type: "text", label: "Text", icon: Type },
  { type: "email", label: "Email", icon: Mail },
  { type: "phone", label: "Phone", icon: Phone },
  { type: "textarea", label: "Long text", icon: AlignLeft },
  { type: "select", label: "Dropdown", icon: List },
  { type: "checkbox", label: "Checkbox", icon: CheckSquare },
  { type: "date", label: "Date", icon: Calendar },
];

const CATEGORIES = ["Membership", "Pastoral", "Events", "Ministry", "Groups", "Missions"];

function defaultLabel(type: FormFieldType): string {
  const found = FIELD_PALETTE.find((p) => p.type === type);
  return found?.label ?? "Field";
}

function createField(type: FormFieldType): FormFieldDef {
  return {
    id: generateId("field"),
    type,
    label: defaultLabel(type),
    required: type !== "checkbox",
    ...(type === "select" ? { options: ["Option 1", "Option 2"] } : {}),
  };
}

function SortableFieldRow({
  field,
  onUpdate,
  onRemove,
}: {
  field: FormFieldDef;
  onUpdate: (id: string, patch: Partial<FormFieldDef>) => void;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card-lumina p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="icon-btn cursor-grab active:cursor-grabbing shrink-0"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </button>
        <span className="badge badge-gray text-[10px] uppercase">{field.type}</span>
        <button
          type="button"
          className="icon-btn ml-auto text-rose-400 hover:text-rose-600"
          onClick={() => onRemove(field.id)}
          aria-label="Remove field"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <FormField label="Label">
        <input
          className={inputClass}
          value={field.label}
          onChange={(e) => onUpdate(field.id, { label: e.target.value })}
        />
      </FormField>

      <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
        <input
          type="checkbox"
          checked={!!field.required}
          onChange={(e) => onUpdate(field.id, { required: e.target.checked })}
          className="rounded border-border"
        />
        Required field
      </label>

      {field.type === "select" && (
        <FormField label="Options (comma-separated)">
          <input
            className={inputClass}
            value={(field.options ?? []).join(", ")}
            onChange={(e) =>
              onUpdate(field.id, {
                options: e.target.value.split(",").map((o) => o.trim()).filter(Boolean),
              })
            }
          />
        </FormField>
      )}
    </div>
  );
}

export default function FormBuilder() {
  const [, newRoute] = useRoute("/forms/new");
  const [, editRoute] = useRoute("/forms/:id/edit");
  const [, navigate] = useLocation();
  const dispatch = useDemoDispatch();
  const { success, error } = useDemoToast();
  const forms = useDemoState((s) => s.forms);

  const isNew = !!newRoute;
  const editId = editRoute?.id;
  const existing = useMemo(
    () => (editId ? forms.find((f) => f.id === editId) : undefined),
    [forms, editId],
  );

  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [status, setStatus] = useState<FormDefinition["status"]>("Draft");
  const [fields, setFields] = useState<FormFieldDef[]>([]);

  useEffect(() => {
    if (isNew) {
      setName("");
      setCategory(CATEGORIES[0]);
      setStatus("Draft");
      setFields([]);
    } else if (existing) {
      setName(existing.name);
      setCategory(existing.category);
      setStatus(existing.status);
      setFields(existing.fields.map((f) => ({ ...f })));
    }
  }, [isNew, existing]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  if (!isNew && editId && !existing) {
    return <NotFound />;
  }

  const addField = (type: FormFieldType) => {
    setFields((prev) => [...prev, createField(type)]);
  };

  const updateField = (id: string, patch: Partial<FormFieldDef>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setFields((prev) => {
      const oldIndex = prev.findIndex((f) => f.id === active.id);
      const newIndex = prev.findIndex((f) => f.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleSave = () => {
    if (!name.trim()) {
      error("Name required", "Please enter a form name before saving.");
      return;
    }
    if (fields.length === 0) {
      error("Add fields", "Add at least one field to the form.");
      return;
    }

    if (isNew) {
      const form: FormDefinition = {
        id: generateId("form"),
        name: name.trim(),
        category,
        status,
        fields,
        submissions: 0,
        lastSubmit: "—",
      };
      dispatch({ type: "ADD_FORM", payload: form });
      success("Form created", `"${form.name}" has been saved.`);
    } else if (existing) {
      dispatch({
        type: "UPDATE_FORM",
        payload: {
          ...existing,
          name: name.trim(),
          category,
          status,
          fields,
        },
      });
      success("Form updated", `"${name.trim()}" has been saved.`);
    }

    navigate("/forms");
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title={isNew ? "Create form" : "Edit form"}
          subtitle="Build your form with drag-and-drop fields."
          section="Forms"
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/forms")}
                className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
              >
                <Save className="w-4 h-4" />
                Save form
              </button>
            </div>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
          <motion.aside
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-lumina p-4 h-fit"
          >
            <p
              className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Field palette
            </p>
            <div className="space-y-1.5">
              {FIELD_PALETTE.map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => addField(type)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-left hover:bg-muted/60 transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  {label}
                  <Plus className="w-3.5 h-3.5 ml-auto text-muted-foreground" />
                </button>
              ))}
            </div>
          </motion.aside>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-lumina p-5 space-y-4"
            >
              <FormField label="Form name">
                <input
                  className={inputClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. New Member Registration"
                />
              </FormField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Category">
                  <select
                    className={selectClass}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Status">
                  <select
                    className={selectClass}
                    value={status}
                    onChange={(e) => setStatus(e.target.value as FormDefinition["status"])}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                </FormField>
              </div>
            </motion.div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {fields.length === 0 ? (
                    <div className="card-lumina p-10 text-center text-muted-foreground text-sm">
                      Add fields from the palette to build your form.
                    </div>
                  ) : (
                    fields.map((field) => (
                      <SortableFieldRow
                        key={field.id}
                        field={field}
                        onUpdate={updateField}
                        onRemove={removeField}
                      />
                    ))
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </PageCanvas>
    </PageTransition>
  );
}
