import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Image from '../shared/Image'
import { ROUTES } from '../constants/routes'

const YoutubeVideo = ({ video }) => {
	return (
		<article className='video'>
			<Image className='video-image' src={video.image} alt={video.title} />

			<div className='video-content'>
				<h2>{video.title}</h2>
				<p> {video.desc} </p>
			</div>

			<div className='video-footer'>
				<button>Eliminar</button>
				<a
					href={video.link}
					target='_blank'
					rel='noreferrer'
					className='grid-center'
				>
					Ver
				</a>
				<Link to={`${ROUTES.YOUTUBE}/${video._id}`} className='grid-center'>
					Editar
				</Link>
			</div>
		</article>
	)
}

YoutubeVideo.propTypes = {
	video: PropTypes.object.isRequired,
}

export default YoutubeVideo
