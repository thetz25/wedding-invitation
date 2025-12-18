import { useInView } from "react-intersection-observer";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";
import storyImage from "@/assets/couple-story.jpg";

export const StorySection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { story } = weddingConfig;

  return (
    <section id="story" ref={ref} className="py-20 md:py-28 bg-background">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <div
            className={cn(
              "relative",
              inView && "animate-fade-in"
            )}
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-medium">
              <img
                src={storyImage}
                alt="Our Love Story"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/50" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary/50" />
          </div>

          {/* Content */}
          <div className={cn(inView && "animate-fade-in-up")}>
            <div className="divider-ornament justify-start mb-6">
              <span className="text-primary text-2xl">❧</span>
            </div>
            
            <h2 className="section-title mb-6">{story.title}</h2>
            <p className="font-display text-xl italic text-primary mb-8">
              {story.subtitle}
            </p>
            
            <div className="space-y-4">
              {story.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="font-body text-muted-foreground leading-relaxed"
                >
                  {paragraph.trim()}
                </p>
              ))}
            </div>

            <div className="divider-ornament justify-start mt-10">
              <span className="divider-line" />
              <span className="text-gold">✦</span>
              <span className="divider-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
