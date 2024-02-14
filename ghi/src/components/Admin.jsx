import React from 'react'
import { useGetPodcastDataQuery, useDeletePodcastDataMutation } from 'app/apiSlice'

function Admin() {
    const { data: podcast, error, isLoading } = useGetPodcastDataQuery()
    const [deletePodcast, result] = useDeletePodcastDataMutation()
    const [response, setResponse] = React.useState('')

    const handleGet = () => {
        return
    }

    const handleDelete = () => {
        
    }
}

export default Admin
