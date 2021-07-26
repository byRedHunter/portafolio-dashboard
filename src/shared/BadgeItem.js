import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { BadgeContext } from '../context/badges/BadgeContext'
import { showToast } from '../utils/alerts'

const BadgeItem = ({ _id, title }) => {
	const stateBadge = useContext(BadgeContext)
	const { editBadge } = stateBadge
	const [editing, setEditing] = useState(false)
	const [value, setValue] = useState(title)

	const handleEdit = () => {
		if (title !== value) {
			editBadge({ _id, title: value })
		} else {
			showToast('Modifique para poder editar', 'warning')
		}
		setEditing(false)
	}

	return (
		<div className='badge-item'>
			<input
				type='text'
				className='badge-item-input'
				value={value}
				disabled={!editing ? true : false}
				onChange={({ target }) => {
					setValue(target.value)
				}}
			/>
			{!editing ? (
				<img
					className='pointer'
					src='/images/icons/edit.svg'
					alt='Edit icon'
					onClick={() => setEditing(true)}
				/>
			) : (
				<img
					className='pointer'
					src='/images/icons/save.svg'
					alt='Save icon'
					onClick={handleEdit}
				/>
			)}
		</div>
	)
}

BadgeItem.propTypes = {
	_id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
}

export default BadgeItem
