import "../styles/taskbar.scss";
import {taskType} from '../types/project_types'


interface Props {
  task: taskType;
  tasks: taskType[];
  setTask: React.Dispatch<
    React.SetStateAction<taskType[]>
  >;
}

export default function Task({ task, tasks, setTask }: Props): JSX.Element {



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

  return (
    <>
    
      <div
        className='task'
        onMouseOver={() => hoverHandle(task.name, true)}
        onMouseOut={() => hoverHandle(task.name, false)}
        onClick={()=> toggleMinimize(task.name)}
      >
        <div
          className='task-toolTip'
          style={task.hover === true ? { display: "inline-block" } : {}}
        >
          {task.name}
        </div>

        {typeof task.icon === 'string' ? <img src={task.icon} alt='' /> : task.icon }
      </div>
    </>
  );
}
