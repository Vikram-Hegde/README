import {
	defineConfig,
	presetIcons,
	presetUno,
	transformerVariantGroup,
} from 'unocss'

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
	theme: {
		colors: {
			accent: {
				100: 'var(--surface-100)',
				200: 'var(--surface-200)',
				300: 'var(--surface-300)',
				400: 'var(--surface-400)',
			},
			text: {
				color: {
					100: 'var(--text-100)',
					200: 'var(--text-200)',
					300: 'var(--text-300)',
				},
			},
		},
	},
	transformers: [transformerVariantGroup()],
})
