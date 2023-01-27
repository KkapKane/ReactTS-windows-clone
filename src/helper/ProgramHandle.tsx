import { taskType, programType } from "../types/project_types";

export const programHandle = (
  programName: string,
  status: boolean,
  programs: programType[],
  tasks: taskType[],
  setTask: any,
  setPrograms: any) => {
    
  // makes the program visible or not. (close or open program)
  const newProgram = programs.map((program: programType) => {
    if (program.name === programName) {
      return { ...program, visible: status };
    } else {
      return { ...program, visible: false };
    }
  });

  //if this program already exist in the task bar just return
  const index = tasks.findIndex((task: taskType) => task.name !== programName);
  if (index > -1) {
    //this adds the program to the task list so it appears in the task bar
    setTask(tasks.filter((task: taskType) => task.name !== programName));
  }
  setPrograms(newProgram);
};
