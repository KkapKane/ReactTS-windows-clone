
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
import { DesktopIcon } from './types/project_types';




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
  {name: 'Recycle Bin', icon: recycle, rename: false, type: 'bin', open: false}
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
 
const inputRef = useRef<HTMLInputElement>(null)

const dragRef = useRef<HTMLImageElement>(null)

const [currentFocus,setCurrentFocus] = useState('')
const [currentDrag, setCurrentDrag] = useState(-1)
//id of the element the mouse is on
const [finalMouseDestination, setFinalMouseDestination] : any = useState()
useEffect(()=>{
//closes the right click menu if clicked anywhere on the desktop
  document.body.addEventListener("click", (event: MouseEvent)=> {
    if (!rcMenuRef.current) return;
    rcMenuRef.current.style.display ='none'
    
  })
  
  
  //prevents right click on webpage so implementing our own right click function is possible
  document.addEventListener("contextmenu", (event: MouseEvent) => {
    if(!event.target) return;
   const target = event.target as HTMLDivElement

    setCurrentFocus(target.id)
    const x = event.clientX
    const y = event.clientY
    event.preventDefault()
    
    
    
    if(!rcMenuRef.current) return;
    //sets the right click menu div from none to flex and then put it at the position of mouse
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

useEffect(()=>{
//creates a clone of the icon being clicked and put it at mouse position
  const createIconClone = (event: MouseEvent) =>{
    event.preventDefault()
    const target = event.target as HTMLDivElement;
    // setCurrentFocus(target.id)
    let currentTaskIndex = desktopIcon.findIndex(
      (icon: DesktopIcon) => icon.name === target.id
    );
    setCurrentDrag(currentTaskIndex);
    const x = event.clientX;
    const y = event.clientY;
    if (dragRef.current) {
      dragRef.current.style.left = `${x}px`;
      dragRef.current.style.top = `${y}px`;
    }
  }

  const moveIconClone = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      if (dragRef.current) {
        dragRef.current.style.left = `${x}px`;
        dragRef.current.style.top = `${y}px`;
      }
  }

  const letGoIcon = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement
    
    setCurrentDrag(-1)
    if(currentDrag === -1) return;
    if(finalMouseDestination.type == 'bin'){
       const index = desktopIcon.findIndex(
         (icon: DesktopIcon) => icon.name !== desktopIcon[currentDrag]?.name
         );
         if (index > -1) {
           
           setDesktopIcon(
             desktopIcon.filter(
               (icon: DesktopIcon) => icon.name !== desktopIcon[currentDrag]?.name
             )
           );
          }
        }
        else if(finalMouseDestination.type == 'folder'){
          
          //makes the icon on desktop dissapear
          let updatedIcon = desktopIcon.filter(
              (icon: DesktopIcon) => icon.name !== desktopIcon[currentDrag]?.name)
          let addToFolder = updatedIcon.map((icon)=> {
              
            if(icon.name === desktopIcon[currentDrag].name){
             
              return {...icon, content:  [desktopIcon[currentDrag]]}
            } else {
              return {...icon, content: [desktopIcon[currentDrag]]}
            }
              
          })
          
        addToFolder.map((t, i)=>{
            if(t.content ){
              t.content.map((c)=>{
                console.log(c.type)
              })
            }
          })

          setDesktopIcon(addToFolder);
         
         
    }
    
    
  }
  
 
  
document.body.addEventListener("mousedown", createIconClone)
document.body.addEventListener("mouseup", letGoIcon)
document.body.addEventListener("mousemove", moveIconClone)

const cleanUp = () => {
  document.body.removeEventListener("mousedown", createIconClone)
  document.body.removeEventListener("mousemove", moveIconClone)
  document.body.removeEventListener("mouseup", letGoIcon)
  
};
return cleanUp

},[desktopIcon, finalMouseDestination])




  return (
    //can retrieve programs data anywhere if it's wrapped inside programs.provider
    <Programs.Provider value={{ programs, setPrograms }}>
      <Tasks.Provider value={{ tasks, setTask }}>
        <div className='App' onClick={dismissClock} ref={containerRef}>
          <RCMenu
            rcMenuRef={rcMenuRef}
            setDesktopIcon={setDesktopIcon}
            desktopIcon={desktopIcon}
            whichMenu={whichMenu}
            currentFocus={currentFocus}
            inputRef={inputRef}
          />
          <Desktop
            desktopIcon={desktopIcon}
            paintRef={paintRef}
            audiRef={audiRef}
            calcRef={calcRef}
            programs={programs}
            containerRef={containerRef}
            currentFocus={currentFocus}
            setDesktopIcon={setDesktopIcon}
            inputRef={inputRef}
            setfinalMouseDestination={setFinalMouseDestination}
          />
          {currentDrag !== -1 ? (
            <img
              src={desktopIcon[currentDrag].icon}
              ref={dragRef}
              style={{ position: "absolute", opacity: '.7' }}
            ></img>
          ) : null}
          <TaskBar handleClock={handleClock} clock={clock} />
        </div>
      </Tasks.Provider>
    </Programs.Provider>
  );
}

export default App
