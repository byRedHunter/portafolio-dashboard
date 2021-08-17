import React, { useContext, useEffect } from 'react'
import { ROUTES } from '../constants/routes'
import { AuthContext } from '../context/auth/AuthContext'
import { useForm } from '../hooks/useForm'

import Image from '../shared/Image'
import { showToast } from '../utils/alerts'

const Login = ({ history }) => {
	const authState = useContext(AuthContext)
	const { message, autenticado, iniciarSesion } = authState

	useEffect(() => {
		if (autenticado) history.push(ROUTES.DASHBOARD)

		if (message) showToast(message.message, message.type)
	}, [message, autenticado, history])

	const { values, handleInputChange } = useForm({ username: '', password: '' })
	const { username, password } = values

	const handleSubmit = (e) => {
		e.preventDefault()

		// validar campos vacios
		if (username.trim() === '' || password.trim() === '')
			return showToast('Complete todos los campos.', 'error')

		iniciarSesion({ username, password })
	}

	return (
		<section className='login'>
			<Image
				className='login-bg'
				src='/images/bg-main.png'
				alt='Background code'
			/>

			<form className='login-form' onSubmit={handleSubmit}>
				<Image
					className='login-form-logo'
					src='/images/favicon.svg'
					alt='Logo byRedHunter'
				/>

				<h2 className='login-form-title'>Iniciar Sesión</h2>

				<input
					type='text'
					className='form-input'
					placeholder='Nombre de usuario'
					name='username'
					value={username}
					onChange={handleInputChange}
				/>

				<input
					type='password'
					className='form-input'
					placeholder='Contraseña'
					name='password'
					value={password}
					onChange={handleInputChange}
				/>

				<button type='submit' className='button'>
					Ingresar
				</button>
			</form>
		</section>
	)
}

export default Login
