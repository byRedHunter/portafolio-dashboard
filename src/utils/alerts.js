import swall from 'sweetalert2'

export const showToast = (title, icon) => {
	return swall.fire({
		title,
		icon,
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
	})
}
