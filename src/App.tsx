
import {Programs} from './components/context/Programs'
import { useState , useRef , useEffect } from 'react';
import fileExplorer from "./assets/file-explorer.png";

import {Tasks} from './components/context/Programs'
import taskView from "./assets/task-view.png";
import TaskBar from "./components/TaskBar"
import search from "./assets/search.png";
import RCMenu from './components/desktop/RCMenu';
import "./styles/style.scss"
import Desktop from './components/desktop/Desktop';
import recycle from  './assets/recycle-bin.png'




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
  { name: 'Dance Game', visible: false},

])
  //global useContext but for Tasks
const [tasks, setTask]  = useState([
  { name: "Search", icon: search, hover: false, minimized: false },
  { name: "Task view", icon: taskView, hover: false, minimized: false },
  { name: "File Explorer", icon: fileExplorer, hover: false, minimized: false }
]);


const [desktopIcon,setDesktopIcon] = useState([
  {name: 'Recycle Bin', icon: recycle}
])

const [whichMenu , setWhichMenu] = useState('')

//dance game client dom node
const audiRef = useRef<HTMLDivElement>(null);
//calculator client dom node
const calcRef = useRef<HTMLDivElement>(null);
//paint client dom node
const paintRef = useRef<HTMLDivElement>(null);

//app.tsx client dom node
const containerRef = useRef<HTMLDivElement>(null);

const rcMenuRef = useRef<HTMLDivElement>(null)



useEffect(()=>{

  document.body.addEventListener("click", ()=> {
    if (!rcMenuRef.current) return;
  
    rcMenuRef.current.style.display ='none'
    
  })
  
  //prevents right click on webpage so implementing our own right click function is possible
  document.addEventListener("contextmenu", (event: MouseEvent) => {
    if(!event.target) return;
   const target = event.target as HTMLDivElement
    console.log(target.className)
    const x = event.clientX
    const y = event.clientY
    event.preventDefault()
    
    
    
    if(!rcMenuRef.current) return;
    rcMenuRef.current.style.display ='flex'
    rcMenuRef.current.style.left = `${x}px`;
    rcMenuRef.current.style.top = `${y}px`;
    setWhichMenu(target.className)
    
  });
    
  
  const cleanUp = () => {
     document.removeEventListener("contextmenu", (event) => event.preventDefault());
     document.body.removeEventListener("click", () => {
       if (!rcMenuRef.current) return;
      
       rcMenuRef.current.style.display = "none";
     });

  }
  return cleanUp
},[])

  return (
    //can retrieve programs data anywhere if it's wrapped inside programs.provider
    <Programs.Provider value={{ programs, setPrograms }}>
      <Tasks.Provider value={{ tasks, setTask }}>
        <div className='App' onClick={dismissClock} ref={containerRef}>
      
            <RCMenu rcMenuRef={rcMenuRef} setDesktopIcon={setDesktopIcon} desktopIcon={desktopIcon} whichMenu={whichMenu}/>
            <Desktop desktopIcon={desktopIcon} paintRef={paintRef} audiRef={audiRef} calcRef={calcRef} programs={programs} containerRef={containerRef}/> 
            
   

            <TaskBar handleClock={handleClock} clock={clock} />
        </div>
      </Tasks.Provider>
    </Programs.Provider>
  );
}

export default App
