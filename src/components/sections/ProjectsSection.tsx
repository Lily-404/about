import { ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function ProjectsSection() {
  return (
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
  );
} 