import React from 'react'
import { useForm } from '../hooks/useForm'

const Badges = () => {
	const { values, handleInputChange } = useForm({ title: '' })

	const handleSubmit = (e) => {
		e.preventDefault()

		if (values.title !== '') {
			console.log(values)
		}
	}

	return (
		<>
			<h2 className='title'>Badges</h2>

			<form className='form-badges' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='badge-title' className='form-label'>
						Titulo del badge
					</label>
					<input
						type='text'
						className='form-input'
						placeholder='Titulo'
						name='title'
						value={values.title}
						onChange={handleInputChange}
					/>
				</div>

				<button className='button'>Agregar</button>
			</form>

			<h3 className='subtitle'>Lista de Badges</h3>
		</>
	)
}

export default Badges
