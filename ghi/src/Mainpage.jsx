import React from 'react'
import { useNavigate } from 'react-router-dom'

function MainPage(props) {
    const text = `Infinite in mystery is the gift of the goddess
  We seek it thus, and take it to the sky
  Ripples form on the water's surface
  The wandering soul knows no rest`

const element = <h1>Hello, world!</h1>;
    }

    return (
        <div
            className="container-fluid"
            style={{ backgroundColor: 'black', margin: '0' }}
        >
            <div className="px-4 py-5 my-0 text-center">
                <h1 className="display-5 fw-bold text-white"> Act 1 </h1>

                <div className="col-lg-6 mx-auto">
                    <img
                        onClick={handleClick}
                        src="https://media0.giphy.com/media/HSCZMUa1ao17h7l5mg/giphy.gif?cid=ecf05e47bfc6vl630g7jee077u6fkcq16v3szuridlufdtl3&ep=v1_gifs_related&rid=giphy.gif&ct=g"
                        alt="loving"
                        style={{ maxWidth: '100%', cursor: 'pointer' }}
                    />

                    <h2 className="text-white"> Loveless </h2>

                    <p
                        className="lead mb-4 text-white"
                        style={{ whiteSpace: 'pre-line' }}
                    >
                        {text}
                    </p>
                </div>
            </div>

            <div className="text-center text-white">
                <p>Click the image</p>
            </div>
        </div>
    )
}

export default MainPage
