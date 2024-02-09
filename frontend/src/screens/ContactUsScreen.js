import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { contactsubmit } from '../actions/contactActions'
import { CONTACT_SUBMIT_RESET } from '../constants/contactConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'



const ContactUsScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [category, setCategory] = useState('complain')
    const [comment, setComment] = useState('')

    const contactSubmit = useSelector((state) => state.contactSubmit)
    const { loading, error, contactInfo } = contactSubmit

    useEffect(() => {
        if (contactInfo) {
            dispatch({ 'type': CONTACT_SUBMIT_RESET })
            alert('Submitted')
            navigate('/')
        }
    }, [dispatch, contactInfo, navigate])


    const submitHandler = (e) => {
        e.preventDefault()
        if (validator.isEmail(email)) {
            dispatch(contactsubmit(name, email, phone, category, comment))
        }
        else {
            alert("Enter Valid Email")
        }
    }


    return (

        <><Container style={{ paddingTop: '120px' }}>
            <Link to='/' className='btn btn-light my-3'>
                Go Back
            </Link>
            {error && <Message variant='danger'>Fill all the Details / Check if already submitted a request using the given email</Message>}
            {loading && <Loader />}

            <FormContainer>
                <h1>Enter Details</h1>
                <Form>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='phone'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter Phone exclude +91'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Registered Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Reason of Contact</Form.Label>

                        <Form.Control
                            as="select"
                            className="mr-sm-2"
                            custom
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="complain">COMPLAIN</option>
                            <option value="suggestion">SUGGESTION</option>
                            <option value="feedback">FEEDBACK</option>
                            <option value="enquiry">ENQUIRY</option>
                            <option value="delayorder">DELAY ORDER</option>
                            <option value="others">OTHERS..</option>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Comment'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' onClick={submitHandler}>
                        Submit
                    </Button>
                </Form>
            </FormContainer>
        </Container>
        </>
    )
}

export default ContactUsScreen
