"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold tracking-tight">
              BLOWMIND
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium hover:opacity-60 transition-opacity"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium hover:opacity-60 transition-opacity"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("works")}
              className="text-sm font-medium hover:opacity-60 transition-opacity"
            >
              Works
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium hover:opacity-60 transition-opacity"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:flex bg-foreground hover:bg-foreground/80 text-background"
            >
              Start a Project
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 text-sm font-medium hover:opacity-60 transition-opacity"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left py-2 text-sm font-medium hover:opacity-60 transition-opacity"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("works")}
              className="block w-full text-left py-2 text-sm font-medium hover:opacity-60 transition-opacity"
            >
              Works
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 text-sm font-medium hover:opacity-60 transition-opacity"
            >
              Contact
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-foreground hover:bg-foreground/80 text-background"
            >
              Start a Project
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

