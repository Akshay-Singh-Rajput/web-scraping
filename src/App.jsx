import { useState } from 'react'
import './App.css'
import { Dashboard } from './Home/Dashboard';
import { Navbar } from './Home/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     <Navbar />
      <Dashboard />
    </div>
  )
}

export default App
