import { BADGE_EDIT, BADGE_LIST, BADGE_SAVE } from '../../constants/actions'

export const BadgeReducer = (state, action) => {
	switch (action.type) {
		case BADGE_LIST:
			return {
				...state,
				badgeList: action.payload,
			}

		case BADGE_SAVE:
			return {
				...state,
				badgeList: [...state.badgeList, action.payload],
			}

		case BADGE_EDIT:
			return {
				...state,
				badgeList: state.badgeList.map((badge) =>
					badge._id === action.payload._id ? action.payload : badge
				),
			}

		default:
			return state
	}
}
