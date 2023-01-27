import "../../styles/style.scss";
import { taskType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Context";
import { useContext, useRef, useEffect } from "react";
import { VscChromeMinimize } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { minimizeProgram } from "../../helper/Minimize";
import { programHandle } from "../../helper/ProgramHandle";
import { FaTwitter } from "react-icons/fa";
import { dragInfo } from "../context/Context";
import { dragStart, dragging, dragEnd } from "../../helper/BetterDragDrop";

export default function Twitter() {
  //twitter client dom node
  const twtRef = useRef<HTMLDivElement>(null);
  const helperHandleRef = useRef<HTMLDivElement>(null);
  const { programs, setPrograms }: any = useContext(Programs);
  const { tasks, setTask }: any = useContext(Tasks);
  const { dragContainerInfo, setDragContainerInfo }: any = useContext(dragInfo);

  //finds the index of the the task in the task object array
  const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "Twitter"
  );

  useEffect(() => {
    const falseDrag = () => {
      setDragContainerInfo({ ...dragContainerInfo, dragging: false });
    };
    document.body.addEventListener("mouseup", falseDrag);
    return () => document.body.removeEventListener("mouseup", falseDrag);
  }, [dragContainerInfo]);

  return (
    <div
      ref={twtRef}
      onMouseDown={(e) =>
        dragStart(
          e,
          "twitter-handle",
          setDragContainerInfo,
          dragContainerInfo,
          helperHandleRef
        )
      }
      onMouseMove={(e) => dragging(e, setDragContainerInfo, dragContainerInfo)}
      onMouseUp={(e) =>
        dragEnd(e, setDragContainerInfo, dragContainerInfo, helperHandleRef)
      }
      id='twitter'
      style={
        tasks[currentTaskIndex]?.minimized
          ? { display: "none" }
          : dragContainerInfo.styles
      }
    >
      <span className='extended-handle' ref={helperHandleRef}></span>
      <div id='twitter-handle'>
        <div className='program'>
          <FaTwitter color='#1d9bf0' />
          <p>Twitter</p>
        </div>
        <div className='button-container'>
          <button onClick={() => minimizeProgram("Twitter", tasks, setTask)}>
            <VscChromeMinimize size={20} />
          </button>
          <button
            id='exit-btn'
            onClick={() =>
              programHandle(
                "Twitter",
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
        id='twitter-window'
        src='https://lisa-go.github.io/twitter-clone/'
        style={{ height: "800px", width: "1400px" }}
      ></iframe>
    </div>
  );
}
