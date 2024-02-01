import React from 'react'
import { useGetLikedEpisodesQuery } from '../app/apiSlice'
import PantsHeart from './PantsHeart'

function LikedEpisodes() {
    const { data: likedEpisodes, error, isLoading } = useGetLikedEpisodesQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    // Log the structure of likedEpisodes
    console.log('Liked Episodes Data:', likedEpisodes)

    const episodesArray = likedEpisodes?.liked || []

    return (
        <div>
            <h1>Liked Episodes</h1>
            {episodesArray.map((episode) => (
                <div key={episode.episode_id}>
                    {/* Log the episode details to check property names */}
                    {console.log('Episode Details:', episode)}
                    <h2>{episode.id}</h2>
                    {/* Adjust the property names according to the actual structure */}
                    <p>Date: {episode.release_date}</p>
                    {/* Add other episode details as needed */}
                    {/* Assuming 'lE' should be based on whether it's liked */}
                    <PantsHeart lE={true} episode_id={episode.episode_id} />
                </div>
            ))}
        </div>
    )
}

export default LikedEpisodes
