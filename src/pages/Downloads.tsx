import { useState } from "react";
import Header from "@/components/Header";
import { Download, Trash2, Play, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import movieAction1 from "@/assets/movie-action-1.jpg";
import movieScifi1 from "@/assets/movie-scifi-1.jpg";
import movieDrama1 from "@/assets/movie-drama-1.jpg";
import movieComedy1 from "@/assets/movie-comedy-1.jpg";
import { useNavigate } from "react-router-dom";

interface DownloadItem {
  id: number;
  title: string;
  image: string;
  type: "film" | "serie";
  size: string;
  progress: number;
  status: "completed" | "downloading" | "paused";
  downloadDate: string;
}

const Downloads = () => {
  const navigate = useNavigate();
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    {
      id: 1,
      title: "Mission Extrême",
      image: movieAction1,
      type: "film",
      size: "4.2 GB",
      progress: 100,
      status: "completed",
      downloadDate: "Il y a 2 jours",
    },
    {
      id: 2,
      title: "Étoiles Perdues",
      image: movieScifi1,
      type: "film",
      size: "3.8 GB",
      progress: 100,
      status: "completed",
      downloadDate: "Il y a 5 jours",
    },
    {
      id: 3,
      title: "Cœurs Brisés - S01E01",
      image: movieDrama1,
      type: "serie",
      size: "1.2 GB",
      progress: 65,
      status: "downloading",
      downloadDate: "En cours",
    },
    {
      id: 4,
      title: "Rires et Larmes",
      image: movieComedy1,
      type: "film",
      size: "3.5 GB",
      progress: 100,
      status: "completed",
      downloadDate: "Il y a 1 semaine",
    },
  ]);

  const handleDelete = (id: number) => {
    setDownloads(downloads.filter((item) => item.id !== id));
  };

  const handlePlay = (title: string) => {
    navigate(`/watch?title=${encodeURIComponent(title)}`);
  };

  const completedDownloads = downloads.filter((d) => d.status === "completed");
  const activeDownloads = downloads.filter((d) => d.status === "downloading" || d.status === "paused");

  const totalSize = downloads
    .filter((d) => d.status === "completed")
    .reduce((acc, d) => acc + parseFloat(d.size), 0)
    .toFixed(1);

  const DownloadCard = ({ item }: { item: DownloadItem }) => (
    <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all">
      <div className="flex gap-4 p-4">
        <div className="relative w-32 h-48 flex-shrink-0 rounded-md overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {item.status === "downloading" && (
            <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
              <Download className="h-8 w-8 text-primary animate-pulse" />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <Badge variant={item.type === "film" ? "default" : "secondary"}>
                {item.type === "film" ? "Film" : "Série"}
              </Badge>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                <span>{item.size}</span>
              </div>
              <p>{item.downloadDate}</p>
            </div>

            {item.status === "downloading" && (
              <div className="mt-4 space-y-2">
                <Progress value={item.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">{item.progress}% téléchargé</p>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            {item.status === "completed" && (
              <Button
                onClick={() => handlePlay(item.title)}
                className="flex-1"
              >
                <Play className="h-4 w-4 mr-2" />
                Lire
              </Button>
            )}
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Mes Téléchargements
            </h1>
            <p className="text-muted-foreground">
              Gérez vos contenus téléchargés • {completedDownloads.length} contenus • {totalSize} GB utilisés
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                Tous ({downloads.length})
              </TabsTrigger>
              <TabsTrigger value="downloading">
                En cours ({activeDownloads.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Terminés ({completedDownloads.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {downloads.length === 0 ? (
                <div className="text-center py-12">
                  <Download className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aucun téléchargement
                  </h3>
                  <p className="text-muted-foreground">
                    Vos contenus téléchargés apparaîtront ici
                  </p>
                </div>
              ) : (
                downloads.map((item) => <DownloadCard key={item.id} item={item} />)
              )}
            </TabsContent>

            <TabsContent value="downloading" className="space-y-4">
              {activeDownloads.length === 0 ? (
                <div className="text-center py-12">
                  <Download className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aucun téléchargement en cours
                  </h3>
                  <p className="text-muted-foreground">
                    Commencez à télécharger du contenu
                  </p>
                </div>
              ) : (
                activeDownloads.map((item) => <DownloadCard key={item.id} item={item} />)
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedDownloads.length === 0 ? (
                <div className="text-center py-12">
                  <Download className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aucun téléchargement terminé
                  </h3>
                  <p className="text-muted-foreground">
                    Vos contenus téléchargés apparaîtront ici
                  </p>
                </div>
              ) : (
                completedDownloads.map((item) => <DownloadCard key={item.id} item={item} />)
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Downloads;
