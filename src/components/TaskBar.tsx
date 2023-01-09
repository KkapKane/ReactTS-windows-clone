import fileExplorer from "../assets/file-explorer.png";
import taskView from "../assets/task-view.png";
import search from "../assets/search.png";
import SmallClock from "./SmallClock";
import { useState, useContext } from "react";
import "../styles/taskbar.scss";
import Start from "./start/Start";
import Task from "./Task";
import { BiMessageAlt } from 'react-icons/bi';
import { Tasks } from "./context/Programs";


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
                {tasks.map((taskd:any) => {
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
