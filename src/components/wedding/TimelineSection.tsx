import { useInView } from "react-intersection-observer";
import { Users, Heart, Wine, Utensils, Music, Sparkles, Star } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  heart: Heart,
  wine: Wine,
  utensils: Utensils,
  music: Music,
  sparkles: Sparkles,
  sparkle: Star,
};

export const TimelineSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { timeline } = weddingConfig;

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className={cn("text-center mb-16", inView && "animate-fade-in")}>
          <div className="divider-ornament mb-6">
            <span className="divider-line" />
            <span className="text-gold text-xl">✧</span>
            <span className="divider-line" />
          </div>
          <h2 className="section-title">Wedding Day Timeline</h2>
          <p className="section-subtitle">A glimpse into our special day</p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {/* Timeline Items */}
            {timeline.map((item, index) => {
              const Icon = iconMap[item.icon] || Heart;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.time}
                  className={cn(
                    "relative mb-10 last:mb-0",
                    inView && "animate-fade-in-up"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-center">
                    {/* Left Content */}
                    <div className={cn("text-right", !isEven && "invisible")}>
                      {isEven && (
                        <div className="card-elegant inline-block text-right">
                          <span className="font-display text-2xl text-primary block mb-1">
                            {item.time}
                          </span>
                          <span className="font-body text-foreground">
                            {item.event}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Icon Circle */}
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-soft z-10">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>

                    {/* Right Content */}
                    <div className={cn("text-left", isEven && "invisible")}>
                      {!isEven && (
                        <div className="card-elegant inline-block text-left">
                          <span className="font-display text-2xl text-primary block mb-1">
                            {item.time}
                          </span>
                          <span className="font-body text-foreground">
                            {item.event}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="flex items-center gap-4 md:hidden">
                    {/* Icon Circle */}
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-soft z-10 flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <div className="card-elegant">
                      <span className="font-display text-xl text-primary block mb-1">
                        {item.time}
                      </span>
                      <span className="font-body text-foreground text-sm">
                        {item.event}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
