import { useInView } from "react-intersection-observer";
import { Gift, ExternalLink, CreditCard } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const GiftSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { gifts } = weddingConfig;
  const [showBankDetails, setShowBankDetails] = useState(false);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <div className={cn(inView && "animate-fade-in")}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <Gift className="w-10 h-10 text-gold" />
            </div>
            <h2 className="section-title mb-4">{gifts.title}</h2>
            <p className="section-subtitle mb-12">{gifts.message}</p>
          </div>

          {/* Registry Links */}
          {gifts.registryLinks.length > 0 && (
            <div
              className={cn(
                "flex flex-wrap justify-center gap-4 mb-12",
                inView && "animate-fade-in-up"
              )}
            >
              {gifts.registryLinks.map((registry) => (
                <a
                  key={registry.name}
                  href={registry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-wedding inline-flex items-center gap-2"
                >
                  <span>{registry.name}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}

          {/* Cash Gift Section */}
          {gifts.cashGift.enabled && (
            <div
              className={cn(
                "card-elegant bg-sage-light/30",
                inView && "animate-fade-in-up"
              )}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-sage" />
                <h3 className="font-display text-xl text-foreground">
                  Honeymoon Fund
                </h3>
              </div>
              <p className="font-body text-muted-foreground mb-6">
                {gifts.cashGift.message}
              </p>

              {gifts.cashGift.bankDetails.show && (
                <>
                  <button
                    onClick={() => setShowBankDetails(!showBankDetails)}
                    className="font-body text-sm text-primary underline hover:no-underline"
                  >
                    {showBankDetails ? "Hide" : "Show"} Bank Details
                  </button>

                  {showBankDetails && (
                    <div className="mt-4 p-4 bg-background rounded-lg text-left">
                      <div className="space-y-2 font-body text-sm text-muted-foreground">
                        <p>
                          <span className="text-foreground">Bank: </span>
                          {gifts.cashGift.bankDetails.bankName}
                        </p>
                        <p>
                          <span className="text-foreground">Account Name: </span>
                          {gifts.cashGift.bankDetails.accountName}
                        </p>
                        <p>
                          <span className="text-foreground">Account Number: </span>
                          {gifts.cashGift.bankDetails.accountNumber}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
