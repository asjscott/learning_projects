import { useEffect, useState } from "react"
import React from 'react'

const DrumMachine = () => {

    const drums = [
        {
            id: "Heater-1",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
            key: "Q"
        },
        {
            id: "Heater-2",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
            key: "W"
        },
        {
            id: "Heater-3",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
            key: "E"
        },
        {
            id: "Heater-4",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
            key: "A"
        },
        {
            id: "Clap",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
            key: "S"
        },
        {
            id: "Open-HH",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
            key: "D"
        },
        {
            id: "Kick-n'-Hat",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
            key: "Z"
        },
        {
            id: "Kick",
            src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
            key: "X"
        },
        {
            id: "Closed-HH",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
            key: "C"
        }
    ]

    const [displayValue, setDisplayValue] = useState(" ")

    const playSound = (e) => {
        const key = (e.target.innerText)
        let sound = document.getElementById(key)
        sound.play()
        setDisplayValue(e.target.id)
    }

    const playSoundKey = (e) => {
        const keypressed = e.toUpperCase()
        let drum = drums.filter((d) => d.key === keypressed)
        if (drum.length > 0) {
            let sound = document.getElementById(keypressed)
            sound.play()
            setDisplayValue(drum[0].id)
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", e => playSoundKey(e.key))
    })

  return (
    <div className='flex justify-center items-center h-screen bg-gray-400'>
    <div className="block relative outline outline-4 outline-orange-600 text-center bg-slate-300" style={{width: "660px"}} id="drum-machine">
        <div className='inline-block m-5' style={{width:"332px", height:"272px"}} id="pad-bank">
            {drums.map((d) => {return <>
                <div className="drum-pad relative float-left mt-2.5 mr-2.5 rounded-md pt-8 border-box cursor-pointer bg-gray-500 shadow-md shadow-black" id={d.id} style={{width: "100px", height: "80px"}} onClick={e => playSound(e)}>
                    <audio className="clip" id={d.key} src={d.src}></audio>
                    {d.key}
                </div>
                </>
            })}

        </div>
        <div id="controls" className='inline-block mt-10 mr-5 ml-2.5 items-center align-top' style={{width: "240px", height: "272px"}}>
            <p className='flex flex-wrap justify-center content-center bg-gray-400 my-4 mx-auto p-4 border-box' id="display">{displayValue}</p>
        </div>
    </div>
    </div>
  )
}

export default DrumMachine