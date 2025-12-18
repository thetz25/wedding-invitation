import { useInView } from "react-intersection-observer";
import { Heart, Mail } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

export const FooterSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { couple, date, footer } = weddingConfig;

  return (
    <footer ref={ref} className="py-16 md:py-24 bg-charcoal text-ivory">
      <div className="section-container">
        <div className={cn("text-center", inView && "animate-fade-in")}>
          {/* Decorative Element */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-16 bg-ivory/30" />
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="h-px w-16 bg-ivory/30" />
          </div>

          {/* Couple Names */}
          <h2 className="font-display text-4xl md:text-5xl text-ivory mb-4">
            {couple.partner1.firstName} & {couple.partner2.firstName}
          </h2>

          {/* Date */}
          <p className="font-body text-lg text-ivory/70 mb-8">
            {date.displayDate}
          </p>

          {/* Message */}
          <p className="font-display text-xl italic text-primary mb-8 max-w-lg mx-auto">
            {footer.message}
          </p>

          {/* Contact */}
          {footer.contactEmail && (
            <a
              href={`mailto:${footer.contactEmail}`}
              className="inline-flex items-center gap-2 font-body text-sm text-ivory/70 hover:text-ivory transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{footer.contactEmail}</span>
            </a>
          )}

          {/* Copyright */}
          <p className="font-body text-xs text-ivory/40 mt-12">
            Made with love • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};
