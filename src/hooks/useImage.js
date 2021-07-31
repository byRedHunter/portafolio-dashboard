import { useState } from 'react'

export const useImage = (initialState) => {
	const [file, setFile] = useState(initialState)

	const resetImage = () => {
		setFile(initialState)
	}

	const handleImageChange = ({ target }) => {
		setFile(target.files[0])
	}

	return { file, handleImageChange, resetImage }
}
