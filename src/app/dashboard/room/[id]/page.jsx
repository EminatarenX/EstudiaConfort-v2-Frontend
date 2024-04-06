"use client";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useAuth } from "@/context/Auth/AuthProvider";
import { GetRoomInfoAction, WaterInterruptorAction } from "@/context/Auth/Infrastructure/redux/AuthActions";
import { useEffect, useState } from "react";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import Chart from "@/components/chart/Chart";
let data = [
  { time: 0, value: 0 }
];

export default function Page({ params }) {
  const { state, dispatch } = useAuth(); const [room, setRoom] = useState(null);
  const [sensores, setSensores] = useState({
    agua: 0,
    gas: 0,
    movimiento: 0,
  })
  const [dataReal, setDataReal] = useState([{ time: 0, value: 0 }]);

  const handleWaterInterruptor = async () => {
    let payload = []
    if (room.water) {
      payload = { water_bomb: 0 }
    } else {
      payload = { water_bomb: 1 }
    }

    await WaterInterruptorAction(dispatch, params.id, payload);
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
      for (let i = 0; i < 10; i++) {
        data.push({ time: data.length, value: Math.random() * 100 });
      }

      setDataReal([...data]);


    }
    console.log(state.room)
  }, [state]);
  useEffect(() => {
    if (room) {
      const interval = setInterval(() => {
        setSensores({
          agua: (Math.random() * 100).toFixed(2),
          gas: (Math.random() * 100).toFixed(2),
          movimiento: (Math.random() * 100).toFixed(2),
        });

      }, 2000);
    }
  }, [room])
  return (
    <AdminLayout>
      <section className="flex gap-10">
        {room && (
          <>
            <div className=" w-full ">
              <div className="flex justify-center">
                <img src="/room-s.png" className="max-h-[600px] " alt="room" />
              </div>
              <p className="text-center text-4xl">{room.name}</p>
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
                <Chart initialDataChart={dataReal} />
              </article>
              <article className="relative">
                <h2 className="text-2xl text-center">Actividad</h2>
                <Chart initialDataChart={dataReal} />
              </article>
              <section>
                <h2 className="text-2xl text-center mb-2">Sensores en tiempo real</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-2xl">Agua <span className="font-semibold text-slate-400">hoy:</span></p>
                    <p className="text-lg">{sensores.agua}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-2xl">Gas</p>
                    <p className="text-lg">{sensores.gas === 0 ? 'No se detecta gas' : 'Gas detectado'}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-2xl">Presencia</p>
                    <p className="text-lg ">{sensores.movimiento === 0 ? 'No se detecta movimiento' : 'Movimiento detectado'}</p>
                  </div>
                </div>
              </section>

            </section>
          </>
        )}
      </section>
      {!room && <FullScreenLoader />}
    </AdminLayout >
  );
}
