import { useState } from "react";
import { Search as SearchIcon, Filter, Star, Calendar, Film, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">Rechercher</h1>
            
            <div className="flex gap-4 flex-col md:flex-row">
              {/* Search Input */}
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un film, une série..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg bg-secondary border-border"
                />
              </div>
              
              {/* Filter Button - Mobile */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden h-12 gap-2">
                    <Filter className="h-5 w-5" />
                    Filtres
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filtres</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <FilterControls
                      selectedGenre={selectedGenre}
                      setSelectedGenre={setSelectedGenre}
                      selectedYear={selectedYear}
                      setSelectedYear={setSelectedYear}
                      minRating={minRating}
                      setMinRating={setMinRating}
                    />
                    <Button onClick={applyFilters} className="w-full">
                      Appliquer les filtres
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex gap-4 mb-6 items-end">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Film className="h-4 w-4" /> Genre
              </label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-40 bg-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Année
              </label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32 bg-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 w-48">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Star className="h-4 w-4" /> Note minimum: {minRating[0]}
              </label>
              <Slider
                value={minRating}
                onValueChange={setMinRating}
                max={5}
                step={0.5}
                className="py-2"
              />
            </div>
            
            <Button onClick={applyFilters} variant="secondary">
              Appliquer
            </Button>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilters.map(filter => (
                <Badge key={filter} variant="secondary" className="gap-1 px-3 py-1">
                  {filter}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-primary" 
                    onClick={() => clearFilter(filter)}
                  />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Effacer tout
              </Button>
            </div>
          )}

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            {filteredContent.length} résultat{filteredContent.length !== 1 ? 's' : ''} trouvé{filteredContent.length !== 1 ? 's' : ''}
          </p>

          {/* Results Grid */}
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
            <div className="text-center py-16">
              <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Aucun résultat</h3>
              <p className="text-muted-foreground">
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
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground">Genre</label>
      <Select value={selectedGenre} onValueChange={setSelectedGenre}>
        <SelectTrigger className="w-full bg-secondary">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {genres.map(genre => (
            <SelectItem key={genre} value={genre}>{genre}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground">Année</label>
      <Select value={selectedYear} onValueChange={setSelectedYear}>
        <SelectTrigger className="w-full bg-secondary">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {years.map(year => (
            <SelectItem key={year} value={year}>{year}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground">Note minimum: {minRating[0]}</label>
      <Slider
        value={minRating}
        onValueChange={setMinRating}
        max={5}
        step={0.5}
      />
    </div>
  </>
);

export default Search;
