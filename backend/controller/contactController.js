import asyncHandler from 'express-async-handler'
import Contact from '../model/contactModel.js'


// @desc    List Contacts
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({})
    res.json(contacts)
})



// @desc    Submit Contact/Feedback
// @route   POST /api/contact
// @access  Public
const submitContact = asyncHandler(async (req, res) => {
    const { name, email, phone, category, comment } = req.body

    const contact = await Contact.create({
        name,
        email,
        phone,
        category,
        comment
    })

    if (contact) {
        res.status(201).json({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            category: contact.category,
            comment: contact.comment,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

export { submitContact, getContacts }