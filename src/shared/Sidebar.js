import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Image from '../shared/Image'
import { ROUTES } from '../constants/routes'
import { InterfaceContext } from '../context/interface/InterfaceContext'

const Sidebar = () => {
	const stateInterface = useContext(InterfaceContext)
	const { sidebarActive } = stateInterface

	return (
		<div className={`sidebar ${sidebarActive ? 'active' : null}`}>
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
				<Link to={ROUTES.REPORTS} className='sidebar-nav-item'>
					<img src='/images/icons/reports.svg' alt='Reports icon' />
					<span>Reportes</span>
				</Link>
				<Link to={ROUTES.BADGES} className='sidebar-nav-item'>
					<img src='/images/icons/badges.svg' alt='Badges icon' />
					<span>Badges</span>
				</Link>
				<Link to={ROUTES.PROJECTS} className='sidebar-nav-item'>
					<img src='/images/icons/projects.svg' alt='Projects icon' />
					<span>Proyectos</span>
				</Link>
				<Link to={ROUTES.YOUTUBE} className='sidebar-nav-item'>
					<img src='/images/icons/youtube.svg' alt='Youtube icon' />
					<span>YouTube</span>
				</Link>
			</nav>

			<div className='circle-button sidebar-button pointer grid-center'>
				<img src='/images/icons/logout.svg' alt='Logout icon' />
			</div>
		</div>
	)
}

export default Sidebar
