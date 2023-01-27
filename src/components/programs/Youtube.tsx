import "../../styles/style.scss";
import { taskType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Context";
import { useContext, useRef, useEffect } from "react";
import { VscChromeMinimize } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";

import { minimizeProgram } from "../../helper/Minimize";
import { programHandle } from "../../helper/ProgramHandle";
import { FaYoutube } from "react-icons/fa";
import { dragInfo } from "../context/Context";
import { dragStart, dragging, dragEnd } from "../../helper/BetterDragDrop";


export default function Youtube() {
  const { programs, setPrograms }: any = useContext(Programs);
  const { tasks, setTask }: any = useContext(Tasks);
 const { dragContainerInfo, setDragContainerInfo }: any = useContext(dragInfo);
   const helperHandleRef = useRef<HTMLDivElement>(null);
  //youtube client dom node
  const ytRef = useRef<HTMLDivElement>(null);
  //anything pertaining to the draggable feature
useEffect(() => {
  const falseDrag = () => {
    setDragContainerInfo({ ...dragContainerInfo, dragging: false });
  };
  document.body.addEventListener("mouseup", falseDrag);
  return () => document.body.removeEventListener("mouseup", falseDrag);
}, [dragContainerInfo]);

  //finds the index of the the task in the task object array
  const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "Youtube"
  );

  return (
    <div
      ref={ytRef}
      id='youtube'
      style={
        tasks[currentTaskIndex]?.minimized
          ? { display: "none" }
          : dragContainerInfo.styles
      }
      onMouseDown={(e) =>
        dragStart(
          e,
          "youtube-handle",
          setDragContainerInfo,
          dragContainerInfo,
          helperHandleRef
        )
      }
      onMouseMove={(e) => dragging(e, setDragContainerInfo, dragContainerInfo)}
      onMouseUp={(e) =>
        dragEnd(e, setDragContainerInfo, dragContainerInfo, helperHandleRef)
      }
    >
      <span className='extended-handle' ref={helperHandleRef}></span>
      <div id='youtube-handle'>
        <div className='program'>
          <FaYoutube color='red' />
          <p>Youtube</p>
        </div>
        <div className='button-container'>
          <button onClick={() => minimizeProgram("Youtube", tasks, setTask)}>
            <VscChromeMinimize size={20} />
          </button>
          <button
            id='exit-btn'
            onClick={() =>
              programHandle(
                "Youtube",
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
        id='youtube-window'
        src='https://kkapkane.github.io/youtube-clone/'
        style={{ height: "800px", width: "1400px" }}
      ></iframe>
    </div>
  );
}
