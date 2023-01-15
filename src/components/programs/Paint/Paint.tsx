import { useContext, useState, useEffect, useRef } from "react";
import PaintHandle from "./PaintHandle";
import PaintRibbon from "./PaintRibbon";
import PaintCanvas from "./PaintCanvas";
import { Tasks, Programs } from "../../context/Programs";
import { taskType, programType } from "../../../types/project_types";

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
    if (!paintRef.current || !containerRef.current) return;

    const box = paintRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {

      const target = e.target as HTMLDivElement;
      //makes sure if the div is the handle before enabling the drag and drop feature.      
      if (target.id === 'paint-handle') {
        isClicked.current = true;
        coords.current.startX = e.clientX;
        coords.current.startY = e.clientY;
      }
    };
    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      box.style.top = `${nextY}px`;
      box.style.left = `${nextX}px`;
    };

    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      box.removeEventListener("mousemove", onMouseMove);
      box.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
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

  //maps through the whole tasks object array and when finds a match changes only the minimized property of it to true
  const minimizeProgram = (programName: string) => {
    const taskList = tasks.map((task: taskType) => {
      if (task.name === programName) {
        return { ...task, minimized: true };
      } else {
        return { ...task, minmized: false };
      }
    });
    setTask(taskList);
  };

  return (
    <div id='paint' onClick={closeBrushMenu} ref={paintRef}
      style={tasks[currentTaskIndex].minimized ? { display: "none" } : {}}>
      <PaintHandle
        programHandle={programHandle}
        minimizeProgram={minimizeProgram} />
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