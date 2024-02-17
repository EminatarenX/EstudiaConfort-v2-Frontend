import React from 'react'
import Link from 'next/link'
export default function HomeLayout({children}) {
  return (
    <>
    <header className='p-3 flex justify-between items-center'>
        <Link href={'/'} className='text-2xl px-5 font-semibold text-sky-950'>Estudia<span className='text-sky-500'>Confort</span></Link>
        <nav className='flex gap-5 px-5'>
            <Link className='px-14 py-4 border border-white hover:border-blue-500 transition-all rounded-xl' href={'/login'}>Login</Link>
            <Link className='px-14 py-4 bg-blue-500 hover:bg-blue-800 text-white transition-all rounded-xl' href={'/login'}>Login</Link>
            {/* <Link className='px-5 py-4 bg-blue-500 hover:bg-blue-800 text-white transition-all rounded-xl' href={'/registration'}>Registro</Link> */}
        </nav>
    </header>

    <div className=''>
        {children}
    </div>
    </>
  )
}
