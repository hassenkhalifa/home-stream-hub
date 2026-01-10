import { Play, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ContentCardProps {
  title: string;
  image: string;
  progress?: number;
  className?: string;
}

const ContentCard = ({ title, image, progress, className }: ContentCardProps) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/watch?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className={cn("group relative overflow-hidden rounded-lg", className)}>
      <div className="aspect-video relative overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="default" 
              className="rounded-full h-12 w-12 bg-foreground hover:bg-foreground/90 text-background"
              onClick={handlePlay}
            >
              <Play className="h-5 w-5 fill-current" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full h-10 w-10">
              <Plus className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full h-10 w-10"
              onClick={() => navigate(`/details?title=${encodeURIComponent(title)}`)}
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-2 px-1">
        <h3 className="text-sm font-medium text-foreground truncate">{title}</h3>
      </div>
    </div>
  );
};

export default ContentCard;
