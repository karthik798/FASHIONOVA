import asyncHandler from 'express-async-handler'
import { mensProducts, womensProducts } from '../model/product.js'

const getMenProducts = asyncHandler(async (req, res) => {

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const products = await mensProducts.find({ ...keyword })
    res.json(products)
})

const getMenProduct = asyncHandler(async (req, res) => {

    const products = await mensProducts.findById(req.params.id)
    res.json(products)
})


const getMenswearByCategory = asyncHandler(async (req, res) => {

    const products = await mensProducts.find({ category: req.params.category })

    res.json(products)
})

const getMenswearProduct = asyncHandler(async (req, res) => {
    const product = await mensProducts.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {

        res.status(404)
        throw new Error('Product not Found')
    }
})


const getWomenProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const products = await womensProducts.find({ ...keyword })
    res.json(products)
})

const getWomenProduct = asyncHandler(async (req, res) => {

    const products = await womensProducts.findById(req.params.id)
    res.json(products)
})


const getWomenswearByCategory = asyncHandler(async (req, res) => {

    const products = await womensProducts.find({ category: req.params.category })

    res.json(products)
})

const getWomenswearProduct = asyncHandler(async (req, res) => {
    const product = await womensProducts.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {

        res.status(404)
        throw new Error('Product not Found')
    }
})


const deleteMenProduct = asyncHandler(async (req, res) => {

    const product = await mensProducts.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product Removed' })
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

const deleteWomenProduct = asyncHandler(async (req, res) => {

    const product = await womensProducts.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product Removed' })
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

const createMenProduct = asyncHandler(async (req, res) => {

    const product = new mensProducts({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/sample.jpg',
        brand: 'sample',
        category: 'category',
        gender: 'menproduct',
        countInStock: 0,
        description: 'sample desc',
        numReviews: 0

    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateMenProduct = asyncHandler(async (req, res) => {

    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await mensProducts.findById(req.params.id)

    if (product) {

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock



        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }

})

const createWomenProduct = asyncHandler(async (req, res) => {

    const product = new womensProducts({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/sample.jpg',
        brand: 'sample',
        category: 'category',
        gender: 'womenproduct',
        countInStock: 0,
        description: 'sample desc',
        numReviews: 0

    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateWomenProduct = asyncHandler(async (req, res) => {

    const { name, price, description, image, brand, category, countInStock, } = req.body

    const product = await womensProducts.findById(req.params.id)

    if (product) {

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock



        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }

})


const createMenProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body

    const product = await mensProducts.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product Already Reviewd')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)

        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review Added' })
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }

})

const createWomenProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body

    const product = await womensProducts.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product Already Reviewd')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)

        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review Added' })
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }

})



export {
    getMenProduct,
    getMenProducts,
    getMenswearByCategory,
    getMenswearProduct,
    getWomenProduct,
    getWomenProducts,
    getWomenswearByCategory,
    getWomenswearProduct,
    deleteMenProduct,
    deleteWomenProduct,
    createMenProduct,
    updateMenProduct,
    createWomenProduct,
    updateWomenProduct,
    createMenProductReview,
    createWomenProductReview
}