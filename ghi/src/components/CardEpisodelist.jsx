import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import EpisodeList from './Episodelist'
import Search from './Search'
import CardList from './Cardlist'

const CardEpisodelist = () => {
    return (
        <>
            <Search />
            <CardList />
        </>
    )
}

export default CardEpisodelist