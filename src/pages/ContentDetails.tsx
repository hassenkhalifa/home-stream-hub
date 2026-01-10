import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Plus, Download, Share2, Star, Calendar, Clock, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import ContentCarousel from "@/components/ContentCarousel";

import movieAction1 from "@/assets/movie-action-1.jpg";
import movieAction2 from "@/assets/movie-action-2.jpg";
import movieScifi1 from "@/assets/movie-scifi-1.jpg";
import movieScifi2 from "@/assets/movie-scifi-2.jpg";
import movieDrama1 from "@/assets/movie-drama-1.jpg";
import movieComedy1 from "@/assets/movie-comedy-1.jpg";

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

const ContentDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const title = searchParams.get("title") || "Film Inconnu";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] w-full">
        <img
          src={movieAction1}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-24 left-6 bg-background/50 hover:bg-background/70 backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Content Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="text-foreground font-semibold">8.5</span>
                <span>/10</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>2024</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>2h 15min</span>
              </div>
              <div className="flex items-center gap-1">
                <Film className="h-4 w-4" />
                <span>Action, Thriller</span>
              </div>
              <Badge variant="outline" className="text-xs">HD</Badge>
              <Badge variant="outline" className="text-xs">5.1</Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => navigate(`/watch?title=${encodeURIComponent(title)}`)}
              >
                <Play className="h-5 w-5 fill-current" />
                Regarder
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

      {/* Content Details */}
      <div className="px-8 py-8 space-y-10">
        {/* Synopsis */}
        <section className="max-w-3xl">
          <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
          <p className="text-muted-foreground leading-relaxed">
            Dans un monde où les frontières entre réalité et fiction s'estompent, un ancien agent 
            secret doit reprendre du service pour une dernière mission. Alors que les enjeux 
            n'ont jamais été aussi élevés, il devra affronter ses démons du passé tout en 
            protégeant ceux qu'il aime. Une course contre la montre haletante qui le mènera 
            aux quatre coins du globe dans cette aventure spectaculaire pleine de rebondissements.
          </p>
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
            <h3 className="text-sm text-muted-foreground mb-1">Réalisateur</h3>
            <p className="font-medium">Christopher Nolan</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">Producteur</h3>
            <p className="font-medium">Warner Bros.</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">Langue</h3>
            <p className="font-medium">Français, Anglais</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">Classification</h3>
            <p className="font-medium">Tout public</p>
          </div>
        </section>

        {/* Similar Content */}
        <section>
          <ContentCarousel title="Titres similaires" contents={similarContent} />
        </section>
      </div>
    </div>
  );
};

export default ContentDetails;
