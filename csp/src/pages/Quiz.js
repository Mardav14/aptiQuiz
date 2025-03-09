import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import QuizResult from './QuizResult';
import './Quiz.css';
import Button from 'react-bootstrap/Button';



const Quiz = () => {
    const params = useParams()
    const title = params.title
    const [quizData, setQuizData] = useState()
    const [answers, setAnswers] = useState([])
    const [heading, setHeading] = useState()
    const [currentQuestion,setCurrentQuestion]=useState(0);
    const [attempted, setAttempted] = useState([])
    const [clickedOption,setClickedOption]=useState(0);
    const [showResult,setShowResult]=useState(false);
    const [timer, setTimer] = useState()
    const [displayTime, setDisplayTime] = useState("")
    const ref = useRef()

    let getQuestions = async ()=>{
        let response = await fetch("http://127.0.0.1:8000/api/questions", {
            method : "POST",
            headers : {
                "Content-Type": "application/json" 
            },
            body : JSON.stringify({'url': title}),

        })
        let data = await response.json()
        if(response.status === 200){
            
            setQuizData(data.questions)
            setHeading(data.title)
            setTimer(data.duration)
            setAttempted([])
            console.log(data.questions)
            
            let newAttempted = new Array(data.questions.length).fill(-1);;
            setAttempted(newAttempted)
           
           
        }
        else{
            alert("Something went wrong")
        }
        
    }
    
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
                (hours > 9 ? hours : "0" + hours)+ ":"+
                (minutes > 9 ? minutes : "0" + minutes)+ ":"+
                (seconds > 9 ? seconds : "0" + seconds)
    
            )
        }
        else{
            setShowResult(true)
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
        getQuestions()
    }, [])
    useEffect(()=>{
        if(timer)
            clearTimer(getDeadTime())
    }, [timer])
    //Quiz code
    const submit = ()=>{
            if(clickedOption !== 0){
                let newAttempted = attempted.map((e, i)=>{
                    if( i === currentQuestion)
                        return clickedOption
                    else
                        return e
                })
                setAttempted(newAttempted)
            }
            
        
        setShowResult(true)
    }
    const changeQuestion = (i)=>{
        updateScore();
        if(i< quizData.length-1 ){
            setCurrentQuestion(i+1);
            if(attempted[i+1] > 0){
                setClickedOption(attempted[i+1])
            }
            else
                setClickedOption(0);
        }
    }
    const updateScore=()=>{
        let newAttempted = attempted.map((e, i)=>{
            if( i === currentQuestion)
                return 0
            else
                return e
        })
        setAttempted(newAttempted)
        
        if(clickedOption !== 0){
            let newAttempted = attempted.map((e, i)=>{
                if( i === currentQuestion)
                    return clickedOption
                else
                    return e
            })
            setAttempted(newAttempted)
        }
        
    }

    const resetAll=()=>{
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setDisplayTime("")
        clearTimer(getDeadTime())
        let newAttempted = new Array(quizData.length).fill(-1);
        setAttempted(newAttempted)
    }
  return (
   
    <div className='quizBody'>
         <br/><br/><br/><br/>
        
            {showResult ? (
                <QuizResult attempted={attempted} totalScore={quizData.length} tryAgain={resetAll} answers = {answers}/>
            ):(
            <>
            <div className="containerQuiz">
            <h1 className='baseText'>{heading}</h1>
            <div className='p-20' >
            <br/><h3 className='baseText'>{displayTime}</h3><br/>
      
    
    </div>
            {quizData? ( <div className="question">
                <div style={{display:"inline"}}>
                <span id="question-number">{currentQuestion+1}. </span>
                <span id="question-txt">{quizData[currentQuestion].question}</span>
                </div>
            </div>):null}
           
            <div className="option-container">
                {quizData && quizData[currentQuestion].options.map((option,i)=>{
                    return(
                        <button 
     
                        className={`option-btn ${
                            clickedOption === i+1? "checked" : "option-btn-hover"
                        }`}
                        key={i}
                        onClick={()=>{
                            if(clickedOption === i+1){
                                setClickedOption(0)
                            }
                            else
                                setClickedOption(i+1)
                            }}
                        >
                        {option}
                        </button>
                    )
                })}                
            </div>
            <div >
            <Button variant="primary" id="next-button" onClick={()=>{changeQuestion(currentQuestion)}} style={{"fontFamily":"Arial", "backgroundColor":"rgb(68, 20, 90)", position:"relative", left:"50px", top:"0px"}}>Next</Button>
  
            <Button variant="primary" id="next-button" onClick={()=>{submit()}} style={{"fontFamily":"Arial", backgroundColor:"rgb(69, 64, 128)", position:"relative", left:"450px", top:"0px"}}>Submit</Button>
   
            </div>
            </div>
            <div style={{display:"flex", flexDirection: "column", margin:"20px", flexWrap:"wrap", maxHeight:"550px"}}>

        
            {attempted.map((e, i)=>{
                if(i === currentQuestion){
                    return (<li className = "baseText questionsTiles current" onClick={()=>{changeQuestion(i-1)}} > {i+1}</li>)
                }
                else if(e === 0){
                    return (<li className = "baseText questionsTiles attempted" onClick={()=>{changeQuestion(i-1)}} > {i+1}</li>)
                }
                else if(e === -1)
                return (<li className = "baseText questionsTiles notAttempted" onClick={()=>{changeQuestion(i-1)}} > {i+1}</li>)
                else
                return (<li className = "baseText questionsTiles marked" onClick={()=>{changeQuestion(i-1)}} > {i+1}</li>)

            })}
            </div>
            
            </>)}
       
        
    </div>
  )
}

export default Quiz