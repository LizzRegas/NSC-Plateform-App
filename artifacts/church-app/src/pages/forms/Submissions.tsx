import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Search, Eye, Trash2, CheckCircle2, Clock } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";

const submissions = [
  { id: "S-0348", form: "Prayer Request", name: "Marie Dubois", email: "marie.d@email.com", submitted: "Apr 3, 9:42 AM", status: "Reviewed" },
  { id: "S-0347", form: "Volunteer Sign-up", name: "Lucas Martin", email: "l.martin@email.com", submitted: "Apr 3, 8:15 AM", status: "Pending" },
  { id: "S-0346", form: "New Member Registration", name: "Nadia Kouassi", email: "n.kouassi@email.com", submitted: "Apr 2, 6:30 PM", status: "Pending" },
  { id: "S-0345", form: "Prayer Request", name: "Thomas Blanc", email: "t.blanc@email.com", submitted: "Apr 2, 5:00 PM", status: "Reviewed" },
  { id: "S-0344", form: "Small Group Interest", name: "Rafael Torres", email: "r.torres@email.com", submitted: "Apr 2, 2:14 PM", status: "Pending" },
  { id: "S-0343", form: "Baptism Interest Form", name: "Emma Fontaine", email: "e.fontaine@email.com", submitted: "Apr 1, 11:30 AM", status: "Reviewed" },
  { id: "S-0342", form: "Volunteer Sign-up", name: "Amara Diallo", email: "a.diallo@email.com", submitted: "Apr 1, 10:00 AM", status: "Reviewed" },
  { id: "S-0341", form: "Event Registration — Youth Night", name: "Baptiste Lemaire", email: "b.lemaire@email.com", submitted: "Mar 31, 3:22 PM", status: "Reviewed" },
];

const statusColors: Record<string, string> = { Reviewed: "badge badge-green", Pending: "badge badge-amber" };
const formColors: Record<string, string> = {
  "Prayer Request": "badge badge-violet", "Volunteer Sign-up": "badge badge-blue",
  "New Member Registration": "badge badge-green", "Small Group Interest": "badge badge-amber",
  "Baptism Interest Form": "badge badge-teal", "Event Registration — Youth Night": "badge badge-blue",
};

export default function Submissions() {
  const [search, setSearch] = useState("");
  const filtered = submissions.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.form.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Submissions" subtitle="Review all form submission responses" section="Forms"
          action={
            <button className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Download className="w-4 h-4" /> Export CSV</button>
          }
        />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
          <div className="flex flex-col sm:flex-row items-center gap-3 px-5 sm:px-6 py-4 border-b border-border">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search submissions..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <select className="text-sm bg-background border border-border rounded-xl px-3 py-2 outline-none focus:border-primary transition-all">
                <option>All Forms</option><option>Prayer Request</option><option>Volunteer Sign-up</option>
              </select>
              <select className="text-sm bg-background border border-border rounded-xl px-3 py-2 outline-none focus:border-primary transition-all">
                <option>All Status</option><option>Pending</option><option>Reviewed</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead><tr className="bg-muted/30 border-b border-border/60">
                {["ID", "Form", "Submitted By", "Date", "Status", ""].map(h => (
                  <th key={h} className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 sm:px-6 py-3"
                    style={{ fontFamily: "'Manrope', sans-serif" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-border/40">
                {filtered.map((s, i) => (
                  <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.18 + i * 0.04 }} className="tr-hover group">
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground font-mono">{s.id}</td>
                    <td className="px-5 sm:px-6 py-3.5"><span className={formColors[s.form] || "badge badge-gray"}>{s.form}</span></td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.email}</p>
                    </td>
                    <td className="px-5 sm:px-6 py-3.5 text-xs text-muted-foreground">{s.submitted}</td>
                    <td className="px-5 sm:px-6 py-3.5"><span className={statusColors[s.status]}>{s.status}</span></td>
                    <td className="px-5 sm:px-6 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="icon-btn"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="icon-btn"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /></button>
                        <button className="icon-btn"><Trash2 className="w-3.5 h-3.5 text-rose-400" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
