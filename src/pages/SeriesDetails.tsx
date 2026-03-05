import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Plus, Download, Share2, Star, Calendar, Clock, Film, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import ContentCarousel from "@/components/ContentCarousel";
import { useState } from "react";

import movieAction1 from "@/assets/movie-action-1.jpg";
import movieAction2 from "@/assets/movie-action-2.jpg";
import movieScifi1 from "@/assets/movie-scifi-1.jpg";
import movieScifi2 from "@/assets/movie-scifi-2.jpg";
import movieDrama1 from "@/assets/movie-drama-1.jpg";
import movieComedy1 from "@/assets/movie-comedy-1.jpg";

interface Episode {
  number: number;
  title: string;
  duration: string;
  synopsis: string;
  image: string;
  rating: number;
}

interface Season {
  number: number;
  year: string;
  episodes: Episode[];
}

const seriesData: Season[] = [
  {
    number: 1,
    year: "2022",
    episodes: [
      { number: 1, title: "Le Commencement", duration: "52 min", synopsis: "Un mystérieux événement bouleverse la vie d'une petite ville côtière. Les habitants découvrent que rien ne sera plus jamais comme avant.", image: movieAction1, rating: 8.7 },
      { number: 2, title: "L'Ombre Grandit", duration: "48 min", synopsis: "Alors que les investigations commencent, de nouveaux indices mènent à une conspiration bien plus grande que prévu.", image: movieScifi1, rating: 8.4 },
      { number: 3, title: "Révélations", duration: "55 min", synopsis: "Les secrets du passé refont surface, mettant en danger ceux qui cherchent la vérité à tout prix.", image: movieDrama1, rating: 8.9 },
      { number: 4, title: "Point de Rupture", duration: "50 min", synopsis: "Les alliances se brisent et les trahisons se multiplient. Personne n'est à l'abri.", image: movieAction2, rating: 8.6 },
      { number: 5, title: "La Chute", duration: "47 min", synopsis: "Un retournement de situation inattendu change la donne. Les héros doivent tout repenser.", image: movieComedy1, rating: 8.3 },
      { number: 6, title: "Renaissance", duration: "58 min", synopsis: "Le final de la saison apporte son lot de surprises et prépare le terrain pour la suite.", image: movieScifi2, rating: 9.1 },
    ],
  },
  {
    number: 2,
    year: "2023",
    episodes: [
      { number: 1, title: "Nouveau Départ", duration: "54 min", synopsis: "Six mois après les événements de la première saison, la ville tente de se reconstruire mais de nouvelles menaces apparaissent.", image: movieScifi2, rating: 8.8 },
      { number: 2, title: "Territoires Inconnus", duration: "51 min", synopsis: "L'équipe s'aventure dans des zones inexplorées à la recherche de réponses cruciales.", image: movieAction1, rating: 8.5 },
      { number: 3, title: "Le Prix à Payer", duration: "49 min", synopsis: "Chaque décision a des conséquences. Les protagonistes font face à des choix impossibles.", image: movieDrama1, rating: 8.7 },
      { number: 4, title: "Sous la Surface", duration: "53 min", synopsis: "Des découvertes souterraines révèlent l'ampleur de la conspiration qui menace le monde entier.", image: movieScifi1, rating: 9.0 },
      { number: 5, title: "L'Affrontement", duration: "56 min", synopsis: "Le conflit atteint son paroxysme dans un affrontement épique entre les forces en présence.", image: movieAction2, rating: 9.2 },
      { number: 6, title: "Horizons", duration: "62 min", synopsis: "Un final explosif qui redéfinit tout ce que nous savions. Rien ne sera plus jamais pareil.", image: movieComedy1, rating: 9.4 },
    ],
  },
  {
    number: 3,
    year: "2024",
    episodes: [
      { number: 1, title: "Le Retour", duration: "50 min", synopsis: "Après une longue absence, le personnage principal revient avec une mission impossible.", image: movieDrama1, rating: 8.9 },
      { number: 2, title: "Alliances", duration: "48 min", synopsis: "De nouveaux personnages entrent en jeu, apportant avec eux des secrets et des compétences uniques.", image: movieAction1, rating: 8.6 },
      { number: 3, title: "Le Labyrinthe", duration: "55 min", synopsis: "Piégés dans un jeu complexe, les héros doivent résoudre des énigmes pour survivre.", image: movieScifi2, rating: 9.1 },
      { number: 4, title: "Dernier Acte", duration: "65 min", synopsis: "Le grand final de la série. Tous les fils narratifs convergent dans une conclusion épique et émouvante.", image: movieAction2, rating: 9.5 },
    ],
  },
];

const castMembers = [
  { name: "Tom Hanks", role: "John Miller", image: "https://i.pravatar.cc/150?img=1" },
  { name: "Emma Watson", role: "Sarah Connor", image: "https://i.pravatar.cc/150?img=5" },
  { name: "Chris Evans", role: "James Reed", image: "https://i.pravatar.cc/150?img=3" },
  { name: "Scarlett Johansson", role: "Maria Lopez", image: "https://i.pravatar.cc/150?img=9" },
  { name: "Robert Downey Jr.", role: "Dr. Strange", image: "https://i.pravatar.cc/150?img=8" },
];

