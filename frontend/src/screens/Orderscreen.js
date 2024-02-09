import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions'
import axios from 'axios'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'


const Orderscreen = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    const [sdkReady, setSdkReady] = useState(false)
    const orderId = params.id

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || order._id !== orderId || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, order, successPay, successDeliver,navigate,userInfo])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
        dispatch(getOrderDetails(orderId))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(orderId))
    }

    return (

        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Container>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={7}>
                        <ListGroup variant='flush'>
                            <ListGroupItem className="my-2">
                                <h2 className="my-2">Shipping</h2>
                                <p><strong>Name: </strong> {order.user.name}</p>
                                <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : (
                                    <Message variant='danger'>Not Delivered</Message>
                                )}
                            </ListGroupItem>
                            <ListGroupItem className="my-2">
                                <h2 className="my-2">Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : (
                                    <Message variant='danger'>Not Paid</Message>
                                )}
                            </ListGroupItem>
                            <ListGroupItem className="my-2">
                                <h2 className="my-2">Order Items</h2>
                                {order.orderItems.length === 0 ? <Message>Order is empty.</Message> : (
                                    <ListGroup variant='flush' className="my-2">
                                        {order.orderItems.map((item, index) => (
                                            <ListGroupItem key={index} className="my-2">
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} × Rs{item.price} = Rs{item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>

                                )}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col></Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <h2 className='my-3'>Order Summary</h2>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>Rs{order.itemsPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>Rs{order.shippingPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>Rs{order.taxPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>Rs{order.totalPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                {!order.isPaid && order.user._id === userInfo._id && (
                                    <ListGroupItem>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? <Loader /> : (
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />
                                        )}
                                    </ListGroupItem>
                                )}
                                {loadingDeliver && <Loader/>}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroupItem>
                                        <Row>
                                            <Button
                                                type='button'
                                                variant='outline-dark'
                                                className='btn btn-block'
                                                onClick={deliverHandler}
                                            >
                                                Mark As Delivered
                                            </Button>
                                        </Row>
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )

    )
}

export default Orderscreen