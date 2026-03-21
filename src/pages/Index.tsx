import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import LazyWhenInView from "@/components/LazyWhenInView";

// Lazy load components that are below the fold
const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Learning = lazy(() => import("@/components/Learning"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border-4 border-white/20 border-t-white/60 rounded-full animate-spin" />
  </div>
);

const ProjectsSectionPlaceholder = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-8 h-8 border-4 border-white/20 border-t-white/60 rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen aura-bg relative">
      <Sidebar />
      <Hero />
      <Suspense fallback={<LoadingFallback />}>
        <About />
        <Skills />
        {/* Defer Projects (and Supabase) until user scrolls near this section to shorten critical path */}
        <LazyWhenInView id="projects" rootMargin="300px" minHeight="min-h-[420px]">
          <Suspense fallback={<ProjectsSectionPlaceholder />}>
            <Projects />
          </Suspense>
        </LazyWhenInView>
        <Learning />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
