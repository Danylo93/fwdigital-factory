import { MapPin, Briefcase, Users, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

const WhoIsItFor = () => {
  const targetAudiences = [
    {
      icon: MapPin,
      title: "Brasileiros que vivem fora",
      subtitle: "e têm negócio local",
      description: "Você mora nos EUA, Canadá, Reino Unido ou Portugal e quer profissionalizar seu negócio com presença digital forte.",
      examples: ["Restaurantes", "Serviços de limpeza", "Construção civil", "Estética e beleza"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Briefcase,
      title: "Prestadores de serviço",
      subtitle: "que querem crescer",
      description: "Profissionais autônomos que precisam de mais clientes e querem automatizar processos de vendas.",
      examples: ["Consultores", "Coaches", "Freelancers", "Técnicos especializados"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Pequenas empresas",
      subtitle: "em expansão",
      description: "Negócios que já funcionam mas precisam de uma presença digital profissional para crescer mais.",
      examples: ["Lojas locais", "Clínicas", "Escritórios", "Academias"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Truck,
      title: "Delivery e E-commerce",
      subtitle: "que querem vender mais",
      description: "Empresas que vendem produtos ou serviços e precisam de automação para escalar as vendas.",
      examples: ["Food trucks", "Lojas online", "Distribuidores", "Marketplaces"],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-6 py-3 mb-6 font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Público Ideal
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Para <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">quem é</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Nossas soluções são perfeitas para brasileiros empreendedores que querem dominar o mercado digital
            </p>
          </div>

          {/* Target Audiences Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {targetAudiences.map((audience, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${audience.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <audience.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {audience.title}
                </h3>
                <p className="text-lg text-primary font-semibold mb-4">
                  {audience.subtitle}
                </p>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {audience.description}
                </p>
                
                {/* Examples */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Exemplos:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {audience.examples.map((example, exampleIndex) => (
                      <span key={exampleIndex} className={`px-3 py-1 bg-gradient-to-r ${audience.color} text-white text-sm rounded-full font-medium`}>
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12">
            <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Se identificou com algum perfil?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Vamos conversar sobre como podemos transformar seu negócio em uma máquina de vendas digital
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:bg-gradient-primary-hover text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-glow hover:shadow-glow-hover transition-all duration-300 hover:scale-105 group min-w-[280px]"
              onClick={() => window.open('https://wa.me/5511934079208?text=Olá! Me identifiquei com o perfil e quero saber como vocês podem me ajudar.', '_blank')}
            >
              <FaWhatsapp className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
              Quero falar com um especialista
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor;
