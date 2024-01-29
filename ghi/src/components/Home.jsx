import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Home = () => {
    return (
        <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>PANTSss</Card.Title>
                <Card.Text>
                    They met almost twenty years ago, playing best friends on
                    TV. They are still best friends, on TV and in the real
                    World. But the lines are blurred. Where does film end + the
                    real world begin?
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default Home
