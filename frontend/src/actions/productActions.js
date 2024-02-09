
import axios from 'axios'
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, MENPRODUCT_LIST_REQUEST, MENPRODUCT_LIST_SUCCESS, MENPRODUCT_LIST_FAIL, WOMENPRODUCT_LIST_REQUEST, WOMENPRODUCT_LIST_SUCCESS, WOMENPRODUCT_LIST_FAIL, MENPRODUCT_DETAILS_REQUEST, MENPRODUCT_DETAILS_SUCCESS, MENPRODUCT_DETAILS_FAIL, WOMENPRODUCT_DETAILS_REQUEST, WOMENPRODUCT_DETAILS_SUCCESS, WOMENPRODUCT_DETAILS_FAIL, MENPRODUCT_DELETE_REQUEST, MENPRODUCT_DELETE_SUCCESS, MENPRODUCT_DELETE_FAIL, WOMENPRODUCT_DELETE_REQUEST, WOMENPRODUCT_DELETE_SUCCESS, WOMENPRODUCT_DELETE_FAIL, MENPRODUCT_CREATE_REQUEST, MENPRODUCT_CREATE_SUCCESS, MENPRODUCT_CREATE_FAIL, WOMENPRODUCT_CREATE_REQUEST, WOMENPRODUCT_CREATE_SUCCESS, WOMENPRODUCT_CREATE_FAIL, MENPRODUCT_UPDATE_REQUEST, MENPRODUCT_UPDATE_SUCCESS, MENPRODUCT_UPDATE_FAIL, WOMENPRODUCT_UPDATE_REQUEST, WOMENPRODUCT_UPDATE_SUCCESS, WOMENPRODUCT_UPDATE_FAIL, MENPRODUCT_CREATE_REVIEW_REQUEST, MENPRODUCT_CREATE_REVIEW_SUCCESS, MENPRODUCT_CREATE_REVIEW_FAIL, WOMENPRODUCT_CREATE_REVIEW_REQUEST, WOMENPRODUCT_CREATE_REVIEW_SUCCESS, WOMENPRODUCT_CREATE_REVIEW_FAIL } from '../constants/productConstants'


export const listProducts = (keyword = '') => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const men = await axios.get(`/api/mensproducts?keyword=${keyword}`)

        const women = await axios.get(`/api/womensproducts?keyword=${keyword}`)



        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload1: men.data,
            payload2: women.data,

        })


    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}

export const listMenProducts = (category) => async (dispatch) => {

    try {
        dispatch({ type: MENPRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`/api/menswear/${category}`)



        dispatch({
            type: MENPRODUCT_LIST_SUCCESS,
            payload: data,


        })

    } catch (error) {
        dispatch({
            type: MENPRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}

export const listWomenProducts = (category) => async (dispatch) => {

    try {
        dispatch({ type: WOMENPRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`/api/womenswear/${category}`)



        dispatch({
            type: WOMENPRODUCT_LIST_SUCCESS,
            payload: data,


        })

    } catch (error) {
        dispatch({
            type: WOMENPRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}

export const productDetailsMen = (category, id) => async (dispatch) => {

    try {
        dispatch({ type: MENPRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/menswear/${category}/${id}`)



        dispatch({
            type: MENPRODUCT_DETAILS_SUCCESS,
            payload: data,


        })

    } catch (error) {
        dispatch({
            type: MENPRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}

export const productDetailsWomen = (category, id) => async (dispatch) => {

    try {
        dispatch({ type: WOMENPRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/womenswear/${category}/${id}`)



        dispatch({
            type: WOMENPRODUCT_DETAILS_SUCCESS,
            payload: data,


        })

    } catch (error) {
        dispatch({
            type: WOMENPRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}



export const deleteMenProduct = (id) => async (dispatch, getState) => {


    try {

        dispatch({
            type: MENPRODUCT_DELETE_REQUEST,
        })


        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/api/mensproducts/${id}`, config)


        dispatch({
            type: MENPRODUCT_DELETE_SUCCESS,

        })

    } catch (error) {
        dispatch({
            type: MENPRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}


export const deleteWomenProduct = (id) => async (dispatch, getState) => {


    try {

        dispatch({
            type: WOMENPRODUCT_DELETE_REQUEST,
        })


        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/api/womensproducts/${id}`, config)


        dispatch({
            type: WOMENPRODUCT_DELETE_SUCCESS,

        })

    } catch (error) {
        dispatch({
            type: WOMENPRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}


export const createMenProduct = () => async (dispatch, getState) => {


    try {

        dispatch({
            type: MENPRODUCT_CREATE_REQUEST,
        })


        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`/api/mensproducts`, {}, config)


        dispatch({
            type: MENPRODUCT_CREATE_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: MENPRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}


export const createWomenProduct = () => async (dispatch, getState) => {


    try {

        dispatch({
            type: WOMENPRODUCT_CREATE_REQUEST,
        })


        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`/api/womensproducts`, {}, config)


        dispatch({
            type: WOMENPRODUCT_CREATE_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: WOMENPRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}

export const updateMenProduct = (menproduct) => async (dispatch, getState) => {


    try {

        dispatch({
            type: MENPRODUCT_UPDATE_REQUEST,
        })


        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put(`/api/mensproducts/${menproduct._id}`, menproduct, config)


        dispatch({
            type: MENPRODUCT_UPDATE_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: MENPRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}

export const updateWomenProduct = (womenproduct) => async (dispatch, getState) => {


    try {

        dispatch({
            type: WOMENPRODUCT_UPDATE_REQUEST,
        })


        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put(`/api/womensproducts/${womenproduct._id}`, womenproduct, config)


        dispatch({
            type: WOMENPRODUCT_UPDATE_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: WOMENPRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}

export const createMenProductReview = (productId, review) => async (dispatch, getState) => {


    try {

        dispatch({
            type: MENPRODUCT_CREATE_REVIEW_REQUEST,
        })


        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.post(`/api/mensproducts/${productId}/reviews`, review, config)


        dispatch({
            type: MENPRODUCT_CREATE_REVIEW_SUCCESS,


        })

    } catch (error) {
        dispatch({
            type: MENPRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}

export const createWomenProductReview = (productId, review) => async (dispatch, getState) => {


    try {

        dispatch({
            type: WOMENPRODUCT_CREATE_REVIEW_REQUEST,
        })


        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.post(`/api/womensproducts/${productId}/reviews`, review, config)


        dispatch({
            type: WOMENPRODUCT_CREATE_REVIEW_SUCCESS,


        })

    } catch (error) {
        dispatch({
            type: WOMENPRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}