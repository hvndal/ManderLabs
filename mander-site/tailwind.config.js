/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- Warm editorial neutrals + one accent, sampled from the MANDER mark ---
        // Originally a strict cool black/white — that read clinical ("psych
        // ward" was the actual feedback). Every neutral below has warmth
        // mixed in (a touch of brown/red in the black, cream instead of
        // stark white) so the palette sits closer to Aesop or a boutique
        // hotel than a SaaS dashboard, while keeping the same structure:
        // ink for text, paper for the canvas, one accent used deliberately.
        //
        // The logo is a dusty rose/terracotta line illustration on black.
        // `accent` is that same hue darkened and saturated enough to hold
        // white text at ~5.8:1 contrast (AA-safe) for solid CTA blocks.
        // `accent-soft` is the pale rose exactly as it appears in the logo —
        // decorative use only (tints, badges with dark text), never text on
        // white and never a button fill.
        ink: '#1c1512', // warm espresso, not cold black
        'ink-soft': '#453a34',
        'ink-mute': '#6f6259', // re-verified ≥5:1 contrast on paper
        paper: '#f4f2ec', // warm off-white — the dominant canvas
        'paper-2': '#eae7df', // alt band
        'paper-3': '#e2ded4',
        white: '#fbf8f3', // warm cream, not stark white — used for "card" surfaces
        line: '#dcd8ce', // hairline on paper
        'line-strong': '#c3bdb0',
        accent: '#a6483a', // terracotta — CTA blocks, "most chosen" tag, hovers
        'accent-ink': '#8a3a2e', // pressed/hover state for accent-filled elements
        'accent-soft': '#e3b2a8', // the logo's true pale rose — decorative only
        'on-accent': '#ffffff', // small badges only — kept true white for legibility at tiny sizes

        // Back-compat aliases so older class names keep resolving
        primary: '#1c1512',
        'on-primary': '#fbf8f3',
        secondary: '#453a34',
        surface: '#f4f2ec',
        background: '#f4f2ec',
        'surface-container-lowest': '#fbf8f3',
        'surface-container-low': '#faf9f5',
        'surface-container': '#eae7df',
        'surface-container-high': '#e2ded4',
        'surface-container-highest': '#dad5c9',
        'on-surface': '#1c1512',
        'on-surface-variant': '#6f6259',
        'inverse-surface': '#1c1512',
        outline: '#6f6259',
        'outline-variant': '#dcd8ce',
        hairline: '#dcd8ce',
        subtle: '#eae7df',
        error: '#b3261e',
      },
      fontFamily: {
        sans: ['var(--font-hanken)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // High contrast: statements are large, labels are tiny. Nothing sits
        // in the comfortable middle — that middle is what read as "generic".
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.96', letterSpacing: '-0.04em', fontWeight: '600' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '0.98', letterSpacing: '-0.035em', fontWeight: '600' }],
        'headline-lg': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.04', letterSpacing: '-0.03em', fontWeight: '600' }],
        'headline-lg-mobile': ['1.9rem', { lineHeight: '1.06', letterSpacing: '-0.025em', fontWeight: '600' }],
        'headline-md': ['1.35rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '500' }],
        'stat-xl': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '600' }],
        'stat-lg': ['2rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'stat-md': ['1.6rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65', letterSpacing: '0em', fontWeight: '400' }],
        'body-md': ['0.9375rem', { lineHeight: '1.6', letterSpacing: '0em', fontWeight: '400' }],
        'label-caps': ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.18em', fontWeight: '500' }],
        'label-sm': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
      },
      borderRadius: {
        none: '0',
        DEFAULT: '0', // square everything — Uniqlo/Zara sharpness
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        full: '9999px', // only real circles opt in explicitly
      },
      spacing: {
        unit: '8px',
        gutter: '24px',
        'margin-desktop': '48px',
        'margin-mobile': '20px',
        'stack-lg': '112px',
        'stack-md': '48px',
        'stack-sm': '16px',
      },
      maxWidth: {
        container: '1340px',
        text: '46rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in': 'slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      transitionTimingFunction: {
        // "Premium" expo-out — the curve behind Linear/Vercel-style motion.
        // Fast start, long soft settle. Used everywhere instead of ease-in-out.
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        350: '350ms',
        450: '450ms',
      },
    },
  },
  plugins: [],
};
