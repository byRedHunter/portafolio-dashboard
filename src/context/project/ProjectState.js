import { useReducer } from 'react'
import { clientAxios } from '../../config/axios'
import {
	PROJECT_BADGE_ADD,
	PROJECT_BADGE_REMOVE,
	PROJECT_CREATE,
	PROJECT_DELET,
	PROJECT_EDITED,
	PROJECT_ERROR,
	PROJECT_LIST,
	PROJECT_SELECTED,
	PROJECT_START,
} from '../../constants/actions'
import { showToast } from '../../utils/alerts'
import { ProjectContext } from './projectContext'
import { ProjectReducer } from './projectReducer'

const ProjectState = ({ children }) => {
	const uri = 'portfolio'

	const initialState = {
		projectsList: [],
		projectEdit: {},
		projectBadges: [],
		listBadgesProject: [],
		error: false,
		loading: false,
		page: 1,
		hasNextPage: null,
	}

	const [state, dispatch] = useReducer(ProjectReducer, initialState)

	// actions
	const listarProyectos = async () => {
		dispatch({ type: PROJECT_START, payload: true })

		try {
			const result = await clientAxios.get(
				uri + `?page=${state.page ? state.page : 1}`
			)
			dispatch({ type: PROJECT_LIST, payload: result.data })
		} catch (error) {
			dispatch({ type: PROJECT_ERROR, payload: true })
			showToast('Error al cargar los datos', 'error')
		}
	}

	const addBadgeToProject = async (badgeId) => {
		dispatch({ type: PROJECT_BADGE_ADD, payload: badgeId })
	}

	const removeBadgeToProject = async (badgeId) => {
		dispatch({ type: PROJECT_BADGE_REMOVE, payload: badgeId })
	}

	const createProject = async (project) => {
		dispatch({ type: PROJECT_START, payload: true })

		try {
			await clientAxios.post(uri, project)

			dispatch({ type: PROJECT_CREATE })
			showToast('Proyecto creado', 'success')
		} catch (error) {
			console.log(error.response)
			dispatch({ type: PROJECT_ERROR, payload: true })
			showToast('Error al crear proyecto', 'error')
		}
	}

	const deleteProject = async (id) => {
		dispatch({ type: PROJECT_START, payload: true })

		try {
			const result = await clientAxios.delete(`${uri}/${id}`)

			dispatch({ type: PROJECT_DELET, payload: id })
			showToast(result.data.message, 'success')
		} catch (error) {
			dispatch({ type: PROJECT_ERROR, payload: true })
			showToast('Error en el servidor', 'error')
		}
	}

	const selectProject = async (id) => {
		dispatch({ type: PROJECT_START, payload: true })

		try {
			const result = await clientAxios.get(`${uri}/${id}`)
			dispatch({ type: PROJECT_SELECTED, payload: result.data })
		} catch (error) {
			dispatch({ type: PROJECT_ERROR, payload: true })
			showToast('Error al cargar los datos', 'error')
		}
	}

	const editProjectImage = async (info) => {
		dispatch({ type: PROJECT_START, payload: true })

		const { id, formData } = info

		try {
			const result = await clientAxios.put(`${uri}/image/${id}`, formData)

			dispatch({ type: PROJECT_EDITED, payload: result.data })
			showToast('Im??gen del proyecto actualizado', 'success')
		} catch (error) {
			dispatch({ type: PROJECT_ERROR, payload: true })
			showToast('Error al cargar los datos', 'error')
		}
	}

	const editProjectData = async (id, formData) => {
		dispatch({ type: PROJECT_START, payload: true })

		try {
			const result = await clientAxios.put(`${uri}/${id}`, formData)
			console.log(result)

			dispatch({ type: PROJECT_EDITED, payload: result.data })
			showToast('Datos del proyecto actualizado', 'success')
		} catch (error) {
			dispatch({ type: PROJECT_ERROR, payload: true })
			showToast('Error al cargar los datos', 'error')
		}
	}

	return (
		<ProjectContext.Provider
			value={{
				projectsList: state.projectsList,
				hasNextPage: state.hasNextPage,
				error: state.error,
				loading: state.loading,
				projectBadges: state.projectBadges,
				projectEdit: state.projectEdit,
				listBadgesProject: state.listBadgesProject,
				listarProyectos,
				addBadgeToProject,
				removeBadgeToProject,
				createProject,
				deleteProject,
				selectProject,
				editProjectImage,
				editProjectData,
			}}
		>
			{children}
		</ProjectContext.Provider>
	)
}

export default ProjectState
