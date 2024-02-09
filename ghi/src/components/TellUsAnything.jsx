import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSubmitTellUsAnythingMutation } from 'app/apiSlice'

const tellUsAnything = () => {
    const [submission, setSubmission] = useState('')
    const [submitTellUs, submissionStatus] = useSubmitTellUsAnythingMutation()
    
    const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (response.ok) {
      setSubmission('');
    }

    const data = {}
    data.submission = submission

}
    return (
        <form>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                    Tell us anything!
                </label>
                <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="6"
                ></textarea>
            </div>
            <button type="submit" className="sb-long">
                Submit
            </button>
        </form>
    )
}

export default tellUsAnything
