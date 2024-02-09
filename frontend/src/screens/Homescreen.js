import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import MenProduct from '../components/MenProduct'
import WomenProduct from '../components/WomenProduct'
import Banner from '../components/Banner'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const Homescreen = () => {


    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, menproducts, womenproducts } = productList


    useEffect(() => {
        dispatch(listProducts())

    }, [dispatch])




    return (
        <>
            <Banner> </Banner>

            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
                (<><h1>Latest Mens Collection</h1>
                    <Row>
                        {menproducts.slice(0, 4).map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <MenProduct product={product} />
                            </Col>
                        ))}
                    </Row>
                    <h1>Latest Womens Collection</h1>
                    <Row>
                        {womenproducts.slice(0, 4).map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <WomenProduct product={product} />
                            </Col>
                        ))}
                    </Row>
                </>)}




        </>
    )
}

export default Homescreen
