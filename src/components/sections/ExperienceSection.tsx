import { Card } from '@/components/ui/card';

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-16">
      <h2 className="text-3xl font-bold mb-8">教育背景</h2>
      <div className="space-y-6">
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
      </div>
    </section>
  );
} 