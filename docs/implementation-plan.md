## Implementation plan (mobile + desktop)

### Mobile – All Works (full gallery) modal

- [ ] `components/home/all-artworks-modal.tsx`: switch mobile grid to one card per row
  - Change grid cols when `isMobile` → `grid-cols-1` (keep current desktop breakpoints as is).
- [ ] `components/home/all-artworks-modal.tsx`: convert tag chips to a menu on mobile
  - Use `components/ui/select.tsx` to render a `Select` with `allTags` when `isMobile`.
  - Keep existing chip list for desktop (`!isMobile`).
- [ ] `components/home/all-artworks-modal.tsx`: remove Sort on mobile
  - Hide the Sort control entirely behind `!isMobile`.
- [ ] `components/home/all-artworks-modal.tsx`: reduce modal height on mobile
  - Adjust `Dialoghttps://www.ledr.com/colours/white.htmContent` height from `h-[90vh]` to ~`h-[84–86vh]` when `isMobile`.
  - Ensure internal scroll area still fills and scrolls.

### Mobile – Contact form (About section)

- [ ] `components/home/about-section.tsx`: make the contact panel edge‑to‑edge on small screens
  - On mobile only: remove rounded corners and heavy “card” treatment; use `rounded-none` and lighter bg.
  - Counter the section padding with negative margins (e.g., `mx-[-1rem]`) so the form touches the screen edges; keep standard padding on ≥sm.
  - Keep current desktop styles (`md:`/`lg:` variants) unchanged.

### Mobile – Footer alignment

- [ ] `components/footer.tsx`: center/stack content on small screens
  - Ensure brand and socials are centered and evenly spaced on mobile (`items-center`, `justify-center`).
  - Preserve current two‑column layout and right‑aligned socials on desktop (`md:` breakpoints).

### Desktop – Gallery card hover title and overlay

- [ ] `components/home/artwork-card.tsx`: adjust hover title styles
  - Title text: make gray and not bold (e.g., `text-foreground/80` + `font-normal`).
  - Gradient overlay: reduce darkness slightly (e.g., `from-black/50` → `from-black/35–40`).

### Desktop – “View All Works” button in gallery

- [ ] `components/home/gallery-section.tsx`: verify button renders when `artworks.length > previewCount`
  - Keep centered CTA; ensure it is visible on desktop and triggers `onViewAll`.
  - Minor style polish if needed (icon spacing, hover state).

### Desktop – Expanded artwork modal (right panel layout)

- [ ] `components/artwork-modal.tsx`: keep title + description near top; move TAGS and SOFTWARE USED down
  - Wrap tags/software block in a container with `mt-auto` so it sits lower within the right column.
  - Keep ArtStation link below that block.
  - Do not change the mobile layout.

### QA checklist

- [ ] Mobile: All‑Works grid shows 1 card per row; filter is a dropdown; no Sort control; modal height fits odd devices without clipping header/footer.
- [ ] Mobile: Contact form touches screen edges without horizontal scroll; spacing and inputs remain accessible.
- [ ] Mobile: Footer elements are visually centered and evenly spaced; no misalignment at various widths.
- [ ] Desktop: Hover title is gray, non‑bold; overlay is visibly lighter but still readable.
- [ ] Desktop: “View All Works” button appears when more than 6 items; opens All‑Works modal.
- [ ] Desktop: In the expanded modal, tags/software appear lower while title/description remain higher; no layout jumps between artworks.
