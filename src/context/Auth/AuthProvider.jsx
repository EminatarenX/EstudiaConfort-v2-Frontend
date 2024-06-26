"use client"
import { createContext , useReducer, useContext } from 'react';
import { AuthReducer } from './Infrastructure/redux/AuthReducer';
const AuthContext = createContext();

const initialState = {
    user: null,
    isAuth: false,
    loading: null,
    message: "",
    rooms: [],
    room: null,
    sensors: {
        waterFlow: 0,
        gas: 0,
        ultrasonic: 0
    }
}

export default function AuthProvider({ children }){
    const [ state, dispatch ] = useReducer(AuthReducer, initialState);
    
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
