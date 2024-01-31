import { useState, useEffect } from 'react'
import { useGetAllEpisodesQuery } from '../app/apiSlice'

function EpisodeList() {
    const { data: episodes = [], error, isLoading } = useGetAllEpisodesQuery()
    const [eps, setEps] = useState([])

    useEffect(() => {
        setEps(getRevEps(episodes))
    }, [episodes])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    function getDuration(duration) {
        const ss = Math.floor((duration / 1000) % 60)
        const mm = Math.floor((duration / 1000 / 60) % 60)
        const hh = Math.floor((duration / 1000 / 60 / 60) % 24)
        const newDuration = `${hh} hrs ${mm} min ${ss} sec`
        return newDuration
    }

    function getDate(date) {
        date = new Date(date)
        let text = date.toDateString()
        return text
    }

    function getRevEps(episodes) {
        let revEps = [...episodes].reverse()
        return revEps
    }

    function reverseEps() {
        setEps((prevEps) =>
            prevEps === episodes ? getRevEps(episodes) : episodes
        )
    }

    return (
        <>
            <div>
                <h1 className="funkyhead">Episodes</h1>
            </div>
            <div>
                <button className="sb" type="button" onClick={reverseEps}>
                    Sort By Date
                </button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Release Date</th>
                            <th>Duration</th>
                            <th>Listen on Spotify</th>
                            <th>Listen on Apple</th>
                            <th>Like</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eps.map((episode) => (
                            <tr key={episode.spotify_id}>
                                <td>{episode.title}</td>
                                <td>{getDate(episode.release_date)}</td>
                                <td>{getDuration(episode.duration)}</td>
                                <td>
                                    <a href={episode.spotify_url}>
                                        <img
                                            src="/spotify_logo.png"
                                            alt="spotify_logo"
                                            height={40}
                                            width={40}
                                        />
                                    </a>
                                </td>
                                <td>
                                    <a href={episode.apple_url}>
                                        <img
                                            src="/apple_logo.png"
                                            alt="apple_logo"
                                            height={40}
                                            width={40}
                                        />
                                    </a>
                                </td>
                                <td>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EpisodeList
