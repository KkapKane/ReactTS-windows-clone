import { useContext, useState, useEffect, useRef } from "react";
import PaintHandle from "./PaintHandle";
import PaintRibbon from "./PaintRibbon";
import PaintCanvas from "./PaintCanvas";
import { Tasks, Programs } from "../../context/Programs";
import { taskType, programType } from "../../../types/project_types";
import { dragDrop } from "../../../helper/DragDrop";

interface Props {
  paintRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function Paint({ paintRef, containerRef }: Props) {
  // state for brush menu display //
  const [brushMenu, setBrushMenu] = useState(false);

  // function for closing brush menu //
  const closeBrushMenu = () => {
    setBrushMenu(false);
  };

  // state for current brush size //
  const [brushSize, setBrushSize] = useState<number | "">(10);

  // function for switching brush sizes //
  const handleBrushSize = (size: number) => {
    setBrushSize(size);
    setEye(false);
  }

  // state for the color saved that will be used if mouse clicks canvas now //
  const [chosenColor, setChosenColor] = useState<string | undefined>("#000000");

  // eyedropper tool //
  const [eye, setEye] = useState(false);

  const activeEye = () => {
    setEye(true);
    setBrushSize(0);
  }

  const getColor = (event: any) => {
    let color = event.target.style.backgroundColor;
    setChosenColor(color);
  }

  // above for eyedropper tool //

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

  //anything pertaining to the draggable feature
  useEffect(() => {
    dragDrop(paintRef, containerRef, 'paint-handle', coords, isClicked);
  }, []);

  // here to end for minimizing and closing programs //
  const { tasks, setTask }: any = useContext(Tasks);
  const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "Paint"
  );
  const { programs, setPrograms }: any = useContext(Programs);


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
    const index = tasks.findIndex(
      (task: taskType) => task.name !== programName
    );
    if (index > -1) {
      setTask(tasks.filter((task: taskType) => task.name !== programName));
    }
    setPrograms(newProgram);
  };


  return (
    <div id='paint' onClick={closeBrushMenu} ref={paintRef}
      style={tasks[currentTaskIndex].minimized ? { display: "none" } : {}}>
      <PaintHandle
        programHandle={programHandle}
        tasks={tasks}
        setTask={setTask} />
      <PaintRibbon
        brushMenu={brushMenu}
        setBrushMenu={setBrushMenu}
        closeBrushMenu={closeBrushMenu}
        chosenColor={chosenColor}
        setChosenColor={setChosenColor}
        handleBrushSize={handleBrushSize}
        eye={eye}
        activeEye={activeEye}
        brushSize={brushSize}
      />
      <PaintCanvas
        brushSize={brushSize}
        chosenColor={chosenColor}
        eye={eye}
        getColor={getColor}
      />
    </div>
  );
}