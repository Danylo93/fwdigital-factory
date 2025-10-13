import { TrendingUp, Users, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

const RealResults = () => {
  const results = [
    {
      before: "Página simples no Instagram",
      after: "30 novos clientes por mês",
      description: "Restaurante brasileiro em Toronto automatizou pedidos e triplicou vendas",
      metric: "+200%",
      metricLabel: "Aumento nas vendas",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-600"
    },
    {
      before: "Atendimento manual no WhatsApp",
      after: "Sistema automatizado 24/7",
      description: "Empresa de limpeza em Miami reduziu tempo de resposta e aumentou conversões",
      metric: "24/7",
      metricLabel: "Atendimento automático",
      icon: Clock,
      color: "from-blue-500 to-cyan-600"
    },
    {
      before: "Sem presença digital",
      after: "500+ leads qualificados/mês",
      description: "Consultoria em Londres criou funil de vendas e explodiu o faturamento",
      metric: "500+",
      metricLabel: "Leads por mês",
      icon: Users,
      color: "from-purple-500 to-pink-600"
    },
    {
      before: "Vendas inconsistentes",
      after: "Faturamento previsível",
      description: "E-commerce de produtos brasileiros em Portugal estabilizou receita mensal",
      metric: "R$ 50k",
      metricLabel: "Faturamento mensal",
      icon: DollarSign,
      color: "from-orange-500 to-red-600"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      business: "Restaurante Sabor Brasil - Toronto",
      text: "A FW Digital transformou completamente meu negócio. Antes eu dependia só do boca a boca, agora tenho pedidos automatizados direto pelo site.",
      result: "3x mais pedidos"
    },
    {
      name: "Ana Costa",
      business: "Clean House Services - Miami",
      text: "O chatbot da FW responde meus clientes mesmo quando estou trabalhando. Nunca mais perdi uma oportunidade de venda.",
      result: "Zero leads perdidos"
    },
    {
      name: "Roberto Mendes",
      business: "Consultoria RH - Londres",
      text: "Em 6 meses saí de 5 clientes para mais de 50. O sistema de captação que eles criaram é impressionante.",
      result: "10x mais clientes"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-6 py-3 mb-6 font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Cases de Sucesso
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Resultados <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Reais</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Veja como transformamos negócios de brasileiros no exterior em máquinas de vendas digitais
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
            {results.map((result, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group">
                {/* Icon and Metric */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${result.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <result.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
                      {result.metric}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {result.metricLabel}
                    </div>
                  </div>
                </div>

                {/* Before/After */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400 line-through">
                      {result.before}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {result.after}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {result.description}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              O que nossos clientes dizem
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.business}
                    </div>
                    <div className="text-sm font-semibold text-primary mt-2">
                      Resultado: {testimonial.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Quer resultados como esses?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Vamos criar uma estratégia personalizada para o seu negócio
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:bg-gradient-primary-hover text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-glow hover:shadow-glow-hover transition-all duration-300 hover:scale-105 group min-w-[280px]"
              onClick={() => window.open('https://wa.me/5511934079208?text=Olá! Vi os resultados dos clientes e quero saber como conseguir os mesmos para meu negócio.', '_blank')}
            >
              <FaWhatsapp className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
              Quero resultados como esses
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealResults;
