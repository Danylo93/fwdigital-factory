import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, DollarSign } from "lucide-react";
import jsPDF from 'jspdf';
import { useLanguage } from "@/contexts/LanguageContext";

// Valores em Real (R$)
const catalogDataBRL = [
  {
    category: 'Sites',
    icon: "🌐",
    plans: [
      {
        name: 'Landing Page',
        price: 'R$ 2.500',
        features: ['Página única', 'CTA WhatsApp', 'SEO básico', 'Responsivo']
      },
      {
        name: 'Site Institucional',
        price: 'R$ 4.500',
        features: ['3-5 páginas', 'Formulário de contato', 'Google Maps', 'Blog']
      },
      {
        name: 'Loja Virtual',
        price: 'R$ 7.500',
        features: ['Carrinho de compras', 'Pagamento integrado', 'Gestão de produtos', 'Relatórios']
      }
    ]
  },
  {
    category: 'Apps',
    icon: "📱",
    plans: [
      {
        name: 'App Simples',
        price: 'R$ 8.500',
        features: ['Catálogo digital', 'Delivery local', 'Push notifications', 'iOS + Android']
      },
      {
        name: 'App com Backend',
        price: 'R$ 12.000',
        features: ['Sistema de login', 'Chat integrado', 'Notificações', 'APIs personalizadas']
      },
      {
        name: 'App Sob Medida',
        price: 'R$ 18.000',
        features: ['Marketplace completo', 'Gestão avançada', 'Integrações complexas', 'Suporte dedicado']
      }
    ]
  },
  {
    category: 'Bots',
    icon: "🤖",
    plans: [
      {
        name: 'Bot Básico',
        price: 'R$ 800/mês',
        features: ['Respostas automáticas', 'Menu simples', 'Horário de atendimento', 'Relatórios básicos']
      },
      {
        name: 'Bot com IA',
        price: 'R$ 1.200/mês',
        features: ['IA OpenAI', 'Aprendizado contínuo', 'Múltiplos idiomas', 'Relatórios avançados']
      },
      {
        name: 'Bot Personalizado',
        price: 'R$ 2.000/mês',
        features: ['IA Avançada', 'CRM Integrado', 'Automação completa', 'Suporte prioritário']
      }
    ]
  },
  {
    category: 'Combos',
    icon: "🎁",
    plans: [
      {
        name: 'Combo Presença Digital',
        price: 'R$ 6.500',
        features: ['Site Institucional', 'Landing Page', 'Google My Business', 'Redes Sociais']
      },
      {
        name: 'Combo Automação',
        price: 'R$ 10.000',
        features: ['Site + Bot IA', 'CRM Integrado', 'Automação de vendas', 'Analytics']
      },
      {
        name: 'Combo Empresarial',
        price: 'R$ 25.000',
        features: ['Site Completo', 'App Mobile', 'Bot IA Avançado', 'Sistema de Gestão']
      }
    ]
  }
];

// Valores em Dólar ($)
const catalogDataUSD = [
  {
    category: 'Websites',
    icon: "🌐",
    plans: [
      {
        name: 'Landing Page',
        price: '$500',
        features: ['Single page', 'WhatsApp CTA', 'Basic SEO', 'Responsive']
      },
      {
        name: 'Institutional Website',
        price: '$900',
        features: ['3-5 pages', 'Contact form', 'Google Maps', 'Blog']
      },
      {
        name: 'E-commerce Store',
        price: '$1,500',
        features: ['Shopping cart', 'Integrated payment', 'Product management', 'Reports']
      }
    ]
  },
  {
    category: 'Apps',
    icon: "📱",
    plans: [
      {
        name: 'Simple App',
        price: '$1,700',
        features: ['Digital catalog', 'Local delivery', 'Push notifications', 'iOS + Android']
      },
      {
        name: 'App with Backend',
        price: '$2,400',
        features: ['Login system', 'Integrated chat', 'Notifications', 'Custom APIs']
      },
      {
        name: 'Custom App',
        price: '$3,600',
        features: ['Complete marketplace', 'Advanced management', 'Complex integrations', 'Dedicated support']
      }
    ]
  },
  {
    category: 'Bots',
    icon: "🤖",
    plans: [
      {
        name: 'Basic Bot',
        price: '$160/month',
        features: ['Automatic responses', 'Simple menu', 'Business hours', 'Basic reports']
      },
      {
        name: 'AI Bot',
        price: '$240/month',
        features: ['OpenAI AI', 'Continuous learning', 'Multiple languages', 'Advanced reports']
      },
      {
        name: 'Custom Bot',
        price: '$400/month',
        features: ['Advanced AI', 'Integrated CRM', 'Complete automation', 'Priority support']
      }
    ]
  },
  {
    category: 'Combos',
    icon: "🎁",
    plans: [
      {
        name: 'Digital Presence Combo',
        price: '$1,300',
        features: ['Institutional Website', 'Landing Page', 'Google My Business', 'Social Media']
      },
      {
        name: 'Automation Combo',
        price: '$2,000',
        features: ['Website + AI Bot', 'Integrated CRM', 'Sales automation', 'Analytics']
      },
      {
        name: 'Enterprise Combo',
        price: '$5,000',
        features: ['Complete Website', 'Mobile App', 'Advanced AI Bot', 'Management System']
      }
    ]
  }
];

