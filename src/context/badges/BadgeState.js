import React, { useReducer } from 'react'
import { BadgeReducer } from './BadgeReducer'
import { BADGE_EDIT, BADGE_LIST, BADGE_SAVE } from '../../constants/actions'
import { showToast } from '../../utils/alerts'
import { BadgeContext } from './BadgeContext'
import { clientAxios } from '../../config/axios'

const BadgeState = ({ children }) => {
	const uri = 'badge'

	const initialState = {
		badgeList: [],
	}

	const [state, dispatch] = useReducer(BadgeReducer, initialState)

	// actions

	// listar badges
	const showBadgeList = async () => {
		try {
			const result = await clientAxios.get(uri)
			dispatch({
				type: BADGE_LIST,
				payload: result.data,
			})
		} catch (error) {
			showToast('Error con el servidor', 'error')
		}
	}

	// agregar badge
	const addBadgeList = async (values) => {
		try {
			const result = await clientAxios.post(uri, values)

			showToast('Badge agregado', 'success')

			dispatch({
				type: BADGE_SAVE,
				payload: result.data,
			})
		} catch (error) {
			console.log(error.response)
			showToast(error.response.data.message || error.response.data, 'error')
		}
	}

	// editar badge
	const editBadge = async (badge) => {
		try {
			const result = await clientAxios.put(uri + `/${badge._id}`, badge)

			showToast(result.data.message, 'success')

			dispatch({
				type: BADGE_EDIT,
				payload: badge,
			})
		} catch (error) {
			showToast(error.response.data || error.response.data, 'error')
		}
	}

	return (
		<BadgeContext.Provider
			value={{
				badgeList: state.badgeList,
				showBadgeList,
				addBadgeList,
				editBadge,
			}}
		>
			{children}
		</BadgeContext.Provider>
	)
}

export default BadgeState
