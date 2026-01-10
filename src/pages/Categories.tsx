import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";

import movieAction1 from "@/assets/movie-action-1.jpg";
import movieAction2 from "@/assets/movie-action-2.jpg";
import movieComedy1 from "@/assets/movie-comedy-1.jpg";
import movieDrama1 from "@/assets/movie-drama-1.jpg";
import movieScifi1 from "@/assets/movie-scifi-1.jpg";
import movieScifi2 from "@/assets/movie-scifi-2.jpg";

const categories = [
  {
    name: "Action",
    description: "Explosions, combats et adrénaline",
    color: "from-[hsl(0,70%,45%)] to-[hsl(25,80%,50%)]",
    iconBg: "bg-[hsl(0,70%,35%)]",
    previews: [movieAction1, movieAction2, movieScifi1],
  },
  {
    name: "Comédie",
    description: "Rires et bonne humeur garantis",
    color: "from-[hsl(45,75%,50%)] to-[hsl(340,60%,55%)]",
    iconBg: "bg-[hsl(45,75%,40%)]",
    previews: [movieComedy1, movieDrama1, movieAction1],
  },
  {
    name: "Drame",
    description: "Émotions intenses et histoires profondes",
    color: "from-[hsl(270,50%,45%)] to-[hsl(220,60%,45%)]",
    iconBg: "bg-[hsl(270,50%,35%)]",
    previews: [movieDrama1, movieScifi2, movieComedy1],
  },
  {
    name: "Science-Fiction",
    description: "Voyages spatiaux et futurs possibles",
    color: "from-[hsl(190,60%,45%)] to-[hsl(220,70%,40%)]",
    iconBg: "bg-[hsl(190,60%,35%)]",
    previews: [movieScifi1, movieScifi2, movieAction2],
  },
  {
    name: "Horreur",
    description: "Frissons et suspense terrifiant",
    color: "from-[hsl(240,10%,25%)] to-[hsl(0,50%,30%)]",
    iconBg: "bg-[hsl(0,50%,25%)]",
    previews: [movieDrama1, movieAction2, movieScifi1],
  },
  {
    name: "Romance",
    description: "Histoires d'amour touchantes",
    color: "from-[hsl(340,55%,50%)] to-[hsl(350,60%,45%)]",
    iconBg: "bg-[hsl(340,55%,40%)]",
    previews: [movieComedy1, movieDrama1, movieScifi2],
  },
  {
    name: "Thriller",
    description: "Suspense et tension psychologique",
    color: "from-[hsl(220,15%,30%)] to-[hsl(240,10%,20%)]",
    iconBg: "bg-[hsl(220,15%,25%)]",
    previews: [movieAction1, movieDrama1, movieScifi1],
  },
  {
    name: "Animation",
    description: "Pour petits et grands enfants",
    color: "from-[hsl(150,50%,45%)] to-[hsl(160,55%,40%)]",
    iconBg: "bg-[hsl(150,50%,35%)]",
    previews: [movieComedy1, movieScifi2, movieAction1],
  },
  {
    name: "Documentaire",
    description: "Découvertes et histoires vraies",
    color: "from-[hsl(35,60%,45%)] to-[hsl(45,70%,40%)]",
    iconBg: "bg-[hsl(35,60%,35%)]",
    previews: [movieDrama1, movieScifi1, movieAction2],
  },
  {
    name: "Fantastique",
    description: "Magie, créatures et mondes imaginaires",
    color: "from-[hsl(280,55%,50%)] to-[hsl(290,50%,40%)]",
    iconBg: "bg-[hsl(280,55%,40%)]",
    previews: [movieScifi2, movieAction1, movieComedy1],
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-medium text-foreground mb-2 tracking-tight">Catégories</h1>
          <p className="text-muted-foreground text-sm mb-8">Explorez notre catalogue par genre</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/search?genre=${encodeURIComponent(category.name)}`}
                className="group relative overflow-hidden rounded-3xl aspect-[16/10] cursor-pointer elevation-1 hover:elevation-3 transition-all duration-300"
              >
                {/* M3 Tonal Background with Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`} />
                
                {/* Preview Images - Subtle overlay */}
                <div className="absolute inset-0 flex opacity-20">
                  {category.previews.map((preview, index) => (
                    <div
                      key={index}
                      className="flex-1 group-hover:opacity-70 transition-opacity duration-500"
                      style={{
                        backgroundImage: `url(${preview})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  ))}
                </div>
                
                {/* Bottom Gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* M3 Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-end justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-medium text-white mb-1 tracking-tight group-hover:text-primary transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-white/75 text-sm">
                        {category.description}
                      </p>
                    </div>
                    {/* M3 Icon Button */}
                    <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                      <ChevronRight className="h-6 w-6 text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
                
                {/* M3 State Layer on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 rounded-3xl" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Categories;
