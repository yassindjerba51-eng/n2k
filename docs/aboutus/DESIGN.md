# Design System Strategy: The Scientific Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Clinical Curator"**

This design system moves away from the generic "B2B SaaS" aesthetic. Instead, it adopts the persona of a high-end scientific journal combined with the precision of modern industrial engineering. Rooted in the context of the Borj Cédria technology park, the visual language must feel "heavy" with authority yet "light" with innovation.

We achieve this through **Editorial Asymmetry**. We break the rigid, centered grid by using intentional whitespace and overlapping elements—where a technical diagram might bleed off the edge of a `surface-container`, or a `display-lg` headline sits offset from its body text. This creates an "Architectural Layering" effect, signaling to the user that Les Laboratoires N2K doesn't just follow standards—they set them.

---

## 2. Colors & Surface Logic

Our palette is rooted in the deep `primary` (#000f22) to establish immediate B2B trust, accented by high-energy functional tones.

### The "No-Line" Rule
**Borders are prohibited for sectioning.** To define the transition between a laboratory service overview and a technical specification sheet, use background shifts. 
- *Example:* Place a `surface-container-low` section immediately following a `surface` hero. The transition should be felt through the tonal shift, not a 1px line.

### Surface Hierarchy & Nesting
Treat the interface as a physical stack of lab slides.
- **Base:** `surface` (#f7f9fb) for the main canvas.
- **Level 1:** `surface-container-low` for large content blocks.
- **Level 2:** `surface-container-highest` for interactive cards or data modules.
- **Level 3:** `surface-container-lowest` (#ffffff) for the most critical focal points (e.g., a "Request a Quote" form) to make them "pop" against the tinted background.

### The "Glass & Gradient" Rule
To avoid a flat, "templated" look, use Glassmorphism for floating navigation or hovering technical tooltips. Use `surface_variant` at 60% opacity with a `20px` backdrop-blur. 
For primary CTAs, apply a subtle linear gradient from `primary` (#000f22) to `primary_container` (#0a2540) at a 135-degree angle. This adds a "weighted" metallic sheen appropriate for industrial lab equipment.

---

## 3. Typography: The Authority Scale

We pair the geometric strength of **Montserrat** (Titles) with the neutral, clinical precision of **Inter** (Body).

*   **Display (Montserrat):** Used for "The Big Truths." These should be set with tight letter-spacing (-0.02em) to feel like a stamped industrial mark. Use `display-lg` (3.5rem) sparingly for high-impact hero statements.
*   **Headline (Montserrat):** Set in `headline-lg` (2rem) for section headers. Always pair these with a `secondary` (Green) accent nearby to bridge the gap between "Expertise" and "Solution."
*   **Body (Inter):** Our workhorse. `body-lg` (1rem) is the standard for trust-building copy. Maintain a line height of 1.6 to ensure technical jargon remains breathable and accessible.
*   **Labels (Inter):** Use `label-md` in all-caps with increased letter-spacing (0.05em) for technical metadata, like "LAB ID" or "SOIL ANALYSIS REF," to mimic laboratory labeling systems.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "software-generic." We use **Atmospheric Depth.**

*   **The Layering Principle:** Instead of a shadow, lift a card by placing it on a `surface-container-low` background and giving the card itself a `surface-container-lowest` (pure white) fill. The contrast provides the lift.
*   **Ambient Shadows:** For floating elements like Modals or Dropdowns, use a tinted shadow: `color: hsla(210, 73%, 15%, 0.06)` with a `48px` blur and `24px` Y-offset. This mimics the soft, diffused light of a modern clean-room laboratory.
*   **The "Ghost Border" Fallback:** If a technical chart requires a container, use a "Ghost Border": `outline-variant` (#c4c6ce) at **15% opacity**. It should be barely visible—a suggestion of a boundary rather than a hard wall.

---

## 5. Components

### Buttons (The Catalyst)
- **Primary:** Gradient fill (`primary` to `primary_container`), `md` (0.375rem) roundedness. No border. Text in `on_primary`.
- **Secondary (Conversion):** `secondary` (#006d40) background. Use this exclusively for "Success" actions: *Start Analysis, Download Report.*
- **Tertiary:** No background. Text in `primary`. Use an underline that is only 2px thick and offset by 4px, using `secondary_fixed` for a sophisticated "editorial" look.

### Cards (The Laboratory Slide)
**Rule:** No dividers. Separate the header of the card from the body using a 2.5rem (`10`) spacing gap. Use a `surface_container_high` background for the header area and `surface_container_lowest` for the content area to create a "tabbed" look without lines.

### Input Fields (Technical Entry)
Use the "Underline-Only" style for a premium feel, but wrap it in a `surface-container-low` box. When focused, the bottom border should transition from `outline-variant` to a 2px `primary` line.

### Signature Component: The "Data-Point" Chip
For agricultural B2B contexts, use chips to show statuses (e.g., "Phosphate Levels: Optimal").
- **Optimal:** `secondary_container` background with `on_secondary_container` text.
- **At Risk:** `tertiary_container` (Orange) background with `on_tertiary_container` text.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use asymmetrical layouts (e.g., a 7-column main area and a 5-column empty "breathing space").
- **Do** use `surface-container` tiers to nest information. A technical spec sheet should be a `surface-container-highest` box sitting on a `surface-container-low` page section.
- **Do** use high-quality imagery of Borj Cédria’s landscape or macro shots of laboratory glass to ground the digital experience in reality.

### Don’t:
- **Don’t** use 1px solid borders to separate sections. It breaks the "high-end editorial" feel.
- **Don’t** use pure black (#000000) for text. Always use `on_surface` (#191c1e) to maintain a sophisticated, soft-contrast look.
- **Don’t** use standard "Material Design" shadows. Keep elevations flat and tonal, or extremely diffused and tinted.
- **Don't** clutter. If a technical detail isn't essential for the current conversion step, hide it in a "Technical Deep-Dive" drawer.