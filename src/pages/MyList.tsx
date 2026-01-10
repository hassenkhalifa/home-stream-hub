import { useState } from "react";
import { Heart, Trash2, Play, Clock, CheckCircle, List, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";

import movieAction1 from "@/assets/movie-action-1.jpg";
import movieAction2 from "@/assets/movie-action-2.jpg";
import movieComedy1 from "@/assets/movie-comedy-1.jpg";
import movieDrama1 from "@/assets/movie-drama-1.jpg";
import movieScifi1 from "@/assets/movie-scifi-1.jpg";
import movieScifi2 from "@/assets/movie-scifi-2.jpg";

interface SavedItem {
  id: number;
  title: string;
  image: string;
  addedDate: string;
  duration: string;
  progress?: number;
  category: "favorites" | "watchLater" | "watched";
}

const initialItems: SavedItem[] = [
  { id: 1, title: "Mission Extrême", image: movieAction1, addedDate: "2024-01-15", duration: "2h 15min", category: "favorites" },
  { id: 2, title: "Galaxie Perdue", image: movieScifi1, addedDate: "2024-01-14", duration: "2h 30min", progress: 45, category: "watchLater" },
  { id: 3, title: "Le Dernier Souffle", image: movieDrama1, addedDate: "2024-01-12", duration: "1h 55min", category: "watched" },
  { id: 4, title: "Rire en Famille", image: movieComedy1, addedDate: "2024-01-10", duration: "1h 42min", category: "favorites" },
  { id: 5, title: "L'Ultime Combat", image: movieAction2, addedDate: "2024-01-08", duration: "2h 10min", progress: 78, category: "watchLater" },
  { id: 6, title: "Horizon 2150", image: movieScifi2, addedDate: "2024-01-05", duration: "2h 22min", category: "watched" },
];

const MyList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<SavedItem[]>(initialItems);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getItemsByCategory = (category: SavedItem["category"]) => {
    return items.filter(item => item.category === category);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderItems = (categoryItems: SavedItem[]) => {
    if (categoryItems.length === 0) {
      return (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Liste vide</h3>
          <p className="text-muted-foreground mb-4">
            Ajoutez des contenus à cette liste pour les retrouver facilement
          </p>
          <Button onClick={() => navigate("/")}>
            Explorer le catalogue
          </Button>
        </div>
      );
    }

    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {categoryItems.map(item => (
            <div key={item.id} className="relative group">
              <ContentCard title={item.title} image={item.image} />
              {item.progress !== undefined && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {categoryItems.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
          >
            <div className="relative w-24 h-14 rounded overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.progress !== undefined && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{item.duration}</span>
                <span>Ajouté le {formatDate(item.addedDate)}</span>
                {item.progress !== undefined && (
                  <span className="text-primary">{item.progress}% vu</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => navigate(`/watch?title=${encodeURIComponent(item.title)}`)}
              >
                <Play className="h-4 w-4 mr-1" />
                {item.progress ? "Reprendre" : "Regarder"}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Ma Liste</h1>
              <p className="text-muted-foreground">
                {items.length} élément{items.length !== 1 ? 's' : ''} sauvegardé{items.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
              <Button
                size="icon"
                variant={viewMode === "grid" ? "default" : "ghost"}
                onClick={() => setViewMode("grid")}
                className="h-8 w-8"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
                className="h-8 w-8"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="favorites" className="w-full">
            <TabsList className="mb-6 bg-secondary">
              <TabsTrigger value="favorites" className="gap-2">
                <Heart className="h-4 w-4" />
                Favoris
                <span className="ml-1 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  {getItemsByCategory("favorites").length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="watchLater" className="gap-2">
                <Clock className="h-4 w-4" />
                À regarder
                <span className="ml-1 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  {getItemsByCategory("watchLater").length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="watched" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Déjà vus
                <span className="ml-1 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  {getItemsByCategory("watched").length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="favorites">
              {renderItems(getItemsByCategory("favorites"))}
            </TabsContent>
            
            <TabsContent value="watchLater">
              {renderItems(getItemsByCategory("watchLater"))}
            </TabsContent>
            
            <TabsContent value="watched">
              {renderItems(getItemsByCategory("watched"))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MyList;
