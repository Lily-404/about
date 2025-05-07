import { useEffect, useState, useRef } from 'react';
import { Globe, Code2, Briefcase, Award, MessageSquare, ChevronDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(currentScrollPos > 100);

      if (mainRef.current) {
        const totalHeight = mainRef.current.scrollHeight - window.innerHeight;
        const progress = (currentScrollPos / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, progress)));
      }

      // 使用 IntersectionObserver 来检测当前活动部分
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navItems = [
    { id: 'home', label: '首页', icon: Globe },
    { id: 'about', label: '关于', icon: Code2 },
    { id: 'experience', label: '经验', icon: Briefcase },
    { id: 'projects', label: '项目', icon: Award },
    { id: 'contact', label: '联系', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Progress value={progress} className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent" />
      
      <Navbar theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} navItems={navItems} />

      <main ref={mainRef} className="container mx-auto px-4 pt-24 pb-16 space-y-32">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          'fixed bottom-8 right-8 p-2 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        <ChevronDown className="h-5 w-5 rotate-180" />
      </button>
    </div>
  );
}

export default App;