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
    function getRevEps(eps) {
        let revEps = [...eps].reverse()
        return revEps
    }
    function reverseEps() {
        setEps((prevEps) => (prevEps === eps ? getRevEps(eps) : eps))
    }
    // Log the structure of likedEpisodes
    const episodesArray = likedEpisodes?.liked || []
    return (
        <div>
            <h1>Liked Episodes</h1>
            {eps.map((episode) => {
                const lE = episodesArray.includes(episode.spotify_id)
                const matchingEpisode = episodesArray.find(
                    (likedEpisode) =>
                        likedEpisode.episode_id === episode.spotify_id
                )
                if (matchingEpisode) {

                    // Log matching episode from eps if found
                    const matchingEpisodeInEps = eps.find(
                        (ep) => ep.spotify_id === matchingEpisode.episode_id
                    )
                    return (
                        <Card
                            key={episode.spotify_id}
                            style={{ width: '18rem' }}
                        >
                            <Container fluid>
                                <Card.Img
                                    className="homebar"
                                    src="/pants_photo.jpeg"
                                    alt="Pants picture"
                                    style={{ width: '10rem' }}
                                />
                                <Card.Body>
                                    <Card.Title>{episode.title}</Card.Title>
                                    <Card.Text>
                                        Date: {episode.release_date}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item variant="dark">
                                        Duration:{' '}
                                        {getDuration(episode.duration)}
                                    </ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link href={episode.apple_url}>
                                        <img
                                            src="/apple_logo.png"
                                            alt="apple_logo"
                                            height={40}
                                            width={40}
                                        />
                                    </Card.Link>
                                    <Card.Link href={episode.spotify_url}>
                                        <img
                                            src="/spotify_logo.png"
                                            alt="spotify_logo"
                                            height={40}
                                            width={40}
                                        />
                                    </Card.Link>
                                    <Card.Link href="#">
                                        {account ? (
                                            <PantsHeart
                                                lE={lE}
                                                key={episode.spotify_id}
                                                episode_id={episode.spotify_id}
                                            />
                                        ) : (
                                            <PantsLogin />
                                        )}
                                    </Card.Link>
                                </Card.Body>
                            </Container>
                        </Card>
                    )
                }
                return null // Render nothing if no matching episode_id
            })}
        </div>
    )
}
export default LikedEpisodes
