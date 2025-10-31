import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, DollarSign } from "lucide-react";
import jsPDF from "jspdf";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Versão melhorada do gerador de PDF com quebra de página segura,
 * wrap de texto e layout mais profissional.
 *
 * Ajustei também os preços para opções mais atrativas — veja `catalogDataBRL_SUGGESTED`
 * e `catalogDataUSD_SUGGESTED`. Use-os ou adapte conforme quiser.
 */

/* ---------- Sugestão de preços (mais competitivos/atrativos) ---------- */
const catalogDataBRL_SUGGESTED = [
  {
    category: "Sites",
    icon: "🌐",
    plans: [
      { name: "Landing Page", price: "R$ 1.990", features: ["Página única", "CTA WhatsApp", "SEO básico", "Responsivo"] },
      { name: "Site Institucional", price: "R$ 3.990", features: ["3-5 páginas", "Formulário de contato", "Google Maps", "Blog"] },
      { name: "Loja Virtual", price: "R$ 6.990", features: ["Carrinho de compras", "Pagamento integrado", "Gestão de produtos", "Relatórios"] }
    ]
  },
  {
    category: "Apps",
    icon: "📱",
    plans: [
      { name: "App Simples", price: "R$ 7.990", features: ["Catálogo digital", "Delivery local", "Push notifications", "iOS + Android"] },
      { name: "App com Backend", price: "R$ 10.990", features: ["Sistema de login", "Chat integrado", "Notificações", "APIs personalizadas"] },
      { name: "App Sob Medida", price: "R$ 16.900", features: ["Marketplace completo", "Gestão avançada", "Integrações complexas", "Suporte dedicado"] }
    ]
  },
  {
    category: "Bots",
    icon: "🤖",
    plans: [
      { name: "Bot Básico", price: "R$ 599/mês", features: ["Respostas automáticas", "Menu simples", "Horário de atendimento", "Relatórios básicos"] },
      { name: "Bot com IA", price: "R$ 999/mês", features: ["IA OpenAI", "Aprendizado contínuo", "Múltiplos idiomas", "Relatórios avançados"] },
      { name: "Bot Personalizado", price: "R$ 1.799/mês", features: ["IA Avançada", "CRM Integrado", "Automação completa", "Suporte prioritário"] }
    ]
  },
  {
    category: "Combos",
    icon: "🎁",
    plans: [
      { name: "Combo Presença Digital", price: "R$ 5.990", features: ["Site Institucional", "Landing Page", "Google My Business", "Redes Sociais"] },
      { name: "Combo Automação", price: "R$ 9.990", features: ["Site + Bot IA", "CRM Integrado", "Automação de vendas", "Analytics"] },
      { name: "Combo Empresarial", price: "R$ 22.500", features: ["Site Completo", "App Mobile", "Bot IA Avançado", "Sistema de Gestão"] }
    ]
  }
];

const catalogDataUSD_SUGGESTED = [
  {
    category: "Websites",
    icon: "🌐",
    plans: [
      { name: "Landing Page", price: "$450", features: ["Single page", "WhatsApp CTA", "Basic SEO", "Responsive"] },
      { name: "Institutional Website", price: "$750", features: ["3-5 pages", "Contact form", "Google Maps", "Blog"] },
      { name: "E-commerce Store", price: "$1,200", features: ["Shopping cart", "Integrated payment", "Product management", "Reports"] }
    ]
  },
  {
    category: "Apps",
    icon: "📱",
    plans: [
      { name: "Simple App", price: "$1,500", features: ["Digital catalog", "Local delivery", "Push notifications", "iOS + Android"] },
      { name: "App with Backend", price: "$2,100", features: ["Login system", "Integrated chat", "Notifications", "Custom APIs"] },
      { name: "Custom App", price: "$3,200", features: ["Complete marketplace", "Advanced management", "Complex integrations", "Dedicated support"] }
    ]
  },
  {
    category: "Bots",
    icon: "🤖",
    plans: [
      { name: "Basic Bot", price: "$120/month", features: ["Automatic responses", "Simple menu", "Business hours", "Basic reports"] },
      { name: "AI Bot", price: "$199/month", features: ["OpenAI AI", "Continuous learning", "Multiple languages", "Advanced reports"] },
      { name: "Custom Bot", price: "$349/month", features: ["Advanced AI", "Integrated CRM", "Complete automation", "Priority support"] }
    ]
  },
  {
    category: "Combos",
    icon: "🎁",
    plans: [
      { name: "Digital Presence Combo", price: "$1,100", features: ["Institutional Website", "Landing Page", "Google My Business", "Social Media"] },
      { name: "Automation Combo", price: "$1,750", features: ["Website + AI Bot", "Integrated CRM", "Sales automation", "Analytics"] },
      { name: "Enterprise Combo", price: "$4,500", features: ["Complete Website", "Mobile App", "Advanced AI Bot", "Management System"] }
    ]
  }
];

