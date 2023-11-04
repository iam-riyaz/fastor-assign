import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button';
import { SignUp } from './components/SignUp';
import { Route, Routes } from 'react-router-dom';
import { SingleBed } from '@mui/icons-material';
import { Otp } from './components/Otp';
import { Listing } from './components/Listing';
import { Product } from './components/Product';


function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div className="app">
      <Routes>
        <Route path='/' element={<SignUp/>}> </Route>
        <Route path='/login' element={<Otp/>}> </Route>
        <Route path='/listing' element={<Listing/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
      </Routes>
    
    
    </div>
    
  )
}

export default App
