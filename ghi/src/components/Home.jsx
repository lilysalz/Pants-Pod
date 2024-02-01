import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useEffect } from 'react'
import { useLazyGetAllEpisodesQuery } from '../app/apiSlice'

const Home = () => {
    const [episodes, result] = useLazyGetAllEpisodesQuery()
    useEffect(() => {
        episodes()
    }, [])
    console.log(result)
    if (!result['isSuccess']) {
        return <div>Loading...</div>
    }

    if (result['error']) {
        return <div>Error: {result['error']}</div>
    }
    console.log(result.data)
    return (
        <>
            <div>
                <img
                    className="homebar"
                    src="/pantspod.svg"
                    alt="Pants design"
                />
                <img
                    className="homebar"
                    src="/pants_photo.jpeg"
                    alt="Pants picture"
                />
                <img
                    className="homebar"
                    src="/pantspod.svg"
                    alt="Pants design"
                />
            </div>
            <div>
                <p className="homep">
                    They met almost twenty years ago, playing best friends on
                    TV. They are still best friends, on TV and in the real
                    World.
                    <br></br>
                    <br></br>
                    But the lines are blurred.
                    <br></br>
                    <br></br>
                    Where does film end + the real world begin?
                </p>
            </div>
            <Card className="background-color">
                <Card.Body>
                    <Card.Title>
                        <h1 className="default-text-bold">
                            Catch up on this weeks episode!
                        </h1>
                    </Card.Title>
                    <Card.Text>
                        <>
                            <p className="default-text-bold">
                                {result.data[result.data.length - 1].title}
                            </p>
                            <p>
                                {
                                    result.data[result.data.length - 1]
                                        .description
                                }
                            </p>
                            <a
                                href={
                                    result.data[result.data.length - 1]
                                        .spotify_url
                                }
                            >
                                <img
                                    className="homeimgs"
                                    src="/spotify_logo.png"
                                    alt="spotify_logo"
                                    height={100}
                                    width={100}
                                />
                            </a>
                            <a
                                href={
                                    result.data[result.data.length - 1]
                                        .apple_url
                                }
                            >
                                <img
                                    className="homeimgs"
                                    src="/apple_logo.png"
                                    alt="apple_logo"
                                    height={100}
                                    width={100}
                                />
                            </a>
                        </>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Home
