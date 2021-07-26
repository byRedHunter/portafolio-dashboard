import React, { useReducer } from 'react'
import axios from 'axios'
import { BadgeReducer } from './BadgeReducer'
import { BADGE_EDIT, BADGE_LIST, BADGE_SAVE } from '../../constants/actions'
import { showToast } from '../../utils/alerts'
import { BadgeContext } from './BadgeContext'

const BadgeState = ({ children }) => {
	const uri = process.env.REACT_APP_BASE_URL + 'badge'

	const initialState = {
		badgeList: [],
	}

	const [state, dispatch] = useReducer(BadgeReducer, initialState)

	// actions

	// listar badges
	const showBadgeList = async () => {
		try {
			const result = await axios.get(uri)
			dispatch({
				type: BADGE_LIST,
				payload: result.data,
			})
		} catch (error) {
			console.log(error)
			showToast('Algo salio mal', 'error')
		}
	}

	// agregar badge
	const addBadgeList = async (values) => {
		try {
			const result = await axios.post(uri, values)

			dispatch({
				type: BADGE_SAVE,
				payload: result.data,
			})
		} catch (error) {
			console.log(error)
			showToast('Algo salio mal', 'error')
		}
	}

	// editar badge
	const editBadge = async (badge) => {
		try {
			const result = await axios.put(uri + `/${badge._id}`, badge)

			showToast(result.data.message, 'success')

			dispatch({
				type: BADGE_EDIT,
				payload: badge,
			})
		} catch (error) {
			showToast(error.response.data, 'error')
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
