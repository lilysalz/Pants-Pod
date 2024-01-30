import './components.css'
import { useLoginMutation } from '../app/apiSlice'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignUpMutation } from '../app/apiSlice'
import Alert from 'react-bootstrap/Alert'

function SignUp() {
    const [signUp, signUpStatus] = useSignUpMutation()
    const navigate = useNavigate('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [samePassword, setSamePassword] = useState('')
    const [passMatch, setPassMatch] = useState(true)
    console.log({ signUpStatus })
    // const handleSetSamePasswordChange = (e) => {
    //     const value = e.target.value;
    //     setSamePassword(value);

    //     if (password == samePassword) {
    //         setPassMatch(true)
    //     } else {
    //         setPassMatch(false)
    //     }
    //     console.log(password, samePassword);
    // }
    useEffect(() => {
        if (signUpStatus.isSuccess) navigate('/')
    }, [signUpStatus])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password != samePassword) {
            return setPassMatch(false)
        }
        const data = {}
        data.username = username
        data.password = password
        await signUp(data)
    }
    return (
        <>
            <form className="centered" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                        Make it unique.
                    </div>
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
                        Same Password
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
                        I will not be a terible person
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    )
}

export default SignUp
