import '../../styles/RCMenu.scss'
import '../../assets/folder.png'
import DesktopOption from './DesktopOptions';
import IconOptions from './IconOptions';

interface Props {
  rcMenuRef: React.RefObject<HTMLDivElement>;
  setDesktopIcon: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        icon: string;
      }[]
    >
  >;
   desktopIcon: {
    name: string;
    icon: string;
}[]

whichMenu: string;
}



export default function RCMenu({rcMenuRef, setDesktopIcon, desktopIcon, whichMenu} : Props ){

  
  




 

     return (
       <div id='rc-menu' ref={rcMenuRef}>
         {whichMenu == '' ?<DesktopOption desktopIcon={desktopIcon} setDesktopIcon={setDesktopIcon}/> : null}
         {whichMenu =='icon' || whichMenu == 'desktop-icon' ? <IconOptions /> : null}
       </div>
     );
}