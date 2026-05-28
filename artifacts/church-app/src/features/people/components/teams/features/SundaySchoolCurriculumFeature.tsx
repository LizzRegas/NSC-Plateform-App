import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen } from "lucide-react";

const classes = [
  { room: "101", age: "Ages 3–5", lesson: "God Made Me Special", teacher: "Isabelle R.", enrolled: 14 },
  { room: "203", age: "Grades 1–3", lesson: "David & Goliath — Courage", teacher: "Lucas M.", enrolled: 18 },
  { room: "305", age: "Grades 4–6", lesson: "Fruit of the Spirit", teacher: "Clara F.", enrolled: 16 },
  { room: "401", age: "Youth 12–17", lesson: "Identity in Christ", teacher: "James M.", enrolled: 22 },
];

export function SundaySchoolCurriculumFeature() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {classes.map((c, i) => (
        <motion.div
          key={c.room}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="card-lumina p-5 border-t-4 border-t-sky-500"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-primary">Room {c.room}</span>
            <span className="badge badge-gray">{c.age}</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm">{c.lesson}</h4>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                {c.teacher}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            {c.enrolled} students enrolled
          </div>
        </motion.div>
      ))}
    </div>
  );
}
