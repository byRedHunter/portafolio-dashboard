import { CHANGE_SIDEBAR_STATE } from '../../constants/actions'

export const InterfaceReducer = (state, action) => {
	switch (action.type) {
		case CHANGE_SIDEBAR_STATE:
			return {
				...state,
				sidebarActive: !state.sidebarActive,
			}

		default:
			return state
	}
}
