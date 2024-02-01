import React, { useState } from 'react'
import SVG3 from '../imgs/trans_svg.svg?react'
import './Pants.css'
import { useLikeEpisodeMutation } from '../app/apiSlice'


function PantsHeart({lE, episode_id}) {
    const [like, likeStatus] = useLikeEpisodeMutation()
    const [heart, setIsHeart] = useState(lE)
    const handleClick = () => {
        setIsHeart(!heart)
        like({
            "episode_id": episode_id
        })
    }
    return (
        <div
            onClick={handleClick}
            className={`heart ${heart ? 'active' : ''}`}
        >
            <SVG3 />
        </div>
    )
}

export default PantsHeart
