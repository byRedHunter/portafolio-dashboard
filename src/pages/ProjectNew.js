import React, { useContext, useEffect } from 'react'
import { BadgeContext } from '../context/badges/BadgeContext'
import ProjectBadge from '../shared/ProjectBadge'

const ProjectNew = () => {
	const stateBadges = useContext(BadgeContext)
	const { badgeList, showBadgeList } = stateBadges

	useEffect(() => {
		showBadgeList()
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<h2 className='title'>Nuevo Proyecto</h2>

			<form
				className='form-add'
				autoComplete='off'
				encType='multipart/form-data'
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

				<div className='form-section'>
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
							<input type='file' id='image' name='image' hidden />
							<button type='button' className='select-image'>
								Elegir imágen
							</button>

							<figure className='preview'>
								<img
									src='https://cdn.pixabay.com/photo/2021/07/11/10/39/fantasy-6403406__340.jpg'
									alt='Preview'
								/>
							</figure>
						</div>
					</div>
				</div>

				<button type='submit' className='button'>
					Crear Proyecto
				</button>
			</form>
		</>
	)
}

export default ProjectNew
