import React, { useCallback, useEffect, useState } from 'react'
import PomodoroSettings from './PomodoroSettings'
import CodeLink from '../../components/CodeLink'
import { useSetTimerSetNextInterval } from './hooks/useSetTimerSetNextInterval'
import PomodoroButton from './pomodorButtons'

const PomodoroPage = () => {

    const intialSettings = {
        intervals: 4,
        pomoTime: 1500,
        shrtTime: 300,
        lngTime: 900,
    }

    const {
        nextIntervals,
        timer,
        clock,
        setNextIntervalNextTimer,
        setTimer
    } = useSetTimerSetNextInterval()

    const [timings, setTimings] = useState({
        pomoTime: intialSettings.pomoTime,
        shrtTime: intialSettings.shrtTime,
        lngTime: intialSettings.lngTime,
        intervals: intialSettings.intervals
    })

    const [intervalId, setIntervalId] = useState(null)

    const [isSettings, setIsSettings] = useState(false)

    const decrement = () => {
        setTimer(prev => prev - 1)
    }

    function handleStart() {
        if (intervalId === null) {
            setIntervalId(setInterval(decrement, 10))
        }
    }
    
    function handleStop() {
        clearInterval(intervalId)
        setIntervalId(null)
    }

    function handleReset() {
        setNextIntervalNextTimer({ current:"pomodoro", next:"short break", interval:intialSettings.intervals, timing:intialSettings.pomoTime})
        setTimings({
            pomoTime: intialSettings.pomoTime,
            shrtTime: intialSettings.shrtTime,
            lngTime: intialSettings.lngTime,
        })
        clearInterval(intervalId)
        setIntervalId(null)
    }

    function handleNames(e) {
        
        if (e.target.id === "short break") {
            setNextIntervalNextTimer({current:"short break", next:"pomodoro", timing:timings.shrtTime})
        } else if (e.target.id === "long break") {
            setNextIntervalNextTimer({current:"long break", next: "pomodoro", timing:timings.lngTime})
        } else {
            setNextIntervalNextTimer({current:"pomodoro", next:"short break", timing:timings.pomoTime})
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setTimings({
            pomoTime: (e.target.pomo.value * 60),
            shrtTime: e.target.shrt.value * 60, 
            lngTime: e.target.lng.value * 60,
            intervals: e.target.intervals.value
        })
        setNextIntervalNextTimer({current:"pomodoro" ,next:"short break", interval:e.target.intervals.value, timing:e.target.pomo.value*60})
        setIsSettings(false)
    }

    const nextInterval = useCallback(() => {
        if (nextIntervals.current === "pomodoro" && nextIntervals.intervals > 1) {
            setNextIntervalNextTimer({current:"short break", next:"pomodoro", interval:nextIntervals.intervals-1, timing:timings.shrtTime})
        }  else if (nextIntervals.current === "pomodoro" && nextIntervals.intervals === 1) {
            setNextIntervalNextTimer({current:"long break", next:"pomodoro", interval:timings.intervals, timing:timings.lngTime})
        } else if (nextIntervals.intervals > 1) {
            setNextIntervalNextTimer({current:"pomodoro", next:"short break", timing:timings.pomoTime})
        } else {
            setNextIntervalNextTimer({current:"pomodoro", next:"long break", timing:timings.pomoTime})
        }
    }, [nextIntervals, timings, setNextIntervalNextTimer])

    useEffect(() => {
        if (timer === 0) {
            nextInterval()
        }
    }, [timer, nextInterval])

    const red = nextIntervals.current === "pomodoro";
    const green = nextIntervals.current === "short break";
    const blue = nextIntervals.current === "long break"

    const settings = <PomodoroSettings intervals={nextIntervals.intervals} timings={timings} submit={handleSubmit} settings={() => setIsSettings(!isSettings)}/>

  return (
    <>

    <div className={`flex flex-col pb-48 p-4 items-center justify-center h-screen w-full text-slate-50 font-varela ${red ? "bg-red-400" : green ? "bg-teal-500" : "bg-sky-600"}`}>
    <div className="mb-10">
        <span className="text-2xl sm:text-6xl">Pomodoro Timer</span>
    </div>
        <div className={`flex flex-col items-center justify-center container max-w-sm sm:max-w-lg py-5 rounded-xl ${red ? "bg-red-300" : green ? "bg-teal-400" : "bg-sky-300"}`}>
            <div className='inline-flex justify-center space-x-4'>
                <span className={`${red ? "bg-red-900 font-bold" : ""} text-center px-3 rounded-md hover:cursor-pointer`} id="pomodoro" onClick={e => handleNames(e)}>Pomodoro</span>
                <span className={`text-center px-3 rounded-md hover:cursor-pointer ${green ? "bg-teal-600 font-bold" : ""} ` } id="short break" onClick={e => handleNames(e)}>Short Break</span>
                <span className={`text-center px-3 rounded-md hover:cursor-pointer ${blue ? "bg-sky-800 font-bold" : ""} `} id="long break" onClick={e => handleNames(e)}>Long Break</span>
            </div>
            <div className='flex justify-center mt-5 text-6xl sm:text-9xl text-center font-bold'>{clock}</div>
            <div className='grid grid-cols-2 sm:grid-cols-4 justify-between text-center mt-5 border-box px-5 w-full'>
                <PomodoroButton onClick={handleStart}>Start</PomodoroButton>
                <PomodoroButton onClick={handleStop}>Stop</PomodoroButton>
                <PomodoroButton onClick={handleReset}>Reset</PomodoroButton>
                <PomodoroButton onClick={()=>{setIsSettings(!isSettings)}}>Settings</PomodoroButton>
                </div>
        </div>
        <div className='mt-5'>
        <span>Intervals: {nextIntervals.intervals}</span>
        </div>
        {isSettings && settings}
        <CodeLink />
    </div>
    </>
  )
}

export default PomodoroPage