import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = weddingConfig.date.full;
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsPast(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="section-container text-center">
        {isPast ? (
          <div className={cn(inView && "animate-fade-in-up")}>
            <h2 className="section-title text-primary">We're Married!</h2>
            <p className="section-subtitle">
              Thank you for being part of our special day.
            </p>
          </div>
        ) : (
          <>
            <div className={cn(inView && "animate-fade-in")}>
              <h2 className="font-display text-2xl md:text-3xl text-muted-foreground mb-2">
                Save the Date
              </h2>
              <p className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-12">
                {weddingConfig.date.displayDate}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
              {timeUnits.map((unit, index) => (
                <div
                  key={unit.label}
                  className={cn(
                    "card-elegant text-center",
                    inView && "animate-scale-in"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-2">
                    {String(unit.value).padStart(2, "0")}
                  </div>
                  <div className="font-body text-sm md:text-base text-muted-foreground uppercase tracking-widest">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
