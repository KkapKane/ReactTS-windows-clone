import '../styles/taskbar.scss'
import Start from './Start'
import Task from './Task'
import fileExplorer from '../assets/file-explorer.png'
import taskView from '../assets/task-view.png'
import search from '../assets/search.png'
import { useState } from 'react'



export default function TaskBar(){

   const [ tasks , setTask ] = useState([
    {name: 'search', icon: search, hover: false},
    {name: 'task-view', icon: taskView, hover: false},
    {name: 'file-explorer', icon: fileExplorer, hover: false}
    ])

    return (
        <div id="task-bar">
            <Start/>
            {tasks.map((task)=>{
                return (
                    <Task name={task.name} icon={task.icon} key={task.name} />
                )
            })}
            
        </div>

    )
}