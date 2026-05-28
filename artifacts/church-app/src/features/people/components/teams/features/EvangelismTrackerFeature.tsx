import { motion } from "framer-motion";
import { MessageCircle, Heart, BookOpen } from "lucide-react";

const encounters = [
  { person: "Marcus L.", location: "City square", outcome: "Prayed together", next: "Bible study invite", stage: "Seed" },
  { person: "Yuki & Ken", location: "Campus", outcome: "Gospel shared", next: "Follow-up coffee", stage: "Growing" },
  { person: "Elena V.", location: "Market", outcome: "Accepted Christ", next: "Baptism class", stage: "Decision" },
];

const stageStyle: Record<string, string> = {
  Seed: "badge badge-gray",
  Growing: "badge badge-amber",
  Decision: "badge badge-green",
};

export function EvangelismTrackerFeature() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { label: "Conversations this month", value: "47", icon: MessageCircle },
          { label: "Decisions recorded", value: "6", icon: Heart },
          { label: "In discipleship", value: "14", icon: BookOpen },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card-lumina p-5"
          >
            <stat.icon className="w-5 h-5 text-rose-500 mb-2" />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="card-lumina divide-y divide-border/50">
        {encounters.map((e) => (
          <div key={e.person} className="p-5 hover:bg-rose-50/20 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="font-bold text-foreground">{e.person}</p>
              <span className={stageStyle[e.stage]}>{e.stage}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{e.location} · {e.outcome}</p>
            <p className="text-xs text-primary font-medium">Next: {e.next}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
