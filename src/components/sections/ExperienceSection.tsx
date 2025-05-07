import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ExperienceSection() {
  return (
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
  );
} 