
import '../../styles/style.scss'
import { taskType, programType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Programs";
import { useContext , useRef , useEffect } from "react";
import { VscChromeMinimize } from 'react-icons/vsc'
import { RxCross2 } from 'react-icons/rx';

interface Props {
  audiRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function Audition({audiRef, containerRef}:Props){
const { programs, setPrograms }: any = useContext(Programs);
const { tasks, setTask }: any = useContext(Tasks);

const isClicked = useRef<boolean>(false)
  

//finds the index of the the task in the task object array
const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "Dance Game"
  );

const programHandle = (programName: string, status: boolean) => {
  const newProgram = programs.map((program: programType) => {
    if (program.name === programName) {
      return { ...program, visible: status };
    } else {
      return { ...program, visible: false };
    }
  });

  // adds the program into task bar or remove it
  const index = tasks.findIndex((task: taskType) => task.name !== programName);
  if (index > -1) {
    setTask(tasks.filter((task: taskType) => task.name !== programName));
  }
  setPrograms(newProgram);
};

//maps through the whole tasks object array and when finds a match changes only the minimized property of it to true
const minimizeProgram = (programName: string) => {
  const taskList = tasks.map((task: taskType) => {
    if (task.name === programName) {
      return { ...task, minimized: true };
    } else {
      return { ...task, minmized: false };
    }
  });
  setTask(taskList);
};

useEffect(()=> {
if(!audiRef.current || !containerRef.current) return;

const box = audiRef.current;
const container = containerRef.current;

const onMouseDown = (e: MouseEvent) => {
  isClicked.current = true;
  console.log('f')

}
const onMouseUp = (e: MouseEvent) => {
  isClicked.current = false;
}
const onMouseMove = (e: MouseEvent) => {
  if(!isClicked.current) return;
 
  box.style.top = `${e.clientY}px`;
  box.style.left = `${e.clientX}px`;
}

box.addEventListener('mousedown', onMouseDown)
box.addEventListener('mouseup', onMouseUp)
container.addEventListener("mousemove", onMouseMove);

const cleanup = () => {
  box.removeEventListener('mousedown', onMouseDown)
  box.removeEventListener('mouseup', onMouseUp)
  box.removeEventListener('mousemove', onMouseMove)

}

return cleanup

},[])


    return (
      <div
      ref={audiRef}
        id='audition'
        style={tasks[currentTaskIndex].minimized ? { display: "none" } : {}}
        
      >
        <div id='audition-handle' >
          Dance
          <div className='button-container' >
            <button onClick={() => minimizeProgram("Dance Game")}>
              <VscChromeMinimize size={20} />
            </button>
            <button onClick={() => programHandle("Dance Game", false)}>
              <RxCross2 size={20} />
            </button>
          </div>
        </div>
        <iframe
        
          id='audition-window'
          src='https://kkapkane.github.io/R3F-Game/'
          style={{ height: "800px", width: "1200px" }}
        ></iframe>
      </div>
    );
}