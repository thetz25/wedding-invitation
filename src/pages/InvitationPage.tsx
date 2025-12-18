import { Navigation } from "@/components/wedding/Navigation";
import { HeroSection } from "@/components/wedding/HeroSection";
import { CountdownSection } from "@/components/wedding/CountdownSection";
import { StorySection } from "@/components/wedding/StorySection";
import { GallerySection } from "@/components/wedding/GallerySection";
import { FlipbookGallery } from "@/components/wedding/FlipbookGallery";
import { EventsSection } from "@/components/wedding/EventsSection";
import { MapSection } from "@/components/wedding/MapSection";
import { TimelineSection } from "@/components/wedding/TimelineSection";
import { DressCodeSection } from "@/components/wedding/DressCodeSection";
import { GiftSection } from "@/components/wedding/GiftSection";
import { RSVPSection } from "@/components/wedding/RSVPSection";
import { FAQSection } from "@/components/wedding/FAQSection";
import { SnapShareSection } from "@/components/wedding/SnapShareSection";
import { FooterSection } from "@/components/wedding/FooterSection";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { weddingConfig } from "@/config/wedding";

const InvitationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Countdown Timer */}
      <CountdownSection />

      {/* Our Story */}
      <StorySection />

      {/* Gallery / Prenup Photos */}
      <GallerySection />

      {/* Flipbook Gallery */}
      <FlipbookGallery />

      {/* Event Details */}
      <EventsSection />

      {/* Map & Directions */}
      <MapSection />

      {/* Timeline */}
      <TimelineSection />

      {/* Dress Code */}
      <DressCodeSection />

      {/* Gift Registry */}
      <GiftSection />

      {/* RSVP Form */}
      <RSVPSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Snap & Share */}
      <SnapShareSection />

      {/* Footer */}
      <FooterSection />

      {/* Music Player */}
      {weddingConfig.hero.showMusicPlayer && (
        <MusicPlayer musicUrl={weddingConfig.hero.musicUrl} />
      )}
    </div>
  );
};

export default InvitationPage;
