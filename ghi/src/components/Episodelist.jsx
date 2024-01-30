import { useGetAllEpisodesQuery } from '../app/apiSlice'

function EpisodeList() {
    const { data: episodes = [], error, isLoading } = useGetAllEpisodesQuery()

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
        const newDuration = `${hh}:${mm}:${ss}`
        return newDuration
    }

    return (
        <>
            <div>
                <h1 className="funkyhead">Episodes</h1>
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
                        {episodes.map((episode) => (
                            <tr key={episode.spotify_id}>
                                <td>{episode.title}</td>
                                <td>{episode.release_date}</td>
                                <td>{getDuration(episode.duration)}</td>
                                <td>
                                    <a href={episode.spotify_url}>
                                        <img
                                            src="/spotify_logo.png"
                                            alt="spotify_logo"
                                            height={35}
                                            width={35}
                                        />
                                    </a>
                                </td>
                                <td>
                                    <a href={episode.apple_url}>
                                        <img
                                            src="/apple_logo.png"
                                            alt="apple_logo"
                                            height={35}
                                            width={35}
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
