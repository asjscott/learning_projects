import React from 'react'
import DarkModeSwitch from './DarkModeSwitch'

const Darkside = () => {
  return (
    <div className="flex justify-center h-screen dark:bg-slate-900">
        <div className="absolute top-3 right-3">
            <DarkModeSwitch />
        </div>
        <div className='flex items-center text-7xl dark:text-amber-500'>
            <span className="font-tilt">My DarkMode Page.</span>
        </div>
    </div>
  )
}

export default Darkside