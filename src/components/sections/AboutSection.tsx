import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16">
      <h2 className="text-3xl font-bold mb-8">关于我</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-4">专业背景</h3>
          <p className="text-muted-foreground">
          我是一名拥有多年软件开发经验的全栈开发者，主攻 Java 后端技术，熟练掌握 Spring、MySQL 和 Redis，能够构建高性能、可扩展的后端服务。与此同时，我也活跃在前端领域，擅长使用 Vue、Vite 等现代框架开发高交互性的 Web 应用，并具备良好的异步编程实践经验。
我目前正致力于一个创新型平台的开发：它基于 Go 实现后端逻辑，能够根据用户数据自动生成 Next.js 项目，支持多种模板风格，并实现打包下载。平台还集成 Firebase 进行数据管理，并支持 OAuth 登录功能。

          </p>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-4">技术专长</h3>
          <div className="space-y-4">
            {[
              { name: '后端开发（Java / Spring）', level: 95 },
              { name: '前端开发（React / Vite / Next.js）', level: 85 },
              { name: '产品设计与体验优化', level: 90 },
              { name: '系统架构与自动化（Go / Supabase）', level: 80 },
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
  );
} 