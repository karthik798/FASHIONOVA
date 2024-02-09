import { CONTACT_SUBMIT_FAIL, CONTACT_SUBMIT_REQUEST, CONTACT_SUBMIT_SUCCESS, CONTACT_SUBMIT_RESET, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS, CONTACT_LIST_FAIL } from "../constants/contactConstants"

export const contactSubmitReducer = (state = {}, action) => {
    switch (action.type) {

        case CONTACT_SUBMIT_REQUEST:
            return { loading: true }
        case CONTACT_SUBMIT_SUCCESS:
            return { loading: false, contactInfo: action.payload }
        case CONTACT_SUBMIT_FAIL:
            return { loading: false, error: action.payload }
        case CONTACT_SUBMIT_RESET:
            return {}
        default:
            return state

    }
}

export const contactListReducer = (state = { contacts: [] }, action) => {
    switch (action.type) {

        case CONTACT_LIST_REQUEST:
            return { loading: true }
        case CONTACT_LIST_SUCCESS:
            return { loading: false, contacts: action.payload }
        case CONTACT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }
}