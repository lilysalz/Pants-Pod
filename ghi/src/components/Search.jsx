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
        console.log('search')
    }
    return (
        <Form className="row" onSubmit={handleSubmit}>
            <div className="col">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Pantalon"
                        value={queryInput}
                        onChange={(e) => setQueryInput(e.target.value)}
                    />
                </Form.Group>
                <Form.Text className="text-muted">
                    ...Search by Title or Date (yyyy-mm-dd)
                </Form.Text>
            </div>
            <div className="col">
                <Button variant="primary" type="submit">
                    Search
                </Button>
                <Button
                    variant="link"
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
