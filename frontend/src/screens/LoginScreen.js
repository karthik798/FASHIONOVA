import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const LoginScreen = () => {

  let location = useLocation()
  let navigate = useNavigate()

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : "/"

  useEffect(() => {
      if (userInfo) {
        navigate(redirect)
      }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
  }

  

  return (
    <FormContainer>
        <h1 className='my-2'>Sign In</h1>
        { error && <Message variant='danger'>{error}</Message> }
        { loading && <Loader /> }
        <Form onSubmit={submitHandler}>
            <FormGroup controlId='email' className='py-2'>
                <FormLabel>Email Address</FormLabel>
                <FormControl
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </FormControl>
            </FormGroup>
            <FormGroup controlId='password' className='py-2'>
                <FormLabel>Password</FormLabel>
                <FormControl
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </FormControl>
            </FormGroup>
            <Button type='submit' variant='primary' className='my-3'>
                Sign In
            </Button>
        </Form>

        <Row>
            <Col>
                New Customer?{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>

        </Row>
        
    </FormContainer>
  )
}

export default LoginScreen