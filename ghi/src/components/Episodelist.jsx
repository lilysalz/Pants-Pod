import { useEffect, useState } from 'react'

function EpisodeList() {
    const [episodes, setEpisodes] = useState([])
    const getData = async () => {
        const response = await fetch(`http://localhost:8000/api/episodes`)

        if (response.ok) {
            const data = await response.json()
            setEpisodes(data)
            console.log(data)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div>
                <h1>Episodes</h1>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        {/* <th>Manufacturer</th>
                        <th>Picture_Url</th> */}
                    </tr>
                </thead>
                <tbody>
                    {episodes.map((episode) => (
                        <tr key={episode.spotify_id}>
                            <td>{episode.title}</td>
                            {/* Render other properties as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default EpisodeList
