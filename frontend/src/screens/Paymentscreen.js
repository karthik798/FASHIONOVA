import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Form, FormCheck, FormGroup, FormLabel} from 'react-bootstrap'
import { useNavigate } from 'react-router'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import { savePaymentMethod } from '../actions/cartActions'

const Paymentscreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        navigate("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }



    return (
        <Container>
            <CheckoutSteps s1 s2 s3/>
            <FormContainer>

                <h1 className='my-3'>Payment Method</h1>

                <Form onSubmit={submitHandler}>
                    <FormGroup className='my-3'>
                        <FormLabel as='legend' className='my-2'>Select Method</FormLabel>
                        <Col className='py-2'>
                            <FormCheck
                                type='radio'
                                label='PayPal or Credit Card'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </Col>
                        
                    </FormGroup>

                    <Button type='submit' variant='primary' className='my-3'>
                        Continue
                    </Button>
                </Form>

            </FormContainer>
        </Container>
    )
}

export default Paymentscreen