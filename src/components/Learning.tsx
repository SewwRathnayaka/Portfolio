import { motion, useInView } from "framer-motion";
import { useRef, memo } from "react";
import {
  NextjsOriginal,
  SpringOriginal,
  AngularOriginal,
  ReactOriginal,
  JavaOriginal,
  PythonOriginal,
} from 'devicons-react';
import { Search } from 'lucide-react';

const BACKGROUND_GRADIENT = "linear-gradient(to right, rgba(41, 14, 54, 0.40), rgba(144, 76, 84, 0.25))";
const BOX_SHADOW = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";

const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 30 },
  transition: { duration: 0.6 },
};

const CARD_ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  transition: { duration: 0.6 },
};

const currentlyLearning = ['Next.js', 'Spring Boot'] as const;
const expectingToLearn = ['Angular', 'SEO', 'React Native', 'Fast API', 'Java'] as const;

const LearningSkillCard = memo(({ Icon, label }: { Icon: any; label: string }) => (
  <div className="flex flex-col items-center gap-2 group">
    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-inner flex items-center justify-center transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
      <Icon size={24} />
    </div>
    <span className="text-[10px] sm:text-[12px] md:text-[13px] text-white text-center font-mono">
      {label}
    </span>
  </div>
));

const learningIconMap: Record<string, any> = {
  "Next.js": NextjsOriginal,
  "Spring Boot": SpringOriginal,
  "Angular": AngularOriginal,
  "SEO": Search, // Using Search icon from lucide-react for SEO
  "React Native": ReactOriginal,
  "Fast API": PythonOriginal, // Using Python icon as placeholder for FastAPI
  "Java": JavaOriginal,
};

const Learning = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="learning"
      className="pt-4 pb-2 sm:pb-12 relative overflow-hidden"
      ref={ref}
      style={{ background: BACKGROUND_GRADIENT }}
    >
      <div className="section-container relative z-10">
        <motion.div
          {...ANIMATION_CONFIG}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-heading text-lg sm:text-3xl md:text-4xl font-bold mt-2">
            Learning
          </h2>
          <p className="text-white/80 mt-4 max-w-xl mx-auto text-[10px] sm:text-xs md:text-sm px-4">
            Continually learning, experimenting, and evolving with modern technologies.
          </p>
        </motion.div>

        {/* Glass Container */}
        <motion.div
          {...CARD_ANIMATION_CONFIG}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...CARD_ANIMATION_CONFIG.transition, delay: 0.1 }}
          className="max-w-xs sm:max-w-4xl mx-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl"
          style={{ boxShadow: BOX_SHADOW }}
        >
          <div className="space-y-12">
            {/* Currently Learning */}
            <motion.div
              {...CARD_ANIMATION_CONFIG}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...CARD_ANIMATION_CONFIG.transition, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-center text-purple-100 font-bold text-[11px] sm:text-sm md:text-base tracking-[0.15em] uppercase mb-6">
                Currently Learning
              </h3>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {currentlyLearning.map((tech) => (
                  <LearningSkillCard
                    key={tech}
                    Icon={learningIconMap[tech]}
                    label={tech}
                  />
                ))}
              </div>
            </motion.div>

            {/* Expecting to Learn */}
            <motion.div
              {...CARD_ANIMATION_CONFIG}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...CARD_ANIMATION_CONFIG.transition, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-center text-purple-100 font-bold text-[11px] sm:text-sm md:text-base tracking-[0.15em] uppercase mb-6">
                Planning to Learn
              </h3>
              <div className="grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-4 sm:gap-6 max-w-xs sm:max-w-none mx-auto">
                {expectingToLearn.map((tech) => (
                  <LearningSkillCard
                    key={tech}
                    Icon={learningIconMap[tech]}
                    label={tech}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Learning;
