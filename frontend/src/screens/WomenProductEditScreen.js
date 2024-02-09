import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button,FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { productDetailsWomen, updateWomenProduct } from '../actions/productActions'
import { WOMENPRODUCT_UPDATE_RESET } from '../constants/productConstants'


const WomenProductEditScreen = () => {
    const params = useParams()
    const navigate = useNavigate()
    
    const productId = params.id
    const categoryId = params.category

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [errUpload, setErrUpload] = useState('')

    const dispatch = useDispatch()

    const womenProductDetails = useSelector((state) => state.womenProductDetails)
    const { loading, error, womenproduct } = womenProductDetails

    const womenProductUpdate = useSelector((state) => state.womenProductUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = womenProductUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: WOMENPRODUCT_UPDATE_RESET })
            navigate('/admin/womenproductslist')
        }
        else {
            if (!loading) {
                if (!womenproduct.name || womenproduct._id !== productId) {
                    dispatch(productDetailsWomen(categoryId, productId))
                }
                else {
                    setName(womenproduct.name)
                    setPrice(womenproduct.price)
                    setImage(womenproduct.image)
                    setBrand(womenproduct.brand)
                    setCategory(womenproduct.category)
                    setCountInStock(womenproduct.countInStock)
                    setDescription(womenproduct.description)
                }
            }

        }



    }, [dispatch,navigate, productId, womenproduct, categoryId, loading, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        if (!file.name.endsWith('.jpg' || '.jpeg' || '.png')) {
            setErrUpload('Wrong file type: please upload jpg, jpeg or png file')
            e.target.value = ''
            return
        }
        setErrUpload('')
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const { data, error: errorUpload } = await axios.post('/api/upload', formData, config)
            if (errorUpload) {
                setErrUpload(errorUpload)
            } else {
                setImage(data)
            }
                setUploading(false)
            
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }  

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateWomenProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock

        }))
    }

    return (
        <>
            <Link to='/admin/womenproductslist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <FormGroup controlId='image' className='py-2'>
                            <FormLabel>Image Url</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <Form.Group controlId="imageFile" className="py-2">
                            <Form.Label>Use Local Image File</Form.Label>
                            <Form.Control 
                                type="file" 
                                onChange={uploadFileHandler}
                            />
                        </Form.Group>
                        {uploading && <Loader />}
                        {errUpload && <Message variant='danger'>{errUpload}</Message>}
                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter countInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Label>Category</Form.Label>

                            <Form.Control

                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="top">TOP</option>
                                <option value="kurti">KURTI</option>
                                <option value="jacket">JACKET</option>
                                <option value="jeans">JEANS</option>
                                <option value="trouser">TROUSERS</option>
                                <option value="indi">FESTIVE</option>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default WomenProductEditScreen
