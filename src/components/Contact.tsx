import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: t('contact.success.title'),
      description: t('contact.success.description'),
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: t('contact.info.phone'),
      content: "(11) 93407-9208",
      link: "tel:+551193407-9208"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: t('contact.info.email'),
      content: "contato@fwdigital.com.br",
      link: "mailto:contato@fwdigital.com.br"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: t('contact.info.location'),
      content: "São Paulo, SP",
      link: "#"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: t('contact.info.hours'),
      content: t('contact.info.hours.value'),
      link: "#"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('contact.title.vamos')} <span className="bg-gradient-primary bg-clip-text text-transparent">{t('contact.title.conversar')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle.ready')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="animate-scale-up">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Send className="h-6 w-6 text-primary" />
                  {t('contact.form.request.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.form.name')} *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t('contact.form.name.placeholder')}
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contact.form.email')} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t('contact.form.email.placeholder')}
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder={t('contact.form.phone.placeholder')}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">{t('contact.form.service')}</Label>
                      <Select name="service">
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder={t('contact.form.service.placeholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="app">{t('contact.form.service.app')}</SelectItem>
                          <SelectItem value="system">{t('contact.form.service.system')}</SelectItem>
                          <SelectItem value="website">{t('contact.form.service.website')}</SelectItem>
                          <SelectItem value="landing">{t('contact.form.service.landing')}</SelectItem>
                          <SelectItem value="custom">{t('contact.form.service.custom')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">{t('contact.form.budget.title')}</Label>
                    <Select name="budget">
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder={t('contact.form.budget.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000-5000">{t('contact.form.budget.1000-5000')}</SelectItem>
                        <SelectItem value="5000-15000">{t('contact.form.budget.5000-15000')}</SelectItem>
                        <SelectItem value="15000-30000">{t('contact.form.budget.15000-30000')}</SelectItem>
                        <SelectItem value="30000+">{t('contact.form.budget.30000+')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.form.message.title')} *</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      placeholder={t('contact.form.message.placeholder')}
                      rows={4}
                      required 
                      className="bg-background"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('contact.form.submit.sending') : t('contact.form.submit.text')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-scale-up" style={{ animationDelay: '0.2s' }}>
            <div>
              <h3 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index}
                    href={info.link}
                    className="flex items-start gap-4 p-4 bg-gradient-card rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="p-3 bg-gradient-primary rounded-full text-primary-foreground">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{info.title}</h4>
                      <p className="text-muted-foreground">{info.content}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-4">{t('contact.why.title')}</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    <span>{t('contact.why.reason1')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    <span>{t('contact.why.reason2')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    <span>{t('contact.why.reason3')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    <span>{t('contact.why.reason4')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;