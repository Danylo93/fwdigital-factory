import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: "pt" as const, name: "Português", flag: "🇧🇷" },
    { code: "en" as const, name: "English", flag: "🇺🇸" },
  ];

  const handleLanguageChange = (languageCode: "pt" | "en") => {
    setLanguage(languageCode);
    const languageName = languages.find(lang => lang.code === languageCode)?.name;
    console.log(`Idioma alterado para: ${languageName}`);
  };

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-auto px-2 rounded-xl glass hover-glass transition-glass border border-white/10 flex items-center gap-1"
          title={`${t('language.current')}: ${currentLang?.name}`}
        >
          <span className="text-sm">{currentLang?.flag}</span>
          <Globe className="h-3 w-3 opacity-70" />
          <span className="sr-only">{t('language.change')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass border-white/10 backdrop-blur-md shadow-glass">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 transition-colors ${
              language === lang.code
                ? "bg-primary/20 text-primary border border-primary/30"
                : "hover:bg-white/10 hover:text-foreground"
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
