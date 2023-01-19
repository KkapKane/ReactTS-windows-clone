import "../styles/taskbar.scss";
import {taskType} from '../types/project_types'


interface Props {
  task: taskType;
  tasks: taskType[];
  setTask: React.Dispatch<React.SetStateAction<taskType[]>>;
  setSearchDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Task({ task, tasks, setTask, setSearchDisplay }: Props): JSX.Element {



  //changes the hover property in task to the set parameter (status)
  const hoverHandle = (taskName: string, status: boolean) => {
    const newTask = tasks.map((task: taskType) => {
      if (task.name === taskName) {
        return { ...task, hover: status };
      } else {
        return { ...task, hover: false };
      }
    });
    setTask(newTask);
  };

  //goes into the tasks object and change just the minimized property
  const toggleMinimize = (programName: string) => {
    const taskList = tasks.map((task: taskType) => {
      if (task.name === programName) {
        return { ...task, minimized: !task.minimized };
      } else {
        return { ...task, minmized: false };
      }
    });
    setTask(taskList);
  };

  const expandSearch = () =>{
    setSearchDisplay(true);
  }

  return (
    <>
    
      <div
        className='task'
        id={task.name == 'Search' ? 'search-btn' : ''}
        onMouseOver={() => hoverHandle(task.name, true)}
        onMouseOut={() => hoverHandle(task.name, false)}
        onClick={()=> task.name !== 'Search' ? toggleMinimize(task.name) 
        /* when the task IS search */
        : expandSearch()}
      >
        <div
          className='task-toolTip'
          style={task.hover === true ? { display: "inline-block" } : {}}
        >
          {task.name}
        </div>

        {typeof task.icon === 'string' ? <img src={task.icon} alt={task.name} id={task.name == 'Search' ? 'search-btn' : ''}/> : task.icon }
      </div>
    </>
  );
}
