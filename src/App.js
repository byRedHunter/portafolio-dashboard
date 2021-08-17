import { tokenAuth } from './config/tokenAuth'
import { AuthState } from './context/auth/AuthState'
import BadgeState from './context/badges/BadgeState'
import InterfaceState from './context/interface/InterfaceState'
import ProjectState from './context/project/ProjectState'
import YoutubeState from './context/youtube/YoutubeState'
import AppRoute from './routes/AppRoute'

// revisamos si tenemos token
const token = sessionStorage.getItem('token')
if (token) tokenAuth(token)

function App() {
	return (
		<AuthState>
			<InterfaceState>
				<BadgeState>
					<YoutubeState>
						<ProjectState>
							<AppRoute />
						</ProjectState>
					</YoutubeState>
				</BadgeState>
			</InterfaceState>
		</AuthState>
	)
}

export default App
