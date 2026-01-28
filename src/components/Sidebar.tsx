import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "learning", label: "Learning" },
  { id: "contact", label: "Contact" },
] as const;

const Sidebar = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbPosition, setThumbPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight / 2;

          for (const section of sections) {
            const element = document.getElementById(section.id);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + offsetHeight
              ) {
                setCurrentSection(section.id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate thumb position based on current section
  useEffect(() => {
    const currentIndex = sections.findIndex((s) => s.id === currentSection);
    if (currentIndex >= 0) {
      const position = (currentIndex / (sections.length - 1)) * 100;
      setThumbPosition(position);
    }
  }, [currentSection]);

  // Memoized handler for slider movement
  const handleSliderMove = useCallback((clientY: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setThumbPosition(percentage);
  }, []);

  // Memoized handler for scrolling to section
  const scrollToSection = useCallback(() => {
    const sectionIndex = Math.round((thumbPosition / 100) * (sections.length - 1));
    const targetSection = sections[sectionIndex];
    if (targetSection) {
      const element = document.getElementById(targetSection.id);
      if (element) {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          // On mobile, scroll to the very top of the section
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const elementPosition = rect.top + scrollTop;
          window.scrollTo({
            top: Math.max(0, elementPosition),
            behavior: "smooth"
          });
        } else {
          // On desktop, center the section
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        setCurrentSection(targetSection.id);
      }
    }
  }, [thumbPosition]);

  // Mobile slider drag handlers - memoized
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    handleSliderMove(e.touches[0].clientY);
  }, [handleSliderMove]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleSliderMove(e.touches[0].clientY);
    }
  }, [isDragging, handleSliderMove]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      scrollToSection();
    }
  }, [isDragging, scrollToSection]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    handleSliderMove(e.clientY);
  }, [handleSliderMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientY);
    }
  }, [isDragging, handleSliderMove]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      scrollToSection();
    }
  }, [isDragging, scrollToSection]);

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleSliderMove(e.clientY);
    };
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      scrollToSection();
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, handleSliderMove, scrollToSection]);

  return (
    <aside className="fixed left-2 md:left-0 top-1/2 md:top-1/2 -translate-y-1/2 z-30 flex md:flex">
      {/* Mobile Slider */}
      <div
        ref={sliderRef}
        className="md:hidden flex flex-col items-center h-[60vh] w-5 relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Slider Track */}
        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-border/20" />
        
        {/* 7 Dots with 6 equal spaces */}
        {Array.from({ length: 7 }).map((_, dotIndex) => {
          // Find which section this dot corresponds to for highlighting
          // Dot 0: start (no section), Dot 1-6: correspond to sections 0-5
          const sectionIndex = dotIndex === 0 ? -1 : dotIndex - 1;
          const section = sectionIndex >= 0 ? sections[sectionIndex] : null;
          const isCurrent = section && currentSection === section.id;
          
          // Position dots equally: 0%, 16.67%, 33.33%, 50%, 66.67%, 83.33%, 100%
          const position = (dotIndex / 6) * 100;
          
          return (
            <div
              key={`dot-${dotIndex}`}
              className="absolute right-0 flex items-center transition-all duration-300"
              style={{
                top: `${position}%`,
                transform: "translate(50%, -50%)",
              }}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isCurrent ? "bg-foreground/80 scale-150" : "bg-border/40"
                }`}
              />
            </div>
          );
        })}

        {/* Labels positioned at midpoint between each pair of dots - rotated anti-clockwise */}
        {sections.map((section, index) => {
          const isCurrent = currentSection === section.id;
          // Position label at midpoint between dot i and dot (i+1)
          // For 6 sections, we have 7 dots (0-6), labels go between: 0-1, 1-2, 2-3, 3-4, 4-5, 5-6
          const dot1Pos = (index / 6) * 100;
          const dot2Pos = ((index + 1) / 6) * 100;
          const position = (dot1Pos + dot2Pos) / 2;
          
          return (
            <div
              key={`label-${section.id}`}
              className="absolute right-0.25 flex items-center justify-center transition-all duration-300"
              style={{
                top: `${position}%`,
                transform: "translateY(-50%)",
              }}
            >
              <span
                className={`uppercase tracking-wider whitespace-nowrap transition-all duration-300 origin-center ${
                  isCurrent
                    ? "text-[8px] text-foreground font-semibold"
                    : "text-[7px] text-foreground/50"
                }`}
                style={{
                  transform: "rotate(-90deg)",
                }}
              >
                {section.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Desktop Navigation */}
      <nav
        className="hidden md:flex flex-col gap-4 pl-2 pr-4 py-6 bg-transparent backdrop-blur-xl border-none shadow-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {sections.map((section) => {
          const isCurrent = currentSection === section.id;
          const shouldShow = isCurrent || isHovered;

          return (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              whileHover={{ scale: 1.03, x: 4 }}
              className="group flex items-center gap-3 cursor-pointer"
              initial={{ opacity: isCurrent ? 1 : 0 }}
              animate={{
                opacity: shouldShow ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`h-px bg-border/40 transition-all duration-300 ${
                  isCurrent
                    ? "w-8 group-hover:w-14"
                    : isHovered
                    ? "w-4 group-hover:w-8"
                    : "w-0"
                }`}
              />
              <motion.span
                className={`text-xs tracking-[0.22em] uppercase transition-all duration-300 origin-left ${
                  isCurrent
                    ? "text-foreground/60 group-hover:text-foreground group-hover:scale-110"
                    : isHovered
                    ? "text-foreground/40 group-hover:text-foreground/60"
                    : "text-transparent"
                }`}
                animate={{
                  scale: isCurrent && isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {section.label}
              </motion.span>
            </motion.a>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

