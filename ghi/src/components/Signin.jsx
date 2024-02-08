import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import './components.css'
import { useLoginMutation } from '../app/apiSlice'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function SignIn() {
    const navigate = useNavigate('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState()
    const [login, loginStatus] = useLoginMutation()
    useEffect(() => {
        if (loginStatus.isSuccess) navigate('/')
        else if (loginStatus.isError) {
            setErrorMessage(loginStatus.error.data.detail)
        }
    }, [
        loginStatus.isSuccess,
        loginStatus.isError,
        loginStatus.error.data.detail,
        navigate,
    ])
    const handleSubmit = (e) => {
        e.preventDefault()
        login({
            username,
            password,
        })
    }
    return (
        <>
            <Form className="centered" onSubmit={handleSubmit}>
                {errorMessage && (
                    <Alert key={'danger'} variant={'danger'}>
                        {errorMessage}
                    </Alert>
                )}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Put your pants on.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button className="sb-long" type="submit">
                    Login
                </Button>{' '}
                <br></br> <br></br> <br></br> <br></br>
                <p>Don&apos;t have an account?</p>
                <Link to="/api/signup">
                    <Button className="sb-long">Sign Up</Button>{' '}
                </Link>
            </Form>
        </>
    )
}

export default SignIn
