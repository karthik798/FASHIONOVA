import React, { useEffect } from 'react'
import { Carousel, Container, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopProducts } from '../actions/productActions'
import Loader from './Loader'
import Message from './Message'

const ProductsCarousel = () => {

    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (

        loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
            <Container className='p-4'>
                <Carousel pause='hover' className='bg-dark'>
                    {products.map(product => (
                        <Carousel.Item key={product.id}>
                            <Link to={`/products/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid />
                                <Carousel.Caption className='carousel-caption'>
                                    <h3>{product.name} (${product.price})</h3>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        )

    )
}

export default ProductsCarousel