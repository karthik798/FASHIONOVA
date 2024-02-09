import React, { useState } from 'react'
import { Button, Col, Form, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const SearchBox = () => {

    const navigate = useNavigate()

    const [keyword, setKeyword] = useState('')


    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} className='row ms-auto d-flex'>
            <Col md={8}>
                <FormControl
                    type='text'
                    name='q'
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder='Search Products...'
                    className='col'
                    autoComplete='off'
                >
                </FormControl>
            </Col>
            <Col md={2}>
                <Button type='submit' variant='outline-light' className='col p-2'>
                    Search
                </Button>
            </Col>
        </Form>
    )
}

export default SearchBox