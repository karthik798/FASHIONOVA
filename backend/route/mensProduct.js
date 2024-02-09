import express from 'express'
const router = express.Router()

import {
    deleteMenProduct, getMenProduct, getMenProducts, createMenProduct,
    updateMenProduct,
    createMenProductReview
} from '../controller/productController.js'

import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').get(getMenProducts).post(protect, admin, createMenProduct)
router.route('/:id/reviews').post(protect, createMenProductReview)

router.route('/:id').get(getMenProduct).delete(protect, admin, deleteMenProduct).put(protect, admin, updateMenProduct)



export default router