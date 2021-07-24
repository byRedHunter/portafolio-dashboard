import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import PropTypes from 'prop-types'

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to={ROUTES.LOGIN} />
				)
			}
		/>
	)
}

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
}

export default PrivateRoute
