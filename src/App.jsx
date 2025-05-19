
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FrontOffice from './pages/FrontOffice'
import BackOffice from './pages/BackOffice'
import ProductAnalyse from './pages/ProductAnalyse'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <Router>
      <ToastContainer style={{fontSize : '16px'}} position="top-right" autoClose={3000}  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<FrontOffice />} />
        <Route path="/admin" element={<BackOffice />} />
        <Route path='/product/:id' element={<ProductAnalyse/>} />
      </Routes>
    </Router>
  )
}

export default App
