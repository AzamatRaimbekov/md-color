import { BrandTypes } from '../../brands/brand'
import { getDefault } from '../../brands/default'
import { getMKassa } from '../../brands/mkassa'
import { createStyleTokens, StyleTokens } from '../../utils/createStyleTokens'
import { createContext, useContext, useState } from 'react'

type Theme = 'light' | 'dark'
interface ContextState {
	theme: Theme
	styling: StyleTokens
}

interface StyleProviderProps {
	children: React.ReactNode
	brand?: BrandTypes
}

const data: Record<BrandTypes, () => {}> = {
	default: getDefault,
	mkassa: getMKassa,
}

// 🔥 Динамический импорт (Загружается только нужный JSON)
const loadPalette = (brand: BrandTypes = 'default') => {
	try {
		if (data[brand]()) {
			return data[brand]()
		}
	} catch (error) {
		console.error(`Brand "${brand}" notfound`, error)
		return {}
	}
}

export const StyleContext = createContext<ContextState | null>(null)

export const useMDStyling = () => {
	const context = useContext(StyleContext)
	if (!context) {
		throw new Error('useMDStyling must be used within a StyleProvider')
	}
	return context
}

export function StyleProviderVariant({
	children,
	brand = 'default',
}: StyleProviderProps) {
	const [theme] = useState<Theme>('light')

	const palettes = loadPalette(brand)
	const brandTokens = createStyleTokens(palettes)

	// Пока палитра загружается → пустой объект
	return (
		// @ts-ignore
		<StyleContext.Provider value={{ theme, styling: brandTokens || {} }}>
			{/*  @ts-ignore */}
			<div style={brandTokens || {}}>{children}</div>
		</StyleContext.Provider>
	)
}
