import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PropTypes from 'prop-types'

const Image = ({ className, src, alt }) => {
	return (
		<figure className={className}>
			<LazyLoadImage
				effect='blur'
				src={src}
				alt={alt}
				height='100%'
				width='100%'
				style={{ objectFit: 'cover' }}
			/>
		</figure>
	)
}

Image.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	className: PropTypes.string,
}

export default Image
