import { 
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    REGISTRATION,
    REGISTRATION_ERROR,
    REGISTRATION_SUCCESS
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
       
        default: 
            return state
    }
}