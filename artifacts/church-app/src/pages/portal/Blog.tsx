import { motion } from "framer-motion";
import { Plus, Eye, Edit, Trash2, Search, BookOpen } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PageHeader } from "@/components/shared/PageHeader";

const posts = [
  { title: "Finding Peace in Times of Uncertainty", author: "Pastor James", category: "Faith", date: "Apr 1, 2026", reads: 284, status: "Published", excerpt: "In these challenging times, we explore how scripture guides us toward peace and trust in God's plan..." },
  { title: "Building Community: Why Small Groups Matter", author: "Elder Marie Dubois", category: "Community", date: "Mar 25, 2026", reads: 192, status: "Published", excerpt: "The power of authentic community is central to our faith journey. Here's why small groups make a difference..." },
  { title: "Easter Reflections: The Resurrection Changes Everything", author: "Pastor James", category: "Seasonal", date: "Mar 20, 2026", reads: 448, status: "Published", excerpt: "As we approach Easter Sunday, we reflect on the profound significance of the resurrection and what it means..." },
  { title: "The Heart of Generosity: Biblical Giving", author: "Deacon David Okafor", category: "Giving", date: "Mar 15, 2026", reads: 168, status: "Published", excerpt: "Generosity is not just about money — it's a posture of the heart. Discover what scripture says about giving..." },
  { title: "Youth Ministry: Shaping the Next Generation", author: "David Okafor", category: "Youth", date: "Mar 10, 2026", reads: 124, status: "Draft", excerpt: "Our youth ministry is more than programs. It's about discipleship and building lifelong faith foundations..." },
  { title: "Worship as a Lifestyle", author: "Amara Diallo", category: "Worship", date: "Mar 5, 2026", reads: 0, status: "Draft", excerpt: "True worship extends far beyond Sunday morning. Here's how to cultivate a lifestyle of worship in daily life..." },
];

const catColors: Record<string, string> = {
  Faith: "badge badge-blue", Community: "badge badge-violet", Seasonal: "badge badge-amber",
  Giving: "badge badge-green", Youth: "badge badge-teal", Worship: "badge badge-violet",
};
const statusColors: Record<string, string> = { Published: "badge badge-green", Draft: "badge badge-gray" };

export default function Blog() {
  return (
    <PageTransition>
      <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
        <PageHeader title="Blog" subtitle="Publish articles, devotionals, and announcements" section="Member Portal"
          action={
            <button className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
              <Plus className="w-4 h-4" /> Write Post
            </button>
          }
        />

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="Search posts..." className="w-full pl-9 pr-3 py-2.5 text-sm bg-card border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
          </div>
          <select className="text-sm bg-card border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary transition-all">
            <option>All Posts</option><option>Published</option><option>Draft</option>
          </select>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {posts.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.14 + i * 0.06 }}
              className="card-premium p-5 group cursor-pointer">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={catColors[p.category]}>{p.category}</span>
                    <span className={statusColors[p.status]}>{p.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>{p.title}</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0"
                  style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.2)" }}>
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{p.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{p.author}</span> · {p.date}
                  {p.reads > 0 && <span className="ml-2">· <Eye className="w-3 h-3 inline" /> {p.reads} reads</span>}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="icon-btn"><Edit className="w-3.5 h-3.5" /></button>
                  <button className="icon-btn"><Trash2 className="w-3.5 h-3.5 text-rose-400" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
