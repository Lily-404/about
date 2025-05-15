import { useEffect, useState, useRef } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import BlogSection from '@/components/sections/BlogSection';
import { ThemeProvider, useTheme } from '@/providers/theme-provider';
import Squares from '@/components/ui/Squares';
import { navItems } from '@/data/navigation';
import ReactGA from 'react-ga4';

function AppContent() {
  const { theme, setTheme } = useTheme();
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
      { threshold: 0.6 }
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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // 记录主题切换事件
    ReactGA.event({
      category: 'Theme',
      action: 'Toggle',
      label: theme === 'light' ? 'Dark' : 'Light'
    });
  };

  return (
    <div className="min-h-screen bg-background/50 text-foreground transition-colors duration-300 relative">
      <Squares 
        speed={0.3} 
        squareSize={40}
        direction='diagonal'
        borderColor={theme === 'dark' ? '#fff' : '#000'}
        hoverFillColor={theme === 'dark' ? '#222' : '#eee'}
      />
      
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        activeSection={activeSection} 
        navItems={navItems} 
        setActiveSection={setActiveSection}
      />

      <main ref={mainRef} className="container mx-auto px-4 pt-8 md:pt-24 pb-16 space-y-32 relative z-10">
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

      <Footer />
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