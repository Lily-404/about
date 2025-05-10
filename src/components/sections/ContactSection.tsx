import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { socialLinks } from '@/data/social';
import { Button } from '@/components/ui/button';
import { contactContent } from '@/data/contact';

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-16 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">{contactContent.title}</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          {contactContent.description}
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">{contactContent.cards.cooperation.title}</h3>
              <p className="text-muted-foreground">
                {contactContent.cards.cooperation.description}
              </p>
              <Separator />
              <div className="space-y-4">
                {socialLinks.filter(link => link.label === 'Email' || link.label === 'Website').map((link) => {
                  const Icon = link.icon;
                  return (
                    <div key={link.label} className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <a href={link.href} className="hover:underline" target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">{contactContent.cards.social.title}</h3>
              <p className="text-muted-foreground">
                {contactContent.cards.social.description}
              </p>
              <Separator />
              <div className="flex flex-wrap gap-4">
                {socialLinks.filter(link => link.label !== 'Email' && link.label !== 'Website').map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-primary-foreground"
                        aria-label={link.label}
                      >
                        <Icon className="h-5 w-5" />
                      </Button>
                    </a>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
} 