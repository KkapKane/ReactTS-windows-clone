import '../../styles/openedFile.scss'
import{useEffect, useRef, useState} from 'react';
import { dragDrop } from '../../helper/DragDrop';
import { MdOutlineClose } from 'react-icons/md'
import { DesktopIcon } from '../../types/project_types';
import DesktopIconComponent from './DesktopIcon';
interface Props {
  currentFocus: string;
  desktopIcon: DesktopIcon[];
  icon: DesktopIcon;
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
  setDesktopIcon: React.Dispatch<React.SetStateAction<DesktopIcon[]>>;
  inputRef: React.RefObject<HTMLInputElement>;
  findMouseLocation: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    name: string
  ) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setfinalMouseDestination: React.Dispatch<
    React.SetStateAction<{
      name: string;
      icon: string;
      rename: boolean;
      type: string;
      open: boolean;
    }>
  >;
}


export default function OpenedFile({ desktopIcon, icon, index, currentFocus,setfinalMouseDestination, setInput, findMouseLocation, handleKeyDown, setDesktopIcon, containerRef, inputRef}: Props){
    
    const[fileContent, setFileContent]: any = useState()

    const fileRef = useRef(null)
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
    const closeFile = () => {
        let newFile = desktopIcon.map((x)=>{
            if(x.name == icon.name){
                return {...x, open: false}
            }else {
                return {...x, open: false}
            }
        })
        setDesktopIcon(newFile)
    }
    
    useEffect(()=>{
        if(icon.content)
       icon.content.map((file)=>{
        console.log([file])
       })
      
      

        dragDrop(fileRef,containerRef,'handle',coords,isClicked)
    },[])
     

    return (
        <div className="opened-file" ref={fileRef}>
            <div id="handle">
            <img src={icon.icon} alt="" />
            {icon.name}
            <MdOutlineClose onClick={()=>closeFile()}/>
            </div>
            {icon.type === 'folder' ? <div>{icon.content?.map((c)=>{return (
              <div>
                <img src={c.icon} alt="" />
                  {c.name}
              </div>
            );})}</div> : <textarea className='textdoc-text-area' > </textarea>}
        </div>
    )
}