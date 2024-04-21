/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'light': {
					'text': '#1A1A1A', // Text, Icons
					'border': '#9CA3AF', // Borders
					'input': '#FAFAFA', // Input Fields Background
					'background': '#F3F4F6', // Container Background
				},
				'dark': {
					'text': '#E5E7EB', // Text, Icons
					'border': '#4B5563', // Borders
					'input': '#1F2937', // Input Fields Background
					'background': '#0C0A09', // Container Background
					'gradient': '#292524', // Gradient from black to this color
				},
				'sportify': '#1DC458', // Sportify Green
			},
		},
	},
	plugins: [],
}
