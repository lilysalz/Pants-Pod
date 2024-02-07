import './components.css'
import { useLoginMutation } from '../app/apiSlice'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignUpMutation } from '../app/apiSlice'
import Alert from 'react-bootstrap/Alert'

function SignUp() {
    const [signUp, signUpStatus] = useSignUpMutation()
    const [login] = useLoginMutation()
    const navigate = useNavigate('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [samePassword, setSamePassword] = useState('')
    const [passMatch, setPassMatch] = useState(true)
    const [dupeUser, setDupeUser] = useState(true)
    const [signUpError, setSignUpError] = useState('')

    useEffect(() => {
        if (signUpStatus.isSuccess) {
            navigate('/')
        }
    }, [signUpStatus])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password != samePassword) {
            return setPassMatch(false)
        }
        const data = {}
        data.username = username
        data.password = password
        try {
            const result = await signUp(data).unwrap()
            login({ username, password })
        } catch (error) {
            setDupeUser(false)
            setSignUpError(error.data.detail)
        }
    }
    return (
        <>
            <form className="centered" onSubmit={handleSubmit}>
                {!dupeUser && (
                    <Alert key={'warning'} variant={'warning'}>
                        {signUpError}
                    </Alert>
                )}

                <div className="mb-3">
                    <label htmlFor="exampleInputUser" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputUser"
                        aria-describedby="emailHelp"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                {!passMatch && (
                    <Alert key={'warning'} variant={'warning'}>
                        Passwords must match!
                    </Alert>
                )}
                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Passwordcheck" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="Passwordcheck"
                        required
                        value={samePassword}
                        onChange={(e) => setSamePassword(e.target.value)}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        required
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        I will not be a terrible person
                    </label>
                </div>
                <button type="submit" className="sb-long">
                    Submit
                </button>
            </form>
        </>
    )
}

export default SignUp
