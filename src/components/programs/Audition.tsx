
import '../../styles/style.scss'
import { taskType, programType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Programs";
import { useContext , useRef , useEffect } from "react";
import { VscChromeMinimize } from 'react-icons/vsc'
import { RxCross2 } from 'react-icons/rx';
import {dragDrop} from '../../helper/DragDrop'
import { minimizeProgram } from '../../helper/Minimize';

interface Props {
  audiRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function Audition({audiRef, containerRef}:Props){

const { programs, setPrograms }: any = useContext(Programs);
const { tasks, setTask }: any = useContext(Tasks);
const isClicked = useRef<boolean>(false);
const coords = useRef<{startX: number , startY: number , lastX: number, lastY: number}>({
  startX: 0, 
  startY: 0,
  lastX: 0,
  lastY: 0
})


//anything pertaining to the draggable feature
useEffect(() => {
  dragDrop(audiRef,containerRef,'audition-handle',coords,isClicked)
}, []);
  



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






    return (
      <div
        ref={audiRef}

        id='audition'
        style={tasks[currentTaskIndex].minimized ? { display: "none" } : {}}
      >
        <div id='audition-handle'>
          Dance
          <div className='button-container'>
            <button onClick={() => minimizeProgram("Dance Game",tasks,setTask)}>
              <VscChromeMinimize size={20} />
            </button>
            <button onClick={() => programHandle("Dance Game", false)}>
              <RxCross2 size={20} />
            </button>
          </div>
        </div>
        <iframe
          draggable={false}
          id='audition-window'
          src='https://kkapkane.github.io/R3F-Game/'
          style={{ height: "800px", width: "1200px" }}
        ></iframe>
      </div>
    );
}