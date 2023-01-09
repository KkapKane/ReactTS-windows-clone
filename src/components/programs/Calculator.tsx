import '../../styles/calculator.scss'
import { FcCalculator } from "react-icons/fc";
import { Programs, Tasks } from "../context/Programs";
import { useContext } from "react";
import { IconType } from 'react-icons/lib';
export default function Calculator(){

    const { programs, setPrograms }: any = useContext(Programs);
    const { tasks, setTask }: any = useContext(Tasks)

//makes the program visible or not
const programHandle = (programName: string, status: boolean) => {
  const newProgram = programs.map((program: any) => {
    if (program.name === programName) {
      return { ...program, visible: status };
    } else {
      return { ...program, visible: false };
    }
  });

  const index = tasks.findIndex((task:any) => task.name !== programName)
  if(index > -1){
    setTask(tasks.filter((i:any)=> (i.name !== programName)))
  } 
  setPrograms(newProgram);



};




    return (
      <div id='calculator'>
        <div className="handle">
            <FcCalculator size={30}/>
            <span>Calculator</span>
            <div className="util-container">
            <button>-</button>
            <button onClick={()=> programHandle('Calculator', false)}>X</button>
            </div>
                
        </div>
        <div id='display'>0</div>
        <div id='button-container'>
          <div id='clear-delete-container'>
            <button id='clear-button'>clear</button>
            <button id='delete-button'>Del</button>
          </div>
          <div className='number-container'>
            <button className='calculator-button'>7</button>
            <button className='calculator-button'>8</button>
            <button className='calculator-button'>9</button>
            <button className='calculator-button'>-</button>
            <button className='calculator-button'>4</button>
            <button className='calculator-button'>5</button>
            <button className='calculator-button'>6</button>
            <button className='calculator-button'>*</button>
            <button className='calculator-button'>1</button>
            <button className='calculator-button'>2</button>
            <button className='calculator-button'>3</button>
            <button className='calculator-button'>-</button>
            <button className='calculator-button'>.</button>
            <button className='calculator-button'>0</button>
            <button className='calculator-button'>=</button>
            <button className='calculator-button'>+</button>
          </div>
        </div>
      </div>
    );
}