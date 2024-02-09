import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { productDetailsWomen, createWomenProductReview } from '../actions/productActions'
import { WOMENPRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import {useNavigate,useParams} from 'react-router'


const ProductScreenWomen = () => {
    const params = useParams()
    const navigate = useNavigate()
    
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const womenProductDetails = useSelector(state => state.womenProductDetails)
    const { loading, error, womenproduct } = womenProductDetails

    const womenProductCreateReview = useSelector(state => state.womenProductCreateReview)
    const { loading: loadingProductReview, success: successProductReview, error: errorProductReview } = womenProductCreateReview

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (successProductReview) {
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: WOMENPRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(productDetailsWomen(params.category,params.id))

    }, [dispatch, params, successProductReview])

    const addToCartHandler = () => {

        navigate(`/cart/${params.id}?qty=${qty}`)

    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createWomenProductReview(params.id, {
            rating, comment
        }))
    }


    return (
        <><Container style={{ paddingTop: '100px' }}>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
                (<>
                    <Row>
                        <Col md={5}>
                            <Image src={womenproduct.image} alt={womenproduct.name} fluid></Image>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{womenproduct.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={womenproduct.rating}
                                        text={`${womenproduct.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h4>Size: </h4>
                                    <Form>
                                        <Form.Control
                                            as="select"
                                            className="mr-sm-2"
                                            id="inlineFormCustomSelect"
                                            custom>
                                            <option value="small">S</option>
                                            <option value="medium">M</option>
                                            <option value="large">L</option>
                                        </Form.Control>
                                    </Form>

                                </ListGroup.Item>

                                <ListGroup.Item><h6>Product Details: </h6>{womenproduct.description}</ListGroup.Item>

                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>
                                            <Col><strong>Rs.{womenproduct.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>
                                            <Col>{womenproduct.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {womenproduct.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control style={{ lineHeight: 1 }} as='select' value={qty} onChange={(e) =>
                                                        setQty(e.target.value)}>
                                                        {
                                                            [...Array(womenproduct.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }


                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={womenproduct.countInStock === 0
                                        }>
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: '25px' }}>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {womenproduct.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {womenproduct.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {successProductReview && (
                                        <Message variant='success'>
                                            Review submitted successfully
                                        </Message>
                                    )}
                                    {loadingProductReview && <Loader />}
                                    {errorProductReview && (
                                        <Message variant='danger'>{errorProductReview}</Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    style={{ lineHeight: 1 }}
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingProductReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : <Message>Please <Link to='/login'>Sign in </Link>to write a review</Message>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>)}
        </Container>
        </>
    )
}

export default ProductScreenWomen
