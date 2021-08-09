import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import Loading from '../shared/Loading'
import MenuButton from '../shared/MenuButton'
import Sidebar from '../shared/Sidebar'

const Reports = lazy(() => import('../pages/Reports'))
const Badges = lazy(() => import('../pages/Badges'))
const Youtube = lazy(() => import('../pages/Youtube'))
const YoutubeNew = lazy(() => import('../pages/YoutubeNew'))
const YoutubeEdit = lazy(() => import('../pages/YoutubeEdit'))
const Projects = lazy(() => import('../pages/Projects'))
const ProjectEdit = lazy(() => import('../pages/ProjectEdit'))
const ProjectNew = lazy(() => import('../pages/ProjectNew'))

const DashboardRoute = () => {
	return (
		<>
			<Sidebar />

			<section className='content'>
				<Suspense fallback={<Loading />}>
					<Switch>
						<Route exact path={ROUTES.REPORTS} component={Reports} />
						<Route exact path={ROUTES.BADGES} component={Badges} />
						<Route exact path={ROUTES.PROJECTS} component={Projects} />
						<Route exact path={ROUTES.PROJECTS_NUEVO} component={ProjectNew} />
						<Route exact path={ROUTES.PROJECTS_EDIT} component={ProjectEdit} />
						<Route exact path={ROUTES.YOUTUBE} component={Youtube} />
						<Route
							exact
							path={`${ROUTES.YOUTUBE}/:id`}
							component={YoutubeEdit}
						/>
						<Route exact path={ROUTES.YOUTUBE_NUEVO} component={YoutubeNew} />
						<Redirect to={ROUTES.REPORTS} />
					</Switch>
				</Suspense>
			</section>

			<MenuButton />
		</>
	)
}

export default DashboardRoute
