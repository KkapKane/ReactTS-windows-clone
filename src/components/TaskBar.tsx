import SmallClock from "./apps/SmallClock";
import { useState, useContext, useEffect } from "react";
import "../styles/taskbar.scss";
import Start from "./start/Start";
import Task from "./Task";
import { BiMessageAlt } from 'react-icons/bi';
import { Tasks } from "./context/Programs";
import { taskType } from "../types/project_types";
import { IoVolumeHighOutline } from 'react-icons/io5';
import { RiWifiLine } from 'react-icons/ri';
import { BsChevronUp } from 'react-icons/bs';
import Weather from "./apps/Weather";
import Search from "./apps/Search";


interface Props {
    clock: boolean;
    handleClock: () => void;
}

export default function TaskBar({ handleClock, clock }: Props) {

    const { tasks, setTask }: any = useContext(Tasks);

    const [searchDisplay, setSearchDisplay] = useState(false);

    useEffect(() => {
        const closeSearch = (event : MouseEvent) => {
            const target = event.target as HTMLDivElement;
            if (target.id !== 'search-btn') {
                setSearchDisplay(false);
            }
        }
        document.body.addEventListener('click', closeSearch)
        return () => document.body.removeEventListener('click', closeSearch) 
    }, [])
    
    return (
        <div id='task-bar'>
            {searchDisplay ? <Search /> : null}
            <div id="task-left">
                <Start />
                {tasks.map((taskd: taskType) => {
                    return (
                        <Task task={taskd}
                            tasks={tasks}
                            key={taskd.name}
                            setTask={setTask}
                            setSearchDisplay={setSearchDisplay}
                        />
                    );
                })}
            </div>
            <div id="task-right">
                <Weather />
                <BsChevronUp size={16} style={{ padding: '0 6px' }} />
                <RiWifiLine size={20} />
                <IoVolumeHighOutline size={20} />
                <span className="task-item">ENG</span>
                <SmallClock handleClock={handleClock} clock={clock} />
                <BiMessageAlt size={23} style={{ padding: '0 10px' }} />
                <span className="dismiss"> </span>
            </div>
        </div>
    );
}
