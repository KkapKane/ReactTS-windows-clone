import fileExplorer from "../assets/file-explorer.png";
import taskView from "../assets/task-view.png";
import search from "../assets/search.png";
import SmallClock from "./SmallClock";
import { useState } from "react";
import "../styles/taskbar.scss";
import Start from "./start/Start";
import Task from "./Task";

interface Props {
  clock: boolean;
  handleClock: () => void;
}

export default function TaskBar({ handleClock, clock }: Props) {
  const [tasks, setTask] = useState([
    { name: "Search", icon: search, hover: false },
    { name: "Task view", icon: taskView, hover: false },
    { name: "File Explorer", icon: fileExplorer, hover: false },
  ]);

  return (
    <div id='task-bar'>
      <Start />
      {tasks.map((task) => {
        return (
          <Task task={task} tasks={tasks} key={task.name} setTask={setTask} />
        );
      })}

      <SmallClock handleClock={handleClock} clock={clock} />
    </div>
  );
}
