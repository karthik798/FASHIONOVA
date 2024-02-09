import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import userRoute from "./route/userRoutes.js"
import orderRoute from "./route/orderRoutes.js"
import uploadRoute from "./route/uploadRoutes.js"
import contactRoutes from './route/contactRoutes.js'
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"
import path from 'path'
import womensRoutes from './route/womensRoutes.js'
import mensRoutes from './route/mensRoutes.js'
import mensProduct from './route/mensProduct.js'
import womensProduct from './route/womensProduct.js'


dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());

app.use('/api/mensproducts', mensProduct)
app.use('/api/womensproducts', womensProduct)
app.use('/api/menswear', mensRoutes)
app.use('/api/womenswear', womensRoutes)
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);
app.use('/api/contact', contactRoutes)

app.get('/api/config/paypal', (req, res) => (
    res.send(process.env.PAYPAL_CLIENT_ID)
))


const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))

} else {
    app.get("/", (req, res) => {
        res.send("API is running");
    })
}


app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on port ${port} in ${process.env.NODE_ENV} mode!`));

