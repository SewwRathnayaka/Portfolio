import { useState, useEffect } from "react";
import { SITE_IMAGES } from "@/lib/site-assets";

const BACKGROUND_IMAGE = SITE_IMAGES.background;
const BACKGROUND_IMAGE_MOBILE = SITE_IMAGES.backgroundMobile;
const BACKGROUND_GRADIENT = "linear-gradient(to right, rgba(41, 14, 54, 0.20), rgba(144, 76, 84, 0.25))";

const ROTATING_WORDS = [
  "WEBSITES",
  "MOBILE APPS",
  "DESKTOP APPS",
  "SAAS APPS",
  "WEB APPS",
] as const;

const ROTATE_MS = 900;

const Hero = () => {
  const [showToast, setShowToast] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="h-screen sm:min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Background Image - Full section on mobile */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full sm:hidden">
          <img
            src={BACKGROUND_IMAGE_MOBILE}
            alt="Background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        {/* Gradient overlay for desktop */}
        <div className="hidden sm:block absolute inset-0" style={{ background: BACKGROUND_GRADIENT }} />
      </div>
      {/* Toast message - mobile only; CSS animation avoids Framer Motion reflow */}
      {showToast && (
        <div
          className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg hero-toast-enter"
          role="status"
          aria-live="polite"
        >
          <p className="text-white text-[10px] sm:text-xs font-mono">Hey, Welcome! 👋</p>
        </div>
      )}

      {/* Desktop welcome label */}
      <div className="hidden md:block absolute top-20 left-1/2 -translate-x-1/2 z-20 text-white text-xs md:text-sm font-mono">
        Hey, Welcome!
      </div>

      <div className="section-container w-full relative z-10">
        <div className="max-w-2xl mx-auto relative">
          {/* Background Image Container - Desktop only */}
          <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:w-[calc(100%)] lg:inset-0 lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:w-[140%] h-[calc(100%+2rem)] md:h-full lg:h-full z-0 overflow-hidden">
            <div className="relative w-full h-full">
              <img
                src={BACKGROUND_IMAGE}
                alt="Background"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>

          {/* Content with Glass Morphism - No rounded corners; CSS animations only */}
          <div className="relative text-center backdrop-blur-md bg-card/40 p-2 sm:p-6 md:p-8 lg:p-10 py-6 sm:py-6 md:py-8 lg:py-10 border border-white/10 shadow-2xl z-10 mx-8 sm:mx-4 md:mx-6 lg:mx-0 my-2 sm:my-0">
            {/* Main Heading */}
            <h1 className="font-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2 sm:mb-3 md:mb-4 hero-heading-anim">
              <br />
              I build
              <br />
              <span
                aria-live="polite"
                aria-atomic="true"
              >
                <span
                  key={wordIndex}
                  className="hero-rotating-word hero-rotating-gradient-text inline-block font-bold font-sans my-2 text-4xl sm:text-5xl md:text-6xl lg:text-6xl tracking-tight text-balance max-w-[95vw] sm:max-w-none"
                >
                  {ROTATING_WORDS[wordIndex]}
                </span>
              </span>
              <br />
              that people love
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 mt-3 sm:mt-6 md:mt-8 pt-2 sm:pt-4 md:pt-6 border-t border-border hero-stats-anim">
              <div>
                <p className="text-xs sm:text-xl md:text-2xl font-heading font-bold text-foreground">1+</p>
                <p className="text-[8px] sm:text-xs text-destructive-foreground">Years Experience</p>
              </div>
              <div>
                <p className="text-xs sm:text-xl md:text-2xl font-heading font-bold text-foreground">6+</p>
                <p className="text-[8px] sm:text-xs text-destructive-foreground">Projects Done</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - CSS animation only */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hero-scroll-anim">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2 hero-scroll-bounce">
          <div className="w-1.5 h-2.5 bg-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
