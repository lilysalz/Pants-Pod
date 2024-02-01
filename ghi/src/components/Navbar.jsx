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
        <Navbar expand="lg" className="display-6 bg-body-tertiary mb-5">
            <Navbar.Brand as={Link} to="/">
                <h1 className="funkyheadPANTS">PANTS</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/api/Episodes">
                        Episodes
                    </Nav.Link>
                    <Nav.Link as={Link} to="/CardedEpisodes">
                        CardedEpisodes
                    </Nav.Link>
                    <Nav.Link as={Link} to="/LikedEpisodes">
                        LikedEpisodes
                    </Nav.Link>
                    {!account && (
                        <Nav.Link as={Link} to="/api/SignUp">
                            Sign Up
                        </Nav.Link>
                    )}
                    {!account && (
                        <Nav.Link as={Link} to="/api/SignIn">
                            Sign In
                        </Nav.Link>
                    )}
                    {account && (
                        <Nav.Link as={Link} to={logout} onClick={logout}>
                            Log Out {account.account.username}
                        </Nav.Link>
                        // <button className="logout-button" onClick={logout}>
                        //     Log out {account.account.username}
                        // </button>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default NavBar
