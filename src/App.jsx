import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import apex from "./assets/apex.jpg"
import Spin from './Spin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>        
        <Spin/>
      </div>
      <img className='bookmark' src={apex} alt="" />
    </>
  )
}

export default App
