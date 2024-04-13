"use client";
import { useAuth } from "@/context/Auth/AuthProvider";
import { LoginAction } from "@/context/Auth/Infrastructure/redux/AuthActions";
import { useState } from "react";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import HomeLayout from "@/components/layouts/HomeLayout";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { state, dispatch } = useAuth();
  const { loading, error } = state;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleClick = async (e) => {
    e.preventDefault();
    if ([email, password].includes(""))
      return alert("Todos los campos son requeridos");

    const data = await LoginAction(dispatch, { email, password });
    if(!data) return

    setTimeout(() => {
      router.push('/dashboard')
    }, 2000);
  };

  return (
    <HomeLayout>
      <FullScreenLoader loading={loading} />
      <main className={`flex items-center lg:mx-20`}>
        <form className="flex flex-col mt-20 lg:mt-0 gap-3 w-full mx-5 lg:mx-0 lg:w-1/3" onSubmit={handleClick}>
          <label className="text-6xl font-bold  text-blue-950 " htmlFor="email">Iniciar sesión</label>
          {error && (
            <p className="text-red-500 text-lg font-semibold">{error}</p>
          )}
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-md  text-gray-700 font-semibold"
          />
          <input
            type="password"
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-md  text-gray-700 font-semibold"
          />
          <button
            type="submit"
            onClick={handleClick}
            className="p-4 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-md  font-semibold"
          >
            Login
          </button>
          {
            // no tienes cuenta, registrate
          }
          <p className="text-center text-gray-700 font-semibold">¿No tienes cuenta? <Link href="/registration" className="text-blue-500">Registrate</Link></p>
        </form>

         <section
          className="lg:flex hidden justify-end mt-5 w-2/3"
         >
         <Image 
            src="/house-xl.png" 
            width={800} 
            height={800} 
            alt="/hero.png" 
            className="object-contain appear"
          />
         </section>
      </main>
    </HomeLayout>
  );
}
