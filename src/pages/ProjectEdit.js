import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { BadgeContext } from '../context/badges/BadgeContext'
import { ProjectContext } from '../context/project/projectContext'
import { useImage } from '../hooks/useImage'
import ProjectBadge from '../shared/ProjectBadge'
import { showToast } from '../utils/alerts'
import { isImageValid, selectImage, showImage } from '../utils/image'

const ProjectEdit = () => {
	const stateBadges = useContext(BadgeContext)
	const { badgeList, showBadgeList } = stateBadges

	const { id } = useParams()
	const history = useHistory()

	const [urlImage, setUrlImage] = useState('')
	const [dataProject, setDataProject] = useState({
		title: '',
		desc: '',
		preview: '',
		repository: '',
	})

	const stateProject = useContext(ProjectContext)
	const {
		projectsList,
		loading,
		projectBadges,
		listBadgesProject,
		projectEdit,
		editProjectImage,
		editProjectData,
	} = stateProject

	useEffect(() => {
		if (projectsList.length === 0) history.push(ROUTES.PROJECTS)

		showBadgeList()
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		setDataProject({
			title: projectEdit.title,
			desc: projectEdit.desc,
			preview: projectEdit.preview,
			repository: projectEdit.repository,
		})
		setUrlImage(projectEdit.image)
	}, [projectEdit])

	const { title, desc, preview, repository } = dataProject

	const handleInputChange = ({ target }) => {
		setDataProject({ ...dataProject, [target.name]: target.value })
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
		if (title === '' || desc === '' || preview === '' || repository === '') {
			return showToast('Complete todos los campos', 'error')
		}

		/* // crear formData
		const formData = new FormData()
		formData.append('title', title)
		projectBadges.forEach((badge) => {
			formData.append('badges', badge)
		})
		formData.append('desc', desc)
		formData.append('preview', preview)
		formData.append('repository', repository)
		console.log(title) */

		// editar datos
		editProjectData(id, {
			title,
			badges: projectBadges,
			desc,
			preview,
			repository,
		})
	}

	const handleEditImage = (e) => {
		e.preventDefault()

		// validar que haya imagen y sea valido
		if (!isImageValid(file)) {
			return showToast('Selecciona una imágen válida', 'error')
		}

		const formData = new FormData()
		formData.append('imageWork', file)

		// editar imagen
		editProjectImage({ id, formData })
	}

	return (
		<>
			<h2 className='title'>Nuevo Proyecto</h2>

			<form className='form-add' autoComplete='off' onSubmit={handleEditData}>
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
						<h4 data-info='Este proyecto tiene los badges a continuacion, agregue o quite'>
							Badges
						</h4>
					</div>

					<div
						className='form-section-body'
						style={{ paddingBottom: '0', paddingTop: '2rem' }}
					>
						<div className='work-badges'>
							{badgeList.map((badge) => (
								<ProjectBadge
									key={badge._id}
									badge={badge}
									selected={listBadgesProject.includes(badge._id)}
								/>
							))}
						</div>
					</div>
				</div>

				<div className='form-section' style={{ marginTop: '7rem' }}>
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

				<button type='submit' className='button' style={{ marginTop: '4rem' }}>
					{loading ? 'Actualizando...' : 'Guardar Cambios'}
				</button>
			</form>

			<form
				className='form-add'
				autoComplete='off'
				encType='multipart/form-data'
				onSubmit={handleEditImage}
			>
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

							<figure className='preview'>
								<img src={urlImage} alt='Preview' />
							</figure>
						</div>
					</div>
				</div>

				<button type='submit' className='button'>
					{loading ? 'Actualizando...' : 'Guardar Cambios'}
				</button>
			</form>
		</>
	)
}

export default ProjectEdit
