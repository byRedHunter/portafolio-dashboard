import React from 'react'
import ProjectItem from '../shared/ProjectItem'

const Projects = () => {
	return (
		<>
			<h2 className='title'>Mis proyectos</h2>

			<section className='projects'>
				<ProjectItem />
				<ProjectItem />
				<ProjectItem />
			</section>

			<button className='button load'>Ver Más</button>
		</>
	)
}

export default Projects
