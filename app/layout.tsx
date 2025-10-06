import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BLOW MIND | Software Development & Digital Marketing Solutions",
  description: "Building the Future, Marketing the Now. Expert software development, app/web development, digital marketing, SEO, and advertising agency services.",
  keywords: ["software development", "web development", "app development", "digital marketing", "SEO", "advertising agency", "social media advertising"],
  authors: [{ name: "BLOW MIND" }],
  openGraph: {
    title: "BLOW MIND | Software Development & Digital Marketing Solutions",
    description: "Building the Future, Marketing the Now. Expert software development, app/web development, digital marketing, SEO, and advertising agency services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BLOW MIND",
    description:
      "Software development, app/web development, digital marketing, SEO, and advertising agency services.",
    url: "https://blowmind.com",
    logo: "https://blowmind.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@blowmind.com",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://www.linkedin.com/company/blowmind",
      "https://twitter.com/blowmind",
      "https://www.instagram.com/blowmind",
    ],
    offers: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Software Development",
          description:
            "Custom enterprise-level software solutions and development services.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Marketing Solutions",
          description:
            "Data-driven digital marketing strategies and implementation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Services",
          description:
            "Technical and content optimization for search engine visibility.",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
