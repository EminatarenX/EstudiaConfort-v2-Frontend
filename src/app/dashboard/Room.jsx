import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Room({room}) {
  return (
    <div
      className='flex flex-col gap-2 p-2 shadow-lg'
    >

      <Image
        width={500}
        height={500}
        src={'/room-s.png'}
        alt={`roomImate-${room.name}`}
        className='object-cover w-full'
        priority
      />  

      <div className=''>
        <Link href={`/dashboard/room/${room.id}`}>
          <h3 className='text-center text-lg text-neutral-600'>{`${room?.name ? room.name : 'undefined'}`}</h3>
        </Link>

          <div className='flex justify-between'>
            <div>
              <span className='text-neutral-600 text-sm tracking-wider'>gas: {room.energy ? "on": "off"}</span>
            </div>
            <div>
              <span className='text-neutral-600 text-sm tracking-wider'>water: {room.water ? "on": "off"}</span>
            </div>
          </div>
          <div className='flex justify-center'> 
            <span className='text-neutral-600 text-sm tracking-wider flex items-center'>
              {
                room.user ? (
                  <div className={'bg-green-500 w-3 h-3  rounded-full mr-1'}></div> 
                ) : (
                  <div className='bg-neutral-600 w-2 h-2  rounded-full mr-1'></div>
                )
                
              }
              user: {room.user ? "on": "off"}</span>
             
          </div>
      </div>
      
    </div>
  )
}
