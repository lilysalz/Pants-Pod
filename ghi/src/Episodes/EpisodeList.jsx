import { UseSelector } from 'react-redux'
import { useGetAllEpisodesQuery } from '../app/apiSlice'
import { EpisodeCard } from './EpisodeCard'

const EpisodeList = () => {
    const {data, isLoading} = useGetAllEpisodesQuery()
    console.log({ data, isLoading })
    if (isLoading) return <div>Loading....</div>
    return (
        <>
            <h1>Pants Podc Episodes</h1>
            {/* <table className="text-left w-full">
                <thead className="flex w-full">
                    <tr className="flex w-full">
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Time</th>
                        <th>Listen on Spotify</th>
                        <th>Listen on Apple</th>
                        <th>Like</th>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto">
                    {data.map(e => (
                        <EpisodeCard />
                    ))}
                </tbody>
            </table> */}
        </>
    )
}

export default EpisodeList();
