import { BrandTypes } from '../../brands/brand'
import { createStyleTokens, StyleTokens } from '../../utils/createStyleTokens'
import { createContext, useContext, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
interface ContextState {
	theme: Theme
	styling: StyleTokens
}

interface StyleProviderProps {
	children: React.ReactNode
	brand?: BrandTypes
}

// Загружаем JSON-файлы через import.meta.glob

// @ts-ignore
const brands = import.meta.glob('../../brands/*.json', { eager: true })

const loadPaletteSync = (brand: BrandTypes = 'default') => {
	const brandPath = `../../brands/${brand}.json`
	const brandData = brands[brandPath] as
		| { default: Record<string, any> }
		| undefined

	if (!brandData) {
		console.error(`Failed to load design tokens for brand: ${brand}`)
		return {}
	}

	return brandData.default
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
	const brandTokens = useMemo(() => {
		const brandPalette = loadPaletteSync(brand) // Загружаем палитру синхронно
		return createStyleTokens(brandPalette) // Преобразуем в токены
	}, [brand])

	const [theme] = useState<Theme>('light')

	return (
		<StyleContext.Provider value={{ theme, styling: brandTokens }}>
			<div style={brandTokens}>{children}</div>
		</StyleContext.Provider>
	)
}
