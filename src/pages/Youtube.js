import React, { useContext, useEffect } from 'react'
import { YoutubeContext } from '../context/youtube/YoutubeContext'

import Loading from '../shared/Loading'
import YoutubeVideo from '../shared/YoutubeVideo'

const Youtube = () => {
	const stateVideos = useContext(YoutubeContext)
	const { videosList, error, loading, listarVideos, hasNextPage } = stateVideos

	useEffect(() => {
		listarVideos()
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<h2 className='title'>Mis Videos</h2>

			{loading && <Loading />}

			{error && <p className='text-info'>Error en el servidor.</p>}

			{!loading && !error && videosList.length === 0 ? (
				<p className='text-info'>No hay videos.</p>
			) : (
				<>
					<section className='videos'>
						{videosList.map((video) => (
							<YoutubeVideo key={video._id} video={video} />
						))}
					</section>
					{hasNextPage && (
						<button className='button load' onClick={() => listarVideos()}>
							Ver Más
						</button>
					)}
				</>
			)}
		</>
	)
}

export default Youtube
