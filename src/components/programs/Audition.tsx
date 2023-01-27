import { useContext, useRef } from "react";
import "../../styles/style.scss";
import { taskType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Context";
import { dragInfo } from "../context/Context";
import { minimizeProgram } from "../../helper/Minimize";
import { programHandle } from "../../helper/ProgramHandle";
import { dragStart, dragging, dragEnd } from "../../helper/BetterDragDrop";
import audition from "../../assets/audition.png";
import { VscChromeMinimize } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";

export default function Audition() {
  const { programs, setPrograms }: any = useContext(Programs);
  const { tasks, setTask }: any = useContext(Tasks);
  const { dragContainerInfo, setDragContainerInfo }: any = useContext(dragInfo);

  //dance game client dom node
  const audiRef = useRef<HTMLDivElement>(null);
  const helperHandleRef = useRef<HTMLDivElement>(null);

  //finds the index of the the task in the task object array
  const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "Dance Game"
  );

  return (
    <div
      ref={audiRef}
      id='audition'
      onMouseDown={(e) =>
        dragStart(
          e,
          "audition-handle",
          setDragContainerInfo,
          dragContainerInfo,
          helperHandleRef
        )
      }
      onMouseMove={(e) => dragging(e, setDragContainerInfo, dragContainerInfo)}
      onMouseUp={(e) => dragEnd(e, setDragContainerInfo, dragContainerInfo, helperHandleRef)}
      style={
        tasks[currentTaskIndex]?.minimized
          ? { display: "none" }
          : dragContainerInfo.styles
      }
    >
      <span className='extended-handle' ref={helperHandleRef}></span>
      <div id='audition-handle'>
        <div className='program'>
          <img src={audition} alt='audition' />
          <p>Dance Game</p>
        </div>
        <div className='button-container'>
          <button onClick={() => minimizeProgram("Dance Game", tasks, setTask)}>
            <VscChromeMinimize size={20} />
          </button>
          <button
            id='exit-btn'
            onClick={() =>
              programHandle(
                "Dance Game",
                false,
                programs,
                tasks,
                setTask,
                setPrograms
              )
            }
          >
            <RxCross2 size={20} />
          </button>
        </div>
      </div>
      <iframe
        draggable={false}
        id='audition-window'
        src='https://kkapkane.github.io/R3F-Game/'
        style={
          dragContainerInfo.dragging
            ? { height: "800px", width: "1200px", pointerEvents: "none" }
            : { height: "800px", width: "1200px" }
        }
      ></iframe>
    </div>
  );
}
