import React, { useContext, useEffect, useRef, useState } from 'react'
import { BadgeContext } from '../context/badges/BadgeContext'
import { ProjectContext } from '../context/project/projectContext'
import { useForm } from '../hooks/useForm'
import { useImage } from '../hooks/useImage'
import ProjectBadge from '../shared/ProjectBadge'
import { showToast } from '../utils/alerts'
import { isImageValid, selectImage, showImage } from '../utils/image'

const ProjectNew = () => {
	const stateBadges = useContext(BadgeContext)
	const { badgeList, showBadgeList } = stateBadges

	const stateProject = useContext(ProjectContext)
	const { loading, projectBadges, createProject } = stateProject

	const [urlImage, setUrlImage] = useState('')
	const refFile = useRef(null)

	const { values, handleInputChange, reset } = useForm({
		title: '',
		desc: '',
		preview: '',
		repository: '',
	})
	const { title, desc, preview, repository } = values

	const { file, handleImageChange } = useImage(refFile)

	useEffect(() => {
		showBadgeList()
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (file.name === undefined) return

		if (!isImageValid(file)) {
			setUrlImage('')
			return showToast('Selecciona una imágen válida', 'error')
		}

		showImage(file, setUrlImage)
	}, [file])

	const handleSubmit = (e) => {
		e.preventDefault()

		// validar campos
		if (title === '' || desc === '' || preview === '' || repository === '') {
			return showToast('Complete todos los campos', 'error')
		}

		// validar que haya imagen y sea valido
		if (!isImageValid(file)) {
			return showToast('Selecciona una imágen válida', 'error')
		}

		// registrar proyecto
		const formData = new FormData()
		formData.append('title', title)
		projectBadges.forEach((badge) => {
			formData.append('badges', badge)
		})
		formData.append('desc', desc)
		formData.append('preview', preview)
		formData.append('repository', repository)
		formData.append('imageWork', file)

		createProject(formData)
		reset()
		setUrlImage('')
	}

	return (
		<>
			<h2 className='title'>Nuevo Proyecto</h2>

			<form
				className='form-add'
				autoComplete='off'
				encType='multipart/form-data'
				onSubmit={handleSubmit}
			>
				<div className='form-section'>
					<div className='form-section-header'>
						<img src='/images/icons/projects.svg' alt='Icono del svg' />
						<h4 data-info='Datos acerca del proyecto'>Información</h4>
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
					</div>
				</div>

				<div className='form-section'>
					<div className='form-section-header'>
						<img src='/images/icons/projects.svg' alt='Icono del svg' />
						<h4 data-info='Elige los badges del proyecto'>Badges</h4>
					</div>
					<div className='form-section-body' style={{ paddingBottom: '0' }}>
						<div className='work-badges' style={{ paddingTop: '2rem' }}>
							{badgeList.map((badge) => (
								<ProjectBadge key={badge._id} badge={badge} />
							))}
						</div>
					</div>
				</div>

				<div className='form-section' style={{ marginTop: '6rem' }}>
					<div className='form-section-header'>
						<img src='/images/icons/projects.svg' alt='Icono del svg' />
						<h4 data-info='URL necesarias'>Preview</h4>
					</div>
					<div className='form-section-body' style={{ paddingBottom: '0' }}>
						<div className='form-group'>
							<label className='form-label' htmlFor='link'>
								URL Demo
							</label>
							<input
								type='text'
								id='link'
								className='form-input'
								name='preview'
								value={preview}
								onChange={handleInputChange}
							/>
						</div>

						<div className='form-group'>
							<label className='form-label' htmlFor='repository'>
								URL Repositorio
							</label>
							<input
								type='text'
								id='repository'
								className='form-input'
								name='repository'
								value={repository}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>

				<div className='form-section' style={{ marginTop: '6rem' }}>
					<div className='form-section-header'>
						<img src='/images/icons/projects.svg' alt='Icono del svg' />
						<h4 data-info='Imágen del proyecto'>Preview</h4>
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

							{urlImage && (
								<figure className='preview'>
									<img src={urlImage} alt='Preview' />
								</figure>
							)}
						</div>
					</div>
				</div>

				<button type='submit' className='button' style={{ marginTop: '4rem' }}>
					{loading ? 'Guardando Proyecto...' : 'Crear Proyecto'}
				</button>
			</form>
		</>
	)
}

export default ProjectNew
