import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

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

export default Image
