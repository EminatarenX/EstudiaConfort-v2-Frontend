import {useState} from 'react'
import { useAuth } from '@/context/Auth/AuthProvider'
import { editRoomAction } from '@/context/Auth/Infrastructure/redux/AuthActions'

export default function EditModal({isOpen, onClose, room}) {
    const [name, setName] = useState(room.name)
    const [topic, setTopic] = useState(room.topic)
    const [salida, setSalida] = useState(room.topic_salida)
    const {dispatch} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            name,
            topic,
            topic_salida: salida,
            roomId: room.id
        }
        const response = await editRoomAction(dispatch, payload)
        if(response) {
            onClose()
            setName('')
            setTopic('')
            setSalida('')
            return
        }

    }
  return isOpen && (
    
    <section
        className='position fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'
    >
        <form 
            onSubmit={handleSubmit}
            className='bg-white p-10 rounded-lg w-4/5 lg:w-1/3  m-auto appear relative'
        >
            <button onClick={onClose} className='absolute top-0 font-bold m-2 right-0 h-8 w-8 rounded bg-rose-500 text-white'>X</button>
            <h2 className='text-2xl text-sky-950 font-bold text-center'>Editar</h2>
            <div>
                <label className="text-sm font-semibold text-blue-950" htmlFor="name">nombre</label>
                <input 
                    type="text" 
                    id="name" 
                    className='w-full border border-gray-300 rounded-lg p-2 outline-none' 
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div>
                <label className="text-sm font-semibold text-blue-950" htmlFor="topic">canal de entrada</label>
                <input 
                    type="text" 
                    id="topic" 
                    className='w-full border border-gray-300 rounded-lg p-2 outline-none' 
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                />
            </div>
            <div>
                <label className="text-sm font-semibold text-blue-950" htmlFor="salida">canal de salida</label>
                <input 
                    type="text" 
                    id="salida" 
                    className='w-full border border-gray-300 rounded-lg p-2 outline-none' 
                    value={salida}
                    onChange={e => setSalida(e.target.value)}
                />
            </div>
            <input type="submit" value="Guardar" className='w-full bg-blue-500 text-white rounded-lg p-2 mt-5 cursor-pointer' />


        </form>


    </section>
  )
}
