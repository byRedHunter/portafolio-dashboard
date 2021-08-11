import React, { useContext } from 'react'
import { ProjectContext } from '../context/project/projectContext'
import Image from './Image'

const ProjectItem = ({ project }) => {
	const { _id, title, badges, desc, image, preview, repository } = project
	const stateProject = useContext(ProjectContext)
	const { deleteProject } = stateProject

	return (
		<article className='work'>
			<div className='work-image'>
				<Image src={image} alt={title} />
				<div className='work-image-actions'>
					<a href='/edit' className='button'>
						Editar
					</a>
					<button className='button' onClick={() => deleteProject(_id)}>
						Eliminar
					</button>
				</div>
			</div>

			<div className='work-content'>
				<h3>{title}</h3>

				<ul className='work-badges'>
					{badges.map((badge) => (
						<li
							key={badge._id}
							className={`badge badge-${badge.title.toLowerCase()}`}
						>
							{badge.title.toLowerCase()}
						</li>
					))}
				</ul>

				<p>{desc}</p>

				<div className='work-actions'>
					<a href={preview} target='_blank' rel='noreferrer' className='button'>
						Demo
					</a>
					<a
						href={repository}
						target='_blank'
						rel='noreferrer'
						className='button'
					>
						Código
					</a>
				</div>
			</div>
		</article>
	)
}

export default ProjectItem
