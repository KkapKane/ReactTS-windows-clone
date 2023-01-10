
import SmallClock from "./SmallClock";
import { useContext } from "react";
import "../styles/taskbar.scss";
import Start from "./start/Start";
import Task from "./Task";
import { BiMessageAlt } from 'react-icons/bi';
import { Tasks } from "./context/Programs";
import { taskType } from "../types/project_types";


interface Props {
    clock: boolean;
    handleClock: () => void;
}

export default function TaskBar({ handleClock, clock }: Props) {

    const { tasks, setTask }: any = useContext(Tasks);

    return (
        <div id='task-bar'>
            <div id="task-left">
                <Start />
                {tasks.map((taskd: taskType) => {
                    return (
                        <Task task={taskd} tasks={tasks} key={taskd.name} setTask={setTask} />
                    );
                })}
            </div>
            <div id="task-right">
                <SmallClock handleClock={handleClock} clock={clock} />
                <BiMessageAlt size={23} />
            </div>
        </div>
    );
}
