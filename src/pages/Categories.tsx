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
    gradient: "from-red-600 to-orange-500",
    previews: [movieAction1, movieAction2, movieScifi1],
  },
  {
    name: "Comédie",
    description: "Rires et bonne humeur garantis",
    gradient: "from-yellow-500 to-pink-500",
    previews: [movieComedy1, movieDrama1, movieAction1],
  },
  {
    name: "Drame",
    description: "Émotions intenses et histoires profondes",
    gradient: "from-purple-600 to-blue-600",
    previews: [movieDrama1, movieScifi2, movieComedy1],
  },
  {
    name: "Science-Fiction",
    description: "Voyages spatiaux et futurs possibles",
    gradient: "from-cyan-500 to-blue-700",
    previews: [movieScifi1, movieScifi2, movieAction2],
  },
  {
    name: "Horreur",
    description: "Frissons et suspense terrifiant",
    gradient: "from-gray-800 to-red-900",
    previews: [movieDrama1, movieAction2, movieScifi1],
  },
  {
    name: "Romance",
    description: "Histoires d'amour touchantes",
    gradient: "from-pink-500 to-rose-600",
    previews: [movieComedy1, movieDrama1, movieScifi2],
  },
  {
    name: "Thriller",
    description: "Suspense et tension psychologique",
    gradient: "from-slate-700 to-zinc-900",
    previews: [movieAction1, movieDrama1, movieScifi1],
  },
  {
    name: "Animation",
    description: "Pour petits et grands enfants",
    gradient: "from-green-400 to-emerald-600",
    previews: [movieComedy1, movieScifi2, movieAction1],
  },
  {
    name: "Documentaire",
    description: "Découvertes et histoires vraies",
    gradient: "from-amber-600 to-yellow-700",
    previews: [movieDrama1, movieScifi1, movieAction2],
  },
  {
    name: "Fantastique",
    description: "Magie, créatures et mondes imaginaires",
    gradient: "from-violet-600 to-purple-800",
    previews: [movieScifi2, movieAction1, movieComedy1],
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Catégories</h1>
          <p className="text-muted-foreground mb-8">Explorez notre catalogue par genre</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/search?genre=${encodeURIComponent(category.name)}`}
                className="group relative overflow-hidden rounded-xl aspect-[16/9] cursor-pointer"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`} />
                
                {/* Preview Images */}
                <div className="absolute inset-0 flex">
                  {category.previews.map((preview, index) => (
                    <div
                      key={index}
                      className="flex-1 opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                      style={{
                        backgroundImage: `url(${preview})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  ))}
                </div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {category.description}
                      </p>
                    </div>
                    <ChevronRight className="h-6 w-6 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Categories;
