import { useInView } from "react-intersection-observer";
import { MapPin, Clock, Calendar } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

export const EventsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { events } = weddingConfig;

  const eventCards = [
    { ...events.ceremony, icon: "ceremony" },
    { ...events.reception, icon: "reception" },
  ];

  return (
    <section id="events" ref={ref} className="py-20 md:py-28 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className={cn("text-center mb-16", inView && "animate-fade-in")}>
          <div className="divider-ornament mb-6">
            <span className="divider-line" />
            <span className="text-gold text-xl">♡</span>
            <span className="divider-line" />
          </div>
          <h2 className="section-title">Wedding Events</h2>
          <p className="section-subtitle">
            Join us for a celebration of love
          </p>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {eventCards.map((event, index) => (
            <div
              key={event.title}
              className={cn(
                "card-elegant text-center",
                inView && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                {event.icon === "ceremony" ? (
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                    />
                  </svg>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                {event.title}
              </h3>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-body">{event.date}</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-body">{event.time}</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-body">{event.venue}</span>
                </div>
              </div>

              <p className="font-body text-sm text-muted-foreground mt-4">
                {event.address}
              </p>

              {event.description && (
                <p className="font-body text-sm italic text-primary mt-6 pt-6 border-t border-border">
                  {event.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
