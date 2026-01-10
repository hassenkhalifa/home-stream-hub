import { useState } from "react";
import { Heart, Trash2, Play, Clock, CheckCircle, List, Grid3X3, MoreVertical } from "lucide-react";
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

// M3 Segmented Button Component
const SegmentedButton = ({ 
  options, 
  value, 
  onChange 
}: { 
  options: { value: string; icon: React.ReactNode }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex bg-surface-container-high rounded-3xl p-1 gap-1">
    {options.map((option) => (
      <button
        key={option.value}
        onClick={() => onChange(option.value)}
        className={`
          flex items-center justify-center w-10 h-10 rounded-3xl transition-all duration-200
          ${value === option.value 
            ? 'bg-secondary-container text-secondary-on-container' 
            : 'text-muted-foreground hover:bg-surface-container-highest'
          }
        `}
      >
        {option.icon}
      </button>
    ))}
  </div>
);

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
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">Liste vide</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
            Ajoutez des contenus à cette liste pour les retrouver facilement
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="h-12 px-6 rounded-3xl bg-primary text-primary-foreground hover:bg-primary/90"
          >
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
              {/* M3 Progress Indicator */}
              {item.progress !== undefined && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-container-highest rounded-b-2xl overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all" 
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
              {/* M3 Icon Button for delete */}
              <Button
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 h-10 w-10 rounded-2xl bg-surface-container-highest/90 backdrop-blur-sm hover:bg-destructive text-foreground hover:text-destructive-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item.id);
                }}
              >
                <Trash2 className="h-5 w-5" />
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
            className="flex items-center gap-4 p-4 bg-surface-container rounded-3xl hover:bg-surface-container-high transition-colors duration-200 group"
          >
            {/* M3 Thumbnail */}
            <div className="relative w-28 h-16 rounded-2xl overflow-hidden flex-shrink-0 elevation-1">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.progress !== undefined && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-container-highest">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">{item.title}</h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                <span>{item.duration}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>Ajouté le {formatDate(item.addedDate)}</span>
                {item.progress !== undefined && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="text-primary font-medium">{item.progress}%</span>
                  </>
                )}
              </div>
            </div>
            
            {/* M3 Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate(`/watch?title=${encodeURIComponent(item.title)}`)}
                className="h-10 px-5 rounded-3xl bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <Play className="h-4 w-4" />
                {item.progress ? "Reprendre" : "Regarder"}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 rounded-2xl hover:bg-surface-container-highest"
                onClick={() => removeItem(item.id)}
              >
                <MoreVertical className="h-5 w-5 text-muted-foreground" />
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
          {/* M3 Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-1 tracking-tight">Ma Liste</h1>
              <p className="text-muted-foreground text-sm">
                {items.length} élément{items.length !== 1 ? 's' : ''} sauvegardé{items.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {/* M3 Segmented Button for view mode */}
            <SegmentedButton
              options={[
                { value: "grid", icon: <Grid3X3 className="h-5 w-5" /> },
                { value: "list", icon: <List className="h-5 w-5" /> },
              ]}
              value={viewMode}
              onChange={(v) => setViewMode(v as "grid" | "list")}
            />
          </div>

          {/* M3 Navigation Tabs */}
          <Tabs defaultValue="favorites" className="w-full">
            <TabsList className="mb-8 bg-surface-container p-1 rounded-3xl h-auto gap-1">
              <TabsTrigger 
                value="favorites" 
                className="gap-2 px-5 py-3 rounded-3xl data-[state=active]:bg-secondary-container data-[state=active]:text-secondary-on-container"
              >
                <Heart className="h-4 w-4" />
                Favoris
                <span className="ml-1 text-xs bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-medium">
                  {getItemsByCategory("favorites").length}
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="watchLater" 
                className="gap-2 px-5 py-3 rounded-3xl data-[state=active]:bg-secondary-container data-[state=active]:text-secondary-on-container"
              >
                <Clock className="h-4 w-4" />
                À regarder
                <span className="ml-1 text-xs bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-medium">
                  {getItemsByCategory("watchLater").length}
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="watched" 
                className="gap-2 px-5 py-3 rounded-3xl data-[state=active]:bg-secondary-container data-[state=active]:text-secondary-on-container"
              >
                <CheckCircle className="h-4 w-4" />
                Déjà vus
                <span className="ml-1 text-xs bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-medium">
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
