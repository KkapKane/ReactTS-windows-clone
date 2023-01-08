import '../styles/taskbar.scss'
import { useState , useEffect } from 'react';

interface taskObj {
  name: string;
  icon: any;
  hover: boolean;
}


interface Props {
    name: string;
    icon: any;
    
}

export default function Task({name, icon}: Props){


const hoverHandle = (taskName: string, status: boolean) => {

    
}

return (
  <>
    <div
      className='task'
      onMouseEnter={() => hoverHandle(name, true)}
      onMouseLeave={() => hoverHandle(name, false)}
    >
      <img src={icon} alt='' />
    </div>
  </>
);
}