"use client";
import { useState } from "react";
import { useAuth } from "@/context/Auth/AuthProvider";
import HomeLayout from "@/components/layouts/HomeLayout";
import Image from 'next/image'
import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import { RegistrationAction } from "@/context/Auth/Infrastructure/redux/AuthActions";
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useAuth();
  const { loading, error } = state;

  const handleRegistered = async (e) => {
    e.preventDefault();
    if ([email, password].includes(""))
      return alert("Todos los campos son requeridos");
    
    const response = await RegistrationAction(dispatch, { email, password });
    if(response) {
      setTimeout(() => {
        window.location.href = '/login'
      }, 1500);
    }
  };
  return (
    <HomeLayout>
        <FullScreenLoader loading={loading} />
      <main className={`flex items-center lg:mx-20`}>
        <form className="flex flex-col mt-20 lg:mt-0 gap-3 w-full mx-5 lg:mx-0 lg:w-1/3" onSubmit={handleRegistered}>
          <label className="text-6xl font-bold  text-blue-950 " htmlFor="email">Registro</label>
          {error && (
            <p className="text-red-500 text-lg font-semibold">{error}</p>
          )}
          {/* <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-md  text-gray-700 font-semibold"
          /> */}
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-md  text-gray-700 font-semibold"
          />
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-md  text-gray-700 font-semibold"
          />
          <button
            type="submit"
            className="p-4 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-md  font-semibold"
          >
            Registrarse
          </button>
          {
            // ya tienes cuenta, inicia sesion
          }
 <p className="text-center text-gray-700 font-semibold">¿Ya tienes cuenta? <Link href="/login" className="text-blue-500">Inicia sesion</Link></p>
          
        </form>

         <section
          className="lg:flex hidden justify-end mt-5 w-2/3"
         >
         <Image 
            src="/supereco.png" 
            width={1200} 
            height={1200} 
            alt="/eco.png" 
            className="object-cover rounded-full w-[550px] h-[550px] mr-20 floating "
          />
         </section>
      </main>
    </HomeLayout>
  );
}
