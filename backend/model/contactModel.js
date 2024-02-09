import mongoose from 'mongoose'


const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        }

    },
    {
        timestamps: true,
    }
)



const Contact = mongoose.model('Contact', contactSchema)

export default Contact
