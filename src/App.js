import BadgeState from './context/badges/BadgeState'
import InterfaceState from './context/interface/InterfaceState'
import YoutubeState from './context/youtube/YoutubeState'
import AppRoute from './routes/AppRoute'

function App() {
	return (
		<InterfaceState>
			<BadgeState>
				<YoutubeState>
					<AppRoute />
				</YoutubeState>
			</BadgeState>
		</InterfaceState>
	)
}

export default App
