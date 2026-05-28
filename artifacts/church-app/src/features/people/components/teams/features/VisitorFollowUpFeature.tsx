import { motion } from "framer-motion";
import { Plus, User, CalendarDays } from "lucide-react";

const columns = [
  { id: "new", title: "New Visitors", color: "bg-blue-500" },
  { id: "contacted", title: "Contacted", color: "bg-amber-500" },
  { id: "integrated", title: "Integrated", color: "bg-emerald-500" },
];

const items: Record<string, Array<{ name: string; note: string; assignee: string; due: string; priority: string }>> = {
  new: [
    { name: "Paul & Anna Schmidt", note: "First visit — interested in young families", assignee: "Sophie C.", due: "May 24", priority: "High" },
    { name: "Nadia Kouassi", note: "Relocated from Lyon, no small group yet", assignee: "David O.", due: "May 25", priority: "Medium" },
  ],
  contacted: [
    { name: "Mei Zhang", note: "Coffee meetup scheduled Thursday", assignee: "Marie D.", due: "May 23", priority: "Medium" },
    { name: "Kevin O'Brien", note: "Men's group intro completed", assignee: "Thomas B.", due: "May 26", priority: "Low" },
  ],
  integrated: [
    { name: "Lucas & Émilie Petit", note: "Joined community group & serving", assignee: "Sophie C.", due: "May 20", priority: "Low" },
  ],
};

const priorityColors: Record<string, string> = {
  High: "badge badge-red",
  Medium: "badge badge-amber",
  Low: "badge badge-gray",
};

export function VisitorFollowUpFeature() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map((col, ci) => (
        <motion.div
          key={col.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ci * 0.08 }}
          className="card-lumina overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
              <span className="text-sm font-bold text-foreground">{col.title}</span>
              <span className="badge badge-gray">{items[col.id].length}</span>
            </div>
            <button type="button" className="icon-btn">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="p-3 space-y-3">
            {items[col.id].map((item) => (
              <div
                key={item.name}
                className="bg-background border border-border/60 rounded-xl p-3.5 hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <span className={priorityColors[item.priority]}>{item.priority}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{item.note}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {item.assignee}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {item.due}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
