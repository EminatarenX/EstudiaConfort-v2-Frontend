"use client";
import { useAuth } from "@/context/Auth/AuthProvider";
import { LoginAction } from "@/context/Auth/Infrastructure/redux/AuthActions";
import { useState } from "react";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import HomeLayout from "@/components/layouts/HomeLayout";
import { useRouter } from "next/navigation";

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
      <main className={`flex justify-center items-center mt-60`}>
        <form className="flex flex-col gap-3" onSubmit={handleClick}>
          {error && (
            <p className="text-red-500 text-lg font-semibold">{error}</p>
          )}
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-md w-80 h-10 text-lg text-gray-700 font-semibold"
          />
          <input
            type="password"
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-md w-80 h-10 text-lg text-gray-700 font-semibold"
          />
          <button
            type="submit"
            onClick={handleClick}
            className="p-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-md w-80 h-10 text-lg font-semibold"
          >
            Login
          </button>
        </form>
      </main>
    </HomeLayout>
  );
}
