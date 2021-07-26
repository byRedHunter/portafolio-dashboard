import React, { useContext, useState } from 'react'
import { BadgeContext } from '../context/badges/BadgeContext'
import { useForm } from '../hooks/useForm'
import { showToast } from '../utils/alerts'
import Loading from './Loading'

const BadgeForm = () => {
	const badgeState = useContext(BadgeContext)
	const { addBadgeList } = badgeState

	const { values, reset, handleInputChange } = useForm({ title: '' })
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		if (values.title !== '') {
			addBadgeList(values)
			reset()
			showToast('Badge agregado', 'success')
		} else {
			showToast('Ingrese un titulo para registrar', 'error')
		}

		setLoading(false)
	}

	return (
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
	)
}

export default BadgeForm
