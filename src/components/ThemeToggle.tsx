import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const ThemeToggle = () => {
  const { t } = useLanguage();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Default to dark mode if no preference is saved or if dark is saved
      setIsDark(true);
      document.documentElement.classList.add('dark');
      if (!savedTheme) {
        localStorage.setItem('theme', 'dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="glass rounded-2xl p-3 hover-glass transition-glass border border-white/10"
      aria-label={isDark ? t('theme.toggle.light') : t('theme.toggle.dark')}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500 transition-transform hover:scale-110" />
      ) : (
        <Moon className="h-5 w-5 text-blue-500 transition-transform hover:scale-110" />
      )}
    </Button>
  );
};

export default ThemeToggle;
