import React, { useContext } from 'react'
import { InterfaceContext } from '../context/interface/InterfaceContext'

const MenuButton = () => {
	const stateInterface = useContext(InterfaceContext)
	const { changeSidebarState } = stateInterface

	return (
		<div
			className='circle-button menu-button pointer grid-center'
			onClick={() => changeSidebarState()}
		>
			<img src='/images/icons/menu.svg' alt='Menu Icon' />
		</div>
	)
}

export default MenuButton
