import React, { useState, useEffect } from 'react'
import SVG3 from '../imgs/trans_svg.svg?react'
import './Pants.css'
import {
    useLikeEpisodeMutation,
    useDeleteLikeEpisodeMutation,
} from '../app/apiSlice'

function PantsHeart({ lE, episode_id }) {
    const [like, likeStatus] = useLikeEpisodeMutation()
    const [unLike, unLikeStatus] = useDeleteLikeEpisodeMutation()
    const [heart, setIsHeart] = useState(lE)
    const handleClick = () => {
        if (!heart) {
            like({
                episode_id: episode_id,
            })
        } else {
            unLike(episode_id)
        }

        setIsHeart(!heart)
    }
    return (
        <div onClick={handleClick} className={`heart ${heart ? 'active' : ''}`}>
            <SVG3 />
        </div>
    )
}

export default PantsHeart
