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

export const YoutubeReducer = (state, action) => {
	switch (action.type) {
		case VIDEOS_LIST:
		case VIDEOS_CREATE:
		case VIDEOS_EDIT:
			return {
				...state,
				error: false,
				loading: action.payload,
			}

		case VIDEOS_LIST_ERROR:
		case VIDEOS_CREATE_ERROR:
		case VIDEOS_EDIT_ERROR:
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
				videoEdit: {},
			}

		case VIDEOS_CREATE_SUCCESS:
			return {
				...state,
				error: false,
				loading: false,
				videosList: [action.payload, ...state.videosList],
			}

		case VIDEOS_EDIT_SUCCESS:
		case VIDEO_EDITED:
			return {
				...state,
				error: false,
				loading: false,
				videoEdit: { ...action.payload },
			}

		case VIDEO_DELET:
			return {
				...state,
				error: false,
				loading: false,
				videosList: state.videosList.filter(
					(video) => video._id !== action.payload
				),
			}

		default:
			return state
	}
}
