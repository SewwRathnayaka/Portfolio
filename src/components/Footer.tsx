import { memo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-8 border-t border-none bg-black/85">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-purple-200/50 text-[10px] sm:text-xs font-mono flex items-center gap-2"
          >
            Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-white/80  fill-white/80 " />
            </motion.span>
            by Sewwandi Rathnayaka
          </motion.p>

          <p className="text-purple-200/50 font-mono text-[10px] sm:text-xs">
            © {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
