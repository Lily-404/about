import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ContactSection() {
  return (
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
  );
} 