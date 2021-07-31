import React, { useContext, useEffect, useRef, useState } from 'react'
import { YoutubeContext } from '../context/youtube/YoutubeContext'
import { useForm } from '../hooks/useForm'
import { useImage } from '../hooks/useImage'
import { showToast } from '../utils/alerts'
import { isImageValid, selectImage, showImage } from '../utils/image'

const YoutubeNew = () => {
	const stateYoutube = useContext(YoutubeContext)
	const { loading, createVideo } = stateYoutube

	const [urlImage, setUrlImage] = useState('')
	const refFile = useRef(null)

	const { values, handleInputChange, reset } = useForm({
		title: '',
		description: '',
		link: '',
	})
	const { title, description, link } = values
	const { file, handleImageChange, resetImage } = useImage(refFile)

	const handleSubmit = (e) => {
		e.preventDefault()

		// validar campos
		if (title === '' && description === '' && link === '') {
			return showToast('Complete todos los campos', 'error')
		}

		// validar que haya imagen y sea valido
		if (!isImageValid(file)) {
			return showToast('Selecciona una imágen válida', 'error')
		}

		// registrar video
		const form = new FormData()
		form.append('title', title)
		form.append('desc', description)
		form.append('link', link)
		form.append('imageVideo', file)
		createVideo(form)
		reset()
		resetImage()
	}

	useEffect(() => {
		if (file.name === undefined) return

		if (!isImageValid(file)) {
			setUrlImage('')
			return showToast('Selecciona una imágen válida', 'error')
		}

		showImage(file, setUrlImage)
	}, [file])

	return (
		<>
			<h2 className='title'>Nuevo Video</h2>

			<form
				className='form-add'
				autoComplete='off'
				onSubmit={handleSubmit}
				encType='multipart/form-data'
			>
				<div className='form-section'>
					<div className='form-section-header'>
						<img src='/images/icons/youtube.svg' alt='Icono del svg' />
						<h4 data-info='Informacion sobre el video'>Video</h4>
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
								onChange={handleInputChange}
								value={title}
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
								onChange={handleInputChange}
								value={description}
							></textarea>
						</div>
					</div>
				</div>

				<div className='form-section'>
					<div className='form-section-header'>
						<img src='/images/icons/youtube.svg' alt='Icono del svg' />
						<h4 data-info='Vista del video'>Preview</h4>
					</div>
					<div className='form-section-body'>
						<div className='form-group'>
							<label className='form-label' htmlFor='link'>
								URL
							</label>
							<input
								type='text'
								id='link'
								className='form-input'
								name='link'
								onChange={handleInputChange}
								value={link}
							/>
						</div>
						<div className='form-group'>
							<label className='form-label' htmlFor='image'>
								Imágen
							</label>
							<input
								type='file'
								id='image'
								name='image'
								hidden
								ref={refFile}
								onChange={handleImageChange}
							/>
							<button
								type='button'
								className='select-image'
								onClick={() => selectImage(refFile)}
							>
								Elegir imágen
							</button>

							{urlImage && (
								<figure className='preview'>
									<img src={urlImage} alt='Preview' />
								</figure>
							)}
						</div>
					</div>
				</div>

				<button type='submit' className='button'>
					{loading ? 'Subiendo' : 'Crear Video'}
				</button>
			</form>
		</>
	)
}

export default YoutubeNew
