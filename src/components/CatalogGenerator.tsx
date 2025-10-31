import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, DollarSign } from "lucide-react";
import jsPDF from "jspdf";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Componente atualizado: adiciona logo no cabeçalho.
 * Coloque o arquivo de logo na pasta `public/` com o nome exato:
 *   /public/fw-logo-BbOIj-TB.png
 *
 * Se você preferir outro caminho, altere a constante LOGO_PATH abaixo.
 */

const LOGO_PATH = "/fw-logo-BbOIj-TB.png"; // coloque o arquivo no public/ com esse nome

/* ---------- Preços sugeridos (você pode trocar) ---------- */
const catalogDataBRL_SUGGESTED = [
  {
    category: "Sites",
    plans: [
      { name: "Landing Page", price: "R$ 1.990", features: ["Página única", "CTA WhatsApp", "SEO básico", "Responsivo"] },
      { name: "Site Institucional", price: "R$ 3.990", features: ["3-5 páginas", "Formulário de contato", "Google Maps", "Blog"] },
      { name: "Loja Virtual", price: "R$ 6.990", features: ["Carrinho de compras", "Pagamento integrado", "Gestão de produtos", "Relatórios"] }
    ]
  },
  {
    category: "Apps",
    plans: [
      { name: "App Simples", price: "R$ 7.990", features: ["Catálogo digital", "Delivery local", "Push notifications", "iOS + Android"] },
      { name: "App com Backend", price: "R$ 10.990", features: ["Sistema de login", "Chat integrado", "Notificações", "APIs personalizadas"] },
      { name: "App Sob Medida", price: "R$ 16.900", features: ["Marketplace completo", "Gestão avançada", "Integrações complexas", "Suporte dedicado"] }
    ]
  },
  {
    category: "Bots",
  
    plans: [
      { name: "Bot Básico", price: "R$ 599/mês", features: ["Respostas automáticas", "Menu simples", "Horário de atendimento", "Relatórios básicos"] },
      { name: "Bot com IA", price: "R$ 999/mês", features: ["IA OpenAI", "Aprendizado contínuo", "Múltiplos idiomas", "Relatórios avançados"] },
      { name: "Bot Personalizado", price: "R$ 1.799/mês", features: ["IA Avançada", "CRM Integrado", "Automação completa", "Suporte prioritário"] }
    ]
  },
  {
    category: "Combos",
   
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
    
    plans: [
      { name: "Landing Page", price: "$450", features: ["Single page", "WhatsApp CTA", "Basic SEO", "Responsive"] },
      { name: "Institutional Website", price: "$750", features: ["3-5 pages", "Contact form", "Google Maps", "Blog"] },
      { name: "E-commerce Store", price: "$1,200", features: ["Shopping cart", "Integrated payment", "Product management", "Reports"] }
    ]
  },
  {
    category: "Apps",
   
    plans: [
      { name: "Simple App", price: "$1,500", features: ["Digital catalog", "Local delivery", "Push notifications", "iOS + Android"] },
      { name: "App with Backend", price: "$2,100", features: ["Login system", "Integrated chat", "Notifications", "Custom APIs"] },
      { name: "Custom App", price: "$3,200", features: ["Complete marketplace", "Advanced management", "Complex integrations", "Dedicated support"] }
    ]
  },
  {
    category: "Bots",
   
    plans: [
      { name: "Basic Bot", price: "$120/month", features: ["Automatic responses", "Simple menu", "Business hours", "Basic reports"] },
      { name: "AI Bot", price: "$199/month", features: ["OpenAI AI", "Continuous learning", "Multiple languages", "Advanced reports"] },
      { name: "Custom Bot", price: "$349/month", features: ["Advanced AI", "Integrated CRM", "Complete automation", "Priority support"] }
    ]
  },
  {
    category: "Combos",
    plans: [
      { name: "Digital Presence Combo", price: "$1,100", features: ["Institutional Website", "Landing Page", "Google My Business", "Social Media"] },
      { name: "Automation Combo", price: "$1,750", features: ["Website + AI Bot", "Integrated CRM", "Sales automation", "Analytics"] },
      { name: "Enterprise Combo", price: "$4,500", features: ["Complete Website", "Mobile App", "Advanced AI Bot", "Management System"] }
    ]
  }
];

const MARGIN = 20;
const CARD_HEIGHT = 58;
const FONT = "helvetica";

