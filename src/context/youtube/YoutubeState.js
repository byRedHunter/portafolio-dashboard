import React, { useReducer } from 'react'
import { clientAxios } from '../../config/axios'
import {
	VIDEOS_CREATE,
	VIDEOS_CREATE_ERROR,
	VIDEOS_CREATE_SUCCESS,
	VIDEOS_EDIT,
	VIDEOS_EDIT_ERROR,
	VIDEOS_EDIT_SUCCESS,
	VIDEOS_LIST,
	VIDEOS_LIST_ERROR,
	VIDEOS_LIST_SUCCESS,
	VIDEO_DELET,
	VIDEO_EDITED,
} from '../../constants/actions'
import { showToast } from '../../utils/alerts'
import { YoutubeContext } from './YoutubeContext'
import { YoutubeReducer } from './YoutubeReducer'

const YoutubeState = ({ children }) => {
	const uri = 'youtube'

	const initialState = {
		videosList: [],
		videoEdit: null,
		error: false,
		loading: false,
		page: 1,
		hasNextPage: null,
	}

	const [state, dispatch] = useReducer(YoutubeReducer, initialState)

	// actions

	// listar videos
	const listarVideos = async () => {
		dispatch({ type: VIDEOS_LIST, payload: true })

		try {
			const result = await clientAxios.get(
				uri + `?page=${state.page ? state.page : 1}`
			)
			dispatch({ type: VIDEOS_LIST_SUCCESS, payload: result.data })
		} catch (error) {
			dispatch({ type: VIDEOS_LIST_ERROR, payload: true })
			showToast('Error en el servidor', 'error')
		}
	}

	// obtener video por id
	const listarVideoById = async (id) => {
		dispatch({ type: VIDEOS_EDIT, payload: true })

		try {
			const result = await clientAxios.get(`${uri}/${id}`)
			dispatch({ type: VIDEOS_EDIT_SUCCESS, payload: result.data })
		} catch (error) {
			dispatch({ type: VIDEOS_EDIT_ERROR, payload: true })
			showToast('Error en el servidor', 'error')
		}
	}

	// eliminar video
	const eliminarVideo = async (id) => {
		try {
			const result = await clientAxios.delete(`${uri}/${id}`)
			dispatch({ type: VIDEO_DELET, payload: id })
			showToast(result.data.message, 'success')
		} catch (error) {
			dispatch({ type: VIDEOS_EDIT_ERROR, payload: true })
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

	// editar informacion del video
	const editVideoData = async (info) => {
		dispatch({ type: VIDEOS_EDIT, payload: true })

		const { id, title, desc, link } = info

		try {
			const result = await clientAxios.put(`${uri}/${id}`, {
				title,
				desc,
				link,
			})
			dispatch({ type: VIDEO_EDITED, payload: result.data })
			showToast('Información del video, EDITADO', 'success')
		} catch (error) {
			dispatch({ type: VIDEOS_EDIT_ERROR, payload: true })
			showToast('Error en el servidor', 'error')
		}
	}

	// editar imagen del video
	const editVideoImage = async (info) => {
		dispatch({ type: VIDEOS_EDIT, payload: true })

		const { id, formData } = info

		try {
			const result = await clientAxios.put(`${uri}/image/${id}`, formData)
			dispatch({ type: VIDEO_EDITED, payload: result.data })
			showToast('Imágen del video, EDITADO', 'success')
		} catch (error) {
			dispatch({ type: VIDEOS_EDIT_ERROR, payload: true })
			showToast('Error en el servidor', 'error')
		}
	}

	return (
		<YoutubeContext.Provider
			value={{
				videosList: state.videosList,
				videoEdit: state.videoEdit,
				error: state.error,
				loading: state.loading,
				hasNextPage: state.hasNextPage,
				listarVideos,
				createVideo,
				listarVideoById,
				editVideoData,
				editVideoImage,
				eliminarVideo,
			}}
		>
			{children}
		</YoutubeContext.Provider>
	)
}

export default YoutubeState