const similarContent = [
  { id: 1, title: "Action Hero", image: movieAction1 },
  { id: 2, title: "Battle Zone", image: movieAction2 },
  { id: 3, title: "Galaxy Quest", image: movieScifi1 },
  { id: 4, title: "Time Warp", image: movieScifi2 },
  { id: 5, title: "The Journey", image: movieDrama1 },
  { id: 6, title: "Comedy Night", image: movieComedy1 },
];

const SeriesDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const title = searchParams.get("title") || "Série Inconnue";
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [seasonDropdownOpen, setSeasonDropdownOpen] = useState(false);

  const currentSeason = seriesData[selectedSeason];
  const totalEpisodes = seriesData.reduce((acc, s) => acc + s.episodes.length, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img
          src={movieScifi1}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-24 left-6 bg-background/50 hover:bg-background/70 backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
          <div className="max-w-3xl space-y-4">
            <Badge className="bg-primary/20 text-primary border-primary/30">Série</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="text-foreground font-semibold">9.1</span>
                <span>/10</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>2022 - 2024</span>
              </div>
              <div className="flex items-center gap-1">
                <Film className="h-4 w-4" />
                <span>{seriesData.length} Saisons</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{totalEpisodes} Épisodes</span>
              </div>
              <Badge variant="outline" className="text-xs">HD</Badge>
              <Badge variant="outline" className="text-xs">5.1</Badge>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => navigate(`/watch?title=${encodeURIComponent(title + " - S1E1")}`)}
              >
                <Play className="h-5 w-5 fill-current" />
                Regarder S1:E1
              </Button>
              <Button size="lg" variant="secondary" className="gap-2">
                <Plus className="h-5 w-5" />
                Ma Liste
              </Button>
              <Button size="icon" variant="outline" className="h-11 w-11">
                <Download className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="h-11 w-11">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-10">
        {/* Synopsis */}
        <section className="max-w-3xl">
          <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
          <p className="text-muted-foreground leading-relaxed">
            Dans un monde où les frontières entre réalité et fiction s'estompent, une équipe
            d'enquêteurs hors du commun se lance dans une quête de vérité à travers trois saisons
            haletantes. Conspirations, trahisons et révélations s'enchaînent dans cette série
            captivante qui redéfinit le genre du thriller contemporain.
          </p>
        </section>

        {/* Season Selector & Episodes */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Épisodes</h2>

            {/* Season Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                className="gap-2 min-w-[160px] justify-between"
                onClick={() => setSeasonDropdownOpen(!seasonDropdownOpen)}
              >
                Saison {currentSeason.number}
                <ChevronDown className={`h-4 w-4 transition-transform ${seasonDropdownOpen ? "rotate-180" : ""}`} />
              </Button>
              {seasonDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-popover border border-border rounded-lg shadow-xl z-50 overflow-hidden min-w-[160px]">
                  {seriesData.map((season, index) => (
                    <button
                      key={season.number}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-accent transition-colors flex items-center justify-between ${
                        selectedSeason === index ? "bg-primary/10 text-primary" : ""
                      }`}
                      onClick={() => {
                        setSelectedSeason(index);
                        setSeasonDropdownOpen(false);
                      }}
                    >
                      <span>Saison {season.number}</span>
                      <span className="text-muted-foreground text-xs">{season.year}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Season Info */}
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <span>{currentSeason.episodes.length} épisodes</span>
            <span>•</span>
            <span>{currentSeason.year}</span>
          </div>

          {/* Episode List */}
          <div className="space-y-4">
            {currentSeason.episodes.map((episode) => (
              <div
                key={episode.number}
                className="group flex gap-4 p-4 rounded-xl bg-surface-container-high/50 hover:bg-surface-container-highest/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/watch?title=${encodeURIComponent(`${title} - S${currentSeason.number}E${episode.number}`)}`)}
              >
                {/* Episode Thumbnail */}
                <div className="relative flex-shrink-0 w-40 md:w-52 aspect-video rounded-lg overflow-hidden">
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-10 w-10 rounded-full bg-foreground/90 flex items-center justify-center">
                      <Play className="h-4 w-4 fill-background text-background" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm text-xs px-2 py-0.5 rounded">
                    {episode.duration}
                  </div>
                </div>

                {/* Episode Info */}
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">
                        <span className="text-muted-foreground mr-2">E{episode.number}</span>
                        {episode.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {episode.synopsis}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1 text-sm">
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="text-foreground font-medium">{episode.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cast */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Distribution</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {castMembers.map((member, index) => (
              <div key={index} className="flex-shrink-0 text-center space-y-2">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto ring-2 ring-border"
                />
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Details Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">Créateur</h3>
            <p className="font-medium">David Fincher</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">Production</h3>
            <p className="font-medium">HBO Max</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">Langue</h3>
            <p className="font-medium">Français, Anglais</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">Classification</h3>
            <p className="font-medium">+16</p>
          </div>
        </section>

        {/* Similar Content */}
        <section>
          <ContentCarousel title="Séries similaires" contents={similarContent} />
        </section>
      </div>
    </div>
  );
};

export default SeriesDetails;
