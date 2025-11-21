import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              StreamFlix
            </h1>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Accueil
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Séries
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Films
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Ma Liste
              </a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher..." 
                className="pl-10 w-64 bg-secondary border-border"
              />
            </div>
            <Button size="icon" variant="ghost" className="text-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-foreground">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
