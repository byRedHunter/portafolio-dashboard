import {
	VIDEOS_CREATE,
	VIDEOS_CREATE_ERROR,
	VIDEOS_CREATE_SUCCESS,
	VIDEOS_LIST,
	VIDEOS_LIST_ERROR,
	VIDEOS_LIST_SUCCESS,
} from '../../constants/actions'

export const YoutubeReducer = (state, action) => {
	switch (action.type) {
		case VIDEOS_LIST:
		case VIDEOS_CREATE:
			return {
				...state,
				error: false,
				loading: action.payload,
			}

		case VIDEOS_LIST_ERROR:
		case VIDEOS_CREATE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			}

		case VIDEOS_LIST_SUCCESS:
			return {
				...state,
				error: false,
				loading: false,
				page: action.payload.nextPage,
				hasNextPage: action.payload.hasNextPage,
				videosList: [...action.payload.docs],
			}

		case VIDEOS_CREATE_SUCCESS:
			return {
				...state,
				error: false,
				loading: false,
				videosList: [action.payload, ...state.videosList],
			}

		default:
			return state
	}
}
