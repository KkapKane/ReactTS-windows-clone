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
  allFiles: any;
  setAllFiles: any;
  findMouseLocation: (event: React.MouseEvent<HTMLDivElement>) => void;
}


export default function OpenedFile({ desktopIcon, icon, setDesktopIcon,findMouseLocation, containerRef, allFiles, setAllFiles}: Props){
    
    
    const [folderContent, setFolderContent] = useState<DesktopIconType[]>()
    const { programs, setPrograms }: any = useContext(Programs);
    const fileRef = useRef(null)
    const isClicked = useRef<boolean>(false);
    const coords = useRef<{startX: number;startY: number;lastX: number;lastY: number;}>
    ({startX: 0,startY: 0,lastX: 0,lastY: 0,});

    const closeFile = () => {
        let newFile = allFiles.map((x: any)=>{
            if(x.name == icon.name){
                return {...x, open: false}
            }else {
                return {...x, open: false}
            }
        })
        setAllFiles(newFile)
    }

 
    
    //all system files
    
    useEffect(()=>{
      console.log(allFiles)
      let folderFiles: any = []
      if(icon.content)
      icon.content.map((file: any)=>{
        
        folderFiles.push(file)
        
      })
      setFolderContent(folderFiles)
      
        dragDrop(fileRef,containerRef,'handle',coords,isClicked)
    },[])


   
     
    const openIcon = (name: string) => {
      
      let pleasework = allFiles.map((file: any)=>{
        if(file.name == name){
          return {...file, open: true}
        }
        else{
          return {...file, open: false}
        }
      })
      setAllFiles(pleasework)
    };

    

    return (
      <div
        className='opened-file'
        ref={fileRef}
        id={icon.name}
        onMouseEnter={(e) => findMouseLocation(e)}
      >
        <div id='handle'>
          <img src={icon.icon} alt={icon.name} />
          {icon.name}
          <MdOutlineClose onClick={() => closeFile()} />
        </div>
        {allFiles
          ? allFiles.map((file: any) => {
              if (file.parent === icon.name) {
                return (
                  <div
                    className='desktop-icon'
                    onMouseEnter={(e) => findMouseLocation(e)}
                    onClick={() => openIcon(file.name)}
                    id={file.name}
                  >
                    <img
                      src={file.icon}
                      alt=''
                      className='icon'
                      id={file.name}
                    />
                    {file.name}
                  </div>
                );
              }
            })
          : null}
      </div>
    );
}