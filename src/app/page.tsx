"use client";

import { useEffect, useState } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import Loading from "@/components/ui/Loading";
import ServicesPreview from "@/components/landing/ServicesPreview";
import GallerySection from "@/components/landing/GallerySection";
import ContactSection from "@/components/landing/ContactSection";
import LandingFooter from "@/components/landing/LandingFooter";
import AboutSection from "@/components/landing/AboutSection";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LandingHeader />
      <main className="relative">
    {isLoading && <Loading variant="fullscreen" message="Cargando inicio..." />}
    <HeroSection />
    <ServicesPreview />
    <AboutSection />
    <GallerySection />
    <ContactSection />
    <LandingFooter />
      </main>
    </>
  );
}