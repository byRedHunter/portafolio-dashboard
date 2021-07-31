import { useState } from 'react'

export const useImage = (initialState) => {
	const [file, setFile] = useState(initialState)

	const resetImage = () => {
		setFile(initialState)
	}

	const handleImageChange = ({ target }) => {
		const files = target.files
		setFile(files[0])
	}

	return { file, handleImageChange, resetImage }
}
