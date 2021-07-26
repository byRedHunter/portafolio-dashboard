import { BADGE_LIST, BADGE_SAVE } from '../../constants/actions'

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

		default:
			return state
	}
}
