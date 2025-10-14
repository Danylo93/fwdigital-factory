import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import jsPDF from 'jspdf';
import { useLanguage } from "@/contexts/LanguageContext";

const CatalogGenerator = () => {
  const { t } = useLanguage();
  const catalogData = [
    {
      category: t('catalog.category.websites'),
      icon: "🌐",
      plans: [
        {
          name: t('catalog.websites.landing.name'),
          features: t('catalog.websites.landing.features').split(', ')
        },
        {
          name: t('catalog.websites.institutional.name'),
          features: t('catalog.websites.institutional.features').split(', ')
        },
        {
          name: t('catalog.websites.ecommerce.name'),
          features: t('catalog.websites.ecommerce.features').split(', ')
        }
      ]
    },
    {
      category: t('catalog.category.apps'),
      icon: "📱",
      plans: [
        {
          name: t('catalog.apps.simple.name'),
          features: t('catalog.apps.simple.features').split(', ')
        },
        {
          name: t('catalog.apps.backend.name'),
          features: t('catalog.apps.backend.features').split(', ')
        },
        {
          name: t('catalog.apps.custom.name'),
          features: t('catalog.apps.custom.features').split(', ')
        }
      ]
    },
    {
      category: t('catalog.category.bots'),
      icon: "🤖",
      plans: [
        {
          name: t('catalog.bots.basic.name'),
          features: t('catalog.bots.basic.features').split(', ')
        },
        {
          name: t('catalog.bots.advanced.name'),
          features: t('catalog.bots.advanced.features').split(', ')
        },
        {
          name: t('catalog.bots.custom.name'),
          features: t('catalog.bots.custom.features').split(', ')
        }
      ]
    },
    {
      category: t('solutions.combos.category'),
      icon: "🎁",
      plans: [
        {
          name: t('solutions.combos.presence.name'),
          features: t('solutions.combos.presence.features').split(', ')
        },
        {
          name: t('solutions.combos.automation.name'),
          features: t('solutions.combos.automation.features').split(', ')
        },
        {
          name: t('solutions.combos.enterprise.name'),
          features: t('solutions.combos.enterprise.features').split(', ')
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

        // Features with bullet points
        pdf.setTextColor(60, 60, 60);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');

        let featureY = yPosition + 20;
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
          {t('catalog.title')}
        </CardTitle>
        <CardDescription>
          {t('catalog.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>• {t('catalog.category.websites')}</p>
          <p>• {t('catalog.category.apps')}</p>
          <p>• {t('catalog.category.bots')}</p>
          <p>• {t('solutions.combos.category')}</p>
        </div>
        <Button 
          onClick={generatePDF}
          className="w-full"
          size="lg"
        >
          <Download className="h-4 w-4 mr-2" />
          {t('catalog.button')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CatalogGenerator;
