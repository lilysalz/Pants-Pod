import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import EpisodeList from './Episodelist'
import Search from './Search'

const Home = () => {
    return (
        <>
            <Search />
            <EpisodeList />
        </>
    )
}

export default Home
