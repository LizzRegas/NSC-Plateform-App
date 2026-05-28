import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageCanvas } from "@/components/shared/PageCanvas";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterChips } from "@/components/shared/FilterChips";
import { FormDialog } from "@/components/shared/FormDialog";
import { FormField, inputClass, selectClass } from "@/components/shared/forms/FormField";
import { useDemoState, useDemoDispatch, generateId } from "@/lib/demo-store";
import type { CalendarEvent } from "@/lib/demo-store";
import { useDemoToast } from "@/hooks/useDemoToast";

const filters = ["All Events", "Ministry", "Fellowship", "Outreach"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const CATEGORY_STYLES: Record<string, { color: string; dot: string }> = {
  Ministry: { color: "border-blue-200/80 bg-blue-50/30", dot: "bg-blue-500" },
  Fellowship: { color: "border-violet-200/80 bg-violet-50/30", dot: "bg-violet-500" },
  Outreach: { color: "border-teal-200/80 bg-teal-50/30", dot: "bg-teal-500" },
};

function padDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function CalendarPage() {
  const calendarEvents = useDemoState((s) => s.calendarEvents);
  const dispatch = useDemoDispatch();
  const { success } = useDemoToast();
  const [filter, setFilter] = useState("All Events");
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(4);
  const [selectedDay, setSelectedDay] = useState(30);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    time: "9:30 AM",
    category: "Ministry",
    location: "",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = new Date(year, month, 1).getDay();
  const monthLabel = `${MONTH_NAMES[month]} ${year}`;

  const eventsByDay = useMemo(() => {
    const map: Record<number, CalendarEvent[]> = {};
    calendarEvents.forEach((ev) => {
      const [y, m, d] = ev.date.split("-").map(Number);
      if (y === year && m === month + 1) {
        if (!map[d]) map[d] = [];
        map[d].push(ev);
      }
    });
    return map;
  }, [calendarEvents, year, month]);

  const filteredEvents = useMemo(() => {
    const dayEvents = eventsByDay[selectedDay] ?? [];
    if (filter === "All Events") return dayEvents;
    return dayEvents.filter((e) => e.category === filter);
  }, [eventsByDay, selectedDay, filter]);

  const upcoming = useMemo(() => {
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    return calendarEvents
      .filter((e) => e.date >= prefix && (filter === "All Events" || e.category === filter))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
  }, [calendarEvents, year, month, filter]);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
    setSelectedDay(1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
    setSelectedDay(1);
  };

  const handleCreateEvent = () => {
    if (!form.title.trim()) return;
    const style = CATEGORY_STYLES[form.category] ?? CATEGORY_STYLES.Ministry;
    const payload: CalendarEvent = {
      id: generateId("e"),
      title: form.title.trim(),
      date: padDate(year, month, selectedDay),
      time: form.time.trim(),
      category: form.category,
      location: form.location.trim() || undefined,
      status: "confirmed",
      ...style,
    };
    dispatch({ type: "ADD_EVENT", payload });
    success("Event created", form.title);
    setDialogOpen(false);
    setForm({ title: "", time: "9:30 AM", category: "Ministry", location: "" });
  };

  const formatEventMeta = (ev: CalendarEvent) => {
    const [, , d] = ev.date.split("-").map(Number);
    return `${MONTH_NAMES[month].slice(0, 3)} ${d} · ${ev.time}${ev.location ? ` · ${ev.location}` : ""}`;
  };

  return (
    <PageTransition>
      <PageCanvas>
        <PageHeader
          title="Events Calendar"
          subtitle="Manage and plan community gatherings."
          section="Events"
          action={
            <button type="button" onClick={() => setDialogOpen(true)} className="btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm w-full md:w-auto">
              <Plus className="w-4 h-4" />
              Create Event
            </button>
          }
        />

        <FilterChips options={filters} value={filter} onChange={setFilter} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="lg:col-span-8 card-lumina p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">{monthLabel}</h3>
              <div className="flex gap-2">
                <button type="button" onClick={prevMonth} className="icon-btn rounded-full">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button type="button" onClick={nextMonth} className="icon-btn rounded-full">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={`${d}-${i}`} className="text-center label-caps text-muted-foreground py-2">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 lg:gap-3">
              {[...Array(startOffset)].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const dayEvents = eventsByDay[day] ?? [];
                const isSelected = day === selectedDay;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`aspect-square flex flex-col items-center justify-center p-1 rounded-xl transition-colors relative ${
                      isSelected ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-[#f2f4f6]"
                    }`}
                  >
                    <span className={`text-sm ${isSelected ? "font-bold" : ""}`}>{day}</span>
                    {dayEvents.length > 0 && (
                      <div className="absolute bottom-2 flex gap-1">
                        {dayEvents.slice(0, 3).map((ev, di) => (
                          <div
                            key={ev.id}
                            className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : ev.dot} ${di === 1 && isSelected ? "opacity-70" : ""}`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }} className="card-lumina p-6">
              <h3 className="label-caps text-muted-foreground mb-4">
                {MONTH_NAMES[month].slice(0, 3)} {selectedDay} — Events
              </h3>
              <div className="flex flex-col gap-4">
                {filteredEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events on this day.</p>
                ) : (
                  filteredEvents.map((ev) => (
                    <div key={ev.id} className={`flex gap-4 p-4 rounded-2xl border ${ev.color}`}>
                      <div className="flex flex-col items-center justify-center rounded-xl w-14 h-14 shrink-0 bg-primary text-primary-foreground">
                        <span className="font-label text-xs">{MONTH_NAMES[month].slice(0, 3)}</span>
                        <span className="text-2xl font-bold leading-none">{selectedDay}</span>
                      </div>
                      <div>
                        <h4 className="font-label text-sm text-foreground mb-1">{ev.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {ev.time}
                          {ev.location ? ` · ${ev.location}` : ""}
                        </p>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-label bg-muted">{ev.category}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.12 }} className="card-lumina p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="label-caps text-muted-foreground">Upcoming</h3>
              </div>
              <div className="flex flex-col">
                {upcoming.map((ev, i) => (
                  <div
                    key={ev.id}
                    className={`flex items-start gap-4 py-3 px-2 -mx-2 rounded-lg hover:bg-[#f2f4f6] transition-colors cursor-pointer ${
                      i < upcoming.length - 1 ? "border-b border-[#c9c4d9]/30" : ""
                    }`}
                    onClick={() => {
                      const d = Number(ev.date.split("-")[2]);
                      setSelectedDay(d);
                    }}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${ev.dot}`} />
                    <div>
                      <h4 className="font-label text-sm text-foreground">{ev.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{formatEventMeta(ev)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Create Event"
          description={`Add an event on ${monthLabel} ${selectedDay}.`}
          footer={
            <>
              <button type="button" className="btn-secondary px-4 py-2 rounded-xl text-sm" onClick={() => setDialogOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary px-4 py-2 rounded-xl text-sm" onClick={handleCreateEvent}>
                Create Event
              </button>
            </>
          }
        >
          <FormField label="Title" htmlFor="ev-title">
            <input id="ev-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Time" htmlFor="ev-time">
            <input id="ev-time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputClass} />
          </FormField>
          <FormField label="Category" htmlFor="ev-cat">
            <select id="ev-cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={selectClass}>
              <option>Ministry</option>
              <option>Fellowship</option>
              <option>Outreach</option>
            </select>
          </FormField>
          <FormField label="Location" htmlFor="ev-loc">
            <input id="ev-loc" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputClass} />
          </FormField>
        </FormDialog>
      </PageCanvas>
    </PageTransition>
  );
}
