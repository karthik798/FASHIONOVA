import express from 'express'
const router = express.Router()

import {
    getWomenProduct, getWomenProducts, deleteWomenProduct, createWomenProduct,
    updateWomenProduct,
    createWomenProductReview
} from '../controller/productController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getWomenProducts).post(protect, admin, createWomenProduct)
router.route('/:id/reviews').post(protect, createWomenProductReview)

router.route('/:id').get(getWomenProduct).delete(protect, admin, deleteWomenProduct).put(protect, admin, updateWomenProduct)

export default router