import './App.css';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import OnBoarding from './pages/OnBoarding'
import Quiz from './pages/Quiz'
import Testt from './pages/testt'

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import NavBar from './components/NavBar'
import {AuthProvider} from './context/AuthContext'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
   
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
          <Route element={<OnBoarding />} path="/" exact /> 
          <Route element={<PrivateRoute ><HomePage /></ PrivateRoute >} path="user" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Quiz />} path="/quiz/:title" />
          <Route element={<Testt />} path="/testt" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
