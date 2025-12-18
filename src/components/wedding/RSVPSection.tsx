import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Send, Check } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface RSVPFormData {
  name: string;
  email: string;
  attendance: "yes" | "no" | "";
  guests: number;
  message: string;
}

export const RSVPSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { toast } = useToast();
  const { rsvp } = weddingConfig;

  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    email: "",
    attendance: "",
    guests: 1,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to Google Apps Script
      if (rsvp.googleScriptUrl) {
        await fetch(rsvp.googleScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            attendance: formData.attendance === "yes" ? "Attending" : "Not Attending",
            guests: formData.guests,
            message: formData.message,
            timestamp: new Date().toISOString(),
          }),
        });
      }

      setIsSubmitted(true);
      toast({
        title: "Thank you!",
        description: "Your RSVP has been received.",
      });
    } catch (error) {
      console.error("RSVP submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit RSVP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" ref={ref} className="py-20 md:py-28 bg-primary/5">
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className={cn("text-center mb-12", inView && "animate-fade-in")}>
            <div className="divider-ornament mb-6">
              <span className="divider-line" />
              <span className="text-gold text-xl">♡</span>
              <span className="divider-line" />
            </div>
            <h2 className="section-title">{rsvp.title}</h2>
            <p className="section-subtitle">{rsvp.subtitle}</p>
            <p className="font-body text-sm text-muted-foreground mt-4">
              Please respond by {rsvp.deadline}
            </p>
          </div>

          {/* Form */}
          {isSubmitted ? (
            <div
              className={cn(
                "card-elegant text-center",
                inView && "animate-scale-in"
              )}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage flex items-center justify-center">
                <Check className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-4">
                Thank You!
              </h3>
              <p className="font-body text-muted-foreground">
                We've received your RSVP and can't wait to celebrate with you.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={cn(
                "card-elegant space-y-6",
                inView && "animate-fade-in-up"
              )}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-body text-sm text-foreground mb-2"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-body text-sm text-foreground mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="your@email.com"
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="block font-body text-sm text-foreground mb-2">
                  Will you attend? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={formData.attendance === "yes"}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <span className="font-body text-foreground">
                      Joyfully Accept
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={formData.attendance === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <span className="font-body text-foreground">
                      Regretfully Decline
                    </span>
                  </label>
                </div>
              </div>

              {/* Number of Guests */}
              {formData.attendance === "yes" && (
                <div>
                  <label
                    htmlFor="guests"
                    className="block font-body text-sm text-foreground mb-2"
                  >
                    Number of Guests
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {Array.from({ length: rsvp.maxGuests }, (_, i) => i + 1).map(
                      (num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-body text-sm text-foreground mb-2"
                >
                  Message for the Couple (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Share your well wishes..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.attendance}
                className={cn(
                  "btn-primary-wedding w-full flex items-center justify-center gap-2",
                  (isSubmitting || !formData.attendance) && "opacity-50 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send RSVP</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
