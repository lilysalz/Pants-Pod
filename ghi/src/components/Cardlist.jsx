import { useGetAllEpisodesQuery } from '../app/apiSlice'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import { useSelector, useDispatch } from 'react-redux'

function CardList() {
    const query = useSelector((state) => state.query.value)
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

    const filteredData = () => {
        if (query) {
            return episodes.filter((episode) => episode.title.includes(query))
        }

        return episodes
    }
    return (
        <>
            <div>
                <h1 className="funkyhead">Episodes</h1>
            </div>
            <div>
                {filteredData().map((episode) => (
                    <Card key={episode.spotify_id}>
                        <Container fluid>
                            <Card.Img
                                variant="top"
                                src="holder.js/100px180?text=Image cap"
                            />
                            <Card.Body>
                                <Card.Title>{episode.title}</Card.Title>
                                <Card.Text>{episode.release_date}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>
                                    Dapibus ac facilisis in
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Vestibulum at eros
                                </ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Container>
                    </Card>
                ))}
            </div>
        </>
    )
}
export default CardList
