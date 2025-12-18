// ============================================
// WEDDING CONFIGURATION FILE
// Edit all your wedding details here!
// ============================================

export const weddingConfig = {
  // Couple Information
  couple: {
    partner1: {
      firstName: "Cathrina",
      lastName: "Martinez",
    },
    partner2: {
      firstName: "Lester",
      lastName: "Chen",
    },
  },

  // Wedding Date & Time
  date: {
    full: new Date("2026-07-15T15:00:00"),
    displayDate: "July 15, 2026",
    displayTime: "3:00 PM",
  },

  // Hero Section
  hero: {
    tagline: "We're Getting Married",
    subtitle: "Join us as we celebrate our love",
    backgroundImage: "/wedding-hero.jpg", // Will be generated
    showMusicPlayer: true,
    musicUrl: "/wedding-music.mp3", // Add your music file to public folder
  },

  // Our Story Section
  story: {
    title: "Our Love Story",
    subtitle: "A journey written in the stars",
    content: `We met on a crisp autumn evening at a mutual friend's dinner party. What started as a conversation about our shared love for travel and adventure quickly blossomed into something beautiful.

    After countless coffee dates, weekend getaways, and late-night conversations, we knew we had found our forever person. Three years later, under a canopy of stars on the beaches of Santorini, Lester asked Cathrina to be his wife.

    Now, we're ready to begin the next chapter of our story, and we want you to be part of it.`,
    image: "/couple-story.jpg", // Will be generated
  },

  // Event Details
  events: {
    ceremony: {
      title: "Wedding Ceremony",
      date: "Wednesday, July 15, 2026",
      time: "3:00 PM",
      venue: "St. Augustine Chapel",
      address: "123 Garden Lane, Napa Valley, CA 94558",
      description: "Please arrive 30 minutes early for seating.",
    },
    reception: {
      title: "Reception",
      date: "Wednesday, July 15, 2026",
      time: "5:30 PM",
      venue: "Vineyard Estate Ballroom",
      address: "456 Wine Country Road, Napa Valley, CA 94558",
      description: "Dinner, dancing, and celebration to follow.",
    },
  },

  // Map Configuration
  map: {
    ceremonyLocation: {
      lat: 38.2975,
      lng: -122.2869,
    },
    receptionLocation: {
      lat: 38.3011,
      lng: -122.2901,
    },
    directionsUrl: "https://maps.google.com/?q=Napa+Valley+CA",
    howToGetThere: "From San Francisco, take Highway 101 North to Highway 37 East, then Highway 29 North to Napa Valley. The venue is located on the right side of Wine Country Road.",
  },

  // Timeline
  timeline: [
    { time: "2:30 PM", event: "Guest Arrival", icon: "users" },
    { time: "3:00 PM", event: "Ceremony Begins", icon: "heart" },
    { time: "4:00 PM", event: "Cocktail Hour", icon: "wine" },
    { time: "5:30 PM", event: "Reception & Dinner", icon: "utensils" },
    { time: "7:30 PM", event: "First Dance", icon: "music" },
    { time: "8:00 PM", event: "Dancing & Celebration", icon: "sparkles" },
    { time: "11:00 PM", event: "Farewell", icon: "sparkle" },
  ],

  // Dress Code
  dressCode: {
    title: "Dress Code",
    code: "Formal Attire",
    description: "We kindly request guests to wear formal attire. Gentlemen in suits or tuxedos, ladies in floor-length gowns or elegant cocktail dresses.",
    colorPalette: ["Teal", "Turquoise", "Aqua", "Navy Blue"],
    note: "Please avoid wearing white or ivory as these colors are reserved for the bride.",
  },

  // Gift Guide
  gifts: {
    title: "Gift Registry",
    message: "Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have created a registry for your convenience.",
    registryLinks: [
      { name: "Amazon", url: "https://amazon.com" },
      { name: "Crate & Barrel", url: "https://crateandbarrel.com" },
    ],
    cashGift: {
      enabled: true,
      message: "If you prefer to give a monetary gift, we would be grateful and will put it towards our honeymoon fund.",
      bankDetails: {
        show: false, // Set to true to show bank details
        bankName: "Bank Name",
        accountName: "Cathrina Martinez & Lester Chen",
        accountNumber: "****1234",
      },
    },
  },

  // RSVP Configuration
  rsvp: {
    title: "RSVP",
    subtitle: "We can't wait to celebrate with you!",
    deadline: "June 15, 2026",
    maxGuests: 4,
    // Google Apps Script Web App URL - Replace with your own
    googleScriptUrl: "https://script.google.com/macros/s/AKfycbz8K7EHktluT-zzokWV5yxa9De-tnB6P9_3mm_V5brvUDbl9IR5wa7JO-kyrgDG6P5o/exec",
  },

  // FAQ
  faq: [
    {
      question: "Is this an unplugged ceremony?",
      answer: "Yes, we kindly request that all guests keep their phones and cameras away during the ceremony. We have hired a professional photographer to capture every moment, and we want everyone to be fully present.",
    },
    {
      question: "Can I bring a plus one?",
      answer: "Due to venue capacity, we are only able to accommodate guests who are specifically named on the invitation. Please check your invitation for details.",
    },
    {
      question: "What time should guests arrive?",
      answer: "We recommend arriving at least 30 minutes before the ceremony begins to allow time for parking and seating.",
    },
    {
      question: "Will there be parking available?",
      answer: "Yes, complimentary valet parking will be available at both the ceremony and reception venues.",
    },
    {
      question: "Are children welcome?",
      answer: "While we love your little ones, we have decided to make our wedding an adults-only celebration. We hope this gives you a chance to enjoy a night out!",
    },
    {
      question: "What if I have dietary restrictions?",
      answer: "Please let us know of any dietary restrictions in your RSVP, and we will do our best to accommodate them.",
    },
  ],

  // Snap & Share
  snapShare: {
    title: "Snap & Share",
    subtitle: "Capture the moments!",
    hashtag: "#CathrinaAndLester2026",
    description: "Share your photos with us using our wedding hashtag. We can't wait to see the celebration through your eyes!",
    uploadEnabled: true, // Enable photo uploads
    socialLinks: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
  },

  // Gallery (Prenup Photos)
  gallery: {
    title: "Pre-Nuptial Photos",
    subtitle: "Captured moments before we say 'I do'",
    images: [
      { src: "/gallery-1.jpg", caption: "Our first trip together" },
      { src: "/gallery-2.jpg", caption: "The day we got engaged" },
      { src: "/gallery-3.jpg", caption: "Adventures await" },
      { src: "/gallery-4.jpg", caption: "Love in bloom" },
      { src: "/gallery-5.jpg", caption: "Golden hour" },
      { src: "/gallery-6.jpg", caption: "Forever starts now" },
    ],
  },

  // Footer
  footer: {
    message: "Thank you for being part of our love story",
    contactEmail: "hello@ourlove.com",
  },

  // Navigation
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Our Story", href: "#story" },
    { label: "Events", href: "#events" },
    { label: "Gallery", href: "#gallery" },
    { label: "RSVP", href: "#rsvp" },
    { label: "FAQ", href: "#faq" },
  ],
};

export type WeddingConfig = typeof weddingConfig;
