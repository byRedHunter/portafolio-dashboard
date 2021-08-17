import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { AuthContext } from '../context/auth/AuthContext'
import Login from '../pages/Login'
import DashboardRoute from './DashboardRoute'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const AppRoute = () => {
	const authState = useContext(AuthContext)
	const { autenticado } = authState

	return (
		<Router>
			<Switch>
				<PublicRoute
					exact
					path={ROUTES.LOGIN}
					component={Login}
					isAuthenticated={autenticado}
				/>

				<PrivateRoute
					path={ROUTES.DASHBOARD}
					component={DashboardRoute}
					isAuthenticated={autenticado}
				/>
			</Switch>
		</Router>
	)
}

export default AppRoute
