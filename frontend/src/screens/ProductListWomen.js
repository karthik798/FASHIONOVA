import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Form } from 'react-bootstrap'
import WomenProduct from '../components/WomenProduct'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listWomenProducts } from '../actions/productActions'
import { useParams } from 'react-router'

const ProductListWomen = () => {

    const params = useParams()
    const dispatch = useDispatch()

    const [sort, setSort] = useState('rec')

    const womenProductList = useSelector(state => state.womenProductList)
    const { loading, error, womenproducts } = womenProductList


    useEffect(() => {
        dispatch(listWomenProducts(params.category))

    }, [dispatch,params])


    return (
        <><Container style={{ paddingTop: '140px' }}>

            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
                (<> <Row>
                    <Col><h2>Results: {womenproducts.length}</h2>
                    </Col>
                    <Col style={{ maxWidth: 'max-content' }}>
                        <Form>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                custom
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value="rec">Recommended</option>
                                <option value="lth">Low To High</option>
                                <option value="htl">High To Low</option>

                            </Form.Control>
                        </Form>
                    </Col>

                </Row>
                    <Row>
                        {(sort === 'lth') ? womenproducts.sort((a, b) => a.price - b.price).map(product => (<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <WomenProduct product={product} />
                        </Col>)) : (sort === 'htl') ? womenproducts.sort((a, b) => b.price - a.price).map(product => (<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <WomenProduct product={product} />
                        </Col>)) : womenproducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <WomenProduct product={product} />
                            </Col>

                        ))
                        }
                    </Row>
                </>)}
        </Container>
        </>
    )
}

export default ProductListWomen
