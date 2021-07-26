import BadgeState from './context/badges/BadgeState'
import InterfaceState from './context/interface/InterfaceState'
import AppRoute from './routes/AppRoute'

function App() {
	return (
		<InterfaceState>
			<BadgeState>
				<AppRoute />
			</BadgeState>
		</InterfaceState>
	)
}

export default App
