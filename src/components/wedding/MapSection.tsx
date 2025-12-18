import { useInView } from "react-intersection-observer";
import { ExternalLink, Navigation } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

export const MapSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { map, events } = weddingConfig;

  return (
    <section ref={ref} className="py-20 md:py-28 bg-muted/30">
      <div className="section-container">
        {/* Header */}
        <div className={cn("text-center mb-12", inView && "animate-fade-in")}>
          <h2 className="section-title">How to Get There</h2>
          <p className="section-subtitle">Find your way to our celebration</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map Embed */}
          <div
            className={cn(
              "rounded-lg overflow-hidden shadow-medium h-[400px] lg:h-[500px]",
              inView && "animate-fade-in"
            )}
          >
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(events.ceremony.address)}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Location"
            />
          </div>

          {/* Directions Info */}
          <div
            className={cn(
              "space-y-6",
              inView && "animate-fade-in-up"
            )}
          >
            {/* Ceremony Location */}
            <div className="card-elegant">
              <h3 className="font-display text-xl text-foreground mb-3">
                Ceremony Venue
              </h3>
              <p className="font-body text-muted-foreground mb-2">
                {events.ceremony.venue}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {events.ceremony.address}
              </p>
            </div>

            {/* Reception Location */}
            <div className="card-elegant">
              <h3 className="font-display text-xl text-foreground mb-3">
                Reception Venue
              </h3>
              <p className="font-body text-muted-foreground mb-2">
                {events.reception.venue}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {events.reception.address}
              </p>
            </div>

            {/* Directions Text */}
            {map.howToGetThere && (
              <div className="card-elegant bg-primary/5">
                <h3 className="font-display text-lg text-foreground mb-3 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-primary" />
                  Directions
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {map.howToGetThere}
                </p>
              </div>
            )}

            {/* Get Directions Button */}
            <a
              href={map.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-wedding inline-flex items-center gap-2"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
