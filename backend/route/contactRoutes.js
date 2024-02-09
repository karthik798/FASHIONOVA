import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import { submitContact, getContacts } from '../controller/contactController.js'

router.route('/').post(submitContact).get(protect, admin, getContacts)

export default router
