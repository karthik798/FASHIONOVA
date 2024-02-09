import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteMenProduct, createMenProduct } from '../actions/productActions'
import { MENPRODUCT_CREATE_RESET } from '../constants/productConstants'
import { useNavigate} from 'react-router'

const MenProductListScreen = () => {
    const navigate = useNavigate()
    
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, menproducts } = productList

    const menProductDelete = useSelector((state) => state.menProductDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = menProductDelete

    const menProductCreate = useSelector((state) => state.menProductCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, menproduct: createdProduct } = menProductCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        dispatch({ type: MENPRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/mensproduct/${createdProduct.category}/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }

    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteMenProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createMenProduct())
    }

    return (
        <><Container style={{ paddingTop: '120px' }}>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>

                </Col>
                <Col className='text-right'>
                    <Button className='my-3' style={{right:0,left:10}} onClick={createProductHandler}>
                        <i className='fas fa-plus'></i>Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {menproducts.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>
                                    Rs.{product.price}
                                </td>
                                <td>
                                    {product.category}
                                </td>
                                <td>
                                    {product.brand}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/mensproduct/${product.category}/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(product._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
        </>
    )
}

export default MenProductListScreen
