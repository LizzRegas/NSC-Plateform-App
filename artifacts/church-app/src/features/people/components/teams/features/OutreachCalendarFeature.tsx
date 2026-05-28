import { motion } from "framer-motion";
import { MapPin, Users, CalendarDays } from "lucide-react";

const projects = [
  { name: "Eastside Food Drive", partner: "Community Center", date: "May 31", volunteers: 18, zone: "East" },
  { name: "Youth Sports Outreach", partner: "City Parks Dept", date: "Jun 14", volunteers: 12, zone: "North" },
  { name: "Senior Home Visits", partner: "Résidence Lumière", date: "Jun 21", volunteers: 8, zone: "Central" },
];

export function OutreachCalendarFeature() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {["East", "North", "Central"].map((zone) => (
          <div key={zone} className="card-lumina p-4 text-center">
            <p className="text-xs font-label text-muted-foreground uppercase">{zone} zone</p>
            <p className="text-2xl font-bold text-primary mt-1">
              {projects.filter((p) => p.zone === zone).length}
            </p>
            <p className="text-xs text-muted-foreground">active projects</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card-lumina p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-teal-700" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-foreground">{p.name}</h4>
              <p className="text-xs text-muted-foreground">{p.partner}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-3.5 h-3.5" />
                {p.date}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-primary" />
                {p.volunteers} volunteers
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
