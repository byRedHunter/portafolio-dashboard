import React, { useContext, useEffect } from 'react'
import { BadgeContext } from '../context/badges/BadgeContext'
import BadgeItem from './BadgeItem'

const BadgeList = () => {
	const badgeState = useContext(BadgeContext)
	const { badgeList, showBadgeList } = badgeState

	useEffect(() => {
		showBadgeList()
		// eslint-disable-next-line
	}, [])

	if (badgeList.length === 0)
		return <p className='text-info'>Aun no tienes badges, agregue uno.</p>

	return (
		<section className='badge-list'>
			{badgeList.map((badge) => (
				<BadgeItem key={badge._id} _id={badge._id} title={badge.title} />
			))}
		</section>
	)
}

export default BadgeList
