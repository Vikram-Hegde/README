import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
	presets: [
		presetUno(),
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				fill: 'currentColor',
				'vertical-align': 'middle',
				height: '1.25rem',
				width: '1.25rem',
			},
		}),
	],
})
