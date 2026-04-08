import React from 'react'
import { IoIosChatboxes } from "react-icons/io";

export const RightSideTemp = () => {
  return (
    <>
        <div className='flex-1 flex flex-col justify-center items-center  '>
            <IoIosChatboxes size={100} className='text-purple-600'/>
            <h1 className='text-5xl font-bold'>Welcom to Dev<span className='text-purple-600'>Talk</span></h1>
            <p className='text-xl font-semibold text-gray-400'>select a conversation from  </p>
            <p className='text-xl font-semibold text-gray-400'>the left to start chatting  </p>
        </div>
    </>
  )
}
