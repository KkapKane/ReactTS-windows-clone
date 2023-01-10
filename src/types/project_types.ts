import {ReactNode} from 'react'

export type taskType = {
  name: string;
  icon: string | ReactNode;
  hover: boolean;
};

export type programType = {
    name: string;
    visible: boolean;
}
