import Card from 'react-bootstrap/Card'
import { useEffect } from 'react'
import { useLazyGetAllEpisodesQuery } from '../app/apiSlice'
import PantsPod from '../imgs/pantspod.svg?react'

const Home = () => {
    const [episodes, result] = useLazyGetAllEpisodesQuery()
    useEffect(() => {
        episodes()
    })
    if (!result['isSuccess']) {
        return <div>Loading...</div>
    }

    if (result['error']) {
        return <div>Error: {result['error']}</div>
    }
    return (
        <>
            <div>
                <PantsPod className="homebar" />
                <img
                    className="homebar"
                    src="https://i.ibb.co/tLDTN6m/KL3.jpg"
                    alt="Pants picture"
                />
                <PantsPod className="homebar" />
            </div>
            <div>
                <p className="homep">
                    They met almost twenty years ago, playing best friends on
                    TV. They are still best friends, on TV and in the real
                    World.
                    <br />
                    <br />
                    But the lines are blurred.
                    <br />
                    <br />
                    Where does film end + the real world begin?
                </p>
            </div>
            <Card className="background-color">
                <Card.Body>
                    <Card.Title>
                        <h1 className="default-text-bold">
                            Catch up on this week&apos;s episode!
                        </h1>
                    </Card.Title>
                    <div className="default-text-bold">
                        {result.data[result.data.length - 1].title}
                    </div>
                    <div>{result.data[result.data.length - 1].description}</div>
                    <a href={result.data[result.data.length - 1].spotify_url}>
                        <img
                            src="https://i.ibb.co/jbZVdqr/spotify-logo.png"
                            alt="spotify_logo"
                            height={100}
                            width={100}
                        />
                    </a>
                    <a href={result.data[result.data.length - 1].apple_url}>
                        <img
                            src="https://i.ibb.co/h7dyTCf/apple-logo.png"
                            alt="apple_logo"
                            height={100}
                            width={100}
                        />
                    </a>
                </Card.Body>
            </Card>
        </>
    )
}

export default Home
