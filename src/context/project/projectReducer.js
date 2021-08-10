import {
	PROJECT_BADGE_ADD,
	PROJECT_BADGE_REMOVE,
	PROJECT_CREATE,
	PROJECT_ERROR,
	PROJECT_LIST,
	PROJECT_START,
} from '../../constants/actions'

export const ProjectReducer = (state, action) => {
	switch (action.type) {
		case PROJECT_START:
			return {
				...state,
				error: false,
				loading: action.payload,
			}

		case PROJECT_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			}

		case PROJECT_LIST:
			return {
				...state,
				error: false,
				loading: false,
				page: action.payload.nextPage,
				hasNextPage: action.payload.hasNextPage,
				projectEdit: {},
				projectsList: [...state.projectsList, ...action.payload.docs],
			}

		case PROJECT_BADGE_ADD:
			return {
				...state,
				projectBadges: [...state.projectBadges, action.payload],
			}

		case PROJECT_BADGE_REMOVE:
			return {
				...state,
				projectBadges: state.projectBadges.filter(
					(id) => id !== action.payload
				),
			}

		case PROJECT_CREATE:
			return {
				...state,
				error: false,
				loading: false,
			}

		default:
			return state
	}
}
