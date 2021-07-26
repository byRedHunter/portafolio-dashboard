import React from 'react'
import { useForm } from '../hooks/useForm'
import { showToast } from '../utils/axios'

const Badges = () => {
	const { values, handleInputChange } = useForm({ title: '' })

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (values.title !== '') {
			try {
				console.log(`${process.env.REACT_APP_BASE_URL}badge`)
				/* const result = await axios.post(
					`${process.env.REACT_APP_BASE_URL}badge`,
					values
				)
				console.log(result) */
			} catch (error) {
				console.log(error)
			}
		} else {
			showToast('Ingrese un titulo para registrar', 'error')
		}
	}

	return (
		<>
			<h2 className='title'>Badges</h2>

			<form className='form-badges' onSubmit={handleSubmit} autoComplete='off'>
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
