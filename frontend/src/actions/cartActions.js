import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants'



export const addToCartMen = (id, qty) => async (dispatch, getState) => {

    const menproduct = await axios.get(`/api/menswear/menproduct/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: menproduct.data._id,
            name: menproduct.data.name,
            gender: menproduct.data.gender,
            image: menproduct.data.image,
            price: menproduct.data.price,
            countInStock: menproduct.data.countInStock,
            category: menproduct.data.category,
            qty,
        },
    })


    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const addToCartWomen = (id, qty) => async (dispatch, getState) => {

    const womenproduct = await axios.get(`/api/womenswear/womenproduct/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: womenproduct.data._id,
            name: womenproduct.data.name,
            gender: womenproduct.data.gender,
            image: womenproduct.data.image,
            price: womenproduct.data.price,
            countInStock: womenproduct.data.countInStock,
            category: womenproduct.data.category,
            qty,
        },
    })


    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

