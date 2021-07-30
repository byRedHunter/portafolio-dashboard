import React from 'react'

const YoutubeNew = () => {
	return (
		<>
			<h2 className='title'>Nuevo Video</h2>

			<form className='form-add'>
				<div className='form-section'>
					<div className='form-section-header'>
						<img src='/images/icons/youtube.svg' alt='Icono del svg' />
						<h4 data-info='Informacion sobre el video'>Video</h4>
					</div>
					<div className='form-section-body'>
						<div className='form-group'>
							<label className='form-label' htmlFor='title'>
								Titulo
							</label>
							<input
								type='text'
								id='title'
								className='form-input'
								name='title'
							/>
						</div>
						<div className='form-group'>
							<label className='form-label' htmlFor='descripcion'>
								Descripción
							</label>
							<textarea
								name='description'
								id='description'
								className='form-area'
							></textarea>
						</div>
					</div>
				</div>

				<div className='form-section'>
					<div className='form-section-header'>
						<img src='/images/icons/youtube.svg' alt='Icono del svg' />
						<h4 data-info='Vista del video'>Preview</h4>
					</div>
					<div className='form-section-body'>
						<div className='form-group'>
							<label className='form-label' htmlFor='link'>
								URL
							</label>
							<input type='text' id='link' className='form-input' name='link' />
						</div>
						<div className='form-group'>
							<label className='form-label' htmlFor='image'>
								Imágen
							</label>
							<input type='file' id='image' name='image' hidden />
							<button type='button' className='select-image'>
								Elegir imágen
							</button>
							<figure className='preview'>
								<img
									src='https://cdn.pixabay.com/photo/2016/11/30/12/29/bicycle-1872682__340.jpg'
									alt='Preview'
								/>
							</figure>
						</div>
					</div>
				</div>

				<button type='submit' className='button'>
					Crear Video
				</button>
			</form>
		</>
	)
}

export default YoutubeNew
