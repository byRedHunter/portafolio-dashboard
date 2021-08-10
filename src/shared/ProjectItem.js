import React from 'react'
import Image from './Image'

const ProjectItem = ({ project }) => {
	const { title } = project

	return (
		<article className='work'>
			<div className='work-image'>
				<Image
					src='https://cdn.pixabay.com/photo/2021/08/03/11/51/ocean-6519233__340.jpg'
					alt='Imagen de prueba'
				/>
				<div className='work-image-actions'>
					<a href='/edit' className='button'>
						Editar
					</a>
					<button className='button'>Eliminar</button>
				</div>
			</div>

			<div className='work-content'>
				<h3>{title}</h3>

				<ul className='work-badges'>
					<li className='badge badge-react'>react</li>
					<li className='badge badge-firebase'>firebase</li>
				</ul>

				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing. Unde odit incidunt
					minima deserunt quae.
				</p>

				<div className='work-actions'>
					<a href='/' className='button'>
						Demo
					</a>
					<a href='/' className='button'>
						Código
					</a>
				</div>
			</div>
		</article>
	)
}

export default ProjectItem
