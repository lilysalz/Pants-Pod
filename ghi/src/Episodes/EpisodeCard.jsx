function EpisodeCard() {
    const eDate = new Date(e.release_date)
    const ss = Math.floor((e.duration / 1000) % 60)
    const mm = Math.floor((e.duration / 1000 / 60) % 60)
    const hh = Math.floor((e.duration / 1000 / 60 / 60) % 24)
    const duration = `${hh}:${mm}:${ss}`
    return (
        <tr className="flex w-full" key={e.spotify_id}>
            <td>{e.title}</td>
            <td>{eDate.toLocaleDateString()}</td>
            <td>{duration}</td>
            <td>
                <a href={e.spotify_url}>
                    <img
                        src="/spofity_logo.svg"
                        alt="spotify_logo"
                        height={21}
                        width={21}
                    />
                </a>
            </td>
            <td>
                <a href={e.apple_url}>
                    <img
                        src="/apple_logo.png"
                        alt="apple_logo"
                        height={21}
                        width={21}
                    />
                </a>
            </td>
            <td>implement liked status</td>
        </tr>
    )
}

export default EpisodeCard()
