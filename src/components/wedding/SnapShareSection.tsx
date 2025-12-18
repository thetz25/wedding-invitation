import { useInView } from "react-intersection-observer";
import { Camera, Hash, Instagram, Facebook, Upload } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

export const SnapShareSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { snapShare } = weddingConfig;

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <div className={cn(inView && "animate-fade-in")}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="w-10 h-10 text-primary" />
            </div>
            <h2 className="section-title mb-4">{snapShare.title}</h2>
            <p className="section-subtitle mb-8">{snapShare.description}</p>
          </div>

          {/* Hashtag Display */}
          <div
            className={cn(
              "card-elegant inline-block mb-8",
              inView && "animate-scale-in"
            )}
          >
            <div className="flex items-center justify-center gap-3">
              <Hash className="w-6 h-6 text-gold" />
              <span className="font-display text-2xl md:text-3xl text-foreground">
                {snapShare.hashtag.replace("#", "")}
              </span>
            </div>
          </div>

          {/* Social Links & Upload */}
          <div
            className={cn(
              "flex flex-wrap items-center justify-center gap-4",
              inView && "animate-fade-in-up"
            )}
          >
            {snapShare.socialLinks.instagram && (
              <a
                href={snapShare.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-wedding inline-flex items-center gap-2"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
            )}

            {snapShare.socialLinks.facebook && (
              <a
                href={snapShare.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-wedding inline-flex items-center gap-2"
              >
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </a>
            )}

            {snapShare.uploadEnabled && (
              <button className="btn-primary-wedding inline-flex items-center gap-2">
                <Upload className="w-5 h-5" />
                <span>Upload Photos</span>
              </button>
            )}
          </div>

          {/* Tip */}
          <p className="font-body text-sm text-muted-foreground mt-8 italic">
            Tag your photos so we can see and cherish them forever!
          </p>
        </div>
      </div>
    </section>
  );
};
