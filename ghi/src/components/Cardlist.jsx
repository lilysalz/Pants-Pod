import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import { useSelector } from 'react-redux'
import {
    useLazyGetAllEpisodesQuery,
    useLazyGetLikedEpisodesQuery,
    useGetTokenQuery,
} from '../app/apiSlice'
import PantsHeart from './PantsHeart'
import PantsLogin from '../imgs/pants.min.svg?react'

function CardList() {
    const query = useSelector((state) => state.query.value)
    const { data: account } = useGetTokenQuery()
    const [episodes, result] = useLazyGetAllEpisodesQuery()
    const [eps, setEps] = React.useState([])
    const [liked] = useLazyGetLikedEpisodesQuery()
    const [likedEpisodes, setLikedEpisodes] = React.useState([])

    React.useEffect(() => {
        episodes()
            .unwrap()
            .then((data) => setEps(getRevEps(data)))
    })

    React.useEffect(() => {
        liked()
            .unwrap()
            .then((data) =>
                setLikedEpisodes(data.liked.map((a) => a.episode_id))
            )
    })

    if (result.isLoading) {
        return <div>Loading...</div>
    }

    if (result.error) {
        return <div>Error: {result.error}</div>
    }

    function getDuration(duration) {
        const ss = Math.floor((duration / 1000) % 60)
        const mm = Math.floor((duration / 1000 / 60) % 60)
        const hh = Math.floor((duration / 1000 / 60 / 60) % 24)
        const newDuration = `${hh} hrs ${mm} min ${ss} sec`
        return newDuration
    }

    function getRevEps(episodes) {
        let revEps = [...episodes].reverse()
        return revEps
    }

    const filteredData = () => {
        if (query) {
            const filteredEpisodes = eps.filter(
                (episode) =>
                    episode.title.includes(query) ||
                    episode.release_date.includes(query)
            )

            return filteredEpisodes.length > 0
                ? filteredEpisodes.map((episode) => (
                      <Card key={episode.spotify_id} style={{ width: '18rem' }}>
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
                                      Duration: {getDuration(episode.duration)}
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
                                              lE={likedEpisodes.includes(
                                                  episode.spotify_id
                                              )}
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
                  ))
                : eps.map((episode) => (
                      <Card key={episode.spotify_id} style={{ width: '18rem' }}>
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
                                      Duration: {getDuration(episode.duration)}
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
                                              lE={likedEpisodes.includes(
                                                  episode.spotify_id
                                              )}
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
                  ))
        }

        // If there is no query, return the original list of episodes
        return eps.map((episode) => (
            <Card key={episode.spotify_id} style={{ width: '18rem' }}>
                <Container fluid>
                    <Card.Img
                        className="homebar"
                        src="/pants_photo.jpeg"
                        alt="Pants picture"
                        style={{ width: '10rem' }}
                    />

                    <Card.Body>
                        <Card.Title>{episode.title}</Card.Title>
                        <Card.Text>Date: {episode.release_date}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item variant="dark">
                            Duration: {getDuration(episode.duration)}
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
                        <Card.Link>
                            {account ? (
                                <PantsHeart
                                    lE={likedEpisodes.includes(
                                        episode.spotify_id
                                    )}
                                    key={episode.spotify_id}
                                    episode_id={episode.spotify_id}
                                />
                            ) : (
                                <PantsLogin />
                            )}
                        </Card.Link>
                        <Card.Text>click pants to like</Card.Text>
                    </Card.Body>
                </Container>
            </Card>
        ))
    }

    return (
        <>
            <div>
                <h1 className="funkyhead">Episodes</h1>
            </div>
            <div className="d-flex flex-wrap">{filteredData()}</div>
        </>
    )
}

export default CardList
