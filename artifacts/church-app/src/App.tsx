import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Members from "@/pages/members/Members";
import Groups from "@/pages/members/Groups";
import Directory from "@/pages/members/Directory";
import Followup from "@/pages/members/Followup";
import Contributions from "@/pages/giving/Contributions";
import Pledges from "@/pages/giving/Pledges";
import Statements from "@/pages/giving/Statements";
import Accounting from "@/pages/finance/Accounting";
import Budget from "@/pages/finance/Budget";
import Reports from "@/pages/finance/Reports";
import Planning from "@/pages/worship/Planning";
import Songs from "@/pages/worship/Songs";
import Teams from "@/pages/worship/Teams";
import CalendarPage from "@/pages/events/CalendarPage";
import Volunteers from "@/pages/events/Volunteers";
import Checkin from "@/pages/events/Checkin";
import Email from "@/pages/comms/Email";
import SMS from "@/pages/comms/SMS";
import NotificationsPage from "@/pages/comms/NotificationsPage";
import Forms from "@/pages/forms/Forms";
import Submissions from "@/pages/forms/Submissions";
import Builder from "@/pages/portal/Builder";
import Blog from "@/pages/portal/Blog";
import Settings from "@/pages/Settings";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="h-full"
      >
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/members" component={Members} />
          <Route path="/groups" component={Groups} />
          <Route path="/directory" component={Directory} />
          <Route path="/followup" component={Followup} />
          <Route path="/giving/contributions" component={Contributions} />
          <Route path="/giving/pledges" component={Pledges} />
          <Route path="/giving/statements" component={Statements} />
          <Route path="/finance/accounting" component={Accounting} />
          <Route path="/finance/budget" component={Budget} />
          <Route path="/finance/reports" component={Reports} />
          <Route path="/worship/planning" component={Planning} />
          <Route path="/worship/songs" component={Songs} />
          <Route path="/worship/teams" component={Teams} />
          <Route path="/events/calendar" component={CalendarPage} />
          <Route path="/events/volunteers" component={Volunteers} />
          <Route path="/events/checkin" component={Checkin} />
          <Route path="/comms/email" component={Email} />
          <Route path="/comms/sms" component={SMS} />
          <Route path="/comms/notifications" component={NotificationsPage} />
          <Route path="/forms" component={Forms} />
          <Route path="/forms/submissions" component={Submissions} />
          <Route path="/portal/builder" component={Builder} />
          <Route path="/portal/blog" component={Blog} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative z-40 lg:z-auto h-full transition-transform duration-300 lg:transition-none`}
      >
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          onMobileClose={() => setMobileOpen(false)}
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar onMobileMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <AnimatedRoutes />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
