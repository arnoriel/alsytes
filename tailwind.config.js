/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '390px',
      },
      fontFamily: {
        display:  ['"Plus Jakarta Sans"', 'sans-serif'],
        body:     ['"Plus Jakarta Sans"', 'sans-serif'],
        mono:     ['"JetBrains Mono"', 'monospace'],
        jakarta:  ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        // Primary palette
        base: {
          DEFAULT: '#F8F7FF',
          50: '#FDFCFF',
          100: '#F3F2FA',
          200: '#E8E6F5',
          300: '#D5D0EB',
          400: '#B8B2D8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          border: '#E2DFEF',
          hover: '#F8F7FF',
          alt: '#F3F2FA',
        },
        accent: {
          DEFAULT: '#7C3AED',
          dim:     '#6D28D9',
          glow:    '#9061F9',
          muted:   'rgba(124,58,237,0.08)',
          soft:    'rgba(124,58,237,0.15)',
        },
        orange: {
          DEFAULT: '#F97316',
          soft: 'rgba(249,115,22,0.10)',
          dim: '#EA6A0A',
        },
        // Text tokens (for PreviewPage backward compat)
        text: {
          primary:   '#14121F',
          secondary: '#4A4660',
          muted:     '#9A96B0',
          code:      '#374151',
        },
        // Sage (green accent)
        sage: {
          accent: '#10B981',
        },
        // Dark tokens (used in PreviewPage)
        dark: {
          bg:       '#F8F7FF',
          surface:  '#FFFFFF',
          elevated: '#F3F2FA',
          border:   '#E2DFEF',
          hover:    '#F3F2FA',
        },
        // Ink tokens
        ink: {
          primary:   '#14121F',
          secondary: '#4A4660',
          muted:     '#9A96B0',
          code:      '#374151',
          link:      '#7C3AED',
        },
        // Emerald
        emerald: {
          accent: '#10B981',
          dim:    '#059669',
          muted:  'rgba(16,185,129,0.10)',
        },
      },
      boxShadow: {
        'glow-accent':     '0 0 0 3px rgba(124,58,237,0.18)',
        'glow-green':      '0 0 0 3px rgba(16,185,129,0.18)',
        'card':            '0 1px 3px rgba(60,40,120,0.07), 0 4px 16px rgba(60,40,120,0.04)',
        'card-hover':      '0 4px 16px rgba(60,40,120,0.12), 0 8px 32px rgba(60,40,120,0.06)',
        'button':          '0 1px 2px rgba(60,40,120,0.10)',
        'button-glow':     '0 4px 18px rgba(124,58,237,0.35)',
        'landing-hero':    '0 32px 80px rgba(124,58,237,0.25)',
        // Old compat
        'glow':            '0 0 0 3px rgba(124,58,237,0.18)',
        'card-dark':       '0 1px 3px rgba(60,40,120,0.07), 0 4px 16px rgba(60,40,120,0.04)',
        'card-dark-hover': '0 4px 20px rgba(60,40,120,0.15), 0 8px 40px rgba(60,40,120,0.08)',
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gradient-alsytes':  'linear-gradient(135deg, #7C3AED, #F97316)',
        'gradient-hero':     'linear-gradient(135deg, #7C3AED 0%, #9333EA 25%, #F97316 65%, #EF4444 100%)',
        'dot-pattern':       'radial-gradient(circle, rgba(124,58,237,0.12) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow':     'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer':        'shimmer 2s linear infinite',
        'float':          'float 6s ease-in-out infinite',
        'glow-pulse':     'glowPulse 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'orb-1':          'orbFloat1 12s ease-in-out infinite',
        'orb-2':          'orbFloat2 15s ease-in-out infinite',
        'orb-3':          'orbFloat3 10s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,58,237,0.15)' },
          '50%':      { boxShadow: '0 0 40px rgba(124,58,237,0.30)' },
        },
        gradientShift: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        orbFloat1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%':  { transform: 'translate(40px, -60px) scale(1.08)' },
          '50%':  { transform: 'translate(-30px, -40px) scale(0.94)' },
          '75%':  { transform: 'translate(50px, 30px) scale(1.04)' },
        },
        orbFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%':  { transform: 'translate(-50px, 40px) scale(0.92)' },
          '50%':  { transform: 'translate(30px, 60px) scale(1.06)' },
          '75%':  { transform: 'translate(-40px, -30px) scale(1.02)' },
        },
        orbFloat3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':  { transform: 'translate(60px, 30px) scale(1.1)' },
          '66%':  { transform: 'translate(-40px, -50px) scale(0.90)' },
        },
      },
    },
  },
  plugins: [],
};