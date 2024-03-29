import { Route, Routes, BrowserRouter } from 'react-router-dom'

// import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home'
import NavBar from './components/Navbar'
import SignIn from './components/Signin'
import SignUp from './components/Signup'
import EpisodesList from './components/EpisodesList'
import CardEpisodelist from './components/CardEpisodelist'
import LikedEpisodes from './components/LikedEpisode'
import AboutUs from './components/AboutUs'
import Footer from './components/Footer'
import TellUsAnything from './components/TellUsAnything'
import Detail from './components/Detail'

// All your environment variables in vite are in this object
// console.table(import.meta.env)

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

// /**
//  * This is an example of using JSDOC to define types for your component
//  * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
//  * @typedef {{launch_details: LaunchInfo, message?: string}} LaunchData
//  *
//  * @returns {React.ReactNode}
//  */
function App() {
    const domain = /http(s?):\/\/[^/]+/
    const basename = import.meta.env.VITE_PUBLIC_URL.replace(domain, '')
    return (
        <BrowserRouter basename={basename}>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/api/SignIn" element={<SignIn />} />
                <Route path="/api/SignUp" element={<SignUp />} />
                <Route path="/api/Episodes" element={<EpisodesList />} />
                <Route path="/api/LikedEpisodes" element={<LikedEpisodes />} />
                <Route path="/api/AboutUs" element={<AboutUs />} />
                <Route
                    path="/api/TellUsAnything"
                    element={<TellUsAnything />}
                />
                <Route path="/api/Detail" element={<Detail />}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
// /**
//  * This is an example of using JSDOC to define types for your component
//  * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
//  * @typedef {{launch_details: LaunchInfo, message?: string}} LaunchData
//  *
//  * @returns {React.ReactNode}
//  */
// function App() {
//     // Replace this App component with your own.
//     /** @type {[LaunchInfo | undefined, (info: LaunchInfo) => void]} */
//     const [launchInfo, setLaunchInfo] = useState()
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         async function getData() {
//             let url = `${API_HOST}/api/episodes`
//             console.log('fastapi url: ', url)
//             let response = await fetch(url)
//             /** @type {LaunchData} */
//             let data = await response.json()

//             if (response.ok) {
//                 if (!data.launch_details) {
//                     console.log('drat! no launch data')
//                     setError('No launch data')
//                     return
//                 }
//                 console.log('got launch data!')
//                 setLaunchInfo(data.launch_details)
//             } else {
//                 console.log('drat! something happened')
//                 setError(data.message)
//             }
//         }
//         getData()
//     }, [])

//     return (
//         <div>
//             <ErrorNotification error={error} />
//             <Construct info={launchInfo} />
//         </div>
//     )
// }

export default App
