import React from 'react'
import image from '../pages/img.jpg';
import { Footer } from '../components/Footer';
import {Link} from 'react-router-dom'
//bootstrap imports
import Button  from 'react-bootstrap/Button';


const OnBoarding = () => {
  
  return (
    <>
    <div>
      <h1 className='mainText'>ENHANCE YOUR APTITUDE SKILLS</h1>
      <div style={{"display": "flex","justifyContent": "center"}}>
     <Link to='/login'> <Button  className='signUpButton' variant="outline-light"><h2 className='signUpText'>Login</h2></Button></Link>
     <Link to='/register'> <Button  className='signUpButton' variant="outline-light"><h2 className='signUpText'>Sign Up</h2></Button></Link>
      </div>
      <img className='mainImg' src = {image}  alt="mainImg" width = "100%" />
      <br/><br/><br/>
    </div>
    <div className='mainFrame'>
      <div className='infoText'>
      <b>Welcome to AptiQuiz!</b> Sharpen your skills, challenge your mind, and unlock your potential with our comprehensive range of aptitude quizzes. Whether you're preparing for exams, job interviews, or simply want to boost your cognitive abilities, AptiQuiz has something for everyone. Dive into our diverse categories, from logical reasoning to numerical aptitude, and put your abilities to the test. Join our community of learners and enthusiasts today, and let's embark on a journey of continuous growth and learning together!
    </div>
    </div>
    <br /><br/><br /><br/>
    <Footer />
    </>
  )
}

export default OnBoarding
