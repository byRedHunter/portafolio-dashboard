import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { ProjectContext } from '../context/project/projectContext'

const ProjectBadge = ({ badge }) => {
	const [isSelected, setIsSelected] = useState(false)
	const { _id, title } = badge
	const stateProject = useContext(ProjectContext)
	const { addBadgeToProject, removeBadgeToProject } = stateProject

	const selectBadge = () => {
		!isSelected ? addBadgeToProject(_id) : removeBadgeToProject(_id)
		setIsSelected(!isSelected)
	}

	return (
		<div
			className={`badge badge-${isSelected && title.toLowerCase()} pointer`}
			onClick={selectBadge}
		>
			{title.toUpperCase()}
		</div>
	)
}

ProjectBadge.propTypes = {
	badge: PropTypes.object.isRequired,
}

export default ProjectBadge
