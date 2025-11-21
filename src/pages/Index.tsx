import Header from "@/components/Header";
import ContentCarousel from "@/components/ContentCarousel";
import movieAction1 from "@/assets/movie-action-1.jpg";
import movieAction2 from "@/assets/movie-action-2.jpg";
import movieScifi1 from "@/assets/movie-scifi-1.jpg";
import movieScifi2 from "@/assets/movie-scifi-2.jpg";
import movieDrama1 from "@/assets/movie-drama-1.jpg";
import movieComedy1 from "@/assets/movie-comedy-1.jpg";

const Index = () => {
  const continueWatching = [
    { id: 1, title: "Mission Extrême", image: movieAction1, progress: 65 },
    { id: 2, title: "Étoiles Perdues", image: movieScifi1, progress: 32 },
    { id: 3, title: "Cœurs Brisés", image: movieDrama1, progress: 78 },
    { id: 4, title: "Rires et Larmes", image: movieComedy1, progress: 45 },
    { id: 5, title: "Course Infernale", image: movieAction2, progress: 12 },
  ];

  const recommendations = [
    { id: 6, title: "Nuit Étoilée", image: movieScifi2 },
    { id: 7, title: "Action Totale", image: movieAction1 },
    { id: 8, title: "Voyage Cosmique", image: movieScifi1 },
    { id: 9, title: "Romance Éternelle", image: movieDrama1 },
    { id: 10, title: "Vitesse Maximum", image: movieAction2 },
  ];

  const actionMovies = [
    { id: 11, title: "Mission Extrême", image: movieAction1 },
    { id: 12, title: "Course Infernale", image: movieAction2 },
    { id: 13, title: "Agent Spécial", image: movieAction1 },
    { id: 14, title: "Zone de Combat", image: movieAction2 },
    { id: 15, title: "Opération Delta", image: movieAction1 },
  ];

  const scifiMovies = [
    { id: 16, title: "Étoiles Perdues", image: movieScifi1 },
    { id: 17, title: "Nuit Étoilée", image: movieScifi2 },
    { id: 18, title: "Cosmos Infini", image: movieScifi1 },
    { id: 19, title: "Galaxie 9", image: movieScifi2 },
    { id: 20, title: "Voyageurs du Temps", image: movieScifi1 },
  ];

  const dramaMovies = [
    { id: 21, title: "Cœurs Brisés", image: movieDrama1 },
    { id: 22, title: "Romance Éternelle", image: movieDrama1 },
    { id: 23, title: "Larmes de Joie", image: movieDrama1 },
    { id: 24, title: "Souvenirs d'Été", image: movieDrama1 },
    { id: 25, title: "Promesses Perdues", image: movieDrama1 },
  ];

  const comedyMovies = [
    { id: 26, title: "Rires et Larmes", image: movieComedy1 },
    { id: 27, title: "Drôle de Vie", image: movieComedy1 },
    { id: 28, title: "Fou Rire Garanti", image: movieComedy1 },
    { id: 29, title: "Blagues à Part", image: movieComedy1 },
    { id: 30, title: "Comédie Musicale", image: movieComedy1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto">
          <ContentCarousel title="Continuer à regarder" contents={continueWatching} />
          <ContentCarousel title="Recommandations pour vous" contents={recommendations} />
          <ContentCarousel title="Action" contents={actionMovies} />
          <ContentCarousel title="Science-Fiction" contents={scifiMovies} />
          <ContentCarousel title="Drame" contents={dramaMovies} />
          <ContentCarousel title="Comédie" contents={comedyMovies} />
        </div>
      </main>
    </div>
  );
};

export default Index;
