import React from 'react'
import BadgeForm from '../shared/BadgeForm'
import BadgeList from '../shared/BadgeList'

const Badges = () => {
	return (
		<>
			<h2 className='title'>Badges</h2>

			<BadgeForm />

			<h3 className='subtitle'>Lista de Badges</h3>

			<BadgeList />
		</>
	)
}

export default Badges
