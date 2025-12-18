import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  musicUrl?: string;
}

export const MusicPlayer = ({ musicUrl }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    // Use a royalty-free wedding music URL or local file
    if (musicUrl) {
      audioRef.current.src = musicUrl;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicUrl]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    setHasInteracted(true);
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full",
        "bg-card/90 backdrop-blur-md border border-border shadow-medium",
        "transition-all duration-300 hover:scale-105 hover:shadow-soft",
        "group"
      )}
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      <div className={cn(
        "relative w-8 h-8 flex items-center justify-center",
        isPlaying && "animate-pulse"
      )}>
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      <span className="text-sm font-body text-foreground/80 hidden sm:block">
        {!hasInteracted ? "Play Music" : isPlaying ? "Playing" : "Paused"}
      </span>
      {isPlaying && (
        <div className="flex gap-0.5 items-end h-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 12 + 4}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
};
