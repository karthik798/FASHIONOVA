import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import  {Link} from 'react-router-dom'
import MenProduct from '../components/MenProduct'
import WomenProduct from '../components/WomenProduct'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import { useParams } from 'react-router'

const SearchScreen = () => {

    const params = useParams()
    const keyword = params.keyword
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, menproducts, womenproducts } = productList


    useEffect(() => {
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])




    return (
        <Container style={{ paddingTop: '120px' }}>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
                (<><h1>Mens Collection</h1>{menproducts.length === 0 ? <h6>No Match Found For Mens</h6> : <Row>
                    {menproducts.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <MenProduct product={product} />
                        </Col>
                    ))}
                </Row>}

                    <h1>Womens Collection</h1> {womenproducts.length === 0 ? <h6>No Match Found For Womens</h6> : <Row>
                        {womenproducts.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <WomenProduct product={product} />
                            </Col>
                        ))}
                    </Row>}

                </>)}

        </Container>

    )
}

export default SearchScreen
