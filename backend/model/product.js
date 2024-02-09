import mongoose from 'mongoose'


const reviewSchema = mongoose.Schema({

    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
})


const productSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,

    },
    name: {
        type: String,
        required: true,

    },

    reviews: [reviewSchema],

    category: {
        type: String,
        required: true
    },


    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    gender: {
        type: String,

    },

}, {

    timestamps: true
})


const mensProducts = mongoose.model('mensproducts', productSchema)
const womensProducts = mongoose.model('womensproducts', productSchema)


export {mensProducts, womensProducts}