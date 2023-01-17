import '../../styles/desktop.scss'
import Paint from "../../components/programs/Paint/Paint";
import Calculator from "../../components/programs/Calculator";
import Audition from "../../components/programs/Audition";
import { useState } from 'react'
interface Props {
  desktopIcon: {
    name: string;
    icon: string;
  }[];
  calcRef: React.RefObject<HTMLDivElement>;
  audiRef: React.RefObject<HTMLDivElement>;
  paintRef: React.RefObject<HTMLDivElement>;
  programs: {
    name: string;
    visible: boolean;
  }[];
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function Desktop({desktopIcon, paintRef, calcRef, audiRef, programs, containerRef}: Props){

const [rename,setRename] = useState(true)
  
    return (
      <div id='desktop'>
        {programs[0]?.visible === true ? (
          <Calculator calcRef={calcRef} containerRef={containerRef} />
        ) : null}
        {programs[1]?.visible === true ? (
          <Paint paintRef={paintRef} containerRef={containerRef} />
        ) : null}
        {programs[2]?.visible === true ? (
          <Audition audiRef={audiRef} containerRef={containerRef} />
        ) : null}
        {desktopIcon.map((cell, index) => {
          return (
            <div className='desktop-icon'>
              <img className='icon' src={desktopIcon[index].icon} alt='' />
              {desktopIcon[index].name}
            </div>
          );
        })}
      </div>
    );
}