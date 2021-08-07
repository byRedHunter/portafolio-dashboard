import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { YoutubeContext } from '../context/youtube/YoutubeContext'

const YoutubeEdit = () => {
	const { id } = useParams()
	const stateYoutube = useContext(YoutubeContext)
	const { loading, listarVideoById } = stateYoutube

	useEffect(() => {
		listarVideoById(id)
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<h2 className='title'>Editar Video</h2>

			<form className='form-add' autoComplete='off'>
				<div className='form-section'>
					<div className='form-section-header'>
						<img src='/images/icons/youtube.svg' alt='Icono del svg' />
						<h4 data-info='Actualizar los datos generales'>Informacion</h4>
					</div>
					<div className='form-section-body'>
						<div className='form-group'>
							<label className='form-label' htmlFor='title'>
								Titulo
							</label>
							<input
								type='text'
								id='title'
								className='form-input'
								name='title'
							/>
						</div>
						<div className='form-group'>
							<label className='form-label' htmlFor='descripcion'>
								Descripción
							</label>
							<textarea
								name='description'
								id='description'
								className='form-area'
							></textarea>
						</div>
						<div className='form-group'>
							<label className='form-label' htmlFor='link'>
								URL
							</label>
							<input type='text' id='link' className='form-input' name='link' />
						</div>
					</div>
				</div>

				<button type='submit' className='button'>
					{loading ? 'Editando...' : 'Actualizar Datos'}
				</button>
			</form>

			<form
				className='form-add'
				autoComplete='off'
				encType='multipart/form-data'
			>
				<div className='form-section'>
					<div className='form-section-header'>
						<img src='/images/icons/youtube.svg' alt='Icono del svg' />
						<h4 data-info='Actualizar imagen del video'>Preview</h4>
					</div>
					<div className='form-section-body'>
						<div className='form-group'>
							<label className='form-label' htmlFor='image'>
								Imágen
							</label>
							<input type='file' id='image' name='image' hidden />
							<button type='button' className='select-image'>
								Elegir imágen
							</button>

							<figure className='preview'>
								<img
									src='https://res.cloudinary.com/byredhunter/image/upload/v1628208337/jos56mhlpukejya2hnyy.png'
									alt='Preview'
								/>
							</figure>
						</div>
					</div>
				</div>

				<button type='submit' className='button'>
					{loading ? 'Editando...' : 'Cambiar Imágen'}
				</button>
			</form>
		</>
	)
}

export default YoutubeEdit
