import { useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { clientAxios } from '../../config/axios'
import { tokenAuth } from '../../config/tokenAuth'
import {
	AUTH_CERRAR_SESION,
	AUTH_ERROR,
	AUTH_GET_USER,
	AUTH_LOGIN,
} from '../../constants/actions'
import { ROUTES } from '../../constants/routes'
import { AuthContext } from './AuthContext'
import { AuthReducer } from './AuthReducer'

export const AuthState = ({ children }) => {
	const initialState = {
		toke: sessionStorage.getItem('token'),
		autenticado: false,
		usuario: null,
		message: null,
		loading: true,
	}

	const [state, dispatch] = useReducer(AuthReducer, initialState)

	const router = useHistory()
	const uri = 'auth'

	const usuarioAutenticado = async () => {
		const token = sessionStorage.getItem('token')

		// enviamos el token por el header
		if (token) tokenAuth(token)

		try {
			const response = await clientAxios.get(uri)
			dispatch({ type: AUTH_GET_USER, payload: response.data })
		} catch (error) {
			console.log(error.response)
			dispatch({
				type: AUTH_ERROR,
				payload: { message: 'El usuario no esta autenticado.', type: 'error' },
			})
			router.push(ROUTES.LOGIN)
		}
	}

	// cuando inicie sesion
	const iniciarSesion = async (data) => {
		try {
			const response = await clientAxios.post(uri, data)

			dispatch({ type: AUTH_LOGIN, payload: response.data })

			// obtener usuario
			usuarioAutenticado()
		} catch (error) {
			console.log(error.response)
			const alert = {
				message: error.response.data.message,
				type: 'error',
			}

			dispatch({ type: AUTH_ERROR, payload: alert })
		}
	}

	// cerrar sesion
	const cerrarSesion = () => {
		dispatch({
			type: AUTH_CERRAR_SESION,
			payload: { message: 'Cesión cerrada', type: 'success' },
		})
	}

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				message: state.message,
				loading: state.loading,
				iniciarSesion,
				cerrarSesion,
				usuarioAutenticado,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
