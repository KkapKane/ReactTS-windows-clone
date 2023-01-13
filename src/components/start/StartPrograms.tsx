
import {useContext, ReactNode} from 'react';
import { FcCalculator } from 'react-icons/fc';
import paint from '../../assets/paint.png'
import minesweeper from '../../assets/minesweeper.png'
import { taskType } from '../../types/project_types';
import {Programs, Tasks} from '../context/Programs'
import audition from '../../assets/audition.png'



export default function StartPrograms(){

    const {programs, setPrograms}: any = useContext(Programs)
    const {tasks, setTask}: any = useContext(Tasks)

// makes the program visible or not. (close or open program)
    const programHandle = (programName: string, icon:ReactNode, visible: boolean) => {
      const newProgram = programs.map((program:any) => {
        if (program.name === programName) {
          return { ...program, visible: visible };
        } else {
          return { ...program, visible: false };
        }
      });
      
      setPrograms(newProgram);
      //if this program already exist in the task bar just return
      const index = tasks.findIndex(
        (task: taskType) => task.name === programName
        );
        if (index > -1) {
          return
        } 
        //this adds the program to the task list so it appears in the task bar
      setTask([...tasks, {name: programName, icon: icon, isHover: false, minimized: false}])
   
    };
 

    return (
        <div id="start-programs" >
            <span onClick={()=> programHandle('Calculator', <FcCalculator size={30}/> ,true)}>
            <FcCalculator size={30}/> 
            Calculator
            </span>
            <span onClick={()=> programHandle('Dance Game', audition, true)}>
              <img src={audition} alt="" />
              Dance Game</span>
            <span>
                <img id='minesweeper-png' src={minesweeper} alt="" />
                Mine Sweeper</span>
            <span onClick={()=> programHandle('Paint', paint ,true)}>
            <img id='paint-png' src={paint} alt="" />    
            Paint
            </span>

            <span>Calculator</span>
            <span>Calculator</span>
        </div>
    )
}