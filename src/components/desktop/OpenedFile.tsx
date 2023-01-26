import '../../styles/openedFile.scss'
import { useEffect, useRef, useState, useContext } from 'react';
import { dragDrop } from '../../helper/DragDrop';
import { RxCross2 } from 'react-icons/rx';
import { HiChevronRight } from "react-icons/hi";
import { FiArrowLeft } from "react-icons/fi";
import { DesktopIconType } from '../../types/project_types';
import { Programs } from '../context/Programs';
import { MouseEvent } from 'react';
import DesktopIcon from './DesktopIcon';
import { dragStart, dragging, dragEnd } from '../../helper/BetterDragDrop';

interface Props {
  icon: DesktopIconType;
  containerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;

  allFiles: any;
  setAllFiles: any;
  findMouseLocation: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    name: string
  ) => void;
  currentFocus: any;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPath: React.Dispatch<React.SetStateAction<string[]>>;
  currentPath: string[];
  setFileContainerInfo: React.Dispatch<
    React.SetStateAction<{
      diffX: number;
      diffY: number;
      dragging: boolean;
      styles: {};
    }>
  >;
  fileContainerInfo: any;
}


export default function OpenedFile({ icon, setCurrentPath, fileContainerInfo, setFileContainerInfo, currentPath, findMouseLocation, containerRef, allFiles, setAllFiles, setInput, inputRef, currentFocus, handleKeyDown }: Props) {



  const fileRef = useRef(null)
  const isClicked = useRef<boolean>(false);

  const coords = useRef<{ startX: number; startY: number; lastX: number; lastY: number; }>
    ({ startX: 0, startY: 0, lastX: 0, lastY: 0, });



  const closeFile = () => {
    let newFile = allFiles.map((x: any) => {
      if (x.name == icon.name) {
        return { ...x, open: false }
      } else {
        return { ...x, open: false }
      }
    })
    setCurrentPath([])
    setAllFiles(newFile)
  }



  //all system files

  useEffect(() => {
    if (currentPath.includes(icon.name)) return;

    setCurrentPath((prev) => ([...prev, icon.name]));



    // dragDrop(fileRef,containerRef,'handle',coords,isClicked)
  }, [])

  useEffect(() => {
    console.log(currentPath)
  }, [currentPath])

  const goBack = () => {
    if (icon.parent == '') return;
    let previous = allFiles.map((file: any) => {
      if (icon.parent === file.name) {
        return { ...file, open: true }
      } else {
        return { ...file, open: false }
      }
    })
    let erasePath = currentPath
    erasePath.pop()
    erasePath.pop()
    setCurrentPath(erasePath)
    setAllFiles(previous)

  }

  useEffect(() => {
    const falseDrag = () => {

      setFileContainerInfo({ ...fileContainerInfo, dragging: false })
    }
    document.body.addEventListener('mouseup', falseDrag)
    return () => document.body.removeEventListener('mouseup', falseDrag)
  }, [fileContainerInfo])

  //  const dragStart = (e: MouseEvent) =>{
  //   let target = e.target as HTMLDivElement
  //   setFileContainerInfo({...fileContainerInfo, 
  //     diffX: e.screenX - target.getBoundingClientRect().left,
  //     diffY: e.screenY - target.getBoundingClientRect().top,
  //     dragging: true  
  //   })

  //  }
  //  const dragging = (e: MouseEvent)  =>{
  //   if(fileContainerInfo.dragging){
  //     let left = e.screenX - fileContainerInfo.diffX
  //     let top = e.screenY - fileContainerInfo.diffY
  //     setFileContainerInfo({...fileContainerInfo, styles: {left: left, top: top}})

  //   }
  //  }  
  //  const dragEnd = (e: MouseEvent)  =>{
  //   setFileContainerInfo({...fileContainerInfo, dragging: false})
  //  }  


  return (
    <div

      style={fileContainerInfo.styles}
      onMouseDown={(e) =>
        dragStart(e, 'handle', setFileContainerInfo, fileContainerInfo)
      }
      onMouseMove={(e) =>
        dragging(e, setFileContainerInfo, fileContainerInfo)
      }

      onMouseUp={(e) => dragEnd(e, setFileContainerInfo, fileContainerInfo)}
      className='opened-file'
      ref={fileRef}
      id={icon.name}
      onMouseEnter={(e) => findMouseLocation(e)}
    >
      <div id='handle'>
        <div className="icon">
          <img src={icon.icon} alt={icon.name} />
          <span>{icon.name}</span> 
        </div>
        <RxCross2 size={20} onClick={() => closeFile()} />
      </div>
      <div className="file-navigation">
        <button onClick={() => goBack()}> <FiArrowLeft size={16} /> </button>
        <div className='file-path'>
          {currentPath.map((path: string, index: number) => {
            return (
              <span key={index}>
                <p>{path}</p>
                <HiChevronRight />
              </span>
            )
          })}
        </div>
      </div>

      {allFiles
        ? allFiles.map((file: any) => {
          if (file.parent === icon.name) {
            return (
              <DesktopIcon
                icon={file}
                currentFocus={currentFocus}
                inputRef={inputRef}
                findMouseLocation={findMouseLocation}
                handleKeyDown={handleKeyDown}
                setInput={setInput}
              />
            );
          }
        })
        : null}
    </div>
  );
}