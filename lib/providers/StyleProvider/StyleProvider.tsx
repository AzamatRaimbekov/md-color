import { createStyleTokens } from '../../utils/createStyleTokens'

import Palette from '../../brand.json'

interface StyleProviderProps {
	children: React.ReactNode
}

// interface ColorModel {
// 	[key: string]: {
// 		[key: string]: {
// 			$type: 'color'
// 			$value: string
// 		}
// 	}
// }

const loadPalette = async (brand: string) => {
	try {
		const _colors = Palette
		return _colors
	} catch (error) {
		console.error(`Failed to load design tokens for key: ${brand}`, error)
	}
}
const brandPalette = await loadPalette('mkassa')

export const brandColors = createStyleTokens(brandPalette)

export function StyleProvider({ children }: StyleProviderProps) {
	// @ts-ignore
	return <div style={brandColors}>{children}</div>
}
