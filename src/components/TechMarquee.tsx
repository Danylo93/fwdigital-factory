import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiOpenai,
  SiSupabase,
  SiFlutter,
  SiFigma,
  SiStripe,
  SiMeta,
} from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import { type IconType } from "react-icons";
import { useLanguage } from "@/contexts/LanguageContext";
import Marquee from "./motion/Marquee";

const techs: { name: string; Icon: IconType }[] = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Python", Icon: SiPython },
  { name: "OpenAI", Icon: SiOpenai },
  { name: "Supabase", Icon: SiSupabase },
  { name: "Flutter", Icon: SiFlutter },
  { name: "WhatsApp API", Icon: FaWhatsapp },
  { name: "Stripe", Icon: SiStripe },
  { name: "Meta Ads", Icon: SiMeta },
  { name: "Figma", Icon: SiFigma },
];

const TechMarquee = () => {
  const { t } = useLanguage();

  return (
    <section className="relative border-y border-border/40 bg-muted/20 py-10">
      <div className="container-responsive">
        <p className="mb-7 text-center font-heading text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
          {t("tech.label")}
        </p>
        <Marquee duration={36}>
          {techs.map((tech) => (
            <div
              key={tech.name}
              className="mx-2 flex items-center gap-2.5 rounded-sm border border-border/50 bg-card/40 px-5 py-3 text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <tech.Icon className="h-5 w-5" />
              <span className="whitespace-nowrap text-sm font-medium">{tech.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TechMarquee;
