import {ReactNode} from 'react'



export type taskType = {
  name: string;
  icon: string | ReactNode;
  hover: boolean;
  minimized: boolean;
};

export type programType = {
    name: string;
    visible: boolean;
}

export type DesktopIcon = {

    name: string;
    icon: string;
    rename: boolean;
    type: string;
    open: boolean;
    content?: DesktopIcon[]
  
};