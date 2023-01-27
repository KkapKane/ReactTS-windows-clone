import "../../styles/style.scss";
import { taskType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Context";
import { useContext, useRef } from "react";
import { VscChromeMinimize } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { minimizeProgram } from "../../helper/Minimize";
import { programHandle } from "../../helper/ProgramHandle";
import { FcTodoList } from "react-icons/fc";
import { dragInfo } from "../context/Context";
import { dragStart, dragging, dragEnd } from "../../helper/BetterDragDrop";



export default function Todo() {
  const { programs, setPrograms }: any = useContext(Programs);
  const { tasks, setTask }: any = useContext(Tasks);
    const { dragContainerInfo, setDragContainerInfo }: any =
    useContext(dragInfo);
    
    //todo client dom node
  const todoRef = useRef<HTMLDivElement>(null);
  const helperHandleRef = useRef<HTMLDivElement>(null);

  //finds the index of the the task in the task object array
  const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "Todo"
  );

  return (
    <div
      ref={todoRef}
      id='todo'
      onMouseDown={(e) =>
        dragStart(
          e,
          "todo-handle",
          setDragContainerInfo,
          dragContainerInfo,
          helperHandleRef
        )
      }
      onMouseMove={(e) => dragging(e, setDragContainerInfo, dragContainerInfo)}
      onMouseUp={(e) =>
        dragEnd(e, setDragContainerInfo, dragContainerInfo, helperHandleRef)
      }
      style={
        tasks[currentTaskIndex]?.minimized
          ? { display: "none" }
          : dragContainerInfo.styles
      }
    >
      <span className='extended-handle' ref={helperHandleRef}></span>
      <div id='todo-handle'>
        <div className='program'>
          <FcTodoList />
          <p>To Do List</p>
        </div>
        <div className='button-container'>
          <button onClick={() => minimizeProgram("Todo", tasks, setTask)}>
            <VscChromeMinimize size={20} />
          </button>
          <button
            id='exit-btn'
            onClick={() =>
              programHandle(
                "Todo",
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
        id='todo-window'
        src='https://lisa-go.github.io/to-do-list/'
        style={{ height: "800px", width: "1400px" }}
      ></iframe>
    </div>
  );
}