/* ---------- util: converte URL de imagem para dataURL (base64) ---------- */
async function imageUrlToDataUrl(url: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Erro ao ler imagem"));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

const CatalogGenerator = () => {
  const { t } = useLanguage();

  const addHeader = (pdf: jsPDF, subtitle: string, logoDataUrl?: string) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    // header background
    pdf.setFillColor(24, 24, 81);
    pdf.rect(0, 0, pageWidth, 56, "F");

    // draw logo se disponível (posicionado à direita)
    if (logoDataUrl) {
      // tenta encaixar o logo com largura máxima de 36mm mantendo proporção
      const maxW = 36;
      const maxH = 36;
      // posição
      const x = pageWidth - MARGIN - maxW;
      const y = 10;
      try {
        pdf.addImage(logoDataUrl, "PNG", x, y, maxW, maxH, undefined, "FAST");
      } catch (e) {
        // fallback: ignora se falhar
        // console.warn("Não foi possível adicionar logo:", e);
      }
    }

    // title
    pdf.setTextColor(255, 255, 255);
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(20);
    pdf.text("AGÊNCIA FW DIGITAL", MARGIN, 26);

    // subtitle
    pdf.setFont(FONT, "normal");
    pdf.setFontSize(11);
    pdf.text(subtitle, MARGIN, 40);

    // decorative line
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.3);
    pdf.line(MARGIN, 46, pageWidth - MARGIN, 46);
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

    const date = new Date().toLocaleDateString("pt-BR");
    pdf.text(`Página ${pageIndex} / ${totalPages}`, pageWidth - MARGIN - 50, pageHeight - 12);
    pdf.text(`Gerado em: ${date}`, pageWidth - MARGIN - 50, pageHeight - 4);
  };

  const ensureSpace = (pdf: jsPDF, y: number, needed: number) => {
    const pageHeight = pdf.internal.pageSize.getHeight();
    if (y + needed > pageHeight - 30) {
      pdf.addPage();
      return 64; // y inicial após novo header (ajustável)
    }
    return y;
  };

  const renderCategory = (pdf: jsPDF, category: any, yRef: { y: number }) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const headerHeight = 18;
    yRef.y = ensureSpace(pdf, yRef.y, headerHeight + 10);
    pdf.setFillColor(250, 250, 252);
    pdf.setDrawColor(24, 24, 81);
    pdf.setLineWidth(0.7);
    pdf.rect(MARGIN, yRef.y - 6, pageWidth - MARGIN * 2, headerHeight, "F");
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(24, 24, 81);
    pdf.text(` ${category.category}`, MARGIN + 6, yRef.y + 6);
    yRef.y += headerHeight + 8;
  };

  const renderPlan = (pdf: jsPDF, plan: any, yRef: { y: number }) => {
    const pageWidth = pdf.internal.pageSize.getWidth();

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

  /* ---------- geração principal (async para carregar logo) ---------- */
  const generatePDF = async (catalogData: any[], currencyLabel: string) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const subtitle = currencyLabel === "BRL"
      ? "Catálogo de Serviços 2025 - Valores em Real (R$)"
      : "Services Catalog 2025 - Prices in US Dollars ($)";

    // carrega logo (converter para dataURL)
    let logoDataUrl: string | undefined;
    try {
      logoDataUrl = await imageUrlToDataUrl(LOGO_PATH);
    } catch (e) {
      // se falhar ao carregar o logo, continuamos sem ele
      logoDataUrl = undefined;
      // console.warn("Logo não encontrada em", LOGO_PATH);
    }

    // adiciona header na primeira página (com logo se existir)
    addHeader(pdf, subtitle, logoDataUrl);

    // start Y after header
    let yRef = { y: 64 }; // valor inicial (espaço suficiente para o header)

    catalogData.forEach((category) => {
      if (yRef.y > pdf.internal.pageSize.getHeight() - 120) {
        pdf.addPage();
        addHeader(pdf, subtitle, logoDataUrl);
        yRef.y = 64;
      }
      renderCategory(pdf, category, yRef);

      category.plans.forEach((plan: any) => {
        if (yRef.y > pdf.internal.pageSize.getHeight() - 90) {
          pdf.addPage();
          addHeader(pdf, subtitle, logoDataUrl);
          yRef.y = 64;
        }
        renderPlan(pdf, plan, yRef);
      });

      yRef.y += 6;
    });

    // finaliza rodapés
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      addFooter(pdf, i, totalPages);
    }

    const dateStr = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
    const fileName = `Catalogo-FW-Digital-${currencyLabel}-${dateStr}.pdf`;
    pdf.save(fileName);
  };

  const generatePDFBRL = async () => await generatePDF(catalogDataBRL_SUGGESTED, "BRL");
  const generatePDFUSD = async () => await generatePDF(catalogDataUSD_SUGGESTED, "USD");

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Gerador de Catálogo PDF
        </CardTitle>
        <CardDescription>
          Gere catálogos com valores em Real (R$) ou Dólar ($) — layout profissional com logo
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
