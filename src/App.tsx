import { useState } from 'react';
import TaskBar from "./components/TaskBar"
import "./styles/style.scss"
import Calculator from './components/programs/Calculator';
import {Programs} from './components/context/Programs'
import {Tasks} from './components/context/Programs'
import fileExplorer from "./assets/file-explorer.png";
import taskView from "./assets/task-view.png";
import search from "./assets/search.png";
import { taskType } from './types/project_types';


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

  //global useContext can be used anywhere.
const [programs,setPrograms] = useState([
  {name:'Calculator', visible: false}
])
  //global useContext but for Tasks
const [tasks, setTask]  = useState([
  { name: "Search", icon: search, hover: false },
  { name: "Task view", icon: taskView, hover: false },
  { name: "File Explorer", icon: fileExplorer, hover: false },
]);

  return (
    //can retrieve programs data anywhere if it's wrapped inside programs.provider
    <Programs.Provider value={{programs, setPrograms}}>
      <Tasks.Provider value={{tasks, setTask}}>

      <div className='App' onClick={dismissClock}>
        {programs[0].visible === true ? <Calculator /> : null}
        <TaskBar handleClock={handleClock} clock={clock} />
      </div>
      </Tasks.Provider>
    </Programs.Provider>
  );
}

export default App
