import axios from "axios";
import { CONTACT_LIST_FAIL, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS, CONTACT_SUBMIT_FAIL, CONTACT_SUBMIT_REQUEST, CONTACT_SUBMIT_SUCCESS } from "../constants/contactConstants";
import { logout } from './userActions'


export const contactsubmit = (name, email, phone, category, comment) => async (dispatch) => {
    try {
        dispatch({
            type: CONTACT_SUBMIT_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/api/contact',
            { name, email, phone, category, comment },
            config
        )

        dispatch({
            type: CONTACT_SUBMIT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: CONTACT_SUBMIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,

        })
    }
}


export const contactlist = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/contact`, config)

        dispatch({
            type: CONTACT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: CONTACT_LIST_FAIL,
            payload: message,
        })
    }
}