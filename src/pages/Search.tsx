import { useState } from "react";
import { Search as SearchIcon, SlidersHorizontal, Star, Calendar, Film, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";

import movieAction1 from "@/assets/movie-action-1.jpg";
import movieAction2 from "@/assets/movie-action-2.jpg";
import movieComedy1 from "@/assets/movie-comedy-1.jpg";
import movieDrama1 from "@/assets/movie-drama-1.jpg";
import movieScifi1 from "@/assets/movie-scifi-1.jpg";
import movieScifi2 from "@/assets/movie-scifi-2.jpg";

const allContent = [
  { id: 1, title: "Mission Extrême", image: movieAction1, genre: "Action", year: 2024, rating: 4.8 },
  { id: 2, title: "L'Ultime Combat", image: movieAction2, genre: "Action", year: 2023, rating: 4.5 },
  { id: 3, title: "Rire en Famille", image: movieComedy1, genre: "Comédie", year: 2024, rating: 4.2 },
  { id: 4, title: "Le Dernier Souffle", image: movieDrama1, genre: "Drame", year: 2022, rating: 4.9 },
  { id: 5, title: "Galaxie Perdue", image: movieScifi1, genre: "Sci-Fi", year: 2024, rating: 4.7 },
  { id: 6, title: "Horizon 2150", image: movieScifi2, genre: "Sci-Fi", year: 2023, rating: 4.4 },
  { id: 7, title: "Course Mortelle", image: movieAction1, genre: "Action", year: 2021, rating: 4.1 },
  { id: 8, title: "Éclats de Rire", image: movieComedy1, genre: "Comédie", year: 2023, rating: 4.0 },
  { id: 9, title: "Secrets de Famille", image: movieDrama1, genre: "Drame", year: 2024, rating: 4.6 },
  { id: 10, title: "Les Étoiles Mortes", image: movieScifi2, genre: "Sci-Fi", year: 2022, rating: 4.3 },
  { id: 11, title: "Vengeance Ultime", image: movieAction2, genre: "Action", year: 2024, rating: 4.4 },
  { id: 12, title: "Dimension X", image: movieScifi1, genre: "Sci-Fi", year: 2021, rating: 4.8 },
];

const genres = ["Tous", "Action", "Comédie", "Drame", "Sci-Fi", "Horreur", "Romance", "Thriller"];
const years = ["Toutes", "2024", "2023", "2022", "2021", "2020"];

// M3 Filter Chip Component
const FilterChip = ({ 
  label, 
  selected, 
  onToggle,
  onRemove,
  showRemove = false
}: { 
  label: string; 
  selected?: boolean; 
  onToggle?: () => void;
  onRemove?: () => void;
  showRemove?: boolean;
}) => (
  <button
    onClick={showRemove ? onRemove : onToggle}
    className={`
      inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
      transition-all duration-200 ease-out
      ${selected 
        ? 'bg-secondary-container text-secondary-on-container border border-secondary/30' 
        : 'bg-surface-container-high text-foreground border border-border hover:bg-surface-container-highest'
      }
    `}
  >
    {selected && <Check className="h-4 w-4" />}
    {label}
    {showRemove && <X className="h-3.5 w-3.5 hover:text-destructive" />}
  </button>
);

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tous");
  const [selectedYear, setSelectedYear] = useState("Toutes");
  const [minRating, setMinRating] = useState([0]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const applyFilters = () => {
    const filters: string[] = [];
    if (selectedGenre !== "Tous") filters.push(selectedGenre);
    if (selectedYear !== "Toutes") filters.push(selectedYear);
    if (minRating[0] > 0) filters.push(`${minRating[0]}+ ★`);
    setActiveFilters(filters);
  };

  const clearFilter = (filter: string) => {
    if (genres.includes(filter)) setSelectedGenre("Tous");
    if (years.includes(filter)) setSelectedYear("Toutes");
    if (filter.includes("★")) setMinRating([0]);
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setSelectedGenre("Tous");
    setSelectedYear("Toutes");
    setMinRating([0]);
    setActiveFilters([]);
  };

  const filteredContent = allContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "Tous" || content.genre === selectedGenre;
    const matchesYear = selectedYear === "Toutes" || content.year.toString() === selectedYear;
    const matchesRating = content.rating >= minRating[0];
    return matchesSearch && matchesGenre && matchesYear && matchesRating;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* M3 Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-medium text-foreground mb-6 tracking-tight">Rechercher</h1>
            
            <div className="flex gap-3 flex-col md:flex-row">
              {/* M3 Search Bar */}
              <div className="flex-1 relative">
                <div className="relative bg-surface-container-highest rounded-3xl overflow-hidden elevation-1 transition-all duration-300 focus-within:elevation-2">
                  <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un film, une série..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-14 pr-5 h-14 text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              
              {/* M3 Filter FAB - Mobile */}
              <Sheet>
                <SheetTrigger asChild>
                <Button 
                    className="md:hidden h-14 w-14 rounded-2xl bg-primary-container text-primary-on-container hover:bg-primary-container/90 elevation-2"
                  >
                    <SlidersHorizontal className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-surface border-border">
                  <SheetHeader>
                    <SheetTitle className="text-xl font-medium">Filtres</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-8">
                    <FilterControls
                      selectedGenre={selectedGenre}
                      setSelectedGenre={setSelectedGenre}
                      selectedYear={selectedYear}
                      setSelectedYear={setSelectedYear}
                      minRating={minRating}
                      setMinRating={setMinRating}
                    />
                    <Button 
                      onClick={applyFilters} 
                      className="w-full h-12 rounded-3xl bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Appliquer les filtres
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* M3 Desktop Filter Chips */}
          <div className="hidden md:block mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Film className="h-4 w-4" />
                <span>Genre:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <FilterChip
                    key={genre}
                    label={genre}
                    selected={selectedGenre === genre}
                    onToggle={() => {
                      setSelectedGenre(genre);
                      applyFilters();
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Année:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {years.map(year => (
                  <FilterChip
                    key={year}
                    label={year}
                    selected={selectedYear === year}
                    onToggle={() => {
                      setSelectedYear(year);
                      applyFilters();
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4" />
                <span>Note min:</span>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-high rounded-2xl px-4 py-3 w-64">
                <Slider
                  value={minRating}
                  onValueChange={setMinRating}
                  max={5}
                  step={0.5}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-foreground min-w-[2rem]">{minRating[0]}</span>
              </div>
              <Button 
                onClick={applyFilters} 
                className="h-10 px-6 rounded-3xl bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Appliquer
              </Button>
            </div>
          </div>

          {/* M3 Active Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilters.map(filter => (
                <FilterChip
                  key={filter}
                  label={filter}
                  selected
                  showRemove
                  onRemove={() => clearFilter(filter)}
                />
              ))}
              <button 
                onClick={clearAllFilters}
                className="text-sm text-primary hover:text-primary/80 px-3 py-2 font-medium"
              >
                Effacer tout
              </button>
            </div>
          )}

          {/* Results Count */}
          <p className="text-muted-foreground text-sm mb-6">
            {filteredContent.length} résultat{filteredContent.length !== 1 ? 's' : ''} trouvé{filteredContent.length !== 1 ? 's' : ''}
          </p>

          {/* M3 Results Grid */}
          {filteredContent.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredContent.map(content => (
                <ContentCard
                  key={content.id}
                  title={content.title}
                  image={content.image}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-6">
                <SearchIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">Aucun résultat</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                Essayez de modifier vos filtres ou votre recherche
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const FilterControls = ({
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  minRating,
  setMinRating,
}: {
  selectedGenre: string;
  setSelectedGenre: (v: string) => void;
  selectedYear: string;
  setSelectedYear: (v: string) => void;
  minRating: number[];
  setMinRating: (v: number[]) => void;
}) => (
  <>
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Genre</label>
      <div className="flex flex-wrap gap-2">
        {genres.map(genre => (
          <FilterChip
            key={genre}
            label={genre}
            selected={selectedGenre === genre}
            onToggle={() => setSelectedGenre(genre)}
          />
        ))}
      </div>
    </div>
    
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Année</label>
      <div className="flex flex-wrap gap-2">
        {years.map(year => (
          <FilterChip
            key={year}
            label={year}
            selected={selectedYear === year}
            onToggle={() => setSelectedYear(year)}
          />
        ))}
      </div>
    </div>
    
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Note minimum: {minRating[0]}</label>
      <div className="bg-surface-container-high rounded-2xl px-4 py-4">
        <Slider
          value={minRating}
          onValueChange={setMinRating}
          max={5}
          step={0.5}
        />
      </div>
    </div>
  </>
);

export default Search;
