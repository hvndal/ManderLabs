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
        // --- Her Homes palette, carried across to MANDER ---
        // The previous set was warm espresso and cream with a terracotta
        // accent, sampled from the old rose lockup. This is the palette from
        // the Her Homes build: a deep slate that reads as black at text
        // sizes, a cool off-white ground, denim blue as the working accent,
        // and the golden yellow as the graphic one.
        //
        // Two accents rather than one, with a hard rule between them that is
        // worth stating because getting it wrong is how a yellow brand turns
        // illegible: BLUE carries anything that has to be read or clicked —
        // it holds white text at 6.1:1. YELLOW is decorative only. It sits at
        // 1.6:1 on the ground, which is fine for a rule, a thread or a fill
        // behind dark text (9.4:1 that way round), and is never text on
        // white, never a link colour, never a button fill with light type.
        //
        // Every value below was measured, not eyeballed: ink 14.7:1 on paper,
        // ink-mute 5.3:1, accent 5.7:1, white on accent 6.1:1.
        ink: '#1b242c', // deep slate — body copy and headlines
        'ink-soft': '#3c4a56',
        'ink-mute': '#5c6873', // 5.3:1 on paper
        paper: '#f6f7f7', // cool off-white — the dominant canvas
        'paper-2': '#eceeee', // alt band
        'paper-3': '#e2e5e6',
        white: '#ffffff', // card surfaces
        line: '#dcdfe1', // hairline on paper
        'line-strong': '#c2c7ca',
        accent: '#2f6690', // denim blue — CTA blocks, links, hovers
        'accent-ink': '#24506f', // pressed/hover state for accent fills
        'accent-soft': '#f2c230', // the yellow — rules, threads, tints only
        'on-accent': '#ffffff',

        // Back-compat aliases so older class names keep resolving
        primary: '#1b242c',
        'on-primary': '#ffffff',
        secondary: '#3c4a56',
        surface: '#f6f7f7',
        background: '#f6f7f7',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#fafbfb',
        'surface-container': '#eceeee',
        'surface-container-high': '#e2e5e6',
        'surface-container-highest': '#d7dbdc',
        'on-surface': '#1b242c',
        'on-surface-variant': '#5c6873',
        'inverse-surface': '#1b242c',
        outline: '#5c6873',
        'outline-variant': '#dcdfe1',
        hairline: '#dcdfe1',
        subtle: '#eceeee',
        error: '#b3261e',
      },
      fontFamily: {
        sans: ['var(--font-hanken)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        // Display serif — headings only. See the note in layout.js.
        display: ['var(--font-instrument)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        // High contrast: statements are large, labels are tiny. Nothing sits
        // in the comfortable middle — that middle is what read as "generic".
        //
        // The display and headline steps are set in the serif, so their
        // tracking is close to neutral: the tight negative letterspacing that
        // a grotesk needs at size will collapse a high-contrast serif's
        // sidebearings and clot the joins. Line-height is a touch looser for
        // the same reason — serif ascenders and descenders need the room.
        'display-xl': ['clamp(3.25rem, 8.5vw, 7.5rem)', { lineHeight: '0.94', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-lg': ['clamp(2.75rem, 6.5vw, 5.5rem)', { lineHeight: '0.97', letterSpacing: '-0.018em', fontWeight: '400' }],
        'headline-lg': ['clamp(2.25rem, 4.4vw, 3.6rem)', { lineHeight: '1.03', letterSpacing: '-0.015em', fontWeight: '400' }],
        'headline-lg-mobile': ['2.15rem', { lineHeight: '1.05', letterSpacing: '-0.012em', fontWeight: '400' }],
        // Stays in the grotesk — it's a card/row title doing UI work, not a
        // display line, and the serif gets muddy this small.
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
