import React from 'react'
import AuthContext from '../context/AuthContext'
import { useEffect, useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import TextTruncate from 'react-text-truncate'; 
//bootstrap imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
const HomePage = () => {
  let {user} = useContext(AuthContext)
  console.log(user.username)
  let [tests, setTests] = useState()
  let getTests = async ()=>{
    let response = await fetch("https://aptiquiz-backend.onrender.com/api/tests", {
        method : "GET",
        headers : {
          "Content-Type": "application/json" 
      }
        })
    let data = await response.json() 
    setTests(data)
    
    
  }

  useEffect(()=>{
    getTests()
   
  }, [])
  
  return (
    <>
    <br/><br/><br/><br/>
    <h1 className='baseText' style={{fontSize:"180%", marginLeft:"30px"}}>hey, {user.username} lets start studying,</h1>
    {tests && tests.map((test) =>{
      let url = `/quiz/${test.url}`
      let num = Object.keys(test.questions).length
      console.log(url)
      return(
        <Card style={{ width: '18rem' , float:"left", margin:"30px"}}>
        <Card.Img variant="top" src={test.image_url} width = "100px" height = "180px"/>
        <Card.Body>
          <Card.Title>{test.title}</Card.Title>
          <Card.Text>
          <TextTruncate
            line={3}
            element="span"
            truncateText="…"
            text={test.desc}/>
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Duration:  {test.duration}</ListGroup.Item>
          <ListGroup.Item>No. of Questions: {num}</ListGroup.Item>
        </ListGroup>
        <Card.Body style= {{display: "flex", "align-items": "center"}}>
        <Link to = {url}><Button variant="primary" >Take Test</Button></Link>
        </Card.Body>
      </Card>)
    })}
    </>
  );
  
    
}

export default HomePage
