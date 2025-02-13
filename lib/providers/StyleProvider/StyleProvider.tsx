import { BrandTypes } from '../../brands/brand'
import { createStyleTokens, StyleTokens } from '../../utils/createStyleTokens'
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
interface ContextState {
	theme: Theme
	styling: StyleTokens
}

interface StyleProviderProps {
	children: React.ReactNode
	brand?: BrandTypes
}

// 🔥 Динамический импорт (Загружается только нужный JSON)
const loadPalette = async (brand: BrandTypes = 'default') => {
	try {
		const brandData = await import(`../../brands/${brand}.json`)
		return brandData.default
	} catch (error) {
		console.error(`Brand "${brand}" not found`, error)
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

export function StyleProvider({
	children,
	brand = 'default',
}: StyleProviderProps) {
	const [theme] = useState<Theme>('light')
	const [brandTokens, setBrandTokens] = useState<StyleTokens | null>(null)

	useEffect(() => {
		loadPalette(brand).then(palette => {
			setBrandTokens(createStyleTokens(palette))
		})
	}, [brand])

	// Пока палитра загружается → пустой объект
	return (
		// @ts-ignore
		<StyleContext.Provider value={{ theme, styling: brandTokens || {} }}>
			{/*  @ts-ignore */}
			<div style={brandTokens || {}}>{children}</div>
		</StyleContext.Provider>
	)
}
