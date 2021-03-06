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
				projectsList: [...action.payload.docs],
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
				projectBadges: [],
				projectEdit: {},
			}

		case PROJECT_DELET:
			return {
				...state,
				error: false,
				loading: false,
				projectsList: state.projectsList.filter(
					(project) => project._id !== action.payload
				),
				projectEdit: {},
			}

		case PROJECT_SELECTED:
		case PROJECT_EDITED:
			return {
				...state,
				error: false,
				loading: false,
				projectEdit: { ...action.payload },
				listBadgesProject: [...action.payload.badges],
			}

		default:
			return state
	}
}
