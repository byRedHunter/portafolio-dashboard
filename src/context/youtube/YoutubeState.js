import React, { useReducer } from 'react'
import { clientAxios } from '../../config/axios'
import {
	VIDEOS_CREATE,
	VIDEOS_CREATE_ERROR,
	VIDEOS_CREATE_SUCCESS,
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
			dispatch({ type: VIDEOS_LIST_SUCCESS, payload: result.data })
		} catch (error) {
			dispatch({ type: VIDEOS_LIST_ERROR, payload: true })
			showToast('Error en el servidor', 'error')
		}
	}

	// crear video
	const createVideo = async (video) => {
		dispatch({ type: VIDEOS_CREATE, payload: true })

		try {
			const result = await clientAxios.post(uri, video)
			dispatch({ type: VIDEOS_CREATE_SUCCESS, payload: result.data })
			showToast('Video registrado', 'success')
		} catch (error) {
			console.log(error.response)
			dispatch({ type: VIDEOS_CREATE_ERROR, payload: true })
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
				createVideo,
			}}
		>
			{children}
		</YoutubeContext.Provider>
	)
}

export default YoutubeState
