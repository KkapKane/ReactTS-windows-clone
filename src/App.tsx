import { useState , useRef , useEffect } from 'react';
import TaskBar from "./components/TaskBar"
import "./styles/style.scss"
import Calculator from './components/programs/Calculator';
import {Programs} from './components/context/Programs'
import {Tasks} from './components/context/Programs'
import fileExplorer from "./assets/file-explorer.png";
import taskView from "./assets/task-view.png";
import search from "./assets/search.png";
import Paint from './components/programs/Paint/Paint';
import Audition from './components/programs/Audition';




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
  { name:'Calculator', visible: false },
  { name: 'Paint', visible: false },
  { name: 'Dance Game', visible: false}
])
  //global useContext but for Tasks
const [tasks, setTask]  = useState([
  { name: "Search", icon: search, hover: false, minimized: false },
  { name: "Task view", icon: taskView, hover: false, minimized: false },
  { name: "File Explorer", icon: fileExplorer, hover: false, minimized: false }
]);



//dance game client dom node
const audiRef = useRef<HTMLDivElement>(null);
//calculator client dom node
const calcRef = useRef<HTMLDivElement>(null);
//paint client dom node
const paintRef = useRef<HTMLDivElement>(null);
//app.tsx client dom node
const containerRef = useRef<HTMLDivElement>(null);




  return (
    //can retrieve programs data anywhere if it's wrapped inside programs.provider
    <Programs.Provider value={{ programs, setPrograms }}>
      <Tasks.Provider value={{ tasks, setTask }}>
        <div className='App' onClick={dismissClock} ref={containerRef}>
          
            {programs[0].visible === true ? <Calculator calcRef={calcRef} containerRef={containerRef}/> : null}

            {programs[1].visible === true ? <Paint paintRef={paintRef} containerRef={containerRef} /> : null}
            {programs[2].visible === true ? (
          
              <Audition audiRef={audiRef} containerRef={containerRef} />
                
            ) : null}

            <TaskBar handleClock={handleClock} clock={clock} />
        </div>
      </Tasks.Provider>
    </Programs.Provider>
  );
}

export default App
