import {
	AUTH_CERRAR_SESION,
	AUTH_ERROR,
	AUTH_GET_USER,
	AUTH_LOGIN,
} from '../../constants/actions'

export const AuthReducer = (state, action) => {
	switch (action.type) {
		case AUTH_LOGIN:
			sessionStorage.setItem('token', action.payload.token)
			return {
				...state,
				token: action.payload.token,
				autenticado: true,
				mensaje: null,
				cargando: false,
			}

		case AUTH_CERRAR_SESION:
		case AUTH_ERROR:
			sessionStorage.removeItem('token')
			return {
				...state,
				usuario: null,
				autenticado: false,
				token: null,
				mensaje: action.payload,
				cargando: false,
			}

		case AUTH_GET_USER:
			return {
				...state,
				autenticado: true,
				usuario: action.payload,
				cargando: false,
			}

		default:
			return state
	}
}
