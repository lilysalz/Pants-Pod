import { useEffect, useState } from 'react'
import { useGetAllEpisodesQuery } from '../app/apiSlice'

function EpisodeList() {
    const { data: episodes = [], error, isLoading } = useGetAllEpisodesQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <>
            <div>
                <h1>Episodes</h1>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        {/* <th>Manufacturer</th>
                        <th>Picture_Url</th> */}
                    </tr>
                </thead>
                <tbody>
                    {episodes.map((episode) => (
                        <tr key={episode.spotify_id}>
                            <td>{episode.title}</td>
                            {/* Render other properties as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default EpisodeList
