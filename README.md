# Home Harvest

**Grow Food. Grow Freedom.**

A clean, minimalist educational website empowering individuals to grow their own food at home — balcony, rooftop, backyard, or indoors.

Part of the brand suite alongside [The Clean Pantry](https://naorbrown.github.io/the-clean-pantry/), [Plant Therapy](https://naorbrown.github.io/plant-therapy/), and [Clean Snacks](https://naorbrown.github.io/clean-snacks/).

## Brand Philosophy

Self-empowerment through food sovereignty. The site makes food production feel accessible, calm, achievable, and immediate.

**Core pillars:**
- Independence from fragile supply chains
- Nutrient density and food quality
- Simplicity over perfection
- Urban and small-space viability
- Calm empowerment (not fear-based)

**Tone:** Grounded, encouraging, competent, minimal, practical, empowering.

## Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Dark BG | `#1a1d1b` | Base background |
| Dark Surface | `#242824` | Card backgrounds |
| Dark Elevated | `#333a33` | Hover states, table headers |
| Dark Text | `#e4e8e3` | Body text |
| Sage | `#6b9a6b` | Primary accent / CTAs |
| Sage Light | `#8dc09a` | Hero highlights, links |
| Soil | `#a08060` | Secondary warm accent |
| Honey | `#c9a84e` | Tertiary accent |

### Typography
- **Font:** Inter (variable weight, loaded via Google Fonts)
- **Headlines:** 500–700 weight, clean modern sans-serif
- **Body:** 400 weight, 1.6 line-height, comfortable reading
- **No pure black (#000)** — soft contrast throughout

### Layout
- Card-based sections with generous vertical spacing
- Mobile-first responsive design
- Max content width: 72rem (1152px)
- Sticky blurred header navigation

## Sections

1. **Hero** — Mission statement and primary CTA
2. **Why Grow Your Own** — Five benefit cards (pesticides, nutrients, savings, resilience, flavor)
3. **Start Anywhere** — Four environment cards (balcony, windowsill, backyard, indoor)
4. **Beginner Crops** — Five crop cards with difficulty badges
5. **Growing Systems** — Comparison table (soil, hydro, vertical, containers)
6. **Tools & Setup** — Essentials vs. optional upgrades
7. **Seasonal Planting Guide** — Color-coded grid by season and crop type
8. **Seed Saving & Composting** — Closed-loop growing education
9. **Final CTA** — Encouragement and action button

## Tech Stack

- **HTML5** — Semantic markup with ARIA labels
- **CSS3** — Custom properties, grid, flexbox, no preprocessor
- **Vanilla JS** — Intersection Observer animations, smooth scroll, mobile nav

No frameworks. No build tools. No dependencies.

## Deploy via GitHub Pages

1. Push to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **main branch, root (/)**
4. Site will be live at `https://<username>.github.io/homeharvest/`

## Adding Sections

1. Add HTML to `index.html` following the existing section pattern:
   ```html
   <div class="section-divider" role="separator"></div>
   <section class="section" id="new-section" aria-labelledby="new-section-heading">
     <div class="container">
       <div class="section-header fade-in">
         <h2 class="section-title" id="new-section-heading">Section Title</h2>
         <p class="section-subtitle">Brief description.</p>
       </div>
       <!-- Content here -->
     </div>
   </section>
   ```
2. Add navigation link to the header nav
3. Use existing CSS classes (`card`, `card-grid`, `badge`, etc.)

## Performance Standards

- Lighthouse score: 95+ target
- Sub-2s mobile load
- No render-blocking scripts (JS loaded at end of body)
- Minimal asset weight — emoji icons, no image dependencies
- `prefers-reduced-motion` respected for animations

## License

MIT
