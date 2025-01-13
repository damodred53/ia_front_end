
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FrontOffice from './pages/FrontOffice'
import BackOffice from './pages/BackOffice'


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<FrontOffice />} />
        <Route path="/admin" element={<BackOffice />} />
      </Routes>
    </Router>
  )
}

export default App
