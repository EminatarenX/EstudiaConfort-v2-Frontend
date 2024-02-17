"use client"
import { createContext, useContext, useReducer } from "react"
import { UserReducer } from "./Services/UserReducer"

const userContext = createContext()

const initialState = {
    rooms: [],
    room: null,
}

export default function UserProvider({children}) {
    const [state, dispatch] = useReducer(UserReducer, initialState)
    return(
        <userContext.Provider 
            value={{state, dispatch}}
        >
            {children}

        </userContext.Provider>
    )
}