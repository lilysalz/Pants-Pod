import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useGetTokenQuery, useLogoutMutation } from '../app/apiSlice'

const NavBar = () => {
    const { data: account } = useGetTokenQuery()
    const [logout] = useLogoutMutation()
    return (
        <Navbar expand="md" className="bg-body-tertiary mb-3">
            <Navbar.Brand as={Link} to="/">
                Pants
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/CardedEpisodes">
                        CardedEpisodes
                    </Nav.Link>

                    <Nav.Link as={Link} to="/Episodes">
                        Episodes
                    </Nav.Link>
                    {!account && (
                        <Nav.Link as={Link} to="/signUp">
                            SignUp
                        </Nav.Link>
                    )}
                    {!account && (
                        <Nav.Link as={Link} to="/SignIn">
                            SignIn
                        </Nav.Link>
                    )}
                    {account && <button onClick={logout}>SignOut</button>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
