"use client";

import { Card, CardContent } from "@/components/ui/card";
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
    <section id="works" className="py-32 bg-muted/10" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-light tracking-tighter mb-8 uppercase">Selected Works</h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            A showcase of projects that demonstrate our commitment to excellence
            and innovation.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-2 rounded-none text-xs font-light tracking-widest uppercase transition-all duration-300 border ${
                selectedCategory === category
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent hover:bg-foreground/5 text-foreground border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              layout
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden group rounded-none border-2">
                <div
                  className={`h-56 ${project.color} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-foreground/5 group-hover:to-foreground/10 transition-all duration-500" />
                </div>
                <CardContent className="p-8">
                  <div className="text-xs font-light text-muted-foreground mb-3 uppercase tracking-widest">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-light mb-4 tracking-wide">{project.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="text-xs bg-muted px-4 py-1 rounded-none font-light tracking-wider"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

