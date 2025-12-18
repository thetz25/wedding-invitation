import { useState } from "react";
import { useInView } from "react-intersection-observer";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

// Import gallery images
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

export const GallerySection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { gallery } = weddingConfig;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" ref={ref} className="py-20 md:py-28 bg-muted/30">
      <div className="section-container">
        {/* Header */}
        <div className={cn("text-center mb-16", inView && "animate-fade-in")}>
          <div className="divider-ornament mb-6">
            <span className="divider-line" />
            <span className="text-primary text-xl">✿</span>
            <span className="divider-line" />
          </div>
          <h2 className="section-title">{gallery.title}</h2>
          <p className="section-subtitle">{gallery.subtitle}</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "group relative aspect-square rounded-lg overflow-hidden cursor-pointer",
                "shadow-card hover:shadow-medium transition-all duration-500",
                index === 0 && "md:col-span-2 md:row-span-2 aspect-square",
                inView && "animate-scale-in"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image}
                alt={gallery.images[index]?.caption || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500" />
              
              {/* Caption Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-body text-ivory text-sm md:text-base px-4 text-center">
                  {gallery.images[index]?.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={currentIndex}
          slides={galleryImages.map((src) => ({ src }))}
        />
      </div>
    </section>
  );
};
