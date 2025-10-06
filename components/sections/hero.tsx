"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl font-light tracking-tighter mb-8 leading-none"
          >
            WE CREATE
            <span className="block mt-4 font-extralight">FEELINGS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 font-light tracking-wide"
          >
            BUILDING THE FUTURE, MARKETING THE NOW
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-0 justify-center items-center"
          >
            <Button
              onClick={() => scrollToSection("works")}
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background text-sm px-12 py-6 rounded-none font-light tracking-widest uppercase"
            >
              View Work
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              variant="outline"
              className="text-sm px-12 py-6 rounded-none border-2 font-light tracking-widest uppercase"
            >
              Contact
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20 text-xs text-muted-foreground font-light tracking-widest uppercase"
          >
            <p>SOFTWARE • MARKETING • DESIGN</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-foreground/30 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

