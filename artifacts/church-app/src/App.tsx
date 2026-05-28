import { Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppRoutes } from "@/routes";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { DemoStoreProvider } from "@/lib/demo-store";

const queryClient = new QueryClient();

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const profilePage = location === "/profile";
  const kioskPage = location === "/events/checkin/kiosk";

  if (kioskPage) {
    return (
      <main className="h-screen w-full overflow-hidden">
        <AppRoutes />
      </main>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
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

      <div className="flex min-h-0 flex-1 min-w-0 flex-col overflow-hidden">
        <TopBar onMobileMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <CommandPalette />
        <main
          className={`min-h-0 flex-1 overflow-y-auto scrollbar-thin ${
            profilePage ? "bg-white lg:bg-[#f7f9fb]" : "bg-[#f7f9fb]"
          }`}
        >
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <DemoStoreProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Layout />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </DemoStoreProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
