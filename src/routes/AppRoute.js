import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import Login from '../pages/Login'
import DashboardRoute from './DashboardRoute'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const AppRoute = () => {
	return (
		<Router>
			<Switch>
				<PublicRoute
					exact
					path={ROUTES.LOGIN}
					component={Login}
					isAuthenticated={true}
				/>

				<PrivateRoute
					path={ROUTES.DASHBOARD}
					component={DashboardRoute}
					isAuthenticated={true}
				/>
			</Switch>
		</Router>
	)
}

export default AppRoute
