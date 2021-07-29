import {
	VIDEOS_LIST,
	VIDEOS_LIST_ERROR,
	VIDEOS_LIST_SUCCESS,
} from '../../constants/actions'

export const YoutubeReducer = (state, action) => {
	switch (action.type) {
		case VIDEOS_LIST:
			return {
				...state,
				error: false,
				loading: action.payload,
			}

		case VIDEOS_LIST_ERROR:
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
				videosList: [...action.payload.docs],
			}

		default:
			return state
	}
}
