import "../../styles/openedFile.scss";
import { useEffect, useRef,  useContext } from "react";
import { MdOutlineClose } from "react-icons/md";
import { DesktopIconType } from "../../types/project_types";
import { dragInfo } from "../context/Context";

import DesktopIcon from "./DesktopIcon";
import { dragStart, dragging, dragEnd } from "../../helper/BetterDragDrop";

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
}

export default function OpenedFile({
  icon,
  setCurrentPath,
  currentPath,
  findMouseLocation,
  containerRef,
  allFiles,
  setAllFiles,
  setInput,
  inputRef,
  currentFocus,
  handleKeyDown,
}: Props) {
  const fileRef = useRef(null);
const { dragContainerInfo, setDragContainerInfo }: any = useContext(dragInfo);
const helperHandleRef = useRef<HTMLDivElement>(null);
  const closeFile = () => {
    let newFile = allFiles.map((x: any) => {
      if (x.name == icon.name) {
        return { ...x, open: false };
      } else {
        return { ...x, open: false };
      }
    });
    setCurrentPath([]);
    setAllFiles(newFile);
  };

  //all system files

  useEffect(() => {
    if (currentPath.includes(icon.name)) return;

    setCurrentPath((prev) => [...prev, icon.name]);

    // dragDrop(fileRef,containerRef,'handle',coords,isClicked)
  }, []);

  useEffect(() => {
    console.log(currentPath);
  }, [currentPath]);

  const goBack = () => {
    if (icon.parent == "") return;
    let previous = allFiles.map((file: any) => {
      if (icon.parent === file.name) {
        return { ...file, open: true };
      } else {
        return { ...file, open: false };
      }
    });
    let erasePath = currentPath;
    erasePath.pop();
    erasePath.pop();
    setCurrentPath(erasePath);
    setAllFiles(previous);
  };

  useEffect(() => {
    const falseDrag = () => {
      setDragContainerInfo({ ...dragContainerInfo, dragging: false });
    };
    document.body.addEventListener("mouseup", falseDrag);
    return () => document.body.removeEventListener("mouseup", falseDrag);
  }, [dragContainerInfo]);

  return (
    <div
      style={dragContainerInfo.styles}
      onMouseDown={(e) =>
        dragStart(e, "handle", setDragContainerInfo, dragContainerInfo, helperHandleRef)
      }
      onMouseMove={(e) => dragging(e, setDragContainerInfo, dragContainerInfo)}
      onMouseUp={(e) =>
        dragEnd(e, setDragContainerInfo, dragContainerInfo, helperHandleRef)
      }
      className='opened-file'
      ref={fileRef}
      id={icon.name}
      onMouseEnter={(e) => findMouseLocation(e)}
    >
      <span className='extended-handle' ref={helperHandleRef}></span>
      <div id='handle'>
        <button onClick={() => goBack()}>back</button>

        <img src={icon.icon} alt={icon.name} />
        {icon.name}
        <MdOutlineClose onClick={() => closeFile()} />
      </div>
      <div className='file-path'>{`${currentPath}`}</div>
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

