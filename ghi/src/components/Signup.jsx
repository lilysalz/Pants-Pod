import './components.css'

function Signup() {
    return (
        <>
            <form className="centered">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                        Make it unique.
                    </div>
                </div>
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
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
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

export default Signup