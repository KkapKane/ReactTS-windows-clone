import "../styles/taskbar.scss";

type taskObj = {
  name: string;
  icon: string;
  hover: boolean;
};

interface Props {
  task: taskObj;
  tasks: taskObj[];
  setTask: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        icon: string;
        hover: boolean;
      }[]
    >
  >;
}

export default function Task({ task, tasks, setTask }: Props): JSX.Element {

  //changes the hover property in task to the set parameter
  const hoverHandle = (taskName: string, status: boolean) => {
    const newTask = tasks.map((task) => {
      if (task.name === taskName) {
        return { ...task, hover: status };
      } else {
        return { ...task, hover: false };
      }
    });
    setTask(newTask);
  };

  return (
    <>
      <div
        className='task'
        onMouseOver={() => hoverHandle(task.name, true)}
        onMouseOut={() => hoverHandle(task.name, false)}
      >
        <div
          className='task-toolTip'
          style={task.hover === true ? { display: "inline-block" } : {}}
        >
          {task.name}
        </div>

        <img src={task.icon} alt='' />
      </div>
    </>
  );
}
