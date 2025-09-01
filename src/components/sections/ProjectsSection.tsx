import { ExternalLink } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { logEvent, EventCategories, EventActions } from '@/lib/analytics';
import { OptimizedImage } from '@/components/ui/optimized-image';
import ShinyText from '@/components/ui/ShinyText';

export function ProjectsSection() {
  const handleProjectClick = (projectName: string, projectLink: string) => {
    logEvent(
      EventCategories.PROJECTS,
      EventActions.CLICK,
      projectName
    );
    window.location.href = projectLink;
  };

  return (
    <section id="projects" className="scroll-mt-16">
      <div className="container max-w-6xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">
          <ShinyText text="个人作品" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Button
              key={project.title}
              variant="ghost"
              className="block p-0 h-auto hover:bg-transparent w-full"
              onClick={() => handleProjectClick(project.title, project.link)}
            >
              <SpotlightCard variant="frosted" className="group h-full w-full border-zinc-700">
                <div className="aspect-video relative overflow-hidden rounded-md mb-4 bg-gradient-to-br from-background/50 to-background/80 shadow-lg ring-1 ring-border/20 hover:ring-primary/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={450}
                    className="object-cover w-full h-full transition-transform duration-300 rounded-none"
                    priority={projects.indexOf(project) < 3}
                  />
                </div>
                <div className="px-4 text-left">
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-zinc-200 group-hover:text-primary transition-colors">
                    {project.title}
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm md:text-base text-left">{project.description}</p>
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
              </SpotlightCard>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
} 