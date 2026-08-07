---
name: Lumina Nordic
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#2b0a42'
  on-tertiary-container: '#9a76b3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#f3daff'
  tertiary-fixed-dim: '#dfb7fa'
  on-tertiary-fixed: '#2b0a42'
  on-tertiary-fixed-variant: '#593971'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '600'
    lineHeight: 80px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-lg: 80px
  stack-md: 40px
  stack-sm: 16px
---

## Brand & Style

The design system is rooted in the intersection of **Scandinavian Minimalism** and **Swiss Functionalism**, tailored for a high-end SaaS context. The brand personality is authoritative yet understated, evoking a sense of calm, precision, and "quiet luxury." 

The visual strategy prioritizes negative space (90% white) to allow the content to breathe, creating an expansive, premium feel. Influence is drawn from:
- **Minimalism:** Aggressive use of whitespace and a strict adherence to a grid.
- **Corporate / Modern:** A focus on reliability and accessibility through impeccable typography.
- **Subtle Polish:** High-fidelity details like micro-interactions and refined stroke weights that signal a premium product.

Targeting an executive and high-growth audience, the UI must feel expensive—not through clutter, but through the deliberate absence of it.

## Colors

This design system utilizes a high-contrast monochromatic base with a surgical application of color. 

- **Primary Charcoal (#1A1A1A):** Used for primary text, iconography, and structural borders. It replaces pure black to soften the optical contrast against white.
- **The Purple Accent (#63427B / #7C3AED):** Derived from the brand mark, this color is restricted to 2% of the interface. Use it exclusively for primary calls to action, active states, and subtle progress indicators. 
- **The White Surface (#FFFFFF):** The dominant canvas. Depth is created through subtle shifts to **#F9F9F9** for container backgrounds, rather than shadows.
- **The Rule of Restraint:** No more than one purple element should be visible in a single viewport whenever possible to maintain the premium aesthetic.

## Typography

The typography system uses **Hanken Grotesk** to bridge the gap between Swiss neutrality and modern tech. **JetBrains Mono** is introduced sparingly for labels and metadata to lean into the "built for growth" technical precision.

- **Large Headings:** Display and Headline sizes use negative letter-spacing and tight line heights to create a "locked-in" editorial feel.
- **Generous Tracking:** For labels and small caps, increase tracking significantly (up to 10%) to enhance legibility and premium character.
- **Hierarchy:** Use weight and spacing over color. Most text should be Charcoal (#1A1A1A), with secondary information using a 60% opacity of that same color.

## Layout & Spacing

The design system employs a **Fixed Grid** model for desktop to maintain strict alignment and white-space control.

- **Grid:** A 12-column grid with wide 32px gutters. The layout is intentionally "airy."
- **Rhythm:** An 8px linear scale is used for all internal component spacing.
- **Vertical Rhythm:** Large sections are separated by `stack-lg` (80px) to prevent the interface from feeling crowded. 
- **Alignment:** All text should align to a left-hand axis where possible, embracing the "Swiss" asymmetrical balance. Avoid center-aligning large blocks of text.

## Elevation & Depth

To maintain a minimalist profile, this design system avoids traditional drop shadows.

- **Tonal Layering:** Depth is communicated through color. Surfaces sit on the background (#FFFFFF) using a subtle #F9F9F9 fill or a 1px solid border (#EAEAEA).
- **Low-Contrast Outlines:** Use hair-line borders (1px) in light grey or charcoal for cards and inputs. 
- **Interaction Depth:** On hover, elements may lift slightly using a very soft, highly diffused ambient shadow (0px 10px 30px rgba(0,0,0,0.04)) or simply transition to a slightly darker border.
- **Glassmorphism:** Reserved only for navigation bars or floating overlays to maintain context of the content beneath, using a backdrop blur of 20px.

## Shapes

The shape language is **Soft (0.25rem)**. 

While the overall vibe is structured and geometric, the subtle rounding prevents the UI from feeling aggressive or "brutalist." 
- **Buttons & Inputs:** Use the standard `rounded` (4px).
- **Cards & Large Containers:** Use `rounded-lg` (8px).
- **The Only Circle:** Profile pictures or status indicators should be fully circular. 
Avoid "pill-shaped" buttons; the rectangular form with slight rounding reinforces the professional, Swiss-inspired aesthetic.

## Components

- **Buttons:** Primary buttons use a solid Charcoal (#1A1A1A) background with White text. Accent buttons use the Soft Purple (#7C3AED). Both have 4px radius and 16px horizontal padding.
- **Inputs:** Minimalist bottom-border-only or full 1px light grey stroke. The focus state transitions the border to Charcoal or Purple with no outer glow.
- **Chips:** Small, uppercase JetBrains Mono text. Light grey background (#F3F3F3) with no border.
- **Lists:** Clean rows with 1px dividers. Large 24px vertical padding between items to emphasize whitespace.
- **Cards:** No shadow. 1px border (#EAEAEA). Headers within cards should use `headline-md`.
- **Navigation:** Transparent or white background with 1px bottom border. Brand logo (Image 1) should be left-aligned with a maximum height of 32px.
- **Status Indicators:** Use the purple accent color for "active" or "live" states to keep the palette focused.