import { 
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    REGISTRATION,
    REGISTRATION_ERROR,
    REGISTRATION_SUCCESS,
    GET_ALL_ROOMS_USER,
    GET_ALL_ROOMS_USER_SUCCESS,
    GET_ALL_ROOMS_USER_ERROR
 } from "./AuthTypes";


export function AuthReducer(state, action) {
    switch( action.type ) {
        case LOGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case LOGIN_ERROR: 
        case REGISTRATION_ERROR:
        case GET_ALL_ROOMS_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                loading: false,
            }
        case REGISTRATION: 
            return {
                ...state,
                loading: true,
                error: null
            }
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case GET_ALL_ROOMS_USER:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_ALL_ROOMS_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                rooms: action.payload
            }
       
        default: 
            return state
    }
}