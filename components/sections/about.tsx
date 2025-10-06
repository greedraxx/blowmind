"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Smartphone, TrendingUp, Share2, Megaphone, Search } from "lucide-react";

const services = [
  {
    title: "Software Development",
    description:
      "Custom enterprise-level solutions tailored to your business needs. Building scalable, secure, and efficient software systems.",
    icon: Code2,
  },
  {
    title: "App/Web Development",
    description:
      "Modern, responsive, and user-centric applications. From concept to deployment with cutting-edge technologies.",
    icon: Smartphone,
  },
  {
    title: "Digital Marketing Solutions",
    description:
      "Data-driven strategies that deliver results. Analytics, implementation, and continuous optimization for maximum ROI.",
    icon: TrendingUp,
  },
  {
    title: "Social Media Advertising",
    description:
      "Platform expertise across all major channels. Strategic campaign management that drives engagement and conversions.",
    icon: Share2,
  },
  {
    title: "Advertising Agency Services",
    description:
      "Full-service creative campaign execution. From concept development to final delivery with compelling storytelling.",
    icon: Megaphone,
  },
  {
    title: "SEO",
    description:
      "Technical and content optimization for maximum search visibility. Sustainable strategies that improve rankings and traffic.",
    icon: Search,
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto mb-32"
        >
          <div className="flex items-start gap-16">
            <div className="flex-1">
              <h2 className="text-7xl md:text-8xl font-extralight tracking-tighter mb-12 leading-none">
                WHO<br/>WE<br/>ARE
              </h2>
            </div>
            <div className="flex-1 space-y-6">
              <p className="text-xl font-light leading-relaxed">
                BLOWMIND is where <span className="font-normal">innovation meets execution</span>.
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                We're a team of passionate developers, designers, and marketers who believe in
                creating experiences that truly blow minds. Our approach combines cutting-edge
                technology with creative thinking to deliver solutions that don't just meet
                expectations—they redefine them.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        <div id="services">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h3 className="text-6xl md:text-7xl font-extralight tracking-tighter mb-4">
              SERVICES
            </h3>
            <div className="h-px w-32 bg-foreground"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group bg-background hover:bg-foreground transition-all duration-500 p-12 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/5 group-hover:bg-background/5 rounded-full blur-3xl transition-all duration-500 transform translate-x-16 -translate-y-16"></div>
                  
                  <IconComponent className="w-12 h-12 mb-8 group-hover:text-background transition-colors duration-500" strokeWidth={1} />
                  
                  <h4 className="text-xl font-light mb-4 tracking-wide uppercase group-hover:text-background transition-colors duration-500">
                    {service.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground group-hover:text-background/70 font-light leading-relaxed transition-colors duration-500">
                    {service.description}
                  </p>
                  
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-background group-hover:w-full transition-all duration-500"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

