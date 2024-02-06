import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import { useGetLikedEpisodesQuery } from '../app/apiSlice'
import PantsHeart from './PantsHeart'
import {
    useLazyGetAllEpisodesQuery,
    useLazyGetLikedEpisodesQuery,
    useGetTokenQuery,
} from '../app/apiSlice'
import { useState, useEffect } from 'react'

function LikedEpisodes() {
    const { data: likedEpisodes, error, isLoading } = useGetLikedEpisodesQuery()
    const { data: account } = useGetTokenQuery()
    const [episodes, result] = useLazyGetAllEpisodesQuery()
    const [eps, setEps] = useState([])
    const [liked] = useLazyGetLikedEpisodesQuery()

    useEffect(() => {
        episodes()
            .unwrap()
            .then((data) => setEps(getRevEps(data)))
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    } else if (lError || eError) {
        console.log(lError)
        return <div>Error: {lError.message}</div>
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
