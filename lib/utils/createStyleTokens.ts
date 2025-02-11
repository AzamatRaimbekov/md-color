import { flattenTokens } from './flattenTokens'

export const createStyleTokens = (obj: any) => {
	const semanticTokens = {
		'--primary': obj?.black['5'],
		'--secondary': obj?.black['10'],
		'--third': obj?.black['10'],
	}

	const primitiveTokens = flattenTokens(obj)

	return {
		...semanticTokens,
		...primitiveTokens,
	}
}
