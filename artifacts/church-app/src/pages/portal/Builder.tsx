import { motion } from "framer-motion";
import { Plus, Eye, Globe, Layout, Image, Type, Video, ChevronRight, Edit, Trash2 } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";

const blocks = [
  { type: "Hero Banner", icon: Image, color: "from-blue-500 to-blue-600", desc: "Full-width banner with title, subtitle, and CTA button" },
  { type: "Text Block", icon: Type, color: "from-violet-500 to-violet-600", desc: "Rich text content section with headings and paragraphs" },
  { type: "Event Cards", icon: Layout, color: "from-amber-500 to-amber-600", desc: "Display upcoming events in a card grid" },
  { type: "Image Gallery", icon: Image, color: "from-emerald-500 to-emerald-600", desc: "Photo gallery with lightbox support" },
  { type: "Video Section", icon: Video, color: "from-rose-500 to-rose-600", desc: "Embed sermon or announcement videos" },
  { type: "Contact Form", icon: Layout, color: "from-teal-500 to-teal-600", desc: "Contact and prayer request form" },
];

const pages = [
  { name: "Home", path: "/", status: "Published", lastEdited: "2 hours ago", blocks: 5 },
  { name: "About Us", path: "/about", status: "Published", lastEdited: "3 days ago", blocks: 4 },
  { name: "Events", path: "/events", status: "Published", lastEdited: "1 day ago", blocks: 3 },
  { name: "Give Online", path: "/give", status: "Published", lastEdited: "1 week ago", blocks: 2 },
  { name: "Prayer Requests", path: "/prayer", status: "Draft", lastEdited: "Yesterday", blocks: 3 },
];

const statusColors: Record<string, string> = { Published: "badge badge-green", Draft: "badge badge-amber" };

export default function Builder() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Page Builder" subtitle="Build and customize your member-facing portal pages" section="Member Portal"
          action={
            <div className="flex gap-2">
              <button className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Eye className="w-4 h-4" /> Preview Site</button>
              <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"><Plus className="w-4 h-4" /> New Page</button>
            </div>
          }
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Pages list */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Pages</h3>
              <Globe className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="divide-y divide-border/40">
              {pages.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: 0.14 + i * 0.06 }}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-accent/30 transition-colors cursor-pointer group">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{p.name}</p>
                      <span className={statusColors[p.status]}>{p.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{p.path} · {p.blocks} blocks · {p.lastEdited}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="icon-btn"><Edit className="w-3.5 h-3.5" /></button>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Blocks */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}
            className="xl:col-span-2">
            <div className="mb-4">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Content Blocks</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Drag and drop blocks to build your pages</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {blocks.map((b, i) => (
                <motion.div key={b.type} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.22 + i * 0.06 }}
                  className="card-premium p-4 flex items-center gap-4 cursor-grab active:cursor-grabbing">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center shrink-0`}
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                    <b.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Manrope', sans-serif" }}>{b.type}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{b.desc}</p>
                  </div>
                  <Plus className="w-4 h-4 text-muted-foreground shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
