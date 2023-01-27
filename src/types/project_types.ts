import { ReactNode } from 'react'

export type taskType = {
  name: string;
  icon: string | ReactNode;
  hover: boolean;
  minimized: boolean;
};

export type programType = {
  name: string;
  icon: string | ReactNode;
  visible: boolean;
  type: string;
}

export type DesktopIconType = {
  name: string;
  icon: string;
  rename: boolean;
  type: string;
  open: boolean;
  parent: string;
  filePath: string[];
};