
import React from 'react'
import Home from '@/components/icons/Home'
import Settings from '@/components/icons/Settings'
import Logout from '@/components/icons/Logout'

export default function AdminLayout({children}) {
  return (
  <div className='flex h-screen w-full'>
        <aside className='w-[100px] h-full border-r border-slate-200 flex flex-col items-center justify-center py-10 gap-20 '>
                <Home classNameRendered={'w-10 h-10'}/>
                <Settings classNameRendered={'w-10 h-10'}/>
                <Logout
                  classNameRendered={'w-10 h-10'}
                />
        </aside>
        <main
            className='w-full overflow-y-auto scrollbar-hide mx-10 py-10'
        >
             {
                children
            }

        </main>
    </div>
  )
}
