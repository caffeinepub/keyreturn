# Design Brief: Lost Key Return System

## Tone & Purpose
Friendly, trustworthy productivity tool. Owners manage lost keys with zero friction; finders submit contact info without login. Clean utilitarian interface.

## Color Palette

| Token | OKLCH | Intent |
|-------|-------|--------|
| Primary | `0.55 0.18 260` | Calm blue — trust, action, CTA buttons |
| Accent | `0.75 0.18 70` | Warm amber — success, key returned status |
| Destructive | `0.55 0.22 25` | Red — remove key, danger actions |
| Neutral | `0.98 0 0` to `0.18 0 0` | Clean greys, high contrast |

## Typography

| Layer | Font | Scale | Weight |
|-------|------|-------|--------|
| Display | GeneralSans | 2rem, 1.5rem | 600, 500 |
| Body | Inter (via DMSans) | 1rem, 0.875rem | 400, 500 |
| Mono | JetBrainsMono | 0.875rem | 400 |

## Structural Zones

| Zone | Treatment | Depth |
|------|-----------|-------|
| Header | `border-b border-border`, subtle background | Elevated |
| Card Container | `bg-card border border-border rounded-lg` | Mid |
| QR Display | `p-4 bg-white border-border`, centered | Mid |
| Form Inputs | `bg-input border-border`, high contrast | Input layer |
| Footer | Minimal, text-only | Base |

## Shape Language
- Default radius: 8px (rounded-lg)
- Input radius: 6px (rounded-md)
- No fully-rounded elements; geometric utility
- Soft, approachable, not brutalist

## Motion
- `transition-smooth`: 0.3s cubic-bezier(0.4, 0, 0.2, 1) on all interactive elements
- Form submissions: fade-in success message
- QR code: subtle scale on load (optional)

## Component Patterns
- **Card grid**: 1 col mobile, 2–3 cols desktop for key cards
- **QR display**: Large, centered, with subtle shadow
- **Forms**: Spacious, high-contrast labels, full-width inputs
- **Buttons**: Primary (blue), Secondary (ghost), Destructive (red)

## Zones & Density

**Header (Owner Dashboard)**: Icon + Title + Avatar nav, top-border accent  
**Owner Dashboard**: Card grid with key labels, QR code preview, status badge  
**Finder Form (Public)**: Centered form, minimal chrome, large QR scan zone  
**Return Requests**: List or card view, timestamp, finder contact, action buttons

## Differentiation
QR codes are the visual hero. Every key displays a large, scannable QR code in a card. Dashboard uses grid rhythm, not dense lists. Clean white/neutral palette with reserved blue accents for actions.

## Dark Mode
Light theme primary; dark mode mirrors token structure with elevated backgrounds, softer borders.

## Constraints
- Max content width: 1400px (container-2xl)
- No decorative gradients; functional color only
- No arbitrary colors; use semantic tokens exclusively
- High readability: AA+ WCAG contrast on all text