const CatalogGenerator = () => {
  const { t } = useLanguage();

  const generatePDF = (catalogData: typeof catalogDataBRL, currency: 'BRL' | 'USD') => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Header with gradient effect
    pdf.setFillColor(138, 43, 226); // Primary purple
    pdf.rect(0, 0, pageWidth, 50, 'F');

    // Add a subtle gradient effect with a lighter purple
    pdf.setFillColor(168, 85, 247); // Lighter purple
    pdf.rect(0, 35, pageWidth, 15, 'F');

    // Company name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AGÊNCIA FW DIGITAL', 20, 30);

    // Subtitle
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    const subtitle = currency === 'BRL' ? 'Catálogo de Serviços 2025 - Valores em Real (R$)' : 'Services Catalog 2025 - Prices in US Dollars ($)';
    pdf.text(subtitle, 20, 42);

    // Add a decorative line
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.5);
    pdf.line(20, 45, pageWidth - 20, 45);

    yPosition = 70;

    // Content
    catalogData.forEach((category, categoryIndex) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 110) {
        pdf.addPage();
        yPosition = 30;
      }

      // Category header with background
      pdf.setFillColor(248, 250, 252);
      pdf.rect(15, yPosition - 8, pageWidth - 30, 25, 'F');

      // Category border
      pdf.setDrawColor(138, 43, 226);
      pdf.setLineWidth(0.8);
      pdf.rect(15, yPosition - 8, pageWidth - 30, 25);

      // Category title
      pdf.setTextColor(138, 43, 226);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${category.icon} ${category.category}`, 20, yPosition + 5);
      yPosition += 30;

      category.plans.forEach((plan, planIndex) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 80) {
          pdf.addPage();
          yPosition = 30;
        }

        // Plan card with shadow effect (increased height for price)
        pdf.setFillColor(255, 255, 255);
        pdf.rect(25, yPosition - 5, pageWidth - 50, 60, 'F');

        // Plan card border
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.3);
        pdf.rect(25, yPosition - 5, pageWidth - 50, 60);

        // Plan name with background
        pdf.setFillColor(138, 43, 226);
        pdf.rect(25, yPosition - 5, pageWidth - 50, 15, 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(plan.name, 30, yPosition + 5);

        // Price with highlighted background
        pdf.setFillColor(255, 248, 220);
        pdf.rect(25, yPosition + 10, pageWidth - 50, 8, 'F');
        
        pdf.setTextColor(138, 43, 226);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(plan.price, pageWidth - 80, yPosition + 16);

        // Features with bullet points
        pdf.setTextColor(60, 60, 60);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');

        let featureY = yPosition + 25;
        plan.features.forEach((feature, index) => {
          if (index < 3) { // Show first 3 features
            pdf.text(`• ${feature}`, 30, featureY);
            featureY += 5;
          }
        });

        if (plan.features.length > 3) {
          pdf.setTextColor(100, 100, 100);
          pdf.text(`+ ${plan.features.length - 3} recursos adicionais`, 30, featureY);
        }

        yPosition += 70;
      });

      yPosition += 15;
    });

    // Add footer to all pages
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);

      // Footer background
      pdf.setFillColor(248, 250, 252);
      pdf.rect(0, pageHeight - 25, pageWidth, 25, 'F');

      // Footer content
      pdf.setTextColor(100, 100, 100);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Agência FW Digital - Fábrica de Software', 20, pageHeight - 15);
      pdf.text('contato@agenciafwdigital.com.br | WhatsApp: (11) 93407-9208', 20, pageHeight - 8);

      // Page number
      pdf.text(`Página ${i} de ${totalPages}`, pageWidth - 40, pageHeight - 8);

      // Add current date
      const currentDate = new Date().toLocaleDateString('pt-BR');
      pdf.text(`Gerado em: ${currentDate}`, pageWidth - 60, pageHeight - 15);
    }

    // Save the PDF
    const currencyLabel = currency === 'BRL' ? 'Real' : 'Dolar';
    const fileName = `Catalogo-FW-Digital-${currencyLabel}-${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`;
    pdf.save(fileName);
  };

  const generatePDFBRL = () => {
    generatePDF(catalogDataBRL, 'BRL');
  };

  const generatePDFUSD = () => {
    generatePDF(catalogDataUSD, 'USD');
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Gerador de Catálogo PDF
        </CardTitle>
        <CardDescription>
          Gere catálogos com valores em Real (R$) ou Dólar ($)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>• Sites (Landing Page, Institucional, E-commerce)</p>
          <p>• Apps (Simples, com Backend, Sob Medida)</p>
          <p>• Bots (Básico, com IA, Personalizado)</p>
          <p>• Combos (Presença Digital, Automação, Empresarial)</p>
        </div>
        <div className="space-y-3">
          <Button 
            onClick={generatePDFBRL}
            className="w-full"
            size="lg"
            variant="default"
          >
            <Download className="h-4 w-4 mr-2" />
            Gerar PDF em Real (R$)
          </Button>
          <Button 
            onClick={generatePDFUSD}
            className="w-full"
            size="lg"
            variant="outline"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Gerar PDF em Dólar ($)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CatalogGenerator;
