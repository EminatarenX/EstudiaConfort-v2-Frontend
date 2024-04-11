import {useState} from 'react'
import { createRoomAction } from '@/context/Auth/Infrastructure/redux/AuthActions'
import { useAuth } from '@/context/Auth/AuthProvider'

export default function ModalNewRoom({isOpen, onClose}) {
    const [ name , setName ] = useState('')
    const [ topic , setTopic ] = useState('')
    const [ topic_salida , setTopicSalida ] = useState('')  
    const { dispatch } = useAuth()

    const handleSave = (e) => {
        e.preventDefault()
        const payload = { name, topic, topic_salida }
        const response = createRoomAction(dispatch, payload)
        if(response) {
            onClose()
            setName('')
            setTopic('')
            setTopicSalida('')
        }
    }

  return isOpen && (

    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
        <form
            onSubmit={handleSave}
            className="bg-white p-10 rounded-lg relative w-4/5 lg:w-1/3"
        >
            
            <h1 className="text-2xl text-center">Nueva habitación</h1>
            <div className="mt-5">
                <label className="block text-sm text-sky-950 font-semibold">nombre</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 outline-none"
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="mt-5">
                <label className="block text-sm text-sky-950 font-semibold">canal de entrada</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 outline-none"
                    onChange={e => setTopic(e.target.value)}
                />
            </div>
            <div className="mt-5">
                <label className="block text-sm text-sky-950 font-semibold">canal de salida</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 outline-none"
                    onChange={e => setTopicSalida(e.target.value)}
                />
            </div>


            <div className="mt-5">
                <input
                    type='submit'
                    value = "Guardar"
                    className="bg-blue-500 text-white px-5 py-2 rounded-md w-full font-semibold cursor-pointer"
                />
                <button
                className=" bg-rose-500 text-white px-5 py-2 rounded-md w-full font-semibold mt-5"
                onClick={onClose}
            >
                Cancelar
            </button>
            </div>


        </form>

    </div>
  )
}
