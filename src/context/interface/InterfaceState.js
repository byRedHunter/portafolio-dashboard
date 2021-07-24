import React, { useReducer } from 'react'
import { CHANGE_SIDEBAR_STATE } from '../../constants/actions'
import { InterfaceContext } from './InterfaceContext'
import { InterfaceReducer } from './InterfaceReducer'

const InterfaceState = ({ children }) => {
	const initialState = {
		sidebarActive: false,
	}

	const [state, dispatch] = useReducer(InterfaceReducer, initialState)

	// actions

	// change sidebar state
	const changeSidebarState = () => {
		dispatch({ type: CHANGE_SIDEBAR_STATE })
	}

	return (
		<InterfaceContext.Provider
			value={{ sidebarActive: state.sidebarActive, changeSidebarState }}
		>
			{children}
		</InterfaceContext.Provider>
	)
}

export default InterfaceState
