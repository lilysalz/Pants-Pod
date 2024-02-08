import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'
import { useGetLikedEpisodesQuery } from '../app/apiSlice'
import PantsHeart from './PantsHeart'
import { useLazyGetAllEpisodesQuery } from '../app/apiSlice'
import { useState, useEffect } from 'react'
import Footer from './Footer'

function LikedEpisodes() {
    const { data: likedEpisodes, error, isLoading } = useGetLikedEpisodesQuery()
    const [episodes] = useLazyGetAllEpisodesQuery()
    const [eps, setEps] = useState([])
    useEffect(() => {
        episodes()
            .unwrap()
            .then((data) => setEps(getRevEps(data)))
    }, [episodes])
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
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

    function getRevEps(eps) {
        let revEps = [...eps].reverse()
        return revEps
    }

    const episodesArray = likedEpisodes?.liked || []
    return (
        <>
            <Container fluid>
                <h1 className="funkyhead">Liked Episodes</h1>
                <Row>
                    {eps.map((episode) => {
                        const matchingEpisode = episodesArray.find(
                            (likedEpisode) =>
                                likedEpisode.episode_id === episode.spotify_id
                        )
                        if (matchingEpisode) {
                            return (
                                <Col md={3} key={episode.spotify_id}>
                                    <Card
                                        key={episode.spotify_id}
                                        style={{
                                            width: '19rem',
                                            height: '29rem',
                                        }}
                                    >
                                        <Card.Img
                                            variant="top"
                                            className="homebar"
                                            src="/pants_photo.jpeg"
                                            alt="Pants picture"
                                            style={{ width: '10rem' }}
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                {episode.title}
                                            </Card.Title>
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
                                            <Card.Link
                                                href={episode.spotify_url}
                                            >
                                                <img
                                                    src="/spotify_logo.png"
                                                    alt="spotify_logo"
                                                    height={40}
                                                    width={40}
                                                />
                                            </Card.Link>
                                            <Card.Link href="#">
                                                <PantsHeart
                                                    lE="true"
                                                    key={episode.spotify_id}
                                                    episode_id={
                                                        episode.spotify_id
                                                    }
                                                />
                                            </Card.Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                        return null // Render nothing if no matching episode_id
                    })}
                </Row>
            </Container>
            <Footer />
        </>
    )
}
export default LikedEpisodes
