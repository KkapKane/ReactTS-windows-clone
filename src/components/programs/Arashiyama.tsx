import '../../styles/style.scss'
import { taskType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Programs";
import { useContext , useRef , useEffect } from "react";
import { VscChromeMinimize } from 'react-icons/vsc'
import { RxCross2 } from 'react-icons/rx';
import { dragDrop } from '../../helper/DragDrop'
import { minimizeProgram } from '../../helper/Minimize';
import { programHandle } from '../../helper/ProgramHandle';
import arashiyama from "../../assets/arashiyama.png";

interface Props {
  araRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function Arashiyama({ araRef, containerRef }:Props){

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
  dragDrop(araRef,containerRef,'arashiyama-handle',coords,isClicked)
}, []);
  
//finds the index of the the task in the task object array
const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "Arashiyama"
  );

    return (
      <div
        ref={araRef}
        id='arashiyama'
        style={tasks[currentTaskIndex]?.minimized ? { display: "none" } : {}}
      >
        <div id='arashiyama-handle'>
            <div className="program">
                <img src={arashiyama} alt="arashiyama" />
                <p>Arashiyama</p>
            </div>
          <div className='button-container'>
            <button onClick={() => minimizeProgram("Arashiyama",tasks,setTask)}>
              <VscChromeMinimize size={20} />
            </button>
            <button id='exit-btn' onClick={() => programHandle("Arashiyama", false, programs, tasks, setTask, setPrograms)}>
              <RxCross2 size={20} />
            </button>
          </div>
        </div>
        <iframe
          draggable={false}
          id='arashiyama-window'
          src='https://kkapkane.github.io/shopping-cart/'
          style={{ height: "800px", width: "1400px" }}
        ></iframe>
      </div>
    );
}