import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './shared/Loading'

const Login = lazy(() => import('./pages/Login'))

function App() {
	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<Switch>
					<Route exact path='/' component={Login} />
				</Switch>
			</Suspense>
		</Router>
	)
}

export default App
