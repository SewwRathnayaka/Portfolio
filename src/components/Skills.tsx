import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ReactOriginal,
  JavascriptOriginal,
  Html5Original,
  Css3Original,
  TailwindcssOriginal,
  ExpressOriginal,
  NodejsOriginal,
  PythonOriginal,
  MysqlOriginal,
  MongodbOriginal,
  GitOriginal,
  FigmaOriginal,
  VscodeOriginal,
  PostmanOriginal,
} from 'devicons-react';
import { Layers } from 'lucide-react';

const BACKGROUND_GRADIENT = "linear-gradient(to bottom, rgba(144, 76, 84, 0.25), rgba(41, 14, 54, 0.20))";

// Container floating animation
const floatAnimation = (duration = 4) => ({
  y: [0, -8, 0],
  transition: {
    duration,
    repeat: Infinity,
    repeatType: 'reverse' as const,
  },
});

const techIconMap: Record<string, any> = {
  "React.js": ReactOriginal,
  "JavaScript": JavascriptOriginal,
  "HTML5": Html5Original,
  "CSS3": Css3Original,
  "Tailwind": TailwindcssOriginal,
  "shadcn/ui": ReactOriginal, // Using React icon as placeholder for shadcn
  "Express.js": ExpressOriginal,
  "Node.js": NodejsOriginal,
  "REST API": Layers,
  "Python": PythonOriginal,
  "MySQL": MysqlOriginal,
  "MongoDB": MongodbOriginal,
};

const toolIconMap: Record<string, any> = {
  "Git / GitHub": GitOriginal,
  "Postman": PostmanOriginal,
  "VS Code": VscodeOriginal,
  "Figma": FigmaOriginal,
};

// Frontend Skill card - warm/gold accent
const FrontendSkillCard = ({ Icon, label }: { Icon: any; label: string }) => (
  <div className="flex flex-col items-center gap-2 group">
    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-inner flex items-center justify-center transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
      <Icon size={20} className="sm:size-5 md:size-6" />
    </div>
    <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white text-center font-mono">
      {label}
    </span>
  </div>
);

// Backend Skill card - purple/cool accent
const BackendSkillCard = ({ Icon, label }: { Icon: any; label: string }) => (
  <div className="flex flex-col items-center gap-2 group">
    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-purple-500/5 border border-purple-400/20 backdrop-blur-sm shadow-[0_0_10px_-3px_rgba(168,85,247,0.2)] flex items-center justify-center transition-all duration-300 group-hover:border-purple-400/40 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]">
      <Icon
        size={20}
        className={label === "REST API" ? "w-5 h-5 sm:w-6 sm:h-6 text-purple-300" : "sm:size-5 md:size-6"}
      />
    </div>
    <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white text-center font-mono">
      {label}
    </span>
  </div>
);

// Database Skill card - neutral/gold soft accent
const DatabaseSkillCard = ({ Icon, label }: { Icon: any; label: string }) => (
  <div className="flex flex-col items-center gap-2 group">
    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-inner flex items-center justify-center transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
      <Icon size={20} className="sm:size-5 md:size-6" />
    </div>
    <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white text-center font-mono">
      {label}
    </span>
  </div>
);

// Tool card
const ToolCard = ({ Icon, label }: { Icon: any; label: string }) => (
  <div className="flex flex-col items-center gap-2 group">
    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-inner flex items-center justify-center transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
      <Icon size={20} className="sm:size-5 md:size-6" />
    </div>
    <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white text-center font-mono">
      {label}
    </span>
  </div>
);



// Frontend Monitor Figure
const MonitorFigure = () => (
  <div className="flex flex-col items-center">
    {/* Screen */}
    <div className="w-20 h-12 sm:w-28 sm:h-16 bg-white/10 backdrop-blur-md border border-white/25 rounded-md shadow-[0_0_15px_-5px_rgba(255,255,255,0.1)]" />
    {/* Stand neck */}
    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white/15 border-x border-white/20" />
    {/* Stand base */}
    <div className="w-10 h-1.5 sm:w-12 sm:h-2 bg-white/15 rounded-full border border-white/20" />
  </div>
);

// Backend Server Tower Figure
const ServerFigure = () => (
  <div className="flex flex-col items-center">
    {/* Server stack */}
    <div className="w-14 h-20 sm:w-20 sm:h-28 bg-white/10 backdrop-blur-md border border-white/25 rounded-md shadow-[0_0_15px_-5px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center gap-1 p-2">
      {/* Server slots */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-full h-3.5 sm:h-5 bg-white/10 border border-white/15 rounded-sm flex items-center px-1">
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="flex-1 mx-1 h-[2px] bg-white/15 rounded" />
        </div>
      ))}
    </div>
  </div>
);

