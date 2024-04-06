"use client";
import { useState } from "react";
import { useAuth } from "@/context/Auth/AuthProvider";

import HomeLayout from "@/components/layouts/HomeLayout";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { state, dispatch } = useAuth();
  const { loading, error } = state;

  const handleRegistered = async (e) => {
    e.preventDefault();

  };
  return (
    <HomeLayout>
      <main className={`h-screen flex justify-center items-center`}>
        <form className="flex flex-col gap-3" onSubmit={handleRegistered}>
          {error && (
            <p className="text-red-500 text-lg font-semibold">{error}</p>
          )}
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-md w-80 h-10 text-lg text-gray-700 font-semibold"
          />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-md w-80 h-10 text-lg text-gray-700 font-semibold"
          />
          <input
            type="password"
            placeholder="****"
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-md w-80 h-10 text-lg text-gray-700 font-semibold"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-md w-80 h-10 text-lg font-semibold"
          >
            Login
          </button>
        </form>
      </main>
    </HomeLayout>
  );
}
