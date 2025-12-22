/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  			gotham: ['Gotham', 'sans-serif'],
  			montserrat: ['Montserrat', 'sans-serif'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
				foreground: 'hsl(var(--primary-foreground))',
				// Primary color scale from Figma
				25: '#E8F6FE',
				50: '#D2EFFF',
				100: '#A6DEFF',
				200: '#79CEFF',
				300: '#4DBDFF',
				400: '#20ADFF',
				500: '#0099F3',
				600: '#007DC6',
				700: '#00649E',
				800: '#004B77',
				900: '#00324F',
				950: '#001928'
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
  				foreground: 'hsl(var(--destructive-foreground))',
				// Error/Red scale from Figma
				25: '#FFFBFA',
				50: '#FEF3F2',
				100: '#FEE4E2',
				200: '#FECDCA',
				300: '#FDA29B',
				400: '#F97066',
				500: '#F04438',
				600: '#D92D20',
				700: '#B42318',
				800: '#912018',
				900: '#7A271A',
				950: '#3D1503'
  			},
			success: {
				// Success/Green scale from Figma
				25: '#F6FEF9',
				50: '#ECFDF3',
				100: '#D1FADF',
				200: '#A6F4C5',
				300: '#6CE9A6',
				400: '#32D583',
				500: '#12B76A',
				600: '#039855',
				700: '#027A48',
				800: '#05603A',
				900: '#054F31'
			},
			gray: {
				// Gray scale from Figma
				25: '#FCFCFD',
				50: '#F9FAFB',
				100: '#F2F4F7',
				200: '#EAECF0',
				300: '#D0D5DD',
				400: '#98A2B3',
				500: '#667085',
				600: '#475467',
				700: '#344054',
				800: '#242A32',
				900: '#101828'
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
  			},
  			table: {
  				hover: 'hsl(var(--admin-sidebar-hover))',
  				selected: 'hsl(var(--admin-sidebar-active))'
  			},
  			admin: {
  				sidebar: 'hsl(var(--admin-sidebar))',
  				'sidebar-hover': 'hsl(var(--admin-sidebar-hover))',
  				'sidebar-active': 'hsl(var(--admin-sidebar-active))',
  				'sidebar-text': 'hsl(var(--admin-sidebar-text))',
  				'sidebar-active-text': 'hsl(var(--admin-sidebar-active-text))'
  			}
  		},
  		keyframes: {
  			"caret-blink": {
  				"0%,70%,100%": { opacity: "1" },
  				"20%,50%": { opacity: "0" },
  			},
  		},
  		animation: {
  			"caret-blink": "caret-blink 1.25s ease-out infinite",
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

