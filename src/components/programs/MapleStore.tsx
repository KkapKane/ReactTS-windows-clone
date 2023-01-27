import "../../styles/style.scss";
import { taskType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Context";
import { useContext, useRef } from "react";
import { VscChromeMinimize } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { dragInfo } from "../context/Context";
import { minimizeProgram } from "../../helper/Minimize";
import { programHandle } from "../../helper/ProgramHandle";
import maple from "../../assets/maplestory-logo.png";
import { dragStart, dragging, dragEnd } from "../../helper/BetterDragDrop";



export default function MapleStore() {
  const { programs, setPrograms }: any = useContext(Programs);
  const { tasks, setTask }: any = useContext(Tasks);
    const { dragContainerInfo, setDragContainerInfo }: any =
      useContext(dragInfo);

  //maplestore client dom node
  const mpsRef = useRef<HTMLDivElement>(null);
  const helperHandleRef = useRef<HTMLDivElement>(null);

  //finds the index of the the task in the task object array
  const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "MapleStore"
  );

  return (
    <div
      ref={mpsRef}
      onMouseDown={(e) =>
        dragStart(
          e,
          "maplestore-handle",
          setDragContainerInfo,
          dragContainerInfo,
          helperHandleRef
        )
      }
      onMouseMove={(e) => dragging(e, setDragContainerInfo, dragContainerInfo)}
      onMouseUp={(e) =>
        dragEnd(e, setDragContainerInfo, dragContainerInfo, helperHandleRef)
      }
      id='maplestore'
      style={
        tasks[currentTaskIndex]?.minimized
          ? { display: "none" }
          : dragContainerInfo.styles
      }
    >
      <span className='extended-handle' ref={helperHandleRef}></span>
      <div id='maplestore-handle'>
        <div className='program'>
          <img src={maple} alt='maple' />
          <p>Maple Store</p>
        </div>
        <div className='button-container'>
          <button onClick={() => minimizeProgram("MapleStore", tasks, setTask)}>
            <VscChromeMinimize size={20} />
          </button>
          <button
            id='exit-btn'
            onClick={() =>
              programHandle(
                "MapleStore",
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
        id='maplestore-window'
        src='https://lisa-go.github.io/shopping-cart/'
        style={{ height: "800px", width: "1400px" }}
      ></iframe>
    </div>
  );
}
