import React, { useContext, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import PropTypes from 'prop-types'
import { AuthContext } from '../context/auth/AuthContext'

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
	const authState = useContext(AuthContext)
	const { usuarioAutenticado } = authState

	useEffect(() => {
		usuarioAutenticado()
		// eslint-disable-next-line
	}, [])

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
