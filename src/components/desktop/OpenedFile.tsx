import '../../styles/openedFile.scss'
import{useEffect, useRef, useState} from 'react';
import { dragDrop } from '../../helper/DragDrop';
import { MdOutlineClose } from 'react-icons/md'
import { DesktopIconType } from '../../types/project_types';

interface Props {
  desktopIcon: DesktopIconType[];
  icon: DesktopIconType;
  containerRef: React.RefObject<HTMLDivElement>;
  setDesktopIcon: React.Dispatch<React.SetStateAction<DesktopIconType[]>>;
 
  
}


export default function OpenedFile({ desktopIcon, icon, setDesktopIcon, containerRef}: Props){
    
    

    const fileRef = useRef(null)
    const isClicked = useRef<boolean>(false);
    const coords = useRef<{startX: number;startY: number;lastX: number;lastY: number;}>
    ({startX: 0,startY: 0,lastX: 0,lastY: 0,});

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
              <div className='desktop-icon'>
                <img src={c.icon} alt="" />
                  {c.name}
                
              </div>
            );})}</div> : <textarea className='textdoc-text-area' > </textarea>}
        </div>
    )
}