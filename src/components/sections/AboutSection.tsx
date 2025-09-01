import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { skills } from '@/data/skills';
import { aboutContent } from '@/data/about';
import ShinyText from '@/components/ui/ShinyText';

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16">
      <div className="container max-w-6xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">
          <ShinyText text="关于我" />
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 hover:shadow-md transition-all border-zinc-700 duration-300 bg-card/50 backdrop-blur-xl rounded-3xl">
            <h3 className="text-xl font-semibold mb-4 text-zinc-300">专业背景</h3>
            <p className="text-muted-foreground">
              {aboutContent.introduction}
            </p>
          </Card>
          <Card className="p-6 hover:shadow-md transition-all duration-300 border-zinc-700 bg-card/50 backdrop-blur-xl rounded-3xl">
            <h3 className="text-xl font-semibold mb-4 text-zinc-300">技术专长</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
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
      </div>
    </section>
  );
} 