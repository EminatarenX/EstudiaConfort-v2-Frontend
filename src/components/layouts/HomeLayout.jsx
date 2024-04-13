import React from 'react'
import Link from 'next/link'
export default function HomeLayout({children}) {
  return (
    <main className="p-10 h-screen  bg-slate-200">

    <header className='flex justify-between items-center bg-white rounded-t-3xl'>
        <Link href={'/'} className='text-2xl px-5 py-5 lg:px-10 font-semibold text-sky-950'>Aqua<span className='text-blue-500'>Care</span></Link>
        <nav className='flex gap-5 px-5 py-5'>
            <Link className='h-12 w-40 border border-sky-100 flex justify-center items-center  transition-all text-sky-800 rounded-3xl font-semibold' href={'/login'}>Iniciar sesion</Link>
            <Link className='h-12 w-40 bg-sky-100 flex justify-center items-center text-sky-400 transition-all rounded-3xl font-semibold' href={'/registration'}>Registro</Link>
        </nav>
    </header>
    <div className='bg-white rounded-b-3xl overflow-scroll scrollbar-hide h-[80svh] max-h-[80svh]'>
        {children}
        <footer className='flex justify-center items-center bg-white py-20'>
            <p className='text-gray-400'>AquaCare &copy; 2021</p>
        </footer>
    </div>
    </main>
  )
}
