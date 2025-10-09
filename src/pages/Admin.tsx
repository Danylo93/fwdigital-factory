import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Shield, FileText } from "lucide-react";
import CatalogGenerator from "@/components/CatalogGenerator";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simple password protection - in production, use proper authentication
  const ADMIN_PASSWORD = "fwdigital2025";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Senha incorreta");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Área Administrativa
            </CardTitle>
            <CardDescription>
              Acesso restrito para gerar catálogos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <Button type="submit" className="w-full">
                <Lock className="h-4 w-4 mr-2" />
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Área <span className="bg-gradient-primary bg-clip-text text-transparent">Administrativa</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Gerencie catálogos e materiais comerciais
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Catalog Generator */}
          <div className="space-y-6">
            <CatalogGenerator />
          </div>

          {/* Additional Admin Tools */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informações do Catálogo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-2">
                  <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
                  <p><strong>Total de serviços:</strong> 12</p>
                  <p><strong>Categorias:</strong> 4</p>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Instruções:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• O catálogo é gerado automaticamente com os preços atuais</li>
                    <li>• O arquivo PDF será baixado automaticamente</li>
                    <li>• Use este material para apresentações comerciais</li>
                    <li>• Mantenha os preços atualizados no código</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open('/', '_blank')}
                >
                  Ver Site Público
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setIsAuthenticated(false)}
                >
                  Sair da Área Admin
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
