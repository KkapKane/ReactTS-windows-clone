import { useContext, useRef } from "react";
import "../../styles/style.scss";
import { minimizeProgram } from "../../helper/Minimize";
import { programHandle } from "../../helper/ProgramHandle";
import { taskType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Context";
import { dragInfo } from "../context/Context";
import { dragStart, dragging, dragEnd } from "../../helper/BetterDragDrop";
import arashiyama from "../../assets/arashiyama.png";
import { VscChromeMinimize } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";

export default function Arashiyama() {
  const { programs, setPrograms }: any = useContext(Programs);
  const { tasks, setTask }: any = useContext(Tasks);
  const { dragContainerInfo, setDragContainerInfo }: any =
    useContext(dragInfo);

  //arashiyama client dom node
  const araRef = useRef<HTMLDivElement>(null);
  const helperHandleRef = useRef<HTMLDivElement>(null);

  //finds the index of the the task in the task object array
  const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "Arashiyama"
  );

  return (
    <div
      ref={araRef}
      onMouseDown={(e) =>
        dragStart(
          e,
          "arashiyama-handle",
          setDragContainerInfo,
          dragContainerInfo,
          helperHandleRef
        )
      }
      onMouseMove={(e) => dragging(e, setDragContainerInfo, dragContainerInfo)}
      onMouseUp={(e) =>
        dragEnd(e, setDragContainerInfo, dragContainerInfo, helperHandleRef)
      }
      id='arashiyama'
      style={
        tasks[currentTaskIndex]?.minimized
          ? { display: "none" }
          : dragContainerInfo.styles
      }
    >
      <span className='extended-handle' ref={helperHandleRef}></span>
      <div id='arashiyama-handle'>
        <div className='program'>
          <img src={arashiyama} alt='arashiyama' />
          <p>Arashiyama</p>
        </div>
        <div className='button-container'>
          <button onClick={() => minimizeProgram("Arashiyama", tasks, setTask)}>
            <VscChromeMinimize size={20} />
          </button>
          <button
            id='exit-btn'
            onClick={() =>
              programHandle(
                "Arashiyama",
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
        id='arashiyama-window'
        src='https://kkapkane.github.io/shopping-cart/'
        style={{ height: "800px", width: "1400px" }}
      ></iframe>
    </div>
  );
}
