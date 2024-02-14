import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {
    useSubmitTellUsAnythingMutation,
    useGetTokenQuery,
} from '../app/apiSlice'
import { useState, useEffect } from 'react'

const TellUsAnything = () => {
    const [submissionText, setSubmissionText] = useState('')
    const [submitTellUs, submissionStatus] = useSubmitTellUsAnythingMutation()
    const [submissionError, setSubmissionError] = useState('')
    const { data: account } = useGetTokenQuery()

    function getCurrentDate() {
        const date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let currentDate = `${year}-${month}-${day}`
        if (month < 10) {
            currentDate = `${year}-0${month}-${day}`
        }
        if (day < 10) {
            currentDate = `${year}-${month}-0${day}`
        }
        return currentDate
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.submission_text = submissionText
        data.submission_datetime = getCurrentDate()
        data.user_id = account.account.id
        submitTellUs(data)
        setSubmissionText('')
    }
    return (
        <>
            <h1 className="funkyhead">Tell Us Anything</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <textarea
                        placeholder="Dear Kate and Leisha..."
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="6"
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="sb">
                    Submit
                </button>
            </form>
        </>
    )
}

export default TellUsAnything
