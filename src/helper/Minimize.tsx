import { ReactNode } from 'react'

type taskType = {
  name: string;
  icon: string | ReactNode;
  hover: boolean;
  minimized: boolean;
}

//maps through the whole tasks object array and when finds a match changes only the minimized property of it to true

export const minimizeProgram = (programName: string, tasks: any, setTask: any) => {
  const taskList = tasks.map((task: taskType) => {
    if (task.name === programName) {
      return { ...task, minimized: true };
    } else {
      return { ...task, minmized: false };
    }
  });
  setTask(taskList);
};
