import '../styles/taskbar.scss'
import SmallClock from './SmallClock'
import Start from './Start'
import Task from './Task'

export default function TaskBar(){
    return (
        <div id="task-bar">
            <Start />
            <Task />
            <SmallClock />
        </div>

    )
}