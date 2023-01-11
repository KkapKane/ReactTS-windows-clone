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
    const [minimized, setMinimized] = useState(false)


//create program div or not
const programHandle = (programName: string, status: boolean) => {
  const newProgram = programs.map((program: programType) => {
    if (program.name === programName) {
      return { ...program, visible: status };
    } else {
      return { ...program, visible: false };
    }
  });
// adds the program into task bar or remove it
  const index = tasks.findIndex((task:taskType) => task.name !== programName)
  if(index > -1){
    setTask(tasks.filter((task:taskType)=> (task.name !== programName)))
  } 
  setPrograms(newProgram);
};

const minimizeProgram = (ProgramName: string) => {
  setTask()
}

const displayHandler = (btn: string | number) => {
  //btn pressed type not a number
  if(typeof btn !== 'number'){
 
  
     if(currentOp !== ''){
      
      if(lastOp === '='){
        setCurrentOp(btn)
        setHelperOp(true)
        setPrevDisplay(display)
        setDisplay('')
        setLastOp('')
        return
      }
      setLastOp(currentOp)
      setCurrentOp(btn)
      let tempPrev = prevDisplay
      let tempDisplay = display
      let result = calculate(Number(tempPrev), currentOp, Number(tempDisplay));
      setPrevDisplay(result)
      setDisplay('')

  
      return
    
   
    }
    else {
    setHelperOp(true)
    setCurrentOp(btn)
    setPrevDisplay(display)
    setDisplay('')
    }

  }
  else{
    //btn pressed type is a number
    
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
  setLastOp('=')
}

const dotFinder = () => {
  if(typeof display === 'string'){
    if(display.includes('.')){
      return
    }
  }
  setDisplay(prev => prev + '.')
}

const clearAll = () =>{
  setDisplay('')
  setPrevDisplay('')
  setCurrentOp('')
  setLastOp('')
}

const delBtn = () => {
  if(typeof display == 'string'){
   let displayArray = display.split('')
   displayArray.pop()
  setDisplay(displayArray.join(''))

  }
}
    return (
      <div id='calculator' style={minimized ? { display: 'none'} : {}}>
        <div className='handle'>
          <FcCalculator size={30} />
          <span>Calculator</span>
          <div className='util-container'>
            <button onClick={()=> setMinimized(true)}>-</button>
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
            <button id='delete-button' onClick={()=> delBtn()}>Del</button>
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
              onClick={() => dotFinder()}
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