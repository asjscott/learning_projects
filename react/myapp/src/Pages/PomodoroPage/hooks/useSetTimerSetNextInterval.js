import { useState } from "react"

export const useSetTimerSetNextInterval = () => {
    
    const [nextIntervals, setNextIntervals] = useState({
        current: "pomodoro",
        next: "short break",
        intervals: 4,
    })

    const [timer, setTimer] = useState(1500)

    const clock = `${((timer - timer%60)/60)}:${timer%60 < 10 ? `0${timer%60}` : timer%60}`

    const setNextIntervalNextTimer = ({current, next, interval, timing}) => {
        setNextIntervals({
            ...nextIntervals,
            current,
            next,
            interval
        })
        setTimer(timing)
    }

    return {
        nextIntervals,
        timer,
        clock,
        setNextIntervalNextTimer,
        setNextIntervals,
        setTimer
    }
}