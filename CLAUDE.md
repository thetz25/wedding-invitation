# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern wedding invitation website built with React, TypeScript, Vite, and shadcn/ui. The application provides a beautiful, animated digital wedding invitation with sections for the couple's story, event details, gallery, RSVP form, and more.

Originally created through Lovable (https://lovable.dev), this project can be edited either through the Lovable platform or locally.

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Architecture

### Routing Structure

The app uses React Router with two main routes:
- `/` - **EnvelopePage**: Landing page with an animated envelope that opens to reveal the invitation
- `/invitation` - **InvitationPage**: Main invitation page with all wedding details

All custom routes must be added ABOVE the catch-all `*` route in `src/App.tsx`.

### Configuration-Driven Design

The entire wedding website is configured through a single file: **`src/config/wedding.ts`**

This central configuration object (`weddingConfig`) contains all wedding-specific data:
- Couple names
- Wedding date and time
- Event details (ceremony & reception)
- Story content
- Timeline
- Dress code
- Gift registry information
- RSVP settings (including Google Apps Script URL for form submissions)
- FAQ items
- Gallery images
- Map coordinates
- Navigation links
- Footer content

**To customize the wedding content, edit `src/config/wedding.ts` instead of modifying individual components.**

### Component Organization

Components are organized in two main directories:

**`src/components/ui/`** - shadcn/ui components (56+ components)
- Pre-built, accessible components from shadcn/ui
- Should not be modified directly
- Add new shadcn components using the shadcn CLI if needed

**`src/components/wedding/`** - Custom wedding-specific sections
- Each section is a standalone component that reads from `weddingConfig`
- Major sections include:
  - `HeroSection.tsx` - Hero with couple names and background image
  - `CountdownSection.tsx` - Countdown timer to wedding date
  - `StorySection.tsx` - The couple's love story
  - `GallerySection.tsx` - Photo gallery/prenup photos
  - `EventsSection.tsx` - Ceremony and reception details
  - `MapSection.tsx` - Location map with directions
  - `TimelineSection.tsx` - Day-of timeline
  - `DressCodeSection.tsx` - Dress code information
  - `GiftSection.tsx` - Gift registry links
  - `RSVPSection.tsx` - RSVP form with Google Sheets integration
  - `FAQSection.tsx` - Frequently asked questions
  - `SnapShareSection.tsx` - Social media hashtag and sharing
  - `Navigation.tsx` - Top navigation bar
  - `MusicPlayer.tsx` - Background music player
  - `FooterSection.tsx` - Footer

### Styling System

The project uses Tailwind CSS with custom wedding theme tokens defined in `src/index.css`:

**Color Palette:**
- `rose` / `rose-light` - Dusty rose accent
- `sage` / `sage-light` - Sage green accent
- `gold` / `gold-light` - Gold accent
- `ivory` - Ivory/cream background
- `charcoal` - Dark text color

**Typography:**
- `font-display` - Cormorant Garamond (serif, for headings)
- `font-body` - Nunito (sans-serif, for body text)

**Custom Classes:**
- `.section-container` - Standard section wrapper with max-width and padding
- `.section-title` - Styled heading for section titles
- `.section-subtitle` - Styled subtitle text
- `.card-elegant` - Elegant card styling with shadow
- `.btn-primary-wedding` - Primary button with wedding theme
- `.divider-ornament` - Decorative section divider

**Animations:**
Use CSS classes for entrance animations (defined in tailwind.config.ts):
- `animate-fade-in` - Fade in
- `animate-fade-in-up` - Fade in with upward movement
- `animate-scale-in` - Scale in from 95% to 100%

### RSVP Integration

The RSVP form integrates with Google Sheets via Google Apps Script:

1. Create a Google Sheet for RSVP responses
2. Add the Apps Script code (see `public/google sheet connection.txt`)
3. Deploy as a web app with "Execute as: Me" and "Who has access: Anyone"
4. Copy the web app URL to `weddingConfig.rsvp.googleScriptUrl`

The form submission uses `mode: 'no-cors'` to avoid CORS issues with Google Apps Script.

### Path Aliases

The project uses TypeScript path aliases configured in `vite.config.ts` and `tsconfig.json`:
- `@/` maps to `src/`
- Example: `import { Button } from "@/components/ui/button"`

### State Management

- React Query (`@tanstack/react-query`) for async state
- Local component state for UI interactions
- No global state management (Redux, Zustand, etc.)

## Key Dependencies

**UI Framework:**
- React 18
- React Router DOM v6
- shadcn/ui (Radix UI primitives)
- Tailwind CSS

**Forms & Validation:**
- react-hook-form
- zod
- @hookform/resolvers

**Utilities:**
- lucide-react (icons)
- date-fns (date formatting)
- clsx + tailwind-merge (via cn utility in `src/lib/utils.ts`)

**UI Enhancements:**
- react-intersection-observer (scroll animations)
- yet-another-react-lightbox (gallery lightbox)
- embla-carousel-react (carousels)
- sonner (toast notifications)

## Common Modifications

### Adding a New Section

1. Create component in `src/components/wedding/YourSection.tsx`
2. Import and use `weddingConfig` for data
3. Import component in `src/pages/InvitationPage.tsx`
4. Add component to the page layout
5. If navigation is needed, add to `weddingConfig.navigation`

### Changing Images

Place images in `public/` folder (or `src/assets/`):
- Hero background: `/wedding-hero.jpg`
- Story image: `/couple-story.jpg`
- Gallery: `/gallery-1.jpg` through `/gallery-6.jpg`

Update references in `weddingConfig` to match your filenames.

### Customizing Theme Colors

Edit CSS variables in `src/index.css` under the `:root` selector. The design system uses HSL color values for easy theming.

## Build Configuration

**Vite Configuration:**
- Dev server runs on port 8080
- Uses SWC for faster React compilation
- Includes lovable-tagger plugin in development mode for Lovable integration
- Path alias `@` resolves to `./src`

**TypeScript:**
- Strict mode enabled
- Configured for React 18 JSX runtime
- Separate configs for app code and build scripts
