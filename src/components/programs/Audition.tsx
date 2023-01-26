import '../../styles/style.scss'
import { taskType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Programs";
import { useContext, useRef, useEffect } from "react";
import { VscChromeMinimize } from 'react-icons/vsc'
import { RxCross2 } from 'react-icons/rx';
import { dragDrop } from '../../helper/DragDrop'
import { minimizeProgram } from '../../helper/Minimize';
import { programHandle } from '../../helper/ProgramHandle';
import audition from '../../assets/audition.png';
import { dragStart, dragging, dragEnd } from '../../helper/BetterDragDrop';

interface Props {
  audiRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function Audition({ audiRef, containerRef }: Props) {

  const { programs, setPrograms }: any = useContext(Programs);
  const { tasks, setTask }: any = useContext(Tasks);
  const isClicked = useRef<boolean>(false);
  const coords = useRef<{ startX: number, startY: number, lastX: number, lastY: number }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  })

  //anything pertaining to the draggable feature
  useEffect(() => {
    
    dragDrop(audiRef, containerRef, 'audition-handle', coords, isClicked)
 
  }, []);

  //finds the index of the the task in the task object array
  const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "Dance Game"
  );

  return (
    <div
      ref={audiRef}
      id='audition'
      style={tasks[currentTaskIndex]?.minimized ? { display: "none" } : {}}
      
    >
      <div id='audition-handle'>
        <div className="program">
          <img src={audition} alt="audition" />
          <p>Dance Game</p>
        </div>
        <div className='button-container'>
          <button onClick={() => minimizeProgram("Dance Game", tasks, setTask)}>
            <VscChromeMinimize size={20} />
          </button>
          <button id='exit-btn' onClick={() => programHandle("Dance Game", false, programs, tasks, setTask, setPrograms)}>
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