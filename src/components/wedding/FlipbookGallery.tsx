import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

export const FlipbookGallery = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  const photos = weddingConfig.flipbook?.images || [];
  const totalPages = Math.ceil(photos.length / 2); // 2 photos per spread

  const handleNext = () => {
    if (isFlipping || currentPage >= totalPages - 1) return;
    setIsFlipping(true);
    setFlipDirection("next");
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsFlipping(false);
    }, 600);
  };

  const handlePrev = () => {
    if (isFlipping || currentPage <= 0) return;
    setIsFlipping(true);
    setFlipDirection("prev");
    setTimeout(() => {
      setCurrentPage((prev) => prev - 1);
      setIsFlipping(false);
    }, 600);
  };

  const getPhotosForPage = (pageIndex: number) => {
    const startIndex = pageIndex * 2;
    return [photos[startIndex], photos[startIndex + 1]].filter(Boolean);
  };

  const currentPhotos = getPhotosForPage(currentPage);

  if (!weddingConfig.flipbook?.enabled || photos.length === 0) {
    return null;
  }

  return (
    <section
      id="flipbook"
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="section-container">
        {/* Header */}
        <div className={cn("text-center mb-16", inView && "animate-fade-in")}>
          <div className="divider-ornament mb-6">
            <span className="divider-line" />
            <span className="text-primary text-xl">♡</span>
            <span className="divider-line" />
          </div>
          <h2 className="section-title">
            {weddingConfig.flipbook.title || "Our Photo Album"}
          </h2>
          <p className="section-subtitle">
            {weddingConfig.flipbook.subtitle || "Flip through our memories"}
          </p>
        </div>

        {/* Flipbook Container */}
        <div
          className={cn(
            "max-w-5xl mx-auto",
            inView && "animate-scale-in"
          )}
        >
          <div className="relative perspective-[2000px]">
            {/* Book Shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-muted/40 blur-xl -z-10 translate-y-8" />

            {/* Book Container */}
            <div className="relative bg-card rounded-lg shadow-2xl overflow-hidden border-2 border-border">
              {/* Book Spine Shadow */}
              <div className="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 z-10 pointer-events-none" />

              {/* Pages Container */}
              <div className="relative grid grid-cols-2 min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
                {/* Left Page */}
                <div
                  className={cn(
                    "relative bg-card p-6 md:p-8 lg:p-12 flex items-center justify-center border-r border-border/50",
                    "transition-all duration-600",
                    isFlipping && flipDirection === "prev" && "animate-flip-left"
                  )}
                >
                  {currentPhotos[0] ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={currentPhotos[0].src}
                        alt={currentPhotos[0].caption || "Photo"}
                        className="w-full h-full object-cover rounded-md shadow-md"
                      />
                      {currentPhotos[0].caption && (
                        <p className="mt-4 text-center font-body text-sm text-muted-foreground italic">
                          {currentPhotos[0].caption}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-muted/30 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground/50 font-display text-2xl">
                        ♡
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Page */}
                <div
                  className={cn(
                    "relative bg-card p-6 md:p-8 lg:p-12 flex items-center justify-center",
                    "transition-all duration-600",
                    isFlipping && flipDirection === "next" && "animate-flip-right"
                  )}
                >
                  {currentPhotos[1] ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={currentPhotos[1].src}
                        alt={currentPhotos[1].caption || "Photo"}
                        className="w-full h-full object-cover rounded-md shadow-md"
                      />
                      {currentPhotos[1].caption && (
                        <p className="mt-4 text-center font-body text-sm text-muted-foreground italic">
                          {currentPhotos[1].caption}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-muted/30 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground/50 font-display text-2xl">
                        ♡
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Page Number */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-body">
                {currentPage * 2 + 1} - {Math.min(currentPage * 2 + 2, photos.length)} of {photos.length}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 0 || isFlipping}
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full",
                "bg-card border-2 border-primary shadow-lg",
                "flex items-center justify-center transition-all duration-300",
                "hover:bg-primary hover:scale-110 hover:shadow-xl",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100",
                "group z-20"
              )}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1 || isFlipping}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full",
                "bg-card border-2 border-primary shadow-lg",
                "flex items-center justify-center transition-all duration-300",
                "hover:bg-primary hover:scale-110 hover:shadow-xl",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100",
                "group z-20"
              )}
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </button>
          </div>

          {/* Page Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isFlipping) return;
                  setIsFlipping(true);
                  setFlipDirection(index > currentPage ? "next" : "prev");
                  setTimeout(() => {
                    setCurrentPage(index);
                    setIsFlipping(false);
                  }, 600);
                }}
                disabled={isFlipping}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentPage === index
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-primary/50"
                )}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
