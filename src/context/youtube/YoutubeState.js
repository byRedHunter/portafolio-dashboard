import React, { useReducer } from 'react'
import { clientAxios } from '../../config/axios'
import {
	VIDEOS_LIST,
	VIDEOS_LIST_ERROR,
	VIDEOS_LIST_SUCCESS,
} from '../../constants/actions'
import { showToast } from '../../utils/alerts'
import { YoutubeContext } from './YoutubeContext'
import { YoutubeReducer } from './YoutubeReducer'

const YoutubeState = ({ children }) => {
	const uri = 'youtube'

	const initialState = {
		videosList: [],
		error: false,
		loading: false,
	}

	const [state, dispatch] = useReducer(YoutubeReducer, initialState)

	// actions

	// listar videos
	const listarVideos = async () => {
		dispatch({ type: VIDEOS_LIST, payload: true })

		try {
			const result = await clientAxios.get(uri)
			console.log(result)
			dispatch({ type: VIDEOS_LIST_SUCCESS, payload: result.data })
		} catch (error) {
			dispatch({ type: VIDEOS_LIST_ERROR, payload: true })
			showToast('Error en el servidor', 'error')
		}
	}

	return (
		<YoutubeContext.Provider
			value={{
				videosList: state.videosList,
				error: state.error,
				loading: state.loading,
				listarVideos,
			}}
		>
			{children}
		</YoutubeContext.Provider>
	)
}

export default YoutubeState
