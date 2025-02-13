import { StyleProviderVariant } from '../lib/providers/StyleProviderVariant'

function App() {
	return (
		<StyleProviderVariant brand='mkassa'>
			<div
				style={{
					background: 'var(--primary)',
					width: '300px',
					height: '300px',
				}}
			>
				BLOCK
			</div>
		</StyleProviderVariant>
	)
}

export default App
