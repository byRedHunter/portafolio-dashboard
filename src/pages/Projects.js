import React, { useContext, useEffect } from 'react'
import { ProjectContext } from '../context/project/projectContext'
import Loading from '../shared/Loading'
import ProjectItem from '../shared/ProjectItem'

const Projects = () => {
	const stateProjects = useContext(ProjectContext)
	const { projectsList, error, loading, hasNextPage, listarProyectos } =
		stateProjects

	useEffect(() => {
		listarProyectos()
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<h2 className='title'>Mis proyectos</h2>

			{loading && <Loading />}

			{error ? (
				<p className='text-info'>
					Error en el servidor, no se puede cargar los proyectos.
				</p>
			) : projectsList.length === 0 ? (
				<p className='text-info'>Aún no tienes proyectos, agregue uno.</p>
			) : (
				<>
					<section className='projects'>
						{projectsList.map((project) => (
							<ProjectItem key={project._id} project={project} />
						))}
					</section>

					{hasNextPage && (
						<button className='button load' onClick={() => listarProyectos()}>
							Ver Más
						</button>
					)}
				</>
			)}
		</>
	)
}

export default Projects
