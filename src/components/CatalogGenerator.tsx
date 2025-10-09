import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import jsPDF from 'jspdf';

const CatalogGenerator = () => {
  const catalogData = [
    {
      category: "Sites Profissionais",
      icon: "🌐",
      plans: [
        {
          name: "Landing Page",
          price: "R$ 490 - R$ 790",
          features: ["Página única", "CTA WhatsApp", "SEO básico", "Responsivo"]
        },
        {
          name: "Site Institucional",
          price: "R$ 890 - R$ 1.490",
          features: ["3-5 páginas", "Formulário de contato", "Google Maps", "Blog"]
        },
        {
          name: "Loja Virtual",
          price: "R$ 1.990 - R$ 3.490",
          features: ["Carrinho de compras", "Pagamento integrado", "Gestão de produtos", "Relatórios"]
        }
      ]
    },
    {
      category: "Aplicativos Mobile",
      icon: "📱",
      plans: [
        {
          name: "App Simples",
          price: "R$ 1.990 - R$ 3.500",
          features: ["Catálogo digital", "Delivery local", "Push notifications", "iOS + Android"]
        },
        {
          name: "App com Backend",
          price: "R$ 4.000 - R$ 8.000",
          features: ["Sistema de login", "Chat integrado", "Notificações", "APIs personalizadas"]
        },
        {
          name: "App Sob Medida",
          price: "R$ 10.000+",
          features: ["Marketplace completo", "Gestão avançada", "Integrações complexas", "Suporte dedicado"]
        }
      ]
    },
    {
      category: "Robôs WhatsApp com IA",
      icon: "🤖",
      plans: [
        {
          name: "Bot Básico",
          price: "R$ 490 setup + R$ 99/mês",
          features: ["Respostas automáticas", "Menu simples", "Horário de atendimento", "Relatórios básicos"]
        },
        {
          name: "Bot com IA",
          price: "R$ 890 setup + R$ 199/mês",
          features: ["Atendimento inteligente", "OpenAI integrado", "Aprendizado contínuo", "Analytics avançado"]
        },
        {
          name: "Bot Avançado",
          price: "R$ 1.490 setup + R$ 299/mês",
          features: ["Integração CRM", "APIs personalizadas", "Multi-atendente", "Dashboard completo"]
        }
      ]
    },
    {
      category: "Combos Agência FW Digital",
      icon: "🎁",
      plans: [
        {
          name: "Presença Digital",
          price: "R$ 890 setup + R$ 99/mês",
          features: ["Site profissional", "Bot WhatsApp", "Google Meu Negócio", "Suporte mensal"]
        },
        {
          name: "Automação Comercial",
          price: "R$ 1.490 setup + R$ 199/mês",
          features: ["Site + Bot IA", "CRM integrado", "Email marketing", "Gestão de leads"]
        },
        {
          name: "Premium Empresarial",
          price: "R$ 3.990+ setup + R$ 299/mês",
          features: ["App + Site + IA", "Automação completa", "Gestão de leads", "Suporte prioritário"]
        }
      ]
    }
  ];

  const generatePDF = () => {
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
    pdf.text('Catálogo de Serviços 2025', 20, 42);

    // Add a decorative line
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.5);
    pdf.line(20, 45, pageWidth - 20, 45);

    yPosition = 70;

    // Content
    catalogData.forEach((category, categoryIndex) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 100) {
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
        if (yPosition > pageHeight - 70) {
          pdf.addPage();
          yPosition = 30;
        }

        // Plan card with shadow effect
        pdf.setFillColor(255, 255, 255);
        pdf.rect(25, yPosition - 5, pageWidth - 50, 50, 'F');

        // Plan card border
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.3);
        pdf.rect(25, yPosition - 5, pageWidth - 50, 50);

        // Plan name with background
        pdf.setFillColor(138, 43, 226);
        pdf.rect(25, yPosition - 5, pageWidth - 50, 15, 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(plan.name, 30, yPosition + 5);

        // Plan price
        pdf.setTextColor(138, 43, 226);
        pdf.setFontSize(13);
        pdf.setFont('helvetica', 'bold');
        pdf.text(plan.price, 30, yPosition + 20);

        // Features with bullet points
        pdf.setTextColor(60, 60, 60);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');

        let featureY = yPosition + 30;
        plan.features.forEach((feature, index) => {
          if (index < 2) { // Show only first 2 features to fit in space
            pdf.text(`• ${feature}`, 30, featureY);
            featureY += 5;
          }
        });

        if (plan.features.length > 2) {
          pdf.setTextColor(100, 100, 100);
          pdf.text(`+ ${plan.features.length - 2} recursos adicionais`, 30, featureY);
        }

        yPosition += 60;
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
    const fileName = `Catalogo-FW-Digital-${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`;
    pdf.save(fileName);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Catálogo PDF
        </CardTitle>
        <CardDescription>
          Gere um catálogo completo com todos os serviços e preços
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>• Sites Profissionais</p>
          <p>• Aplicativos Mobile</p>
          <p>• Robôs WhatsApp com IA</p>
          <p>• Combos FW Digital</p>
        </div>
        <Button 
          onClick={generatePDF}
          className="w-full"
          size="lg"
        >
          <Download className="h-4 w-4 mr-2" />
          Baixar Catálogo PDF
        </Button>
      </CardContent>
    </Card>
  );
};

export default CatalogGenerator;
