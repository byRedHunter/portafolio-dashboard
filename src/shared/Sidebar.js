import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Image from '../shared/Image'
import { ROUTES } from '../constants/routes'
import { InterfaceContext } from '../context/interface/InterfaceContext'
import { AuthContext } from '../context/auth/AuthContext'

const Sidebar = () => {
	const stateInterface = useContext(InterfaceContext)
	const { sidebarActive, changeSidebarState } = stateInterface

	const authState = useContext(AuthContext)
	const { cerrarSesion } = authState

	return (
		<div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
			<Image
				className='sidebar-bg'
				src='/images/bg-main.png'
				alt='Code image'
			/>

			<div className='sidebar-logo'>
				<img src='/images/favicon.svg' alt='Logo byRedHunter' />
				<h1>byRedHunter</h1>
			</div>

			<nav className='sidebar-nav'>
				<Link
					to={ROUTES.REPORTS}
					className='sidebar-nav-item'
					onClick={() => changeSidebarState()}
				>
					<img src='/images/icons/reports.svg' alt='Reports icon' />
					<span>Reportes</span>
				</Link>
				<Link
					to={ROUTES.BADGES}
					className='sidebar-nav-item'
					onClick={() => changeSidebarState()}
				>
					<img src='/images/icons/badges.svg' alt='Badges icon' />
					<span>Badges</span>
				</Link>
				<div className='sidebar-nav-item submenu'>
					<img src='/images/icons/projects.svg' alt='Projects icon' />
					<span>Proyectos</span>
					<div className='submenu-items'>
						<Link to={ROUTES.PROJECTS} onClick={() => changeSidebarState()}>
							Mis proyectos
						</Link>
						<Link
							to={ROUTES.PROJECTS_NUEVO}
							onClick={() => changeSidebarState()}
						>
							Registrar
						</Link>
					</div>
				</div>
				<div className='sidebar-nav-item submenu'>
					<img src='/images/icons/youtube.svg' alt='Youtube icon' />
					<span>YouTube</span>
					<div className='submenu-items'>
						<Link to={ROUTES.YOUTUBE} onClick={() => changeSidebarState()}>
							Videos
						</Link>
						<Link
							to={ROUTES.YOUTUBE_NUEVO}
							onClick={() => changeSidebarState()}
						>
							Registrar
						</Link>
					</div>
				</div>
			</nav>

			<div
				className='circle-button sidebar-button pointer grid-center'
				onClick={cerrarSesion}
			>
				<img src='/images/icons/logout.svg' alt='Logout icon' />
			</div>
		</div>
	)
}

export default Sidebar
