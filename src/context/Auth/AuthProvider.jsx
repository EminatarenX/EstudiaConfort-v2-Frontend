"use client"
import { createContext , useReducer, useContext } from 'react';
import { AuthReducer } from './StateManagement/AuthReducer';
const AuthContext = createContext();

const initialState = {
    user: null,
    isAuth: false,
    loading: null,
    message: ""
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
