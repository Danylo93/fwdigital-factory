import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, DollarSign } from "lucide-react";
import jsPDF from "jspdf";
import { useLanguage } from "@/contexts/LanguageContext";

const LOGO_PATH = "/fw-logo-BbOIj-TB.png";

// Dados do catálogo em Real (R$) com explicações simples
const catalogDataBRL_SUGGESTED = [
  {
    category: "Sites",
    description: "Sites são como casas na internet! Eles mostram seu negócio para o mundo todo.",
    plans: [
      { 
        name: "Landing Page", 
        price: "R$ 1.990",
        simpleDescription: "Uma página super simples que fala sobre seu produto ou serviço.",
        features: ["Página única com tudo que precisa", "Botão para WhatsApp", "Aparece no Google", "Funciona no celular e computador"] 
      },
      { 
        name: "Site Institucional", 
        price: "R$ 3.990",
        simpleDescription: "Como um site maior com várias páginas contando sua história.",
        features: ["Várias páginas com suas informações", "Formulário para clientes entrarem em contato", "Mapa mostrando onde você fica", "Blog para compartilhar notícias"] 
      },
      { 
        name: "Loja Virtual", 
        price: "R$ 6.990",
        simpleDescription: "Uma loja de verdade na internet! Seus clientes podem comprar direto pelo site.",
        features: ["Carrinho de compras como no mercado", "Cliente paga direto pelo site", "Você gerencia seus produtos fácil", "Relatórios mostrando suas vendas"] 
      }
    ]
  },
  {
    category: "Apps",
    description: "Apps são programas que ficam no celular do cliente. Igual Instagram ou WhatsApp!",
    plans: [
      { 
        name: "App Simples", 
        price: "R$ 7.990",
        simpleDescription: "Um app básico mostrando seus produtos ou serviços.",
        features: ["Catálogo mostrando tudo que você vende", "Clientes pedem delivery pelo app", "Você avisa cliente com notificações", "Funciona no iPhone e Android"] 
      },
      { 
        name: "App com Backend", 
        price: "R$ 10.990",
        simpleDescription: "Um app mais completo onde clientes fazem login e conversam com você.",
        features: ["Cliente cria conta e faz login", "Chat direto pelo app", "Você envia avisos para o cliente", "Integra com outros sistemas"] 
      },
      { 
        name: "App Sob Medida", 
        price: "R$ 16.900",
        simpleDescription: "Um app completo e personalizado, feito especialmente para você!",
        features: ["Marketplace completo (loja de verdade)", "Gerencia tudo do seu negócio", "Conecta com tudo que você usa", "Suporte especial só para você"] 
      }
    ]
  },
  {
    category: "Bots",
    description: "Bots são robôs que respondem seus clientes no WhatsApp automaticamente, como se fosse você!",
    plans: [
      { 
        name: "Bot Básico", 
        price: "R$ 599/mês",
        simpleDescription: "Um robô simples que responde perguntas básicas dos seus clientes.",
        features: ["Responde automaticamente as mensagens", "Menu com opções para o cliente escolher", "Sabe os horários que você está aberto", "Mostra relatórios simples"] 
      },
      { 
        name: "Bot com IA", 
        price: "R$ 999/mês",
        simpleDescription: "Um robô inteligente que aprende e entende o que seus clientes querem!",
        features: ["Inteligência artificial super esperta", "Aprende com cada conversa", "Fala vários idiomas", "Relatórios detalhados"] 
      },
      { 
        name: "Bot Personalizado", 
        price: "R$ 1.799/mês",
        simpleDescription: "O robô mais completo! Faz quase tudo que você precisa.",
        features: ["IA super avançada e inteligente", "Conecta com sistema de vendas", "Automatiza tudo do seu negócio", "Suporte prioritário sempre"] 
      }
    ]
  },
  {
    category: "Combos",
    description: "Combos são pacotes com vários serviços juntos! Você economiza e ganha mais!",
    plans: [
      { 
        name: "Combo Presença Digital", 
        price: "R$ 5.990",
        simpleDescription: "Tudo que você precisa para aparecer na internet.",
        features: ["Site completo para seu negócio", "Página especial para promoções", "Aparece no Google Maps", "Configuramos redes sociais"] 
      },
      { 
        name: "Combo Automação", 
        price: "R$ 9.990",
        simpleDescription: "Seu negócio funcionando sozinho na internet!",
        features: ["Site + Bot que responde clientes", "Sistema que gerencia vendas", "Vendas automáticas", "Mostra números e resultados"] 
      },
      { 
        name: "Combo Empresarial", 
        price: "R$ 22.500",
        simpleDescription: "Pacote completo com tudo! Site, app, bot e sistema de gestão.",
        features: ["Site completo e profissional", "App para celular", "Bot super inteligente", "Sistema que gerencia tudo"] 
      }
    ]
  }
];

