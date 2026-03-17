import React from 'react'
import {useState} from "react"
import { LeftSide } from './LeftSide'
import { Rightside } from './Rightside'

export const Body = () => {
  return (
    <>
        <div className='grid grid-cols-[2fr_7fr] h-screen  '>
            <div  className='bg-white z-10'>
              <LeftSide />
            </div>
            <div className='bg-gray-200 '>
              <Rightside/>
            </div>

        </div>
    </>
  )
}
