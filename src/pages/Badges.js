import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from '../hooks/useForm'
import { showToast } from '../utils/axios'
import Loading from '../shared/Loading'

const Badges = () => {
	const { values, reset, handleInputChange } = useForm({ title: '' })
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		if (values.title !== '') {
			try {
				const result = await axios.post(
					`${process.env.REACT_APP_BASE_URL}badge`,
					values
				)
				if (result.status === 200) {
					reset()
					showToast('Badge agregado', 'success')
				}
			} catch (error) {
				console.log(error)
				showToast('Algo salio mal', 'error')
			}
		} else {
			showToast('Ingrese un titulo para registrar', 'error')
		}

		setLoading(false)
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

				{loading ? <Loading /> : <button className='button'>Agregar</button>}
			</form>

			<h3 className='subtitle'>Lista de Badges</h3>
		</>
	)
}

export default Badges
