import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Phone, Mail, MapPin, Download } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";

const members = [
  { name: "Amara Diallo", phone: "+1 555 0107", email: "a.diallo@email.com", address: "12 Oak St", letter: "A", avatar: "AD", color: "bg-teal-500" },
  { name: "Baptiste Lemaire", phone: "+1 555 0201", email: "b.lemaire@email.com", address: "45 Elm Ave", letter: "B", avatar: "BL", color: "bg-indigo-500" },
  { name: "Caroline Petit", phone: "+1 555 0202", email: "c.petit@email.com", address: "78 Pine Rd", letter: "C", avatar: "CP", color: "bg-pink-500" },
  { name: "David Okafor", phone: "+1 555 0104", email: "d.okafor@email.com", address: "33 Maple Dr", letter: "D", avatar: "DO", color: "bg-amber-500" },
  { name: "Emma Fontaine", phone: "+1 555 0301", email: "e.fontaine@email.com", address: "90 Cedar Ln", letter: "E", avatar: "EF", color: "bg-emerald-500" },
  { name: "François Bernard", phone: "+1 555 0302", email: "f.bernard@email.com", address: "21 Birch Blvd", letter: "F", avatar: "FB", color: "bg-orange-500" },
  { name: "Grace Kim", phone: "+1 555 0401", email: "g.kim@email.com", address: "56 Willow Way", letter: "G", avatar: "GK", color: "bg-purple-500" },
  { name: "Hugo Renard", phone: "+1 555 0402", email: "h.renard@email.com", address: "14 Spruce St", letter: "H", avatar: "HR", color: "bg-blue-500" },
  { name: "Isabelle Roy", phone: "+1 555 0105", email: "i.roy@email.com", address: "67 Aspen Ct", letter: "I", avatar: "IR", color: "bg-rose-500" },
  { name: "James Moreau", phone: "+1 555 0102", email: "j.moreau@email.com", address: "89 Poplar Ave", letter: "J", avatar: "JM", color: "bg-violet-500" },
  { name: "Lucas Martin", phone: "+1 555 0108", email: "l.martin@email.com", address: "32 Cherry Ln", letter: "L", avatar: "LM", color: "bg-cyan-500" },
  { name: "Marie Dubois", phone: "+1 555 0101", email: "marie.d@email.com", address: "5 Walnut St", letter: "M", avatar: "MD", color: "bg-blue-500" },
  { name: "Sophie Chen", phone: "+1 555 0103", email: "s.chen@email.com", address: "108 Magnolia Dr", letter: "S", avatar: "SC", color: "bg-emerald-500" },
  { name: "Thomas Blanc", phone: "+1 555 0106", email: "t.blanc@email.com", address: "71 Sycamore Rd", letter: "T", avatar: "TB", color: "bg-amber-500" },
];

const letters = [...new Set(members.map(m => m.letter))];

export default function Directory() {
  const [search, setSearch] = useState("");
  const filtered = members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()));
  const grouped = letters.reduce((acc, l) => {
    const g = filtered.filter(m => m.letter === l);
    if (g.length) acc[l] = g;
    return acc;
  }, {} as Record<string, typeof members>);

  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Directory" subtitle="Searchable member contact directory" section="People"
          action={
            <button className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          }
        />

        {/* Search + alphabet */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search directory..."
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-card border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {letters.map(l => (
              <button key={l} onClick={() => {}} className="w-7 h-7 rounded-lg text-xs font-bold text-muted-foreground hover:bg-primary hover:text-white transition-all"
                style={{ fontFamily: "'Manrope', sans-serif" }}>{l}</button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          {Object.entries(grouped).map(([letter, items], gi) => (
            <motion.div key={letter} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: gi * 0.06 }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white text-sm font-bold"
                  style={{ fontFamily: "'Poppins', sans-serif", boxShadow: "0 2px 8px rgba(37,99,235,0.25)" }}>{letter}</div>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {items.map((m, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl p-4 hover:border-primary/20 hover:shadow-md transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 ${m.color}`}
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>{m.avatar}</div>
                      <p className="font-bold text-foreground text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>{m.name}</p>
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-primary/60" />{m.phone}</div>
                      <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-primary/60" />{m.email}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-primary/60" />{m.address}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
