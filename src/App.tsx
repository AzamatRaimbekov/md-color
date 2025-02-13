import { StyleProvider } from '../lib/main'

function App() {
	return (
		<StyleProvider brand='mkassa'>
			<div
				style={{
					background: 'var(--primary)',
					width: '300px',
					height: '300px',
				}}
			>
				BLOCK
			</div>
		</StyleProvider>
	)
}

export default App
