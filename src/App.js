import BadgeState from './context/badges/BadgeState'
import InterfaceState from './context/interface/InterfaceState'
import ProjectState from './context/project/ProjectState'
import YoutubeState from './context/youtube/YoutubeState'
import AppRoute from './routes/AppRoute'

function App() {
	return (
		<InterfaceState>
			<BadgeState>
				<YoutubeState>
					<ProjectState>
						<AppRoute />
					</ProjectState>
				</YoutubeState>
			</BadgeState>
		</InterfaceState>
	)
}

export default App
