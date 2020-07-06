import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED,
    LOGOUT_SUCCESSFUL,
    AUTHENTICATION_ERROR,
    REGISTER_SUCCESSFUL,
    REGISTER_FAILED
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: null,
    user: null,
    errors: {}
}

export default function (state = initialState, action) {

    switch (action.type) {

        case USER_LOADING:

            return {
                ...state,
                isLoading: true
            }

        case REGISTER_SUCCESSFUL:
        case LOGIN_SUCCESSFUL:

            localStorage.setItem("token", action.payload.token);

            // the payload will include user, token as keys
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                errors: {},
            }

        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case AUTHENTICATION_ERROR: // for errors at loading user
        case LOGIN_FAILED: // for login action creator
        case LOGOUT_SUCCESSFUL: // for logout action creator
        case REGISTER_FAILED:

            localStorage.removeItem("token");

            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                token: null,
                errors: action.payload
            }

        default:
            return state;
    }
}