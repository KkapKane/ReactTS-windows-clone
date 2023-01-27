import { useContext, useState, useEffect, useRef } from "react";
import "../../styles/calculator.scss";
import { Programs, Tasks } from "../context/Context";
import { taskType } from "../../types/project_types";
import { dragDrop } from "../../helper/DragDrop";
import { minimizeProgram } from "../../helper/Minimize";
import { programHandle } from "../../helper/ProgramHandle";
import { FcCalculator } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { VscChromeMinimize } from "react-icons/vsc";

interface Props {
  calcRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function Calculator({ calcRef, containerRef }: Props) {

  const { programs, setPrograms }: any = useContext(Programs);
  const { tasks, setTask }: any = useContext(Tasks);
  const [display, setDisplay] = useState<number | string | undefined>("");
  const [prevDisplay, setPrevDisplay] = useState<number | string | undefined>("");
  const [lastOp, setLastOp] = useState("");
  const [helperOp, setHelperOp] = useState(true);
  const [currentOp, setCurrentOp] = useState("");
  const isClicked = useRef<boolean>(false);
  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "Calculator"
  );

  //anything related to the screen display done here
  const displayHandler = (btn: string | number) => {
    //btn pressed type not a number means we do set current display to the previous display
    if (typeof btn !== "number") {
      if (currentOp !== "") {
        //if the last operator button pressed is an equal sign then reset last operator and also the display
        if (lastOp === "=") {
          setCurrentOp(btn);
          setHelperOp(true);
          setPrevDisplay(display);
          setDisplay("");
          setLastOp("");
          return;
        }
        //this runs when current operator isn't blank and set the new current operator to the btn just pressed
        setLastOp(currentOp);
        setCurrentOp(btn);
        let tempPrev = prevDisplay;
        let tempDisplay = display;
        let result = calculate(
          Number(tempPrev),
          currentOp,
          Number(tempDisplay)
        );
        setPrevDisplay(result);
        setDisplay("");

        return;
      } else {
        setHelperOp(true);
        setCurrentOp(btn);
        setPrevDisplay(display);
        setDisplay("");
      }
    } else {
      //btn pressed type is a number
      setDisplay((prev) => prev + btn.toString());
    }
  };

  const calculate = (num1: number, op: string, num2: number) => {
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "/":
        return num1 / num2;
      case "*":
        return num1 * num2;
    }
  };
  //this function only runs when we press the Equal sign
  const equal = () => {
    if (lastOp == "=") return;
    setHelperOp(false);
    let temp = prevDisplay;
    setPrevDisplay(temp + " " + currentOp + " " + display + " " + "=");
    setDisplay(calculate(Number(prevDisplay), currentOp, Number(display)));
    setLastOp("=");
  };

  //finds out if there is already a '.' in the display state and does nothing if there is
  const dotFinder = () => {
    if (typeof display === "string") {
      if (display.includes(".")) {
        return;
      }
    }
    setDisplay((prev) => prev + ".");
  };

  const clearAll = () => {
    setDisplay("");
    setPrevDisplay("");
    setCurrentOp("");
    setLastOp("");
  };

  //splits the display state into an array and pops the last element off each time the del button is clicked
  const delBtn = () => {
    if (typeof display == "string") {
      let displayArray = display.split("");
      displayArray.pop();
      setDisplay(displayArray.join(""));
    }
  };

  useEffect(() => {
    dragDrop(calcRef, containerRef, "handle", coords, isClicked);
  }, []);

  return (
    <div
      ref={calcRef}
      id='calculator'
      draggable={false}
      style={tasks[currentTaskIndex]?.minimized ? { display: "none" } : {}} >
      <div className='handle' draggable={false}>
        <FcCalculator size={30} />
        <span draggable={false}>Calculator</span>
        <div className='util-container' draggable={false}>
          <button onClick={() => minimizeProgram("Calculator", tasks, setTask)}>
            <VscChromeMinimize size={20} />
          </button>
          <button
            id='exit-btn'
            onClick={() =>
              programHandle(
                "Calculator",
                false,
                programs,
                tasks,
                setTask,
                setPrograms
              )
            }
          >
            <RxCross2 size={20} />
          </button>
        </div>
      </div>

      <div id='display'>
        <div id='previous-display'>
          {prevDisplay} {helperOp ? currentOp : null}{" "}
        </div>
        <div id='current-display'>{display}</div>
      </div>
      <div id='button-container'>
        <div id='clear-delete-container'>
          <button id='clear-button' onClick={() => clearAll()}>
            clear
          </button>
          <button id='delete-button' onClick={() => delBtn()}>
            Del
          </button>
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
            onClick={() => displayHandler("/")}
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
            onClick={() => displayHandler("*")}
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
            onClick={() => displayHandler("-")}
          >
            -
          </button>
          <button className='calculator-button' onClick={() => dotFinder()}>
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
            id='equal-btn'
            onClick={() => equal()}
          >
            =
          </button>
          <button
            className='calculator-button'
            onClick={() => displayHandler("+")}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
