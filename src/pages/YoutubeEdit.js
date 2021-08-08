import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { YoutubeContext } from '../context/youtube/YoutubeContext'
import { useImage } from '../hooks/useImage'
import Loading from '../shared/Loading'
import { showToast } from '../utils/alerts'
import { isImageValid, selectImage, showImage } from '../utils/image'

const YoutubeEdit = () => {
	const { id } = useParams()
	const history = useHistory()
	const [urlImage, setUrlImage] = useState('')

	const [dataVideo, setDataVideo] = useState({
		title: '',
		desc: '',
		url: '',
	})

	const stateYoutube = useContext(YoutubeContext)
	const {
		loading,
		listarVideoById,
		videosList,
		videoEdit,
		editVideoData,
		editVideoImage,
	} = stateYoutube

	useEffect(() => {
		if (videosList.length === 0) {
			history.push(ROUTES.YOUTUBE)
		}

		listarVideoById(id)
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		setDataVideo({ ...videoEdit })
		setUrlImage(videoEdit.image)
	}, [videoEdit])

	const { title, desc, link } = dataVideo

	const handleInputChange = ({ target }) => {
		setDataVideo({ ...dataVideo, [target.name]: target.value })
	}

	const refFile = useRef(null)
	const { file, handleImageChange } = useImage(refFile)

	useEffect(() => {
		if (file.name === undefined) return

		if (!isImageValid(file)) {
			setUrlImage('')
			return showToast('Selecciona una imágen válida', 'error')
		}

		showImage(file, setUrlImage)
	}, [file])

	const handleEditData = (e) => {
		e.preventDefault()

		// validar campos
		if (title === '' && desc === '' && link === '') {
			return showToast('Complete todos los campos', 'error')
		}

		editVideoData({ id, title, desc, link })
	}

	const handleEditImage = (e) => {
		e.preventDefault()

		// validar que haya imagen y sea valido
		if (!isImageValid(file)) {
			return showToast('Selecciona una imágen válida', 'error')
		}

		const formData = new FormData()
		formData.append('imageVideo', file)

		editVideoImage({ id, formData })
	}

	return (
		<>
			<h2 className='title'>Editar Video</h2>

			{loading && <Loading />}

			<form className='form-add' autoComplete='off' onSubmit={handleEditData}>
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
								value={title}
								onChange={handleInputChange}
							/>
						</div>
						<div className='form-group'>
							<label className='form-label' htmlFor='descripcion'>
								Descripción
							</label>
							<textarea
								name='desc'
								id='description'
								className='form-area'
								value={desc}
								onChange={handleInputChange}
							></textarea>
						</div>
						<div className='form-group'>
							<label className='form-label' htmlFor='link'>
								URL
							</label>
							<input
								type='text'
								id='link'
								className='form-input'
								name='link'
								value={link}
								onChange={handleInputChange}
							/>
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
				onSubmit={handleEditImage}
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

							<figure className='preview'>
								<img src={urlImage} alt='Preview' />
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
