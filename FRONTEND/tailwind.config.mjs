/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'light': {
					'text': '#1A1A1A', // Text, Icons
					'border': '#9CA3AF', // Borders
					'input': '#FFFFFF', // Input Fields Background
					'background': '#FAFAFA', // Container Background
					'gradient': '#E6E6E6',
				},
				'dark': {
					'text': '#FFFFFF', // Text, Icons
					'border': '#4B5563', // Borders
					'input': '#374151', // Input Fields Background
					'background': '#0d1016', // Container Backgrounds
					'background2': '#010409', // Backgrounds for Navbar and Footer
					'gradient': '#292524', // Gradient from black to this color
				},
				'sportify': '#1DC458', // Sportify Green
				'sportifyhover': '#19aa4c', // Sportify Green
			},
		},
	},
	plugins: [],
}
