import { useState } from "react";
import { motion } from "framer-motion";
import { Languages, Plus, Search } from "lucide-react";

const terms = [
  { en: "Grace", fr: "Grâce", context: "Theology · sermon", note: "Not 'grâce' as elegance" },
  { en: "Repentance", fr: "Repentance", context: "Gospel · altar call", note: "Full turn, not regret only" },
  { en: "Fellowship", fr: "Communion fraternelle", context: "Announcements", note: "Avoid 'camaraderie' alone" },
  { en: "Worship", fr: "Adoration", context: "Worship set", note: "Not 'culte' for singing time" },
  { en: "Offering", fr: "Offrande", context: "Finance moment", note: "Distinct from 'dîme' (tithe)" },
];

export function TranslationGlossaryFeature() {
  const [query, setQuery] = useState("");

  const filtered = terms.filter(
    (t) =>
      t.en.toLowerCase().includes(query.toLowerCase()) ||
      t.fr.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search keywords in EN or FR..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#c9c4d9] bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-sm"
        />
      </div>
      <div className="card-lumina overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-fuchsia-600" />
            <h3 className="font-bold text-foreground">Shared keyword glossary</h3>
          </div>
          <button type="button" className="btn-secondary text-xs px-3 py-2 rounded-xl flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add term
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f7f9fb] text-left text-xs font-label text-muted-foreground uppercase tracking-wider">
                <th className="px-5 py-3">English</th>
                <th className="px-5 py-3">French</th>
                <th className="px-5 py-3">Context</th>
                <th className="px-5 py-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <motion.tr
                  key={t.en}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t border-border/50 hover:bg-violet-50/30"
                >
                  <td className="px-5 py-3.5 font-semibold text-foreground">{t.en}</td>
                  <td className="px-5 py-3.5 text-primary font-medium">{t.fr}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{t.context}</td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground max-w-[200px]">{t.note}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
