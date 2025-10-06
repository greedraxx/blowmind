"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Software Development",
    description:
      "A comprehensive e-commerce solution with real-time inventory management, payment processing, and customer analytics.",
    services: ["App Development", "Backend Systems", "UI/UX Design"],
    color: "bg-blue-100",
  },
  {
    title: "Social Media Campaign",
    category: "Digital Marketing",
    description:
      "Multi-platform advertising campaign that increased brand engagement by 300% and drove significant conversions.",
    services: ["Social Media Advertising", "Content Strategy", "Analytics"],
    color: "bg-purple-100",
  },
  {
    title: "Corporate Website Redesign",
    category: "Web Development",
    description:
      "Modern, responsive website with improved SEO performance and user experience, achieving 95+ Lighthouse scores.",
    services: ["Web Development", "SEO", "Performance Optimization"],
    color: "bg-green-100",
  },
  {
    title: "Mobile Fitness App",
    category: "App Development",
    description:
      "Cross-platform fitness tracking application with AI-powered workout recommendations and social features.",
    services: ["App Development", "AI Integration", "Cloud Infrastructure"],
    color: "bg-orange-100",
  },
  {
    title: "Brand Launch Campaign",
    category: "Advertising",
    description:
      "Full-service brand launch including creative concepts, digital advertising, and influencer partnerships.",
    services: ["Advertising Agency", "Digital Marketing", "Brand Strategy"],
    color: "bg-pink-100",
  },
  {
    title: "SaaS Platform",
    category: "Software Development",
    description:
      "Enterprise SaaS solution with subscription management, analytics dashboard, and API integrations.",
    services: ["Software Development", "Cloud Architecture", "Security"],
    color: "bg-yellow-100",
  },
];

const categories = [
  "All",
  "Software Development",
  "Web Development",
  "App Development",
  "Digital Marketing",
  "Advertising",
];

export default function WorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section id="works" className="py-32 bg-foreground/[0.02]" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-extralight tracking-tighter mb-4">
            SELECTED WORKS
          </h2>
          <div className="h-px w-32 bg-foreground mb-8"></div>
          <p className="text-xl font-light max-w-2xl">
            A showcase of projects that demonstrate our commitment to excellence
            and innovation.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 text-xs font-light tracking-widest uppercase transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-foreground text-background"
                  : "bg-transparent hover:bg-foreground/5 text-foreground border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              layout
              className="group"
            >
              <div className="relative overflow-hidden mb-8 aspect-[4/3] bg-foreground/5">
                <div className={`absolute inset-0 ${project.color} opacity-20`} />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-foreground/10 group-hover:to-foreground/20 transition-all duration-700" />
                
                {/* Overlay number */}
                <div className="absolute top-8 right-8 text-8xl font-extralight opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-light text-muted-foreground uppercase tracking-[0.2em]">
                    {project.category}
                  </span>
                  <div className="h-px flex-1 mx-4 bg-border"></div>
                  <span className="text-xs font-extralight text-muted-foreground">
                    {new Date().getFullYear()}
                  </span>
                </div>

                <h3 className="text-3xl font-extralight tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                  {project.title}
                </h3>

                <p className="text-base text-muted-foreground font-light leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="text-xs px-4 py-2 border border-border font-light tracking-wider hover:bg-foreground hover:text-background transition-colors duration-300"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

