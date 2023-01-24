import '../../styles/style.scss'
import { taskType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Programs";
import { useContext, useRef, useEffect } from "react";
import { VscChromeMinimize } from 'react-icons/vsc'
import { RxCross2 } from 'react-icons/rx';
import { dragDrop } from '../../helper/DragDrop'
import { minimizeProgram } from '../../helper/Minimize';
import { programHandle } from '../../helper/ProgramHandle';
import { FaTwitter } from 'react-icons/fa';

interface Props {
  twtRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function Twitter({ twtRef, containerRef }: Props) {

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
    dragDrop(twtRef, containerRef, 'twitter-handle', coords, isClicked)
  }, []);

  //finds the index of the the task in the task object array
  const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "Twitter"
  );

  return (
    <div
      ref={twtRef}
      id='twitter'
      style={tasks[currentTaskIndex]?.minimized ? { display: "none" } : {}}
    >
      <div id='twitter-handle'>
        <div className="program">
          <FaTwitter color='#1d9bf0' />
          <p>Twitter</p>
        </div>
        <div className='button-container'>
          <button onClick={() => minimizeProgram("Twitter", tasks, setTask)}>
            <VscChromeMinimize size={20} />
          </button>
          <button id='exit-btn' onClick={() => programHandle("Twitter", false, programs, tasks, setTask, setPrograms)}>
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