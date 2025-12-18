import { useInView } from "react-intersection-observer";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

export const DressCodeSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { dressCode } = weddingConfig;

  return (
    <section ref={ref} className="py-20 md:py-28 bg-muted/30">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <div className={cn(inView && "animate-fade-in")}>
            <div className="divider-ornament mb-6">
              <span className="divider-line" />
              <span className="text-primary text-xl">✦</span>
              <span className="divider-line" />
            </div>
            <h2 className="section-title mb-4">{dressCode.title}</h2>
            <p className="font-display text-2xl md:text-3xl text-primary italic mb-8">
              {dressCode.code}
            </p>
          </div>

          {/* Description */}
          <div
            className={cn(
              "card-elegant",
              inView && "animate-fade-in-up"
            )}
          >
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              {dressCode.description}
            </p>

            {/* Color Palette */}
            <div className="mb-8">
              <p className="font-body text-sm text-muted-foreground uppercase tracking-widest mb-4">
                Suggested Color Palette
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {dressCode.colorPalette.map((color, index) => {
                  const colorClasses: Record<string, string> = {
                    "Dusty Rose": "bg-primary",
                    "Sage Green": "bg-secondary",
                    "Champagne": "bg-gold",
                    "Navy Blue": "bg-charcoal",
                  };

                  return (
                    <div key={color} className="flex flex-col items-center gap-2">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full shadow-soft",
                          colorClasses[color] || "bg-muted"
                        )}
                      />
                      <span className="font-body text-xs text-muted-foreground">
                        {color}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Note */}
            {dressCode.note && (
              <p className="font-body text-sm italic text-primary pt-6 border-t border-border">
                {dressCode.note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
