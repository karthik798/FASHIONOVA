import { MENPRODUCT_CREATE_FAIL, MENPRODUCT_CREATE_REQUEST, MENPRODUCT_CREATE_RESET, MENPRODUCT_CREATE_REVIEW_FAIL, MENPRODUCT_CREATE_REVIEW_REQUEST, MENPRODUCT_CREATE_REVIEW_RESET, MENPRODUCT_CREATE_REVIEW_SUCCESS, MENPRODUCT_CREATE_SUCCESS, MENPRODUCT_DELETE_FAIL, MENPRODUCT_DELETE_REQUEST, MENPRODUCT_DELETE_SUCCESS, MENPRODUCT_DETAILS_FAIL, MENPRODUCT_DETAILS_REQUEST, MENPRODUCT_DETAILS_SUCCESS, MENPRODUCT_LIST_FAIL, MENPRODUCT_LIST_REQUEST, MENPRODUCT_LIST_SUCCESS, MENPRODUCT_UPDATE_FAIL, MENPRODUCT_UPDATE_REQUEST, MENPRODUCT_UPDATE_RESET, MENPRODUCT_UPDATE_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, WOMENPRODUCT_CREATE_FAIL, WOMENPRODUCT_CREATE_REQUEST, WOMENPRODUCT_CREATE_RESET, WOMENPRODUCT_CREATE_REVIEW_FAIL, WOMENPRODUCT_CREATE_REVIEW_REQUEST, WOMENPRODUCT_CREATE_REVIEW_RESET, WOMENPRODUCT_CREATE_REVIEW_SUCCESS, WOMENPRODUCT_CREATE_SUCCESS, WOMENPRODUCT_DELETE_FAIL, WOMENPRODUCT_DELETE_REQUEST, WOMENPRODUCT_DELETE_SUCCESS, WOMENPRODUCT_DETAILS_FAIL, WOMENPRODUCT_DETAILS_REQUEST, WOMENPRODUCT_DETAILS_SUCCESS, WOMENPRODUCT_LIST_FAIL, WOMENPRODUCT_LIST_REQUEST, WOMENPRODUCT_LIST_SUCCESS, WOMENPRODUCT_UPDATE_FAIL, WOMENPRODUCT_UPDATE_REQUEST, WOMENPRODUCT_UPDATE_RESET, WOMENPRODUCT_UPDATE_SUCCESS } from "../constants/productConstants"

export const productListReducer = (state = { menproducts: [], womenproducts: [] }, action) => {
    switch (action.type) {

        case PRODUCT_LIST_REQUEST:
            return { loading: true, menproducts: [], womenproducts: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, menproducts: action.payload1, womenproducts: action.payload2 }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }

}

export const menProductListReducer = (state = { menproducts: [] }, action) => {
    switch (action.type) {

        case MENPRODUCT_LIST_REQUEST:
            return { loading: true, menproducts: [] }
        case MENPRODUCT_LIST_SUCCESS:
            return { loading: false, menproducts: action.payload }
        case MENPRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }

}

export const womenProductListReducer = (state = { womenproducts: [] }, action) => {
    switch (action.type) {

        case WOMENPRODUCT_LIST_REQUEST:
            return { loading: true, womenproducts: [] }
        case WOMENPRODUCT_LIST_SUCCESS:
            return { loading: false, womenproducts: action.payload }
        case WOMENPRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }

}

export const menProductDetailsReducer = (state = { menproduct: { reviews: [] } }, action) => {
    switch (action.type) {

        case MENPRODUCT_DETAILS_REQUEST:
            return { loading: true }
        case MENPRODUCT_DETAILS_SUCCESS:
            return { loading: false, menproduct: action.payload }
        case MENPRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }

}

export const womenProductDetailsReducer = (state = { womenproduct: { reviews: [] } }, action) => {
    switch (action.type) {

        case WOMENPRODUCT_DETAILS_REQUEST:
            return { loading: true }
        case WOMENPRODUCT_DETAILS_SUCCESS:
            return { loading: false, womenproduct: action.payload }
        case WOMENPRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }

}


export const menProductDeleteReducer = (state = {}, action) => {
    switch (action.type) {

        case MENPRODUCT_DELETE_REQUEST:
            return { loading: true, }
        case MENPRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case MENPRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }

}

export const womenProductDeleteReducer = (state = {}, action) => {
    switch (action.type) {

        case WOMENPRODUCT_DELETE_REQUEST:
            return { loading: true, }
        case WOMENPRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case WOMENPRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }

}

export const menProductCreateReducer = (state = {}, action) => {
    switch (action.type) {

        case MENPRODUCT_CREATE_REQUEST:
            return { loading: true, }
        case MENPRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, menproduct: action.payload }
        case MENPRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case MENPRODUCT_CREATE_RESET:
            return {}
        default:
            return state

    }

}

export const womenProductCreateReducer = (state = {}, action) => {
    switch (action.type) {

        case WOMENPRODUCT_CREATE_REQUEST:
            return { loading: true, }
        case WOMENPRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, womenproduct: action.payload }
        case WOMENPRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case WOMENPRODUCT_CREATE_RESET:
            return {}
        default:
            return state

    }

}

export const menProductUpdateReducer = (state = { menproduct: {} }, action) => {
    switch (action.type) {

        case MENPRODUCT_UPDATE_REQUEST:
            return { loading: true, }
        case MENPRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, menproduct: action.payload }
        case MENPRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case MENPRODUCT_UPDATE_RESET:
            return { menproduct: {} }
        default:
            return state

    }

}

export const womenProductUpdateReducer = (state = { womenproduct: {} }, action) => {
    switch (action.type) {

        case WOMENPRODUCT_UPDATE_REQUEST:
            return { loading: true, }
        case WOMENPRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, womenproduct: action.payload }
        case WOMENPRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case WOMENPRODUCT_UPDATE_RESET:
            return { womenproduct: {} }
        default:
            return state

    }

}

export const menProductReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {

        case MENPRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true, }
        case MENPRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case MENPRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case MENPRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state

    }

}

export const womenProductReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {

        case WOMENPRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true, }
        case WOMENPRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case WOMENPRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case WOMENPRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state

    }

}
