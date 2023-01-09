
import {useContext} from 'react';
import { FcCalculator } from 'react-icons/fc';
import paint from '../../assets/paint.png'
import minesweeper from '../../assets/minesweeper.png'

import {Programs} from '../context/Programs'


interface Props{
    isHover: boolean;
}

export default function StartPrograms({isHover}: Props){

    const {programs, setPrograms}: any = useContext(Programs)

    const programHandle = (programName: string, status: boolean) => {
      const newProgram = programs.map((program:any) => {
        if (program.name === programName) {
          return { ...program, visible: status };
        } else {
          return { ...program, visible: false };
        }
      });
      console.log(programs)
      setPrograms(newProgram);
    };

    return (
        <div id="start-programs" >
            <span  onClick={()=> programHandle('Calculator', true)}>
            <FcCalculator size={30}/> 
            Calculator
            </span>
            <span>
                <img id='minesweeper-png' src={minesweeper} alt="" />
                Mine Sweeper</span>
            <span>
            <img id='paint-png' src={paint} alt="" />    
            Paint
            </span>

            <span>Calculator</span>
            <span>Calculator</span>
            <span>Calculator</span>
        </div>
    )
}