/* ---------- Helper functions e componente principal ---------- */

const MARGIN = 20;
const CARD_HEIGHT = 58; // altura padrão do card do plano (ajustável)
const FONT = "helvetica";

const CatalogGenerator = () => {
  const { t } = useLanguage();

  const addHeader = (pdf: jsPDF, title: string, subtitle: string) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    // header background
    pdf.setFillColor(24, 24, 81); // tom escuro elegante
    pdf.rect(0, 0, pageWidth, 52, "F");

    // title
    pdf.setTextColor(255, 255, 255);
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(20);
    pdf.text("AGÊNCIA FW DIGITAL", MARGIN, 24);

    // subtitle
    pdf.setFont(FONT, "normal");
    pdf.setFontSize(11);
    pdf.text(subtitle, MARGIN, 36);

    // thin decorative line
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.3);
    pdf.line(MARGIN, 44, pageWidth - MARGIN, 44);
  };

  const addFooter = (pdf: jsPDF, pageIndex: number, totalPages: number) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.setFillColor(245, 245, 247);
    pdf.rect(0, pageHeight - 26, pageWidth, 26, "F");

    pdf.setFont(FONT, "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(90, 90, 90);
    pdf.text("Agência FW Digital - Fábrica de Software", MARGIN, pageHeight - 12);
    pdf.text("contato@agenciafwdigital.com.br | WhatsApp: (11) 93407-9208", MARGIN, pageHeight - 4);

    // page number and generation date (aligned right)
    const date = new Date().toLocaleDateString("pt-BR");
    pdf.text(`Página ${pageIndex} / ${totalPages}`, pageWidth - MARGIN - 50, pageHeight - 12);
    pdf.text(`Gerado em: ${date}`, pageWidth - MARGIN - 50, pageHeight - 4);
  };

  const ensureSpace = (pdf: jsPDF, y: number, needed: number) => {
    const pageHeight = pdf.internal.pageSize.getHeight();
    if (y + needed > pageHeight - 30) {
      pdf.addPage();
      return 60; // y inicial após novo header (we'll set back in caller)
    }
    return y;
  };

  const renderCategory = (pdf: jsPDF, category: any, yRef: { y: number }) => {
    const pageWidth = pdf.internal.pageSize.getWidth();

    // header box height
    const headerHeight = 18;
    yRef.y = ensureSpace(pdf, yRef.y, headerHeight + 10);
    // draw background box
    pdf.setFillColor(250, 250, 252);
    pdf.setDrawColor(24, 24, 81);
    pdf.setLineWidth(0.7);
    pdf.rect(MARGIN, yRef.y - 6, pageWidth - MARGIN * 2, headerHeight, "F");
    // title
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(24, 24, 81);
    pdf.text(`${category.icon} ${category.category}`, MARGIN + 6, yRef.y + 6);
    yRef.y += headerHeight + 8;
  };

  const renderPlan = (pdf: jsPDF, plan: any, yRef: { y: number }) => {
    const pageWidth = pdf.internal.pageSize.getWidth();

    // calculate variable height based on features text (wrap)
    pdf.setFont(FONT, "normal");
    pdf.setFontSize(10);
    const featureLines: string[] = [];
    plan.features.forEach((f: string) => {
      const lines = (pdf as any).splitTextToSize(`• ${f}`, pageWidth - MARGIN * 2 - 40);
      lines.forEach((l: string) => featureLines.push(l));
    });

    const priceHeight = 12;
    const titleHeight = 12;
    const featuresHeight = featureLines.length * 5 + 6;
    const totalNeeded = Math.max(CARD_HEIGHT, titleHeight + priceHeight + featuresHeight);

    yRef.y = ensureSpace(pdf, yRef.y, totalNeeded + 10);

    // card
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(220, 220, 220);
    pdf.setLineWidth(0.4);
    pdf.rect(MARGIN + 6, yRef.y - 4, pageWidth - (MARGIN + 6) * 2, totalNeeded, "F");
    pdf.rect(MARGIN + 6, yRef.y - 4, pageWidth - (MARGIN + 6) * 2, totalNeeded);

    // plan title bar
    pdf.setFillColor(24, 24, 81);
    pdf.rect(MARGIN + 6, yRef.y - 4, pageWidth - (MARGIN + 6) * 2, 14, "F");
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255);
    pdf.text(plan.name, MARGIN + 10, yRef.y + 6);

    // price (aligned right)
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255);
    pdf.text(plan.price, pageWidth - MARGIN - 10, yRef.y + 6, { align: "right" });

    // features area
    pdf.setFont(FONT, "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    let fy = yRef.y + 18;
    featureLines.forEach((line) => {
      pdf.text(line, MARGIN + 10, fy);
      fy += 5;
    });

    yRef.y += totalNeeded + 8;
  };

  const generatePDF = (catalogData: any[], currencyLabel: string) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    const subtitle = currencyLabel === "BRL"
      ? "Catálogo de Serviços 2025 - Valores em Real (R$)"
      : "Services Catalog 2025 - Prices in US Dollars ($)";

    addHeader(pdf, "AGÊNCIA FW DIGITAL", subtitle);

    // start Y after header
    let yRef = { y: 60 };

    // iterate categories & plans
    catalogData.forEach((category) => {
      // check space for category header; if not, add page and header
      if (yRef.y > pdf.internal.pageSize.getHeight() - 120) {
        pdf.addPage();
        addHeader(pdf, "AGÊNCIA FW DIGITAL", subtitle);
        yRef.y = 60;
      }
      renderCategory(pdf, category, yRef);

      category.plans.forEach((plan: any) => {
        // if not enough space for plan, add page with header
        if (yRef.y > pdf.internal.pageSize.getHeight() - 90) {
          pdf.addPage();
          addHeader(pdf, "AGÊNCIA FW DIGITAL", subtitle);
          yRef.y = 60;
        }
        renderPlan(pdf, plan, yRef);
      });

      // small gap after category
      yRef.y += 6;
    });

    // finalize footers on every page
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      addFooter(pdf, i, totalPages);
    }

    // filename
    const dateStr = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
    const fileName = `Catalogo-FW-Digital-${currencyLabel}-${dateStr}.pdf`;
    pdf.save(fileName);
  };

  const generatePDFBRL = () => generatePDF(catalogDataBRL_SUGGESTED, "BRL");
  const generatePDFUSD = () => generatePDF(catalogDataUSD_SUGGESTED, "USD");

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Gerador de Catálogo PDF
        </CardTitle>
        <CardDescription>
          Gere catálogos com valores em Real (R$) ou Dólar ($) — layout profissional
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
          <Button onClick={generatePDFBRL} className="w-full" size="lg" variant="default">
            <Download className="h-4 w-4 mr-2" />
            Gerar PDF em Real (R$)
          </Button>

          <Button onClick={generatePDFUSD} className="w-full" size="lg" variant="outline">
            <DollarSign className="h-4 w-4 mr-2" />
            Gerar PDF em Dólar ($)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CatalogGenerator;