// Dados do catálogo em Dólar ($) com explicações simples
const catalogDataUSD_SUGGESTED = [
  {
    category: "Websites",
    description: "Websites are like houses on the internet! They show your business to the whole world.",
      plans: [
        {
        name: "Landing Page", 
        price: "$450",
        simpleDescription: "A super simple page that talks about your product or service.",
        features: ["One page with everything you need", "WhatsApp button", "Shows up on Google", "Works on phone and computer"] 
      },
      { 
        name: "Institutional Website", 
        price: "$750",
        simpleDescription: "Like a bigger website with several pages telling your story.",
        features: ["Several pages with your information", "Form for customers to contact you", "Map showing where you are", "Blog to share news"] 
      },
      { 
        name: "E-commerce Store", 
        price: "$1,200",
        simpleDescription: "A real store on the internet! Your customers can buy directly on the site.",
        features: ["Shopping cart like at the store", "Customer pays directly on the site", "You manage your products easily", "Reports showing your sales"] 
        }
      ]
    },
  {
    category: "Apps",
    description: "Apps are programs that stay on the customer's phone. Like Instagram or WhatsApp!",
      plans: [
        {
        name: "Simple App", 
        price: "$1,500",
        simpleDescription: "A basic app showing your products or services.",
        features: ["Catalog showing everything you sell", "Customers order delivery through the app", "You notify customers", "Works on iPhone and Android"] 
      },
      { 
        name: "App with Backend", 
        price: "$2,100",
        simpleDescription: "A more complete app where customers log in and chat with you.",
        features: ["Customer creates account and logs in", "Direct chat through the app", "You send notifications to customer", "Integrates with other systems"] 
      },
      { 
        name: "Custom App", 
        price: "$3,200",
        simpleDescription: "A complete and personalized app, made especially for you!",
        features: ["Complete marketplace (real store)", "Manages everything in your business", "Connects with everything you use", "Special support just for you"] 
        }
      ]
    },
  {
    category: "Bots",
    description: "Bots are robots that answer your customers on WhatsApp automatically, like it was you!",
      plans: [
        {
        name: "Basic Bot", 
        price: "$120/month",
        simpleDescription: "A simple robot that answers basic questions from your customers.",
        features: ["Answers messages automatically", "Menu with options for customer to choose", "Knows your business hours", "Shows simple reports"] 
      },
      { 
        name: "AI Bot", 
        price: "$199/month",
        simpleDescription: "A smart robot that learns and understands what your customers want!",
        features: ["Super smart artificial intelligence", "Learns from every conversation", "Speaks multiple languages", "Detailed reports"] 
      },
      { 
        name: "Custom Bot", 
        price: "$349/month",
        simpleDescription: "The most complete robot! Does almost everything you need.",
        features: ["Super advanced and intelligent AI", "Connects with sales system", "Automates everything in your business", "Priority support always"] 
        }
      ]
    },
  {
    category: "Combos",
    description: "Combos are packages with several services together! You save money and get more!",
      plans: [
        {
        name: "Digital Presence Combo", 
        price: "$1,100",
        simpleDescription: "Everything you need to appear on the internet.",
        features: ["Complete website for your business", "Special page for promotions", "Shows up on Google Maps", "We set up social media"] 
      },
      { 
        name: "Automation Combo", 
        price: "$1,750",
        simpleDescription: "Your business working alone on the internet!",
        features: ["Website + Bot that answers customers", "System that manages sales", "Automatic sales", "Shows numbers and results"] 
      },
      { 
        name: "Enterprise Combo", 
        price: "$4,500",
        simpleDescription: "Complete package with everything! Website, app, bot and management system.",
        features: ["Complete and professional website", "App for mobile", "Super smart bot", "System that manages everything"] 
        }
      ]
    }
  ];

