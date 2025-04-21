import { useEffect, useState, useRef } from 'react';
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink, ChevronDown, Award, Briefcase, Code2, Globe, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

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

      // Calculate scroll progress
      if (mainRef.current) {
        const totalHeight = mainRef.current.scrollHeight - window.innerHeight;
        const progress = (currentScrollPos / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, progress)));
      }

      // Update active section
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // 修改判断条件，使其更准确地检测当前部分
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
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
      
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-40 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold">Jimmy</span>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  activeSection === id ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {label}
              </a>
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        {navItems.map(({ id, icon: Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            className={cn(
              'p-2 rounded-full transition-all hover:bg-primary hover:text-primary-foreground',
              activeSection === id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            )}
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>

      <main ref={mainRef} className="container mx-auto px-4 pt-24 pb-16 space-y-32">
        <section id="home" className="min-h-[80vh] flex flex-col justify-center relative">
          <div className="space-y-4 max-w-4xl">
            <span className="text-sm font-medium text-primary/60 animate-in fade-in slide-in-from-bottom-4 duration-700">
              你好，我是
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold animate-in fade-in slide-in-from-bottom-4 duration-700">
            Jimmy
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              全栈开发工程师 & UI/UX 设计师
            </p>
            <p className="max-w-2xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              专注于打造卓越的数字体验，运用现代网络技术构建可扩展且用户友好的应用程序。
              拥有丰富的全栈开发经验，致力于创造优秀的用户体验和高性能的技术解决方案。
            </p>
            <div className="flex gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
              <Button size="lg">联系我</Button>
              <Button variant="outline" size="lg">查看项目</Button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </section>

        <section id="about" className="scroll-mt-16">
          <h2 className="text-3xl font-bold mb-8">关于我</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">专业背景</h3>
              <p className="text-muted-foreground">
                拥有5年以上的网络开发经验，专注于使用React、TypeScript和Node.js构建现代Web应用。
                我热衷于创造直观的用户界面和编写清晰、可维护的代码。同时，我也是一名UI/UX设计师，
                善于将设计理念转化为实际的用户体验。
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">技术专长</h3>
              <div className="space-y-4">
                {[
                  { name: 'Frontend Development', level: 95 },
                  { name: 'Backend Development', level: 85 },
                  { name: 'UI/UX Design', level: 90 },
                  { name: 'DevOps', level: 80 },
                ].map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="experience" className="scroll-mt-16">
          <h2 className="text-3xl font-bold mb-8">工作经验</h2>
          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="experience">工作经历</TabsTrigger>
              <TabsTrigger value="education">教育背景</TabsTrigger>
            </TabsList>
            <TabsContent value="experience" className="mt-6 space-y-6">
              {[
                {
                  company: '科技创新公司',
                  position: '高级全栈开发工程师',
                  period: '2022 - 至今',
                  description: '负责企业级应用开发，带领团队实现创新技术，提升系统性能。',
                },
                {
                  company: '互联网公司',
                  position: '前端开发工程师',
                  period: '2020 - 2022',
                  description: '参与大型电商平台开发，优化用户体验，提升转化率。',
                },
              ].map((exp) => (
                <Card key={exp.company} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                      <p className="text-primary">{exp.company}</p>
                    </div>
                    <span className="text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-muted-foreground">{exp.description}</p>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="education" className="mt-6 space-y-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">计算机科学与技术</h3>
                    <p className="text-primary">顶尖大学</p>
                  </div>
                  <span className="text-muted-foreground">2016 - 2020</span>
                </div>
                <p className="text-muted-foreground">
                  主修计算机科学，专注于软件工程和人机交互设计。获得优秀毕业生称号。
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section id="projects" className="scroll-mt-16">
          <h2 className="text-3xl font-bold mb-8">精选项目</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '智能电商平台',
                description: '基于AI的个性化推荐系统，提升用户购物体验和转化率。',
                tech: ['React', 'Node.js', 'TensorFlow.js'],
                image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
              },
              {
                title: '协作任务管理',
                description: '实时协作的项目管理工具，支持团队协作和任务追踪。',
                tech: ['Next.js', 'TypeScript', 'WebSocket'],
                image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80',
              },
              {
                title: '数据可视化平台',
                description: '企业级数据分析和可视化平台，支持自定义报表。',
                tech: ['React', 'D3.js', 'GraphQL'],
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
              },
            ].map((project) => (
              <Card key={project.title} className="overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                    {project.title}
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-secondary px-2 py-1 rounded-md text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-16">
          <h2 className="text-3xl font-bold mb-8">联系方式</h2>
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">让我们开始合作</h3>
                <p className="text-muted-foreground max-w-lg">
                  我很乐意听取新项目和机会的建议。无论是全职机会、自由职业项目还是技术咨询，
                  都欢迎与我联系。
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="hover:scale-110 transition-transform">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="hover:scale-110 transition-transform">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between text-sm text-muted-foreground">
          <span>© 2025 Jimmy. </span>
          <Separator orientation="vertical" className="h-4" />
          <span>使用 React 和 Tailwind CSS 构建</span>
        </div>
      </footer>

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