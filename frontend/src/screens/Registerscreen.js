import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = () => {

  let location = useLocation()
  let navigate = useNavigate()

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [message, setMessage] = useState('')

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : "/"

  useEffect(() => {
      if (userInfo) {
        navigate(redirect)
      }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
      e.preventDefault()
      if (password !== confPassword) {
        setMessage('Passwords do not match!')
      } else {
        setMessage('')
        dispatch(register(name, email, password))
      }
  }

  

  return (
    <FormContainer>
        <h1 className='my-2'>Sign Up</h1>
        { error && <Message variant='danger'>{error}</Message> }
        { loading && <Loader /> }
        <Form onSubmit={submitHandler}>

            <FormGroup controlId='name' className='py-2'>
                <FormLabel>Name</FormLabel>
                <FormControl
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </FormControl>
            </FormGroup>

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
            <FormGroup controlId='confPassword' className='py-2'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl
                    type='password'
                    placeholder='Confirm password'
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                >
                </FormControl>
            </FormGroup>

            { message && <Message variant='danger'>{message}</Message> }

            <Button type='submit' variant='primary' className='my-3'>
                Sign Up
            </Button>
        </Form>

        <Row>
            <Col>
                Already have an account? {' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    login
                </Link>
            </Col>

        </Row>
        
    </FormContainer>
  )
}

export default RegisterScreen