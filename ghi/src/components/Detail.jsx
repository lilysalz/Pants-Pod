import React from 'react'
import { Card } from 'react-bootstrap'
import PantsHeart from './PantsHeart'
import { useLocation } from 'react-router-dom'
import {
    useAddCommentMutation,
    useGetAllCommentsQuery,
    useGetTokenQuery,
} from '../app/apiSlice'

function Detail() {
    const location = useLocation()
    const props = location.state
    const lE = location.state.lE
    const { data: comments, isLoading } = useGetAllCommentsQuery(
        props.episode.spotify_id
    )
    const { data: account } = useGetTokenQuery()
    const [createComment] = useAddCommentMutation()

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
    return (
        <>
            <Card>
                <Card.Header>
                    <h1 className="funkyhead">{props.episode.title}</h1>
                </Card.Header>
                <Card.Body>
                    <br></br>
                    <div>
                        <div className="default-text-bold">
                            {props.episode.description}
                        </div>
                    </div>
                    <br></br>
                </Card.Body>
                <Card.Footer>
                    <div>
                        <div>
                            <div className="default-text">
                                Release Date:{' '}
                                {getDate(props.episode.release_date)}
                            </div>
                            <div className="default-text">
                                Duration: {getDuration(props.episode.duration)}
                            </div>
                            <PantsHeart
                                lE={lE}
                                episode_id={props.episode.spotify_id}
                            />
                        </div>
                        <a href={props.episode.spotify_url}>
                            <img
                                src="https://i.ibb.co/jbZVdqr/spotify-logo.png"
                                alt="spotify_logo"
                                height={100}
                                width={100}
                            />
                        </a>
                        <a href={props.episode.apple_url}>
                            <img
                                src="https://i.ibb.co/h7dyTCf/apple-logo.png"
                                alt="apple_logo"
                                height={100}
                                width={100}
                            />
                        </a>
                    </div>
                </Card.Footer>
            </Card>
            {/* <table>
                <thead>
                    <tr>
                        <th>Users</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment) => {
                        return (
                            <tr key={comment.id}>
                                <td>{comment.user_id}</td>
                                <td>{comment.comment_text}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
        </>
    )
}

export default Detail
