import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './components.css'
import { Link } from 'react-router-dom'
import Signup from './Signup'

function SignIn() {
    return (
        <Form className="centered">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="What you name is" />
                <Form.Text className="text-muted">Put your pants on.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button as={Link} to="/" variant="primary" type="submit">
                Login
            </Button>{' '}
            <Button as={Link} to="/Signup" variant="primary" type="submit">
                Signup
            </Button>
        </Form>
    )
}

export default SignIn
