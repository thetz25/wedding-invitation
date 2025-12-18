import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

const EnvelopePage = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();

  const { couple, date } = weddingConfig;

  const handleOpen = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);
    
    // Wait for envelope animation, then navigate
    setTimeout(() => {
      setIsOpened(true);
      setTimeout(() => {
        navigate("/invitation");
      }, 600);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted via-background to-background flex items-center justify-center p-4 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-sage/10 rounded-full blur-2xl" />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center transition-all duration-700",
          isOpened && "scale-110 opacity-0"
        )}
      >
        {/* Title */}
        <div className={cn(
          "text-center mb-12 transition-all duration-500",
          isOpening && "opacity-0 -translate-y-8"
        )}>
          <p className="font-body text-sm tracking-[0.4em] uppercase text-muted-foreground mb-4">
            {couple.partner1.firstName} & {couple.partner2.firstName}
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
            You Are Invited
          </h1>
          <p className="font-body text-muted-foreground">
            {date.displayDate}
          </p>
        </div>

        {/* Envelope Container */}
        <div
          onClick={handleOpen}
          className={cn(
            "relative cursor-pointer group",
            "w-[320px] h-[220px] sm:w-[400px] sm:h-[280px] md:w-[480px] md:h-[340px]",
            "transition-transform duration-300",
            !isOpening && "hover:scale-[1.02]"
          )}
        >
          {/* Envelope Back */}
          <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-muted rounded-lg shadow-medium border border-border">
            {/* Decorative Pattern */}
            <div className="absolute inset-4 border border-primary/20 rounded" />
            <div className="absolute inset-6 border border-primary/10 rounded" />
          </div>

          {/* Letter Inside */}
          <div
            className={cn(
              "absolute left-1/2 -translate-x-1/2 w-[85%] bg-card border border-primary/30 rounded shadow-soft",
              "flex flex-col items-center justify-center text-center p-6",
              "transition-all duration-700 ease-out",
              isOpening 
                ? "bottom-[60%] h-[70%] opacity-100" 
                : "bottom-[15%] h-[60%] opacity-100"
            )}
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary/20 rounded-full" />
            
            <div className={cn(
              "transition-all duration-500 delay-300",
              isOpening ? "opacity-100 scale-100" : "opacity-70 scale-95"
            )}>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
                Wedding Invitation
              </p>
              <p className="font-display text-xl md:text-2xl text-foreground mb-1">
                {couple.partner1.firstName}
              </p>
              <p className="font-display text-lg text-gold italic">&</p>
              <p className="font-display text-xl md:text-2xl text-foreground">
                {couple.partner2.firstName}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-primary/30" />
                <span className="text-primary text-sm">♡</span>
                <span className="h-px w-8 bg-primary/30" />
              </div>
            </div>
          </div>

          {/* Envelope Flap (Top) */}
          <div
            className={cn(
              "absolute top-0 left-0 right-0 h-[55%] origin-top",
              "transition-transform duration-700 ease-out",
              isOpening ? "[transform:rotateX(180deg)]" : "[transform:rotateX(0deg)]"
            )}
            style={{ 
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            {/* Front of flap */}
            <div 
              className={cn(
                "absolute inset-0 rounded-t-lg",
                "bg-gradient-to-b from-card to-muted",
                "border-l border-r border-t border-border",
                "[backface-visibility:hidden]"
              )}
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 20%, 50% 100%, 0 20%)"
              }}
            >
              {/* Wax Seal */}
              <div className={cn(
                "absolute left-1/2 -translate-x-1/2 bottom-[10%]",
                "w-14 h-14 md:w-16 md:h-16 rounded-full",
                "bg-gradient-to-br from-primary to-primary/80",
                "flex items-center justify-center",
                "shadow-md border-2 border-primary/30",
                "transition-all duration-300",
                !isOpening && "group-hover:scale-110 group-hover:shadow-lg"
              )}>
                <span className="font-display text-primary-foreground text-lg md:text-xl">
                  {couple.partner1.firstName[0]}{couple.partner2.firstName[0]}
                </span>
              </div>
            </div>
            
            {/* Back of flap (visible when opened) */}
            <div 
              className={cn(
                "absolute inset-0 rounded-t-lg",
                "bg-gradient-to-t from-muted to-card",
                "[backface-visibility:hidden]",
                "[transform:rotateX(180deg)]"
              )}
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 20%, 50% 100%, 0 20%)"
              }}
            />
          </div>

          {/* Envelope Front (Bottom part) */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[50%] rounded-b-lg bg-gradient-to-t from-card via-card to-muted border-l border-r border-b border-border"
          >
            {/* Inner shadow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>

        {/* Call to Action */}
        <div className={cn(
          "mt-10 text-center transition-all duration-500",
          isOpening && "opacity-0 translate-y-8"
        )}>
          <p className="font-body text-muted-foreground text-sm mb-2">
            Tap to open
          </p>
          <div className="flex items-center justify-center gap-1">
            <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>

      {/* Transition Overlay */}
      <div className={cn(
        "fixed inset-0 bg-background z-50 transition-opacity duration-500 pointer-events-none",
        isOpened ? "opacity-100" : "opacity-0"
      )} />
    </div>
  );
};

export default EnvelopePage;
