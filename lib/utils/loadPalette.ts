export const loadPalette = async (brand: string) => {
	try {
		const module = await import(`../../brands/${brand}.json`)
		return module
	} catch (error) {
		console.error(`Failed to load design tokens for key: ${brand}`, error)
	}
}
