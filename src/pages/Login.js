import React from 'react'

import Image from '../shared/Image'

const Login = () => {
	return (
		<section className='login'>
			<Image
				className='login-bg'
				src='/images/bg-main.png'
				alt='Background code'
			/>

			<form className='login-form'>
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
				/>

				<input
					type='password'
					className='form-input'
					placeholder='Contraseña'
				/>

				<button type='submit' className='button'>
					Ingresar
				</button>
			</form>
		</section>
	)
}

export default Login
