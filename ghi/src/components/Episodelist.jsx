import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
    useLazyGetAllEpisodesQuery,
    useLazyGetLikedEpisodesQuery,
    useGetTokenQuery,
} from '../app/apiSlice'
import PantsHeart from './PantsHeart'
import PantsLogin from '../imgs/pants.min.svg?react'

function EpisodeList() {
    const { data: account } = useGetTokenQuery()
    const [episodes, result] = useLazyGetAllEpisodesQuery()
    const [eps, setEps] = useState([])
    const [liked] = useLazyGetLikedEpisodesQuery()
    const [likedEpisodes, setLikedEpisodes] = useState([])

    useEffect(() => {
        episodes()
            .unwrap()
            .then((data) => setEps(getRevEps(data)))
    }, [])

    useEffect(() => {
        if (account) {
            liked()
                .unwrap()
                .then((data) =>
                    setLikedEpisodes(data.liked.map((a) => a.episode_id))
                )
        }
    }, [])
    if (result['isLoading']) {
        return <div>Loading...</div>
    }

    if (result['error']) {
        return <div>Error: {result['error']}</div>
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

    function getRevEps(eps) {
        let revEps = [...eps].reverse()
        return revEps
    }

    function reverseEps() {
        setEps((prevEps) => (prevEps === eps ? getRevEps(eps) : eps))
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
                        {eps.map((episode) => {
                            const lE = likedEpisodes.includes(
                                episode.spotify_id
                            )
                                ? true
                                : false
                            return (
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
                                        {account ? (
                                            <PantsHeart
                                                lE={lE}
                                                key={episode.spotify_id}
                                                episode_id={episode.spotify_id}
                                            />
                                        ) : (
                                            <NavLink to="/api/SignIn">
                                                <PantsLogin />
                                            </NavLink>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EpisodeList
