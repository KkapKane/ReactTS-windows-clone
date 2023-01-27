import "../../styles/desktop.scss";
import Paint from "../../components/programs/Paint/Paint";
import Calculator from "../../components/programs/Calculator";
import Audition from "../../components/programs/Audition";
import { useState } from "react";
import OpenedFile from "./OpenedFile";
import DesktopIcon from "./DesktopIcon";
import { DesktopIconType } from "../../types/project_types";
import Youtube from '../programs/Youtube';
import Twitter from "../programs/Twitter";
import MapleStore from "../programs/MapleStore";
import Arashiyama from "../programs/Arashiyama";
import Todo from "../programs/Todo";

interface Props {
  
  calcRef: React.RefObject<HTMLDivElement>;
  paintRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  allFiles: any;

  programs: {
    name: string;
    visible: boolean;
  }[];
  setfinalMouseDestination: React.Dispatch<
    React.SetStateAction<DesktopIconType>
  >;
  containerRef: React.RefObject<HTMLDivElement>;
  currentFocus: string;

  setAllFiles: any;
}

export default function Desktop({

  paintRef,
  calcRef,
  programs,
  containerRef,
  currentFocus,
  
  inputRef,
  setfinalMouseDestination,
  allFiles,
  setAllFiles,
  
}: Props) {
  const [input, setInput] = useState("");

  //detects if Enter Key is pressed, if so then run map to find currentfocused matching icon name in desktopicon array and change name of it to the input state
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    name: string
  ) => {
    if (event.key === "Enter") {
      let newName = allFiles.map((icon: any) => {
        if (icon.name === name) {
          return { ...icon, name: input, rename: false };
        } else {
          return { ...icon, name: icon.name };
        }
      });
      //tries to find if the current name being type already exist in desktopicon array or not.
      const index = allFiles.findIndex(
        (iconName:any) => iconName.name === input
      );
      if (input === "" || index !== -1) {
        return;
      }
      setAllFiles(newName);
    }
  };
  const findMouseLocation = (event: React.MouseEvent<HTMLDivElement>) => {
    let target = event.target as HTMLDivElement;
    const index = allFiles.findIndex((iconName: any) => iconName.name === target.id);
    setfinalMouseDestination(allFiles[index]);
  };
const [currentPath, setCurrentPath] = useState<string[]>([]);
  return (
    <div id='desktop'>
      {programs[0]?.visible === true ? (
        <Calculator calcRef={calcRef} containerRef={containerRef} />
      ) : null}
      {programs[1]?.visible === true ? (
        <Paint  paintRef={paintRef} containerRef={containerRef} />
      ) : null}
      {programs[2]?.visible === true ? (
        <Audition />
      ) : null}
      {programs[3]?.visible === true ? (
        <Youtube />
      ) : null}
      {programs[4]?.visible === true ? (
        <Twitter  />
      ) : null}
      {programs[5]?.visible === true ? (
        <MapleStore />
      ) : null}
      {programs[6]?.visible === true ? (
        <Arashiyama  />
      ) : null}
      {programs[7]?.visible === true ? (
        <Todo  />
      ) : null}
      {allFiles.map((icon: any, index:number) => {
        return (
          <div key={index}>
            {icon.parent == '' ? <DesktopIcon
              icon={icon}
              currentFocus={currentFocus}
              inputRef={inputRef}
              findMouseLocation={findMouseLocation}
              handleKeyDown={handleKeyDown}
              setInput={setInput}
            />: null}
            {icon.open === true ? (
              <OpenedFile
                containerRef={containerRef}
                icon={icon}
                currentFocus={currentFocus}
                inputRef={inputRef}
                allFiles={allFiles}
                setAllFiles={setAllFiles}
                handleKeyDown={handleKeyDown}
                setInput={setInput}
                findMouseLocation={findMouseLocation}
                currentPath={currentPath}
                setCurrentPath={setCurrentPath}
              />
            ) : null}
            
          </div>
        );
      })}
    </div>
  );
}
