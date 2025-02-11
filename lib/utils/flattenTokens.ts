export const flattenTokens = (
	obj: object,
	prefix = ''
): Record<string, string | number> => {
	let flat: Record<string, string | number> = {}
	Object.keys(obj).forEach(key => {
		const value = obj[key as keyof typeof obj]
		const newPrefix = prefix ? `${prefix}-${key}` : `--${key}`
		if (typeof value === 'object' && value !== null) {
			flat = { ...flat, ...flattenTokens(value, newPrefix) }
		} else {
			flat[newPrefix] = value
		}
	})
	return flat
}
