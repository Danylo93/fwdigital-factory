import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Aurora from "@/components/Aurora";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <Aurora intensity="soft" />
      <div className="relative text-center">
        <p className="font-display text-[7rem] font-bold leading-none text-gradient-brand sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 font-heading text-2xl uppercase tracking-tight text-foreground sm:text-3xl">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-3 max-w-md text-body-md text-muted-foreground">
          O link pode estar quebrado ou a página foi movida.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 rounded-sm bg-primary font-heading font-bold uppercase tracking-wide text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-strong hover:brightness-110"
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o início
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
