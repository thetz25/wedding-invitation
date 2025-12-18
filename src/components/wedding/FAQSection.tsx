import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { faq } = weddingConfig;

  return (
    <section id="faq" ref={ref} className="py-20 md:py-28 bg-muted/30">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className={cn("text-center mb-12", inView && "animate-fade-in")}>
            <div className="divider-ornament mb-6">
              <span className="divider-line" />
              <span className="text-primary text-xl">?</span>
              <span className="divider-line" />
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know</p>
          </div>

          {/* FAQ Accordion */}
          <div className={cn(inView && "animate-fade-in-up")}>
            <Accordion type="single" collapsible className="space-y-4">
              {faq.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="card-elegant border-none"
                >
                  <AccordionTrigger className="font-display text-lg text-foreground hover:text-primary hover:no-underline py-4 [&[data-state=open]]:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground leading-relaxed pt-2 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
