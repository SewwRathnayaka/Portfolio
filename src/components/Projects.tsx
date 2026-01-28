import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useCallback, useMemo } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import background from "../assets/background1.webp";
import project1 from "../assets/p1.webp";
import project2 from "../assets/p2.webp";
import project3 from "../assets/p3.webp";

const projects = [
  {
    title: "E-Commerce Storefront",
    category: "Finance",
    description:
      "A complete a scalable, production-ready MERN e-commerce platform. Fully responsive React frontend, a secure Node.js/Express API, and a MongoDB backend and clean schema design. Key features include dynamic product filtering, Clerk authentication, Stripe payment integration, a shopping cart, and global error handling for stability.",
    tech: ["React","JavaScript", "Node.js", "MongoDB", "Stripe", "Express", "Clerk"],
    image: project1,
    link: "https://fed-storefront-frontend-sewwandi.netlify.app",
  },
  {
    title: "Fixfinder-Handyman Service Application",
    category: "Service",
    description:
      "A complete service marketplace with separate role-based experiences for clients and service providers, enabling the full booking lifecycle from discovery to payment and reviews. End-to-End Service Flow, Real-Time Communication, Payment Processing, Reviews, and more.",
    tech: ["MERN stack", "Tailwind CSS", "TypeScript", "Twilio","Socket.io","Clerk", "Stripe"],
    image: project2,
    link: "https://fix-frontend.netlify.app",
  },
  {
    title: "Skill & Project Matching System",
    category: "Management",
    description:
      " A system that helps consultancies and tech agencies efficiently manage their workforce by matching team members to projects based on their skills.",
    tech: ["React", "Node.js", "MySQL", "Express", "JWT","CSS"],
    image: project3,
    link: "#",
  },
] as const;

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  duration: 0.6,
};

const DRAG_THRESHOLD = 100;

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  const handleCardClick = useCallback((index: number) => {
    if (!isDragging && index !== currentIndex) {
      setCurrentIndex(index);
    }
  }, [isDragging, currentIndex]);

  const getCardPosition = useCallback((index: number, currentIdx: number) => {
    const offset = index - currentIdx;
    if (offset === 0) return 0; // Center
    if (offset === 1 || offset === -(projects.length - 1)) return 1; // Right
    if (offset === -1 || offset === projects.length - 1) return -1; // Left
    return offset > 0 ? 2 : -2; // Further away
  }, []);

  const getCardStyle = useCallback((position: number) => {
    if (position === 0) {
      return { scale: 1, opacity: 1, filter: "blur(0px)", zIndex: 10 };
    } else if (Math.abs(position) === 1) {
      return { scale: 0.75, opacity: 0.5, filter: "blur(8px)", zIndex: 5 };
    } else {
      return { scale: 0.6, opacity: 0.2, filter: "blur(12px)", zIndex: 1 };
    }
  }, []);

  return (
    <section
      id="projects"
        className="pt-4 pb-12 relative overflow-hidden scroll-mt-0"
      ref={ref}
      style={{ scrollMarginTop: '0px' }}
    >
      {/* Background Image with Blur and Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
          filter: "blur(10px)  brightness(0.3)",
          transform: "scale(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-purple-300/10" />

      {/* Title Area - Excluded from background effect */}
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
        
          <h2 className="font-heading text-lg sm:text-3xl md:text-4xl font-bold mt-2">
            Featured Projects
          </h2>
          <p className="text-white/80 mt-4 max-w-xl mx-auto text-[10px] sm:text-xs md:text-sm px-4 ">
          A visual journey through projects crafted with curiosity, creativity, and code.
          </p>
          
        </motion.div>

        {/* Carousel Container */}
        <div className="relative h-[520px] sm:h-[350px] md:h-[700px] flex items-center justify-center overflow-hidden">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-foreground" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-foreground" />
          </button>

          {/* Carousel Cards */}
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {projects.map((project, index) => {
                const position = getCardPosition(index, currentIndex);
                const style = getCardStyle(position);
                const isCenter = position === 0;

                return (
                  <motion.div
                    key={`${project.title}-${currentIndex}`}
                    initial={false}
                    animate={{
                      x: position * 320,
                      scale: style.scale,
                      opacity: style.opacity,
                      filter: style.filter,
                    }}
                    transition={SPRING_CONFIG}
                    whileHover={
                      !isCenter
                        ? {
                            scale: style.scale * 1.1,
                            opacity: Math.min(style.opacity * 1.4, 0.8),
                            filter: "blur(4px)",
                          }
                        : {}
                    }
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragStart={() => {
                      setDragging(true);
                      setIsDragging(true);
                    }}
                    onDragEnd={(_, info) => {
                      setDragging(false);
                      if (Math.abs(info.offset.x) > DRAG_THRESHOLD) {
                        if (info.offset.x > 0) {
                          handlePrev();
                        } else {
                          handleNext();
                        }
                      }
                      setTimeout(() => setIsDragging(false), 100);
                    }}
                    onClick={() => handleCardClick(index)}
                    style={{
                      position: "absolute",
                      zIndex: style.zIndex,
                      cursor: dragging ? "grabbing" : isCenter ? "default" : "pointer",
                    }}
                    className="w-[82%] sm:w-[85%] md:w-[75%] lg:w-[65%] max-w-[600px]"
                  >
                    {/* Glassmorphism Card */}
                    <div
                      className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden ${
                        isCenter ? "cursor-default" : ""
                      }`}
                      style={{
                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                      }}
                    >
                      {/* Project Image */}
                      <div className="w-full h-40 sm:h-48 md:h-56 mb-6 rounded-lg overflow-hidden bg-white/5">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* Category */}
                      <span className="text-xs sm:text-sm opacity-80 text-foreground">
                        {project.category}
                      </span>

                      {/* Title */}
                      <h3 className="font-heading text-base sm:text-2xl font-bold mt-2 mb-3 text-foreground">
                        {project.title}
                      </h3>

                      {/* Description */}
                      
                      <p className="font-mono text-white/90 leading-relaxed sm:leading-[2.2] text-[9px] sm:text-[11px] md:text-xs mb-6 sm:mb-10">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4 pt-3 sm:pt-4 border-t border-white/20">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs sm:text-sm opacity-80 hover:opacity-100 transition-opacity text-foreground"
                        >
                          <ExternalLink size={16} />
                          Site / Live Demo
                        </a>
                        
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
