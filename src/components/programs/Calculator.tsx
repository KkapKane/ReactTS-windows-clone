import '../../styles/calculator.scss'
import { FcCalculator } from "react-icons/fc";
import { Programs, Tasks } from "../context/Programs";
import { useContext, useState } from "react";
import { taskType, programType } from '../../types/project_types'
export default function Calculator(){

    const { programs, setPrograms }: any = useContext(Programs);
    const { tasks, setTask }: any = useContext(Tasks)
    const [display, setDisplay] = useState<number | string | undefined>('')
    const [prevDisplay, setPrevDisplay] = useState<number | string | undefined>('');
    const [lastOp,setLastOp] = useState('')
    const [helperOp,setHelperOp] = useState(true)
    const [currentOp, setCurrentOp] = useState('')
    


//makes the program visible or not
const programHandle = (programName: string, status: boolean) => {
  const newProgram = programs.map((program: programType) => {
    if (program.name === programName) {
      return { ...program, visible: status };
    } else {
      return { ...program, visible: false };
    }
  });

  const index = tasks.findIndex((task:taskType) => task.name !== programName)
  if(index > -1){
    setTask(tasks.filter((task:taskType)=> (task.name !== programName)))
  } 
  setPrograms(newProgram);
};

const displayHandler = (btn: string | number) => {
  
  if(typeof btn !== 'number' && btn !== '='){
    setHelperOp(true)

    setCurrentOp(btn)
    setPrevDisplay(display)
    setDisplay('')


  }
  else{
    if(lastOp){
      setDisplay('')
    }
    setDisplay(prev => prev + btn.toString())
  }
}
const calculate = (num1:number, op: string, num2:number ) => {

  switch(op){
    case '+' :
      return num1 + num2
    case '-' :
      return num1 - num2  
    case '/' :
      return num1 / num2  
    case '*' :
      return num1 * num2  
  }

  

}
const equal = () =>{
  setHelperOp(false)
  let temp = prevDisplay
  setPrevDisplay(temp + ' ' + currentOp + ' ' + display +  ' ' + '=' )
  setDisplay(calculate(Number(prevDisplay), currentOp,Number(display)))
}

const clearAll = () =>{
  setDisplay('')
  setPrevDisplay('')
  setCurrentOp('')
  setLastOp('')
}

    return (
      <div id='calculator'>
        <div className='handle'>
          <FcCalculator size={30} />
          <span>Calculator</span>
          <div className='util-container'>
            <button>-</button>
            <button onClick={() => programHandle("Calculator", false)}>
              X
            </button>
            
          </div>
        </div>
        <div id='display'>
          <div id="previous-display">{prevDisplay} {helperOp ? currentOp : null} </div>
          <div id="current-display">
            {display}
          </div>
          </div>
        <div id='button-container'>
          <div id='clear-delete-container'>
            <button id='clear-button' onClick={()=> clearAll()}>clear</button>
            <button id='delete-button'>Del</button>
          </div>
          <div className='number-container'>
            <button
              className='calculator-button'
              onClick={() => displayHandler(7)}
            >
              7
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler(8)}
            >
              8
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler(9)}
            >
              9
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler('/')}
            >
              /
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler(4)}
            >
              4
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler(5)}
            >
              5
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler(6)}
            >
              6
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler('*')}
            >
              *
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler(1)}
            >
              1
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler(2)}
            >
              2
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler(3)}
            >
              3
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler('-')}
            >
              -
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler('.')}
            >
              .
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler(0)}
            >
              0
            </button>
            <button
              className='calculator-button'
              onClick={(() => equal())}
            >
              =
            </button>
            <button
              className='calculator-button'
              onClick={() => displayHandler('+')}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
}