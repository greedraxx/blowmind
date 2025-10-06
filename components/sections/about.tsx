"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Software Development",
    description:
      "Custom enterprise-level solutions tailored to your business needs. Building scalable, secure, and efficient software systems.",
    icon: "💻",
  },
  {
    title: "App/Web Development",
    description:
      "Modern, responsive, and user-centric applications. From concept to deployment with cutting-edge technologies.",
    icon: "📱",
  },
  {
    title: "Digital Marketing Solutions",
    description:
      "Data-driven strategies that deliver results. Analytics, implementation, and continuous optimization for maximum ROI.",
    icon: "📊",
  },
  {
    title: "Social Media Advertising",
    description:
      "Platform expertise across all major channels. Strategic campaign management that drives engagement and conversions.",
    icon: "📢",
  },
  {
    title: "Advertising Agency Services",
    description:
      "Full-service creative campaign execution. From concept development to final delivery with compelling storytelling.",
    icon: "🎨",
  },
  {
    title: "SEO",
    description:
      "Technical and content optimization for maximum search visibility. Sustainable strategies that improve rankings and traffic.",
    icon: "🔍",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-light tracking-tighter mb-8 uppercase">Who We Are</h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            BLOWMIND is where innovation meets execution. We're a team of
            passionate developers, designers, and marketers who believe in
            creating experiences that truly blow minds.
          </p>
        </motion.div>

        <div id="services" className="mt-32">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-light tracking-tighter text-center mb-16 uppercase"
          >
            Services
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border hover:border-foreground rounded-none bg-card">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-6 opacity-80">{service.icon}</div>
                    <h4 className="text-lg font-light mb-4 tracking-wider uppercase">{service.title}</h4>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

