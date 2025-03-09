import React from 'react'
import { useState, useEffect } from 'react'
function QuizResult(props) {
  let [score, setScore] = useState(0)
  let [Qattempted, setQAttempted] = useState(0)
  let [answered, setAnswered] = useState(0)
  const findScore = (attempted)=>{
    let newScore = 0
    let newQAttempted = 0
    let newAnswered = 0
    attempted.forEach((e, i)=>{

      if(e === props.answers[i])
        newScore = newScore + 1;
      if(e != -1)
        newQAttempted = newQAttempted + 1;
      if(e >0)
        newAnswered = newAnswered + 1;
    })
    setScore(newScore)
    setAnswered(newAnswered)
    setQAttempted(newQAttempted)
  }
  useEffect(()=>{
    findScore(props.attempted)
  }, [])
  return (
    <div className='containerQuiz' style={{width: "50%"}}>
    <h1 className='baseText'>RESULT</h1>
    <div className='show-score'>
      <table>
      <tr>
      <th style={{textAlign:"left"}}>Your Score: </th>
      <td style={{textAlign:"right"}}>{score}/{props.totalScore}</td>
      </tr>
      <tr>
      <th style={{textAlign:"left"}}>Questions Attempted: </th>
      <td style={{textAlign:"right"}}>{Qattempted}</td>
      </tr>
      <tr>
      <th style={{textAlign:"left"}}>Questions Answered:</th>
      <td style={{textAlign:"right"}}>{answered}</td>
      </tr>
      <tr>
      <th style={{textAlign:"left"}}>Accuracy for answered:</th>
      <td style={{textAlign:"right"}}>{Number.parseFloat((score/answered)*100).toFixed(1)}%</td>
      </tr>
      <tr>
        <th style={{textAlign:"left"}}>Accuracy for attempted:</th>
        <td style={{textAlign:"right"}}>{Number.parseFloat((score/Qattempted)*100).toFixed(1)}%</td>
        </tr></table>
        <br/>
         
    </div>
    <br/>
    <button id="next-button" onClick={props.tryAgain} style={{"fontFamily":"Arial", "backgroundColor":"rgb(68, 20, 90)", width:"200px"}}>Try Again</button>
    <br/>
    </div>
  )
}

export default QuizResult