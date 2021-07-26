import React from 'react'
import PropTypes from 'prop-types'

const BadgeItem = ({ _id, title }) => {
	return (
		<div className='badge-item'>
			<span>{title}</span>{' '}
			<img className='pointer' src='/images/icons/edit.svg' alt='Edit icon' />
		</div>
	)
}

BadgeItem.propTypes = {
	_id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
}

export default BadgeItem
