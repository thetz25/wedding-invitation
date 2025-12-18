import { useInView } from "react-intersection-observer";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/wedding-hero.jpg";

export const HeroSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { couple, hero, date } = weddingConfig;

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/20 to-background" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Tagline */}
        <p
          className={cn(
            "font-body text-sm md:text-base tracking-[0.3em] uppercase text-ivory/90 mb-6",
            inView && "animate-fade-in"
          )}
        >
          {hero.tagline}
        </p>

        {/* Couple Names */}
        <h1
          className={cn(
            "font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-ivory mb-8",
            "leading-tight tracking-wide",
            inView && "animate-fade-in-delay-1"
          )}
        >
          {couple.partner1.firstName}
          <span className="block text-3xl sm:text-4xl md:text-5xl my-4 text-gold font-light italic">
            &
          </span>
          {couple.partner2.firstName}
        </h1>

        {/* Date */}
        <div
          className={cn(
            "inline-block",
            inView && "animate-fade-in-delay-2"
          )}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-12 bg-ivory/50" />
            <span className="font-body text-lg md:text-xl text-ivory/90 tracking-widest">
              {date.displayDate}
            </span>
            <span className="h-px w-12 bg-ivory/50" />
          </div>
        </div>

        {/* Subtitle */}
        <p
          className={cn(
            "font-body text-lg md:text-xl text-ivory/80 max-w-lg mx-auto",
            inView && "animate-fade-in-delay-3"
          )}
        >
          {hero.subtitle}
        </p>

        {/* Scroll Indicator */}
        <div
          className={cn(
            "absolute bottom-12 left-1/2 -translate-x-1/2",
            inView && "animate-fade-in-delay-3"
          )}
        >
          <div className="w-6 h-10 border-2 border-ivory/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-ivory/70 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