// Database Cylinder Figure
const DatabaseFigure = () => (
  <div className="flex flex-col items-center">
    {/* Cylinder container */}
    <div className="relative w-14 h-20 sm:w-20 sm:h-28">
      {/* Top ellipse */}
      <div className="absolute top-0 left-0 right-0 h-5 sm:h-6 bg-white/15 backdrop-blur-md border border-white/25 rounded-[50%] z-10 shadow-[0_0_15px_-5px_rgba(255,255,255,0.1)]" />
      {/* Body */}
      <div className="absolute top-2 sm:top-3 left-0 right-0 bottom-2 sm:bottom-3 bg-white/10 backdrop-blur-md border-x border-white/20">
        {/* Ring lines */}
        <div className="absolute top-1/3 left-0 right-0 h-3 border-t border-white/15 rounded-[50%]" />
        <div className="absolute top-2/3 left-0 right-0 h-3 border-t border-white/15 rounded-[50%]" />
      </div>
      {/* Bottom ellipse */}
      <div className="absolute bottom-0 left-0 right-0 h-5 sm:h-6 bg-white/10 border border-white/20 rounded-[50%]" />
    </div>
  </div>
);

const frontendSkills = ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind', 'shadcn/ui'] as const;
const backendSkills = ['Express.js', 'Node.js', 'REST API', 'Python'] as const;
const databaseSkills = ['MySQL', 'MongoDB'] as const;
const developmentTools = ['Git / GitHub', 'Postman', 'VS Code', 'Figma'] as const;

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="pt-4 pb-12 relative overflow-hidden" ref={ref} 
      style={{ background: BACKGROUND_GRADIENT }}
    >
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          
          <h2 className="font-heading text-xl sm:text-3xl md:text-4xl font-bold mt-2">
            Skills & Technologies
          </h2>
          <p className="text-white/80 mt-4 max-w-xl mx-auto text-xs sm:text-sm px-4">
          Where creativity meets code — a curated set of skills I use to bring ideas to life on the web.
          </p>
        </motion.div>

        {/* Architecture Diagram with Background */}
        <div className="relative w-full max-w-[1000px] mx-auto">
          {/* Content */}
          <div className="relative z-10 px-4 py-8 sm:py-10">
            {/* Figures Row - Hidden on mobile, visible on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="hidden md:flex flex-row flex-wrap items-center md:items-end justify-center md:justify-between gap-6 md:gap-0 mb-4 md:px-8 lg:px-12"
            >
              {/* Frontend Figure */}
              <motion.div animate={floatAnimation(4)} className="flex flex-col items-center md:flex-1">
                <MonitorFigure />
              </motion.div>

              {/* Backend Figure */}
              <motion.div animate={floatAnimation(5)} className="flex flex-col items-center md:flex-1">
                <ServerFigure />
              </motion.div>

              {/* Database Figure */}
              <motion.div animate={floatAnimation(4.5)} className="flex flex-col items-center md:flex-1">
                <DatabaseFigure />
              </motion.div>
            </motion.div>

            {/* Titles Row - Hidden on mobile, visible on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden md:flex flex-row flex-wrap items-center justify-center md:justify-between gap-4 md:gap-0 mb-6 md:px-8 lg:px-12"
            >
              <h4 className="text-center text-white/90 font-heading font-bold text-xs sm:text-sm md:text-base tracking-[0.15em] uppercase md:flex-1">
                Frontend
              </h4>
              <h4 className="text-center text-white/90 font-heading font-bold text-xs sm:text-sm md:text-base tracking-[0.15em] uppercase md:flex-1">
                Backend
              </h4>
              <h4 className="text-center text-white/90 font-heading font-bold text-xs sm:text-sm md:text-base tracking-[0.15em] uppercase md:flex-1">
                Database
              </h4>
            </motion.div>

            {/* Skills Lists Below Figures */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 mb-12"
            >
              {/* Frontend Skills */}
              <div className="flex flex-col items-center md:flex-1">
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {frontendSkills.map((skill) => (
                    <FrontendSkillCard key={skill} Icon={techIconMap[skill]} label={skill} />
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div className="flex flex-col items-center md:flex-1">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {backendSkills.map((skill) => (
                    <BackendSkillCard key={skill} Icon={techIconMap[skill]} label={skill} />
                  ))}
                </div>
              </div>

              {/* Database Skills */}
              <div className="flex flex-col items-center md:flex-1">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {databaseSkills.map((skill) => (
                    <DatabaseSkillCard key={skill} Icon={techIconMap[skill]} label={skill} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tools Section */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              <h4 className="text-center text-white/90 font-heading font-bold text-base sm:text-lg md:text-xl tracking-[0.15em] uppercase md:flex-1 mb-6">Development Tools</h4>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {developmentTools.map((tool) => (
                  <ToolCard key={tool} Icon={toolIconMap[tool]} label={tool} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
