import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, Subtitles, Rewind, FastForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Watch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") || "Contenu";
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(7200); // 2 heures par défaut
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState("Auto");
  const [subtitles, setSubtitles] = useState("Désactivé");
  
  const playerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Simuler la progression de la vidéo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Gérer l'affichage des contrôles
  const handleMouseMove = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && playerRef.current) {
      playerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const skip = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + seconds)));
  };

  return (
    <div 
      ref={playerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Zone vidéo (simulée avec un fond noir) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white/20 mb-4">{title}</h1>
          <p className="text-white/20">Zone de lecture vidéo</p>
        </div>
      </div>

      {/* Overlay pour le bouton play/pause au centre */}
      <div 
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
        {!isPlaying && (
          <div className="bg-background/80 backdrop-blur-sm rounded-full p-6 animate-scale-in">
            <Play className="h-16 w-16 text-foreground" fill="currentColor" />
          </div>
        )}
      </div>

      {/* Bouton retour */}
      <div className={cn(
        "absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 z-20",
        showControls ? "opacity-100" : "opacity-0"
      )}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/20 h-12 w-12"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* Contrôles vidéo */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 transition-opacity duration-300 z-20",
        showControls ? "opacity-100" : "opacity-0"
      )}>
        {/* Barre de progression */}
        <div className="mb-4">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-sm text-white/70">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Contrôles principaux */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Lecture / Pause */}
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:bg-white/20 h-12 w-12"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" fill="currentColor" />
              )}
            </Button>

            {/* Reculer / Avancer */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => skip(-10)}
              className="text-white hover:bg-white/20 h-10 w-10"
            >
              <Rewind className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => skip(10)}
              className="text-white hover:bg-white/20 h-10 w-10"
            >
              <FastForward className="h-5 w-5" />
            </Button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-white hover:bg-white/20 h-10 w-10"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <div className="w-24 hidden md:block">
                <Slider
                  value={isMuted ? [0] : volume}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    setVolume(value);
                    if (value[0] > 0) setIsMuted(false);
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Titre */}
            <div className="hidden lg:block ml-4">
              <h3 className="text-white font-semibold">{title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Sous-titres */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 h-10 w-10"
                >
                  <Subtitles className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md">
                <DropdownMenuItem onClick={() => setSubtitles("Désactivé")}>
                  {subtitles === "Désactivé" && "✓ "}Désactivé
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSubtitles("Français")}>
                  {subtitles === "Français" && "✓ "}Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSubtitles("Anglais")}>
                  {subtitles === "Anglais" && "✓ "}Anglais
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSubtitles("Espagnol")}>
                  {subtitles === "Espagnol" && "✓ "}Espagnol
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Qualité */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 h-10 w-10"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md">
                <DropdownMenuItem onClick={() => setQuality("Auto")}>
                  {quality === "Auto" && "✓ "}Auto
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setQuality("1080p")}>
                  {quality === "1080p" && "✓ "}1080p
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setQuality("720p")}>
                  {quality === "720p" && "✓ "}720p
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setQuality("480p")}>
                  {quality === "480p" && "✓ "}480p
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Plein écran */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20 h-10 w-10"
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
