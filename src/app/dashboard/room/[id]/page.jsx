"use client";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useAuth } from "@/context/Auth/AuthProvider";
import { GetRoomInfoAction, WaterInterruptorAction, deleteRoomAction } from "@/context/Auth/Infrastructure/redux/AuthActions";
import { useEffect, useState } from "react";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import EditIcon from "./EditIcon";
import Chart from "@/components/chart/Chart";
import EditModal from "./EditModal";

let data = [
  { time: 0, value: 0 }
];

export default function Page({ params }) {
  const { state, dispatch } = useAuth(); const [room, setRoom] = useState(null);
  
  const [ultrasonicData, setUltrasonicData] = useState([{ time: 0, value: 0 }]);
  const [ waterData, setWaterData ] = useState([{ time: 0, value: 0 }]);
  const [editModal, openEditModal] = useState(false);

  const handleWaterInterruptor = async () => {
    let payload = []
    if (room.water) {
      payload = { water_bomb: 0 }
    } else {
      payload = { water_bomb: 1 }
    }

    await WaterInterruptorAction(dispatch, params.id, payload);
  }

  const handleEditRoom = () => {
    openEditModal(true)
  }

  const handleEliminar = () => {
    if (confirm("¿Estás seguro de eliminar esta habitación?")) {
      const result = deleteRoomAction(dispatch, params.id);
      if (result){
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      }else{
        alert('No se pudo eliminar la habitación')
      }

    }
  }


  useEffect(() => {
    const getRoomData = async () => {
      await GetRoomInfoAction(dispatch, params.id);
    };
    getRoomData();

  }, []);

  useEffect(() => {
    setRoom(state.room);
    if (state.room) {
      // for (let i = 0; i < 10; i++) {
      //   data.push({ time: data.length, value: Math.random() * 100 });
      // }

      setWaterData([...waterData, { time: waterData.length, value: state.sensors.waterFlow}])

      setUltrasonicData([...ultrasonicData, { time: ultrasonicData.length, value: state.sensors.ultrasonic }]);


    }
  }, [state]);
 
  return (
    <>    
      {room && <EditModal isOpen={editModal} onClose={() => openEditModal(false)} room={room} />}
    <AdminLayout>
      <section className="flex gap-10 lg:flex-row flex-col">
        {room && (
          <>
            <div className=" w-full ">
              <div className="flex justify-center">
                <img src="/room-s.png" className="max-h-[600px] " alt="room" />
              </div>
              <p className="text-center text-4xl relative">{room.name}<button onClick={handleEditRoom} className="absolute top-0 right-0 "><EditIcon/></button></p>
              <div>
                <button type="button"
                  onClick={handleWaterInterruptor}
                  className={`py-5 mt-5 text-xl w-full rounded ${room.water ? "bg-rose-500" : "bg-blue-500"} text-white`}>
                  {
                    room.water ? 'Cerrar llave de paso' : 'Abrir llave de paso'
                  }
                </button>
              </div>
            </div>

            <section className="flex flex-col gap-5 w-full">
              <article className="relative">
                <h2 className="text-2xl text-center">Consumo de agua</h2>
                <Chart initialDataChart={waterData} />
              </article>
              <article className="relative">
                <h2 className="text-2xl text-center">Actividad</h2>
                <Chart initialDataChart={ultrasonicData} />
              </article>
              <section>
                <h2 className="text-2xl text-center mb-2">Sensores en tiempo real</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-2xl">Agua <span className="font-semibold text-slate-400">hoy:</span></p>
                    <p className="text-sm">{state.sensors.waterFlow}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-2xl">Gas</p>
                    <p className="text-sm">{state.sensors.gas == 0 ? 'No se detecta gas' : 'Gas detectado'}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-2xl">Presencia</p>
                    <p className="text-sm ">{state.sensors.ultrasonic === 0 ? 'No se detecta movimiento' : 'Movimiento detectado'} a {state.sensors.ultrasonic} cm </p>
                  </div>
                </div>
              </section>
              <section>
                <button onClick={handleEliminar} className="py-5 text-white text-xl w-full rounded bg-rose-500 ">Eliminar habitación</button>
              </section>

            </section>
          </>
        )}
      </section>
      {!room && <FullScreenLoader />}
    </AdminLayout >
    </>

  );
}
