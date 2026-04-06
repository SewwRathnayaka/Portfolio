import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Download } from "lucide-react";
import { RESUME_PATH, SITE_IMAGES } from "@/lib/site-assets";

const PROFILE_IMAGE = SITE_IMAGES.profile;
const RESUME_URL = RESUME_PATH;

const BACKGROUND_GRADIENT = "linear-gradient(to right, rgba(41, 14, 54, 0.20), rgba(144, 76, 84, 0.25))";
const OVERLAY_COLOR = "rgba(41, 14, 54, 0.35)";
const BUTTON_GRADIENT_HOVER = "linear-gradient(to top, rgba(194, 108, 16, 0.35) 0%, rgba(194, 108, 16, 0.15) 50%, transparent 100%)";
const BUTTON_GRADIENT_DEFAULT = "linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%)";

const FloatingOrb = ({
  className,
  delay = 0,
  duration = 8,
  size = "w-32 h-32",
}: {
  className?: string;
  delay?: number;
  duration?: number;
  size?: string;
}) => (
  <motion.div
    className={`absolute rounded-full blur-xl opacity-60 pointer-events-none ${size} ${className}`}
    animate={{
      y: [0, -30, 0],
      rotate: [0, 360],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsProfileHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsProfileHovered(false), []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative grid grid-cols-1 lg:grid-cols-3 overflow-hidden py-6 sm:pt-4 sm:pb-12 lg:min-h-screen"
      style={{ background: BACKGROUND_GRADIENT }}
    >
      {/* --- LEFT SIDE – IMAGE --- */}
      <div className="relative h-auto md:h-[50vh] lg:h-screen flex items-center justify-center lg:justify-end lg:pr-12 lg:pl-16 lg:translate-x-24 z-10 lg:col-span-1 pt-4 sm:pt-0">

        <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-6">
          <div 
            className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
          {/* Orbit wrapper - rotates to orbit its children */}
          
          {/* Accent circle behind photo (static, subtle) */}
          <div className="absolute left-[-6%] top-1/2 transform -translate-y-1/2 -translate-x-6 w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full bg-[#602a78]/30 blur-2xl pointer-events-none z-0" />
          
          {/* Outer soft gradient ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9d5f1d]/10 to-transparent blur-sm z-5" />

          {/* Circular photo container (on top) */}
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[linear-gradient(135deg,#1a0b2e_0%,#2e1065_100%)] border border- white/10 shadow-soft z-20">
            <img 
              src={PROFILE_IMAGE} 
              alt="Profile" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            
            {/* Crescent Download CV Button - inside the circular container for proper clipping */}
            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                absolute bottom-0 left-0
                w-full h-[20%]
                flex items-center justify-center gap-1.5 md:gap-2
                text-white text-[10px] md:text-base font-inter
                cursor-pointer
                transition-all duration-300 ease-out
              "
              style={{
                background: isProfileHovered ? BUTTON_GRADIENT_HOVER : BUTTON_GRADIENT_DEFAULT,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                boxShadow: isProfileHovered 
                  ? '0 -8px 32px rgba(194, 108, 16, 0.3), inset 0 2px 16px rgba(194, 108, 16, 0.1)' 
                  : '0 -4px 16px rgba(0, 0, 0, 0.15)',
                opacity: isProfileHovered ? 1 : 0.85,
              }}
              initial={{ y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className={`w-3 h-3 md:w-4 md:h-4 transition-all duration-300 ${isProfileHovered ? 'text-[#602a78]' : 'text-white/90'}`} />
              <span className={`transition-all duration-300 ${isProfileHovered ? 'text-white font-semibold' : 'text-white/90'}`}>
                Download CV
              </span>
            </motion.a>
          </div>

          <div className="absolute -inset-1 rounded-full border border-[#9d5f1d]/20 pointer-events-none mix-blend-screen" />

            {/* Soft Color Overlay */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ backgroundColor: OVERLAY_COLOR }}
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE – CONTENT (no glass card) */}
      <div className="relative flex items-center justify-center pl-10 pr-6 sm:px-6 lg:px-12 py-1 md:py-12 lg:py-0 lg:col-span-2">
        {/* Ambient glow effect */}
        <div className="absolute -top-24 right-12 w-64 h-64 bg-[#9d5f1d]/10 blur-3xl rounded-full pointer-events-none" />
        
        {/* Floating orbs near content */}
        <FloatingOrb className="right-12 top-24 z-10 bg-[#9d5f1d]/40" size="w-28 h-28" duration={6} delay={0.5} />
        <FloatingOrb className="left-8 bottom-32 z-10 bg-[#602a78]/30" size="w-20 h-20" duration={8} delay={1} />
        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative max-w-none lg:max-w-2xl w-full"
        >
          <h2 className="font-heading text-base sm:text-3xl md:text-4xl font-bold mt-0 mb-2 sm:mb-10">
            About Me
          </h2>

          <div className="space-y-2 sm:space-y-4">
            <p className="font-mono text-white/90 leading-tight sm:leading-relaxed text-[9px] sm:text-[11px] md:text-xs">
              Hi! My name is Sewwandi I'm a <span className="font-semibold text-white bg-[#ac681f]/10 px-1.5 py-0.5 rounded">software engineering undergraduate</span>{' '}
              who genuinely enjoys turning ideas into
              <span className="italic text-white"> clean, usable, and good-looking </span>
              applications. I mainly work with the
              <span className="font-mono text-[#602a78] bg-[#be7ada]/15 px-1.5 py-0.5 rounded"> MERN stack</span>,
              but I'm always curious about what's next.
            </p>

            <p className="font-mono text-white/90 leading-tight sm:leading-relaxed text-[9px] sm:text-[11px] md:text-xs">
              I'm someone who constantly tries to
              <span className="font-semibold text-white bg-[#ac681f]/10 px-1.5 py-0.5 rounded"> get better at what I do</span>.
              I'm not afraid to try a different approach just to see if there's a
              <span className="italic text-white"> smarter or cleaner way</span>{' '}
              to build something. Even after building full-stack applications,
              I often go back to the
              <span className="font-mono text-[#602a78] bg-[#be7ada]/15 px-1.5 py-0.5 rounded"> basics</span>{' '}
              to clear doubts and truly understand my work.
            </p>

            <p className="font-mono text-white/90 leading-tight sm:leading-relaxed text-[9px] sm:text-[11px] md:text-xs">
              I also strongly believe in
              <span className="font-semibold text-white bg-[#ac681f]/10 px-1.5 py-0.5 rounded"> moving with AI, not pushing it away</span>.
              I use AI to make development
              <span className="italic text-white"> faster and smoother</span>,
              but I use it with care. Having worked with AI across
              <span className="font-mono text-[#4c1763] bg-[#be7ada]/15 px-1.5 py-0.5 rounded"> multiple projects</span>,
              I understand when to use it — and when not to.
            </p>

            <p className="font-mono text-white/90 leading-tight sm:leading-relaxed text-[9px] sm:text-[11px] md:text-xs">
              I love adding a bit of
              <span className="italic text-white"> creativity</span>{' '}
              to make my projects feel
              <span className="font-semibold text-white bg-[#ac681f]/10 px-1.5 py-0.5 rounded"> unique and polished</span>.
              Right now, I'm exploring
              <span className="font-mono text-[#602a78] bg-[#be7ada]/15 px-1.5 py-0.5 rounded"> Next.js</span> and
              <span className="font-mono text-[#602a78] bg-[#be7ada]/15 px-1.5 py-0.5 rounded"> Spring Boot</span>,
              always looking for new ways to grow.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
