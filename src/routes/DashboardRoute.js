import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import Loading from '../shared/Loading'
import MenuButton from '../shared/MenuButton'
import Sidebar from '../shared/Sidebar'

const Reports = lazy(() => import('../pages/Reports'))
const Badges = lazy(() => import('../pages/Badges'))

const DashboardRoute = () => {
	return (
		<>
			<Sidebar />

			<section className='content'>
				<Suspense fallback={<Loading />}>
					<Switch>
						<Route exact path={ROUTES.REPORTS} component={Reports} />
						<Route exact path={ROUTES.BADGES} component={Badges} />
						<Redirect to={ROUTES.REPORTS} />
					</Switch>
				</Suspense>
			</section>

			<MenuButton />
		</>
	)
}

export default DashboardRoute