const MARGIN = 20;
const FONT = "helvetica";

// Cores profissionais
const COLORS = {
  primary: { r: 138, g: 43, b: 226 },      // Roxo primário
  secondary: { r: 168, g: 85, b: 247 },   // Roxo claro
  accent: { r: 255, g: 248, b: 220 },     // Amarelo claro para preços
  background: { r: 250, g: 250, b: 252 },  // Cinza muito claro
  text: { r: 60, g: 60, b: 60 },          // Cinza escuro
  textLight: { r: 100, g: 100, b: 100 },   // Cinza médio
  border: { r: 220, g: 220, b: 220 }      // Cinza claro
};

/* ---------- util: converte URL de imagem para dataURL (base64) ---------- */
async function imageUrlToDataUrl(url: string) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Erro ao ler imagem"));
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return undefined;
  }
}

const CatalogGenerator = () => {
  const { t } = useLanguage();

  const addHeader = (pdf: jsPDF, subtitle: string, logoDataUrl?: string, isEnglish = false) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Header com gradiente
    pdf.setFillColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
    pdf.rect(0, 0, pageWidth, 60, "F");
    
    // Gradiente secundário
    pdf.setFillColor(COLORS.secondary.r, COLORS.secondary.g, COLORS.secondary.b);
    pdf.rect(0, 45, pageWidth, 15, "F");

    // Logo à direita se disponível
    if (logoDataUrl) {
      try {
        const logoSize = 40;
        pdf.addImage(logoDataUrl, "PNG", pageWidth - MARGIN - logoSize, 10, logoSize, logoSize, undefined, "FAST");
      } catch (e) {
        // Ignora se falhar
      }
    }

    // Título principal
    pdf.setTextColor(255, 255, 255);
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(24);
    pdf.text("AGÊNCIA FW DIGITAL", MARGIN, 30);

    // Subtítulo
    pdf.setFont(FONT, "normal");
    pdf.setFontSize(12);
    pdf.text(subtitle, MARGIN, 42);

    // Linha decorativa
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.5);
    pdf.line(MARGIN, 48, pageWidth - MARGIN, 48);
  };

  const addFooter = (pdf: jsPDF, pageIndex: number, totalPages: number, isEnglish = false) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.setFillColor(248, 250, 252);
    pdf.rect(0, pageHeight - 28, pageWidth, 28, "F");

    pdf.setFont(FONT, "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b);
    
    pdf.text("Agência FW Digital - Fábrica de Software", MARGIN, pageHeight - 15);
    pdf.text("contato@agenciafwdigital.com.br | WhatsApp: (11) 93407-9208", MARGIN, pageHeight - 6);

    const date = new Date().toLocaleDateString("pt-BR");
    pdf.text(isEnglish ? `Page ${pageIndex} / ${totalPages}` : `Página ${pageIndex} / ${totalPages}`, pageWidth - MARGIN - 40, pageHeight - 15);
    pdf.text(isEnglish ? `Generated on: ${date}` : `Gerado em: ${date}`, pageWidth - MARGIN - 40, pageHeight - 6);
  };

  const ensureSpace = (pdf: jsPDF, y: number, needed: number) => {
    const pageHeight = pdf.internal.pageSize.getHeight();
    if (y + needed > pageHeight - 40) {
        pdf.addPage();
      return 70;
    }
    return y;
  };

  const renderIntroduction = (pdf: jsPDF, yRef: { y: number }, isEnglish: boolean) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    yRef.y = ensureSpace(pdf, yRef.y, 50);
    
    // Caixa de introdução
    pdf.setFillColor(COLORS.accent.r, COLORS.accent.g, COLORS.accent.b);
    pdf.rect(MARGIN, yRef.y - 8, pageWidth - MARGIN * 2, 35, "F");
    
    pdf.setDrawColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
    pdf.setLineWidth(0.5);
    pdf.rect(MARGIN, yRef.y - 8, pageWidth - MARGIN * 2, 35);

    // Título
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
    pdf.text(isEnglish ? "Welcome! Let's understand simply:" : "Olá! Vamos explicar de forma simples:", MARGIN + 5, yRef.y + 3);
    
    // Texto explicativo
    pdf.setFont(FONT, "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(COLORS.text.r, COLORS.text.g, COLORS.text.b);
    
    const introText = isEnglish 
      ? "We create digital solutions for your business. Think of it like building a house, but on the internet!"
      : "Criamos soluções digitais para seu negócio. Imagine como construir uma casa, só que na internet!";
    
    const lines = (pdf as any).splitTextToSize(introText, pageWidth - MARGIN * 2 - 10);
    lines.forEach((line: string, idx: number) => {
      pdf.text(line, MARGIN + 5, yRef.y + 10 + (idx * 5));
    });

    yRef.y += 45;
  };

  const renderModelSection = (pdf: jsPDF, yRef: { y: number }, isEnglish: boolean) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    yRef.y = ensureSpace(pdf, yRef.y, 80);
    
    // Título da seção
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(16);
    pdf.setTextColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
    pdf.text(isEnglish ? "How We Work" : "Como Trabalhamos", MARGIN, yRef.y);
    yRef.y += 10;

    // Caixa explicativa
    pdf.setFillColor(255, 255, 255);
    pdf.rect(MARGIN, yRef.y - 5, pageWidth - MARGIN * 2, 65, "F");
    pdf.setDrawColor(COLORS.border.r, COLORS.border.g, COLORS.border.b);
    pdf.setLineWidth(0.3);
    pdf.rect(MARGIN, yRef.y - 5, pageWidth - MARGIN * 2, 65);

    pdf.setFont(FONT, "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(COLORS.text.r, COLORS.text.g, COLORS.text.b);
    
    const step1 = isEnglish
      ? "1. Setup (One-time): We create everything - website, app, automation. Like building your store!"
      : "1. Implementação (Uma vez só): Criamos tudo - site, app, automação. Como construir sua loja!";
    
    const step2 = isEnglish
      ? "2. Maintenance (Monthly): We keep everything working and growing, month after month!"
      : "2. Manutenção (Todo mês): Mantemos tudo funcionando e crescendo, mês após mês!";
    
    const step1Lines = (pdf as any).splitTextToSize(step1, pageWidth - MARGIN * 2 - 15);
    step1Lines.forEach((line: string, idx: number) => {
      pdf.text(line, MARGIN + 8, yRef.y + (idx * 5));
    });
    
    yRef.y += step1Lines.length * 5 + 6;
    
    const step2Lines = (pdf as any).splitTextToSize(step2, pageWidth - MARGIN * 2 - 15);
    step2Lines.forEach((line: string, idx: number) => {
      pdf.text(line, MARGIN + 8, yRef.y + (idx * 5));
    });

    yRef.y += step2Lines.length * 5 + 15;
  };

  const renderCategory = (pdf: jsPDF, category: any, yRef: { y: number }) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    yRef.y = ensureSpace(pdf, yRef.y, 60);
    
    // Header da categoria
    pdf.setFillColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
    pdf.rect(MARGIN, yRef.y - 6, pageWidth - MARGIN * 2, 20, "F");
    
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(16);
    pdf.setTextColor(255, 255, 255);
    pdf.text(category.category, MARGIN + 6, yRef.y + 8);
    
    yRef.y += 22;
    
    // Descrição simples da categoria
    pdf.setFont(FONT, "italic");
    pdf.setFontSize(11);
    pdf.setTextColor(COLORS.text.r, COLORS.text.g, COLORS.text.b);
    
    const descLines = (pdf as any).splitTextToSize(category.description, pageWidth - MARGIN * 2 - 10);
    descLines.forEach((line: string, idx: number) => {
      pdf.text(line, MARGIN + 5, yRef.y + (idx * 6));
    });
    
    yRef.y += descLines.length * 6 + 8;
  };

  const renderPlan = (pdf: jsPDF, plan: any, yRef: { y: number }) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Calcular altura necessária
    pdf.setFont(FONT, "normal");
    pdf.setFontSize(10);
    
    const descLines = (pdf as any).splitTextToSize(plan.simpleDescription || "", pageWidth - MARGIN * 2 - 30);
    const featureLines: string[] = [];
    plan.features.forEach((f: string) => {
      const lines = (pdf as any).splitTextToSize(`• ${f}`, pageWidth - MARGIN * 2 - 40);
      lines.forEach((l: string) => featureLines.push(l));
    });

    const cardHeight = Math.max(70, 20 + (descLines.length * 5) + (featureLines.length * 5) + 15);
    yRef.y = ensureSpace(pdf, yRef.y, cardHeight + 10);

    // Card do plano
    pdf.setFillColor(255, 255, 255);
    pdf.rect(MARGIN + 5, yRef.y - 5, pageWidth - MARGIN * 2 - 10, cardHeight, "F");
    
    pdf.setDrawColor(COLORS.border.r, COLORS.border.g, COLORS.border.b);
    pdf.setLineWidth(0.5);
    pdf.rect(MARGIN + 5, yRef.y - 5, pageWidth - MARGIN * 2 - 10, cardHeight);

    // Barra de título com preço
    pdf.setFillColor(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b);
    pdf.rect(MARGIN + 5, yRef.y - 5, pageWidth - MARGIN * 2 - 10, 16, "F");
    
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(13);
        pdf.setTextColor(255, 255, 255);
    pdf.text(plan.name, MARGIN + 10, yRef.y + 6);
    
    // Preço destacado
    pdf.setFont(FONT, "bold");
        pdf.setFontSize(14);
    pdf.text(plan.price, pageWidth - MARGIN - 10, yRef.y + 6, { align: "right" });

    // Descrição simples
    let currentY = yRef.y + 18;
    if (plan.simpleDescription) {
      pdf.setFont(FONT, "italic");
        pdf.setFontSize(10);
      pdf.setTextColor(COLORS.text.r, COLORS.text.g, COLORS.text.b);
      
      descLines.forEach((line: string, idx: number) => {
        pdf.text(line, MARGIN + 10, currentY + (idx * 5));
      });
      
      currentY += descLines.length * 5 + 5;
      
      // Linha separadora
      pdf.setDrawColor(COLORS.border.r, COLORS.border.g, COLORS.border.b);
      pdf.setLineWidth(0.2);
      pdf.line(MARGIN + 10, currentY, pageWidth - MARGIN - 10, currentY);
      currentY += 5;
    }

    // Features com checkmarks
    pdf.setFont(FONT, "normal");
    pdf.setFontSize(9.5);
    pdf.setTextColor(COLORS.text.r, COLORS.text.g, COLORS.text.b);
    
    featureLines.forEach((line: string) => {
      pdf.text(line, MARGIN + 10, currentY);
      currentY += 5;
    });

    yRef.y += cardHeight + 8;
  };

  /* ---------- geração principal (async) ---------- */
  const generatePDF = async (catalogData: any[], currencyLabel: string) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const isEnglish = currencyLabel === "USD";
    const subtitle = currencyLabel === "BRL"
      ? "Catálogo de Serviços 2025 - Valores em Real (R$)"
      : "Services Catalog 2025 - Prices in US Dollars ($)";

    let logoDataUrl: string | undefined;
    try {
      logoDataUrl = await imageUrlToDataUrl(LOGO_PATH);
    } catch (e) {
      logoDataUrl = undefined;
    }

    // Header da primeira página
    addHeader(pdf, subtitle, logoDataUrl, isEnglish);
    let yRef = { y: 70 };

    // Seção introdutória
    renderIntroduction(pdf, yRef, isEnglish);

    // Seção "Como Trabalhamos"
    renderModelSection(pdf, yRef, isEnglish);

    // Renderizar categorias e planos
    catalogData.forEach((category) => {
      if (yRef.y > pdf.internal.pageSize.getHeight() - 100) {
        pdf.addPage();
        addHeader(pdf, subtitle, logoDataUrl, isEnglish);
        yRef.y = 70;
      }
      
      renderCategory(pdf, category, yRef);

      category.plans.forEach((plan: any) => {
        if (yRef.y > pdf.internal.pageSize.getHeight() - 80) {
          pdf.addPage();
          addHeader(pdf, subtitle, logoDataUrl, isEnglish);
          yRef.y = 70;
        }
        renderPlan(pdf, plan, yRef);
      });

      yRef.y += 10;
    });

    // Adicionar footer em todas as páginas
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      addFooter(pdf, i, totalPages, isEnglish);
    }

    const dateStr = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
    const currencyLabelForFile = currencyLabel === "BRL" ? "Real" : "Dolar";
    const fileName = `Catalogo-FW-Digital-${currencyLabelForFile}-${dateStr}.pdf`;
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
          Gere catálogos com valores em Real (R$) ou Dólar ($) — layout profissional com logo e modelo de contratação
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
