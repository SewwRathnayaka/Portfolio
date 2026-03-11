import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Github, Linkedin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
const BACKGROUND_IMAGE = "https://irbyffxrvtqtbrloalvd.supabase.co/storage/v1/object/public/project-images/background1.webp";
const BACKGROUND_GRADIENT = "linear-gradient(to right, rgba(41, 14, 54, 0.40), rgba(144, 76, 84, 0.25))";
const BOX_SHADOW = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 30 },
  transition: { duration: 0.6 },
};

const CARD_ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  transition: { duration: 0.6 },
};

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/SewwRathnayaka",
    color: "hover:bg-foreground hover:text-background",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/sewwandi-rathnayaka-3a1b4121a/",
    color: "hover:bg-primary hover:text-white",
  },
] as const;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((field: 'name' | 'email' | 'message') => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL;

    if (!serviceId || !templateId || !publicKey) {
      if (process.env.NODE_ENV === 'development') {
        console.error("EmailJS configuration is missing.");
      }
      toast({
        title: "Configuration Error",
        description: "Email service is not properly configured. Please contact the site administrator.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const sanitizedName = formData.name.trim().slice(0, 100);
    const sanitizedEmail = formData.email.trim().toLowerCase().slice(0, 254);
    const sanitizedMessage = formData.message.trim().slice(0, 5000);

    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (!sanitizedName || !sanitizedMessage) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: sanitizedName,
          from_email: sanitizedEmail,
          message: sanitizedMessage,
          to_email: recipientEmail,
        },
        publicKey
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("EmailJS Error:", error);
      }
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, toast]);

  return (
    <section
      id="contact"
      className="pt-6 pb-6 sm:pt-8 sm:pb-8 relative overflow-hidden"
      ref={ref}
      style={{ background: BACKGROUND_GRADIENT }}
    >
      <div className="section-container relative z-10">
        {/* Background Image Container - Covers entire container */}
        <div className="relative">
          <div className="absolute left-2 right-2 top-0 bottom-0 sm:inset-4 md:inset-8 z-0">
            <div className="relative w-full h-full">
              <img
                src={BACKGROUND_IMAGE}
                alt="Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>

          {/* Two-Column Container with Background */}
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-4 lg:gap-6 min-h-0 sm:min-h-[500px] lg:min-h-[550px]">
            {/* Left Column - Title and Subtitle */}
            <motion.div
              {...ANIMATION_CONFIG}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="flex flex-col justify-center items-center lg:items-start px-2 sm:px-4 lg:px-8 lg:pl-28 py-1 sm:py-6 lg:py-8"
            >
              <h2 className="font-heading text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 sm:mt-4 md:mt-0 mb-1 sm:mb-3 text-center lg:text-left">
                Let's Work Together
              </h2>
              <p className="text-white/80 text-[10px] sm:text-xs md:text-sm max-w-xs sm:max-w-sm md:max-w-md text-center lg:text-left">
                Have a project in mind or just want to say hello? I'd love to hear
                from you!
              </p>
            </motion.div>

            {/* Right Column - Form Container */}
            <motion.div
              {...CARD_ANIMATION_CONFIG}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...CARD_ANIMATION_CONFIG.transition, delay: 0.1 }}
              className="flex items-center justify-center lg:justify-end px-2 sm:px-4 lg:px-8 lg:pr-8 py-4 sm:py-6 lg:py-8"
            >
              <div
                className="w-11/12 sm:w-4/5 lg:w-[66%] backdrop-blur-md bg-card/40 border border-white/10 shadow-2xl p-2 sm:p-2 md:p-6"
                style={{ boxShadow: BOX_SHADOW }}
              >
                {/* Send a Message Form */}
                <motion.div
                  {...CARD_ANIMATION_CONFIG}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ ...CARD_ANIMATION_CONFIG.transition, delay: 0.2 }}
                >
                  <h3 className="text-center text-white/90 font-heading text-[10px] sm:text-xs md:text-sm tracking-[0.15em] uppercase mb-2 sm:mb-6">
                    Send a Message
                  </h3>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-8">
              <div>
                <label className="block text-[10px] sm:text-[11px] md:text-xs font-mono text-white/70 mb-2 text-center">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  required
                  className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white/60 font-mono text-[10px] sm:text-[11px] md:text-xs text-white/90 placeholder:text-white/40 pb-2 focus:outline-none transition-colors text-center"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] md:text-xs font-mono text-white/70 mb-2 text-center">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                  className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white/60 font-mono text-[10px] sm:text-[11px] md:text-xs text-white/90 placeholder:text-white/40 pb-2 focus:outline-none transition-colors text-center"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] md:text-xs font-mono text-white/70 mb-2 text-center">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={handleInputChange('message')}
                  required
                  className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white/60 font-mono text-[10px] sm:text-[11px] md:text-xs text-white/90 placeholder:text-white/40 pb-2 focus:outline-none transition-colors resize-none text-center"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full bg-transparent border border-white/30 hover:border-white/60 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed text-[10px] sm:text-[11px] md:text-xs text-white/90 font-mono py-2 sm:py-3 flex items-center justify-center gap-2 transition-all mt-2 sm:mt-8"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={14} />
              </motion.button>
            </form>
                </motion.div>

                {/* Connect with me Section */}
                <motion.div
                  {...CARD_ANIMATION_CONFIG}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ ...CARD_ANIMATION_CONFIG.transition, delay: 0.3 }}
                  className="mt-2 sm:mt-5 pt-2 sm:pt-5 border-t border-white/20"
                >
                  <h3 className="text-center text-white text-[10px] sm:text-xs font-thin mb-2 sm:mb-4">
                    Connect with me
                  </h3>
                  <div className="flex justify-center gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:border-white/40 hover:bg-white/20 text-white ${social.color}`}
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
