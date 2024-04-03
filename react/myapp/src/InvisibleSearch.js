import React, { useState } from 'react'
import {FaSearch} from 'react-icons/fa'

const InvisibleSearch = () => {

    const [showInput, setShowInput] = useState(false)
    const [bgColor, setBgColor] = useState('bg-stone-50')

    const handleClick = e => {
        if (!showInput) {
            setBgColor('bg-stone-900');
            setShowInput(true)
        } else {
            setBgColor('bg-stone-50');
            setShowInput(false)

        }
    }

    return (

        <div className={`flex flex-wrap justify-center content-center h-screen w-screen transition ease-in-out duration-300 ${bgColor}`}>
                <input placeholder='Search...' autoFocus id='input' className={` ${showInput ? "opacity-100 w-2/6" : "opacity-0 w-0" } transition-all border-solid border-2 border-stone-50 p-3 h-10 text-slate-50 bg-stone-900`}></input>
                <FaSearch onClick={handleClick} id='search' className={` ${showInput ? "text-slate-50 ml-3" : "text-slate-900" } transition text-3xl`}/>
                
        </div>

    )
}

export default InvisibleSearch