import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home'
import NavBar from './components/Navbar'
import SignIn from './components/Signin'
import Signup from './components/Signup'
// All your environment variables in vite are in this object
// console.table(import.meta.env)

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/Signup" element={<Signup />} />
            </Routes>
        </Router>
    )
}

export default App
