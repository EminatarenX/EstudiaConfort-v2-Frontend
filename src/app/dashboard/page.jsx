"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../components/layouts/AdminLayout"
import Room from '@/app/dashboard/Room'
import { useAuth } from "@/context/Auth/AuthProvider"
import { GetAllRoomsUserAction } from "@/context/Auth/Infrastructure/redux/AuthActions"
export default function Page() {

    const { state, dispatch } = useAuth()
    const [rooms, setRooms ] = useState([])

    useEffect(() => {
        const getUserData = async () => {
            await GetAllRoomsUserAction(dispatch)
        }
        getUserData()
    },[])

    useEffect(() =>{ 
        setRooms([...state.rooms])
    },[state])
  return (
    <AdminLayout>
        <section className="">
            <h1 className="text-sky-900 text-4xl">Habitaciones</h1>
            <article className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-10 mt-5">
                {
                    !rooms || rooms.length === 0 ? (
                        <h1>No hay rooms</h1>
                    ) : rooms.map( (room,i) => (
                        <Room 
                            key={i}
                            room={room}
                        />
                    ))
                }
            </article>
        </section>
        
    </AdminLayout>
  )
}
