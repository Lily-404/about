import { useEffect, useState, useRef } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import BlogSection from '@/components/sections/BlogSection';
import { ThemeProvider } from '@/providers/theme-provider';
import LightRays from '@/components/ui/LightRays';
import '@/components/ui/AnimatedBackground.css';


import { navItems } from '@/data/navigation';
import ReactGA from 'react-ga4';

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (gaId) {
      ReactGA.initialize(gaId);
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }

    const sections = ['home', 'about', 'projects', 'blog', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            ReactGA.send({
              hitType: "pageview",
              page: `/${entry.target.id}`,
              title: entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1)
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleSetActiveSection = (id: string) => {
    setActiveSection(id);
    setIsScrolling(true);
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // 1秒后解除锁定，可以根据滚动动画时间调整
  };

  return (
    <div className="min-h-screen text-foreground transition-colors duration-300 relative">
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={0.5}
          lightSpread={0.7}
          rayLength={1.7}
          fadeDistance={1.5}
          followMouse={true}
          mouseInfluence={0.2}
          noiseAmount={0.1}
          distortion={0}
          className="custom-rays"
        />
      </div>
    

      <Navbar
        activeSection={activeSection}
        navItems={navItems}
        setActiveSection={handleSetActiveSection}
      />

      <main ref={mainRef} className="pt-8 md:pt-24 pb-8 md:pb-4 space-y-16 md:space-y-24 relative z-10">
        <div className="relative min-h-[80vh] w-full">
          <HeroSection />
        </div>
        <AboutSection />
        <ProjectsSection />
        <div id="blog">
          <BlogSection />
        </div>
        <ContactSection />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
