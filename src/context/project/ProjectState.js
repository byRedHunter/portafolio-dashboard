import { useReducer } from 'react'
import { clientAxios } from '../../config/axios'
import {
	PROJECT_ERROR,
	PROJECT_LIST,
	PROJECT_START,
} from '../../constants/actions'
import { showToast } from '../../utils/alerts'
import { ProjectContext } from './projectContext'
import { ProjectReducer } from './projectReducer'

const ProjectState = ({ children }) => {
	const uri = 'portafolio'

	const initialState = {
		projectsList: [],
		projectEdit: {},
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

	return (
		<ProjectContext.Provider
			value={{
				projectsList: state.projectsList,
				error: state.error,
				loading: state.loading,
				listarProyectos,
			}}
		>
			{children}
		</ProjectContext.Provider>
	)
}

export default ProjectState