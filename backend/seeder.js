import dotenv from "dotenv"
import users from "./data/users.js"
import User from "./model/user.js"
import Order from "./model/order.js"
import connectDB from "./config/db.js"
import mensProd from './data/mensProducts.js'
import womensProd from './data/womensProducts.js'
import contacts from './data/contacts.js'
import Contact from './model/contactModel.js'
import { mensProducts, womensProducts } from './model/product.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Contact.deleteMany()
        await mensProducts.deleteMany()
        await womensProducts.deleteMany()

        const createdUser = await User.insertMany(users)
        
        const adminUser = createdUser[0]._id
        
        const mensProductData = mensProd.map(product => {
            return { ...product, user: adminUser }
        })

        const womensProductData = womensProd.map(product => {
            return { ...product, user: adminUser }
        })
        
       
        await mensProducts.insertMany(mensProductData)
        await womensProducts.insertMany(womensProductData)
        await Contact.insertMany(contacts)

        console.log('Data Imported!')
        process.exit()
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Contact.deleteMany()
        await mensProducts.deleteMany()
        await womensProducts.deleteMany()

        console.log('Data Destroyed')
        process.exit()
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}