import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, menProductListReducer, womenProductListReducer, menProductDetailsReducer, womenProductDetailsReducer, menProductDeleteReducer, womenProductDeleteReducer, menProductCreateReducer, womenProductCreateReducer, menProductUpdateReducer, womenProductUpdateReducer, menProductReviewCreateReducer, womenProductReviewCreateReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userListReducer, userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer,orderListReducer,orderPayReducer,orderListAdminReducer } from './reducers/orderReducers'
import { contactListReducer, contactSubmitReducer } from './reducers/contactReducers'

const reducer = combineReducers({
    productList: productListReducer,
    menProductList: menProductListReducer,
    womenProductList: womenProductListReducer,
    menProductDetails: menProductDetailsReducer,
    womenProductDetails: womenProductDetailsReducer,
    menProductDelete: menProductDeleteReducer,
    menProductCreate: menProductCreateReducer,
    menProductUpdate: menProductUpdateReducer,
    menProductCreateReview: menProductReviewCreateReducer,
    womenProductDelete: womenProductDeleteReducer,
    womenProductCreate: womenProductCreateReducer,
    womenProductUpdate: womenProductUpdateReducer,
    womenProductCreateReview: womenProductReviewCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderList: orderListReducer,
    orderListAdmin: orderListAdminReducer,
    contactSubmit: contactSubmitReducer,
    contactList: contactListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store