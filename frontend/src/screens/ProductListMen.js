import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Form } from 'react-bootstrap'
import MenProduct from '../components/MenProduct'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMenProducts } from '../actions/productActions'
import { useParams } from 'react-router'


const ProductListMen = () => {

    const params = useParams()
    const dispatch = useDispatch()

    const [sort, setSort] = useState('rec')




    const menProductList = useSelector(state => state.menProductList)
    const { loading, error, menproducts } = menProductList




    useEffect(() => {
        dispatch(listMenProducts(params.category))
    }, [dispatch,params])



    return (
        <><Container style={{ paddingTop: '140px' }}>

            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
                (<>
                    <Row>
                        <Col><h2>Results: {menproducts.length}</h2>
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
                        {(sort === 'lth') ? menproducts.sort((a, b) => a.price - b.price).map(product => (<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <MenProduct product={product} />
                        </Col>)) : (sort === 'htl') ? menproducts.sort((a, b) => b.price - a.price).map(product => (<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <MenProduct product={product} />
                        </Col>)) : menproducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <MenProduct product={product} />
                            </Col>

                        ))
                        }

                    </Row>

                </>)}

        </Container>
        </>
    )
}

export default ProductListMen
