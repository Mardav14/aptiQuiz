import React from 'react'
import { useState, useRef, useEffect} from 'react'

const Testt = () => {
    const [timer, setTimer] = useState("00:00:04")
    const [displayTime, setDisplayTime] = useState("")
    const ref = useRef()


    const getTimeRemaining = (e)=>{
        const total = Date.parse(e) - Date.parse(new Date())
        const hours = Math.floor((total / 1000 / 60 / 60) % 24)
        const minutes = Math.floor((total / 1000 / 60) % 60)
        const seconds = Math.floor((total / 1000) % 60)
        return {total, hours, minutes, seconds}
    }
    
    function startTimer(e){
        let{total, hours, minutes, seconds} = getTimeRemaining(e)
        if(total >= 0){
            setDisplayTime(
                seconds
    
            )
        }
        
    }
    const clearTimer = (e)=>{
        
        if(ref.current) clearInterval(ref.current)
            const id = setInterval(()=>{
                startTimer(e)
            }, 1000)
            ref.current = id;
        
    }
    const getSeconds = (timer)=>{
        let arr = timer.split(":")
        let arr_int = []
        let i = 0;
        arr.forEach((e)=>{
            arr_int[i] = parseInt(e)
            i++
        })
        return arr_int
    }
    const getDeadTime = ()=>{
        let deadline = new Date();
        let [hours,minutes, seconds] = getSeconds(timer)
        deadline.setSeconds(deadline.getSeconds() + seconds)
        deadline.setMinutes(deadline.getMinutes() + minutes)
        deadline.setHours(deadline.getHours() + hours)
        
        return deadline;
    }
    
    useEffect(()=>{
        if(timer)
            clearTimer(getDeadTime())
    }, [timer])
  return (
    <div>
        <br/><br/>
      {displayTime}
    </div>
  )
}

export default Testt
