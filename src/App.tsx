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
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 初始化 Google Analytics
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (gaId) {
      ReactGA.initialize(gaId);
      // 发送页面浏览事件
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }

    // 使用 IntersectionObserver 来检测当前活动部分
    const sections = ['home', 'about', 'projects', 'blog', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // 记录页面浏览事件
            ReactGA.send({
              hitType: "pageview",
              page: `/${entry.target.id}`,
              title: entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1)
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
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

  return (
    <div className="min-h-screen bg-background/50 text-foreground transition-colors duration-300 relative">
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      <div className="animated-background"></div>
      

      


      <Navbar
        activeSection={activeSection}
        navItems={navItems}
        setActiveSection={setActiveSection}
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
