
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import SmoothScroll from "./components/SmoothScroll";
import GoToTopButton from "./components/GoToTopButton";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Favorites from "./pages/Favorites";
import Testimonials from "./pages/Testimonials";
import Reviews from "./pages/Reviews";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import AuthSuccess from "./pages/AuthSuccess";
import PuppyDetails from "./pages/PuppyDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/puppy/:id" element={<PuppyDetails />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SmoothScroll>
            <AnimatedRoutes />
            <GoToTopButton />
          </SmoothScroll>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
