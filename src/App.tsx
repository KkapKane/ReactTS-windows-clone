import { useState } from 'react';
import TaskBar from "./components/TaskBar"
import "./styles/style.scss"

function App() {

  // big clock display on click //
  const [clock, setClock] = useState(false);

  const handleClock = () => {
    setClock(!clock);
  }

  // dismiss clock on window click //
  const dismissClock = () => {
    setClock(false);
  }

  return (
    <div className="App" onClick={dismissClock}>

      <TaskBar handleClock={handleClock} clock={clock}/>
    </div>
  )
}

export default App
