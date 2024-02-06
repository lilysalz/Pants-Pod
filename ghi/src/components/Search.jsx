import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { reset, setQuery } from '../app/querySlice'

const Search = () => {
    const dispatch = useDispatch()
    const [queryInput, setQueryInput] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setQuery(queryInput))
    }
    return (
        <Form className="row" onSubmit={handleSubmit}>
            <div className="col">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Search by Title or Date (yyyy-mm-dd)"
                        value={queryInput}
                        onChange={(e) => setQueryInput(e.target.value)}
                    />
                </Form.Group>
            </div>
            <div className="col">
                <Button className="sb" variant="primary" type="submit">
                    Search
                </Button>
                <Button
                    className="sb"
                    onClick={() => {
                        setQueryInput('')
                        dispatch(reset())
                    }}
                >
                    Reset
                </Button>
            </div>
        </Form>
    )
}

export default Search
