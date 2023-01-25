import '../../styles/openedFile.scss'
import{useEffect, useRef, useState, useContext} from 'react';
import { dragDrop } from '../../helper/DragDrop';
import { MdOutlineClose } from 'react-icons/md'
import { DesktopIconType } from '../../types/project_types';
import { Programs } from '../context/Programs';
import { MouseEvent } from 'react';

interface Props {
  desktopIcon: DesktopIconType[];
  icon: DesktopIconType;
  containerRef: React.RefObject<HTMLDivElement>;
  setDesktopIcon: React.Dispatch<React.SetStateAction<DesktopIconType[]>>;
 
  
}


export default function OpenedFile({ desktopIcon, icon, setDesktopIcon, containerRef}: Props){
    
    
    const [folderContent, setFolderContent] = useState<DesktopIconType[]>()
    const { programs, setPrograms }: any = useContext(Programs);
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

    const setStartingCoord = (e: MouseEvent) => {
      let target = e.target as HTMLDivElement;
        
           coords.current.startX = e.clientX;
           coords.current.startY = e.clientY;
         
    
    }
    
    //all system files
    
    useEffect(()=>{
      let folderFiles: any = []
      if(icon.content)
      icon.content.map((file: any)=>{
        
        folderFiles.push(file)
        
      })
      setFolderContent(folderFiles)
      
        dragDrop(fileRef,containerRef,'handle',coords,isClicked)
    },[])


   
     
    const openIcon = (name: string) => {
      if (icon.content) {
        let testlist = icon.content.map((file) => {
          if (file.name == name) {
            return { ...file, open: true };
          } else {
            return { ...file, open: false };
          }
        });
        let testlist2 = desktopIcon.map((folder) => {
          if (folder.name == icon.name) {
            return { ...folder, content: testlist };
          } else {
            return { ...folder, content: folder.content };
          }
        });
        let testlist3 = testlist2.map((x) => {
          if (x.name == icon.name) {
            return { ...x, open: false };
          } else {
            return { ...x, open: x.open };
          }
        });
        console.log(testlist3);
        setDesktopIcon(testlist3);
      }
    };

    

    return (
        <div className="opened-file" ref={fileRef}>
            <div id="handle" >
            <img src={icon.icon} alt="" />
            {icon.name}
            <MdOutlineClose onClick={()=>closeFile()}/>
            </div>
            {folderContent ? <div>{folderContent.map((c:any)=>{return (
              <div className='desktop-icon' onClick={()=> openIcon(c.name)}>
                <img src={c.icon} alt="" />
                  {c.name}
                
              </div>
            );})}</div> : <textarea className='textdoc-text-area' > </textarea>}
        </div>
    )
}