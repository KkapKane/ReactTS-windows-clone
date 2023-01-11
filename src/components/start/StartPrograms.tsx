
import {useContext, ReactNode} from 'react';
import { FcCalculator } from 'react-icons/fc';
import paint from '../../assets/paint.png'
import minesweeper from '../../assets/minesweeper.png'

import {Programs, Tasks} from '../context/Programs'


interface Props{
    isHover: boolean;
}

export default function StartPrograms({isHover}: Props){

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
      //this adds the program to the task list so it appears in the task bar
      setTask([...tasks, {name: programName, icon: icon, isHover: false}])
      console.log(tasks)
    };
 

    return (
        <div id="start-programs" >
            <span onClick={()=> programHandle('Calculator', <FcCalculator size={30}/> ,true)}>
            <FcCalculator size={30}/> 
            Calculator
            </span>
            <span>
                <img id='minesweeper-png' src={minesweeper} alt="" />
                Mine Sweeper</span>
            <span onClick={()=> programHandle('Paint', paint ,true)}>
            <img id='paint-png' src={paint} alt="" />    
            Paint
            </span>

            <span>Calculator</span>
            <span>Calculator</span>
            <span>Calculator</span>
        </div>
    )
}