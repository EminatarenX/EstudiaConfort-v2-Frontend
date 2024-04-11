import { 
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    REGISTRATION,
    REGISTRATION_ERROR,
    REGISTRATION_SUCCESS,
    GET_ALL_ROOMS_USER,
    GET_ALL_ROOMS_USER_SUCCESS,
    GET_ALL_ROOMS_USER_ERROR,
    GET_ROOM_INFO,
    GET_ROOM_INFO_SUCCESS,
    GET_ROOM_INFO_ERROR,
    WATER_INTERRUPTOR,
    WATER_INTERRUPTOR_SUCCESS,
    WATER_INTERRUPTOR_ERROR,
    CHANGE_SENSORS_DATA,
    EDIT_ROOM,
    EDIT_ROOM_ERROR,
    EDIT_ROOM_SUCCESS,
    DELETE_ROOM,
    DELETE_ROOM_ERROR,
    DELETE_ROOM_SUCCESS,
    CREATE_ROOM,
    CREATE_ROOM_ERROR,
    CREATE_ROOM_SUCCESS
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
        case GET_ROOM_INFO_ERROR:
        case GET_ALL_ROOMS_USER_ERROR:
        case WATER_INTERRUPTOR_ERROR:
        case EDIT_ROOM_ERROR:
        case DELETE_ROOM_ERROR:
        case CREATE_ROOM_ERROR:
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
        case GET_ROOM_INFO:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_ROOM_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                room: action.payload
            }
        case WATER_INTERRUPTOR:
            return {
                ...state,
                loading: true,
                error: null
            }
        case WATER_INTERRUPTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                room: {
                    ...state.room,
                    water: action.payload
                }
            }
        case CHANGE_SENSORS_DATA: 
            return {
                ...state,
                sensors: action.payload
            }
        case EDIT_ROOM:
            return {
                ...state,
                loading: true,
                error: null
            }
        case EDIT_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                room: action.payload
            }
        case DELETE_ROOM:
            return {
                ...state,
                loading: true,
                error: null
            }
        case DELETE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                rooms: state.rooms.filter( room => room.id !== action.payload)
            }
        case CREATE_ROOM:
            return {
                ...state,
                loading: true,
                error: null
            }
        case CREATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                rooms: [...state.rooms, action.payload]
            }
       
        default: 
            return state
    }
}