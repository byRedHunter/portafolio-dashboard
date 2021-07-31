const typeImages = ['image/png', 'image/jpeg', 'image/jpg']

export const isImageValid = (file) => {
	if (file && typeImages.includes(file.type)) return true

	return false
}

export const showImage = (file, saveImage) => {
	const fileReader = new FileReader()
	fileReader.readAsDataURL(file)

	fileReader.addEventListener('load', (e) => {
		saveImage(e.target.result)
	})
}

export const selectImage = (ref) => {
	ref.current.click()
}
