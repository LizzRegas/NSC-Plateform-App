import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Users, HeartHandshake, CreditCard, Music, PieChart, 
  CalendarDays, FileText, Globe2, MessageSquare, ShieldCheck,
  ChevronRight, PlayCircle, Star, Sparkles, Smartphone,
  CheckCircle2, Clock
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRef } from "react";

import heroImg from "@/assets/hero.png";
import communityImg from "@/assets/community.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/20" ref={containerRef}>
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/50 z-10" />
          <motion.img 
            style={{ y: heroY, opacity: heroOpacity }}
            src={heroImg} 
            alt="Lumina Church interior" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/80">The new standard in church management</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[1.1] mb-8 tracking-tight"
            >
              Where sacred meets <span className="text-primary italic">contemporary.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-2xl text-foreground/70 leading-relaxed mb-10 max-w-2xl"
            >
              A beautifully designed, all-in-one digital platform to manage your congregation, worship, giving, and events with absolute clarity.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-14 px-8 text-base">
                Start your journey
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base bg-white/50 backdrop-blur border-white/40 hover:bg-white/80">
                <PlayCircle className="w-5 h-5 mr-2 text-primary" />
                Watch the film
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE PLATFORM (Features Overview) */}
      <section id="features" className="py-24 md:py-32 bg-white relative z-20">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Unified Experience</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Everything you need, beautifully organized.</h3>
            <p className="text-foreground/60 text-lg">Replace fragmented tools with one seamless ecosystem designed specifically for the modern church.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Users, title: "People & Directory", desc: "Manage profiles, smart lists, mass imports, and a completely integrated directory." },
              { icon: HeartHandshake, title: "Groups & Ministry", desc: "Equip leaders with tools to manage small groups, group communication, and care." },
              { icon: Music, title: "Worship Planning", desc: "Schedule volunteers, manage song libraries, and coordinate Sunday services." },
              { icon: CreditCard, title: "Giving & Pledges", desc: "Beautiful online giving, offline contribution entry, and pledge campaigns." },
              { icon: CalendarDays, title: "Events & Check-in", desc: "Ticketing, volunteer schedules, QR check-in, and secure children's check-in systems." },
              { icon: MessageSquare, title: "Communications", desc: "Reach your people via Email, SMS, Push notifications, and WhatsApp effortlessly." },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} className="group">
                <Card className="p-8 h-full border-border/50 bg-background/50 hover:bg-white transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500 text-foreground">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-foreground font-serif">{feature.title}</h4>
                  <p className="text-foreground/60 leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. GIVING & ACCOUNTING (Glassmorphism / Dashboard Feel) */}
      <section id="giving" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Financial Stewardship</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">Trustworthy giving.<br/>Transparent accounting.</h3>
              <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
                Empower generosity with a frictionless giving experience. Behind the scenes, our robust fund accounting seamlessly syncs with your bank, generates reports, and handles donor statements automatically.
              </p>
              
              <div className="space-y-4">
                {[
                  "Bank sync and automated reconciliation",
                  "Custom fund tracking and budget reports",
                  "Secure offline contribution entry and check printing",
                  "Year-end tax statements generated instantly"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                    </div>
                    <span className="text-foreground/80 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              {/* Abstract Dashboard UI Mockup */}
              <div className="glass-card rounded-3xl p-6 relative z-10 bg-white/80">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h4 className="font-medium text-foreground">Total Giving</h4>
                    <p className="text-3xl font-serif mt-1">$124,500</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    +12% this month
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: "General Tithe", amount: "$84,200", percent: 70 },
                    { name: "Missions Fund", amount: "$28,100", percent: 20 },
                    { name: "Building Campaign", amount: "$12,200", percent: 10 },
                  ].map((fund, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-foreground/80">{fund.name}</span>
                        <span className="text-foreground">{fund.amount}</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${fund.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                          className="h-full bg-primary rounded-full" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative floating element */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 -bottom-8 glass-card bg-white/90 rounded-2xl p-5 z-20 w-64 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 font-medium">Budget Status</p>
                    <p className="text-sm font-bold text-foreground">On Track</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. WORSHIP & EVENTS */}
      <section id="worship" className="py-24 md:py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Worship & Events</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">Every Sunday, seamlessly orchestrated.</h3>
              <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
                From children's check-in to worship team scheduling, Lumina handles the logistics so you can focus on ministry. Create events, share registrations, and manage your song library all in one place.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="p-6 border-border/50 bg-background/50 hover:bg-background transition-colors">
                  <Clock className="w-6 h-6 text-primary mb-3" />
                  <h5 className="font-semibold mb-2">Service Planning</h5>
                  <p className="text-sm text-foreground/60">Drag-and-drop service elements and notify your volunteer teams instantly.</p>
                </Card>
                <Card className="p-6 border-border/50 bg-background/50 hover:bg-background transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-primary mb-3" />
                  <h5 className="font-semibold mb-2">QR Check-in</h5>
                  <p className="text-sm text-foreground/60">Secure, fast, and frictionless children's check-in with automatic label printing.</p>
                </Card>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full"
            >
              <div className="glass-card bg-foreground rounded-[2rem] p-8 text-background relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full mix-blend-screen" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                    <h4 className="font-serif text-2xl text-white">Sunday Service</h4>
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">Published</span>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { time: "09:00 AM", title: "Pre-service Prayer", role: "Prayer Team" },
                      { time: "09:30 AM", title: "Worship Set (3 Songs)", role: "Worship Band" },
                      { time: "10:15 AM", title: "Message: The Good Shepherd", role: "Lead Pastor" },
                      { time: "11:00 AM", title: "Closing & Ministry Time", role: "Ministry Team" },
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="flex gap-4 items-start p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                      >
                        <div className="text-primary font-medium text-sm pt-1 shrink-0 w-20">{item.time}</div>
                        <div>
                          <p className="font-medium text-white">{item.title}</p>
                          <p className="text-white/50 text-sm mt-1">{item.role}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. COMMUNITY & MEMBER PORTAL */}
      <section id="community" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-foreground/10 mix-blend-overlay z-10"></div>
                <img src={communityImg} alt="Community Gathering" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">The Member Portal</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">Connect your people.<br/>Every day of the week.</h3>
              <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
                Give your congregation a beautifully branded portal. They can update profiles, join groups, register for events, catch up on the blog, and manage giving—all from their phone.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="p-6 border-border/50 bg-white">
                  <Globe2 className="w-6 h-6 text-primary mb-3" />
                  <h5 className="font-semibold mb-2">Multi-language</h5>
                  <p className="text-sm text-foreground/60">Available in 20+ languages worldwide for diverse congregations.</p>
                </Card>
                <Card className="p-6 border-border/50 bg-white">
                  <FileText className="w-6 h-6 text-primary mb-3" />
                  <h5 className="font-semibold mb-2">Custom Forms</h5>
                  <p className="text-sm text-foreground/60">Build forms with submission stats that directly update member profiles.</p>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. COMMUNICATION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Smartphone className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-serif text-foreground mb-6">Reach them where they are.</h2>
            <p className="text-foreground/60 text-lg mb-10">
              Powerful communication tools built right in. Send targeted emails, SMS updates, push notifications, and even WhatsApp messages to specific groups or the entire church.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Email Newsletters', 'SMS Alerts', 'Push Notifications', 'WhatsApp Integration'].map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. TESTIMONIAL / VIBE CHECK */}
      <section className="py-24 bg-foreground text-background text-center px-6">
        <div className="container mx-auto max-w-4xl">
          <Star className="w-8 h-8 text-primary mx-auto mb-8" />
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif leading-tight mb-8"
          >
            "Lumina didn't just organize our administration—it elevated how our entire community interacts with the church. It feels like it was designed with actual reverence."
          </motion.h3>
          <p className="text-primary font-medium tracking-wide uppercase text-sm">Pastor David Chen, Grace City Church</p>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto glass-card p-12 md:p-16 rounded-[3rem]"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Ready to bring light to your administration?</h2>
            <p className="text-foreground/60 text-lg mb-10">
              Join hundreds of forward-thinking churches using Lumina to power their ministry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 rounded-full h-14 px-8 text-base">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full h-14 px-8 text-base border-border hover:bg-secondary">
                Talk to Sales
              </Button>
            </div>
            <p className="text-xs text-foreground/40 mt-6">No credit card required. Setup takes minutes.</p>
          </motion.div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <Footer />
    </div>
  );
}
