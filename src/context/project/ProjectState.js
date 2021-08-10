import { useReducer } from 'react'
import { clientAxios } from '../../config/axios'
import {
	PROJECT_BADGE_ADD,
	PROJECT_BADGE_REMOVE,
	PROJECT_CREATE,
	PROJECT_ERROR,
	PROJECT_LIST,
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
			console.log(result.data)
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
			const result = await clientAxios.post(uri, project)

			console.log(result)
			dispatch({ type: PROJECT_CREATE, payload: result.data })
			showToast('Proyecto creado', 'success')
		} catch (error) {
			console.log(error.response)
			dispatch({ type: PROJECT_ERROR, payload: true })
			showToast('Error al crear proyecto', 'error')
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
				listarProyectos,
				addBadgeToProject,
				removeBadgeToProject,
				createProject,
			}}
		>
			{children}
		</ProjectContext.Provider>
	)
}

export default ProjectState
