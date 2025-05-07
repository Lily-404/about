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
  );
} 