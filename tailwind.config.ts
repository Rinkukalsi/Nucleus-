import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'hsl(var(--foreground))',
            a: {
              color: 'hsl(var(--primary))',
              '&:hover': {
                color: 'hsl(var(--primary))',
              },
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--primary))',
              color: 'hsl(var(--foreground))',
            },
            'h1,h2,h3,h4': {
              color: 'hsl(var(--foreground))',
            },
            hr: {
              borderColor: 'hsl(var(--border))',
            },
            strong: {
              color: 'hsl(var(--foreground))',
            },
            thead: {
              color: 'hsl(var(--foreground))',
              borderBottomColor: 'hsl(var(--border))',
            },
            tbody: {
              tr: {
                borderBottomColor: 'hsl(var(--border))',
              },
            },
            code: {
              color: 'hsl(var(--foreground))',
            },
            pre: {
              backgroundColor: 'hsl(var(--secondary))',
              code: {
                color: 'hsl(var(--foreground))',
              },
            },
            'ul > li::marker': {
              color: 'hsl(var(--foreground))',
            },
            'ol > li::marker': {
              color: 'hsl(var(--foreground))',
            },
          },
        },
      },
      colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    // @ts-expect-error - Tailwind plugin
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwindcss-animate"),
    // @ts-expect-error - Tailwind plugin
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwind-scrollbar")({ nocompatible: true }),
    // @ts-expect-error - Tailwind plugin
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
