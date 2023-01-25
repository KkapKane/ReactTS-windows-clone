import OpenedFile from "./OpenedFile";
import { DesktopIconType } from "../../types/project_types";
import {useState, useEffect} from 'react';

interface Props {
  setfinalMouseDestination: React.Dispatch<
    React.SetStateAction<DesktopIconType>
  >;
  setDesktopIcon: React.Dispatch<React.SetStateAction<DesktopIconType[]>>;
  findMouseLocation: (event: React.MouseEvent<HTMLDivElement>) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setCurrentFocus: React.Dispatch<React.SetStateAction<string>>;
  containerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;

  desktopIcon: DesktopIconType[];

  currentFocus: string;
  icon: DesktopIconType;
  index: number;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    name: string
  ) => void;
}

export default function DesktopIconComponent({icon, index,setfinalMouseDestination, setCurrentFocus, containerRef,desktopIcon, currentFocus, inputRef,  findMouseLocation, handleKeyDown, setInput, setDesktopIcon}: Props){

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
      <div
        className='desktop-icon'
        id={icon.name}
        onClick={()=> openIcon(icon.name)}
        onMouseEnter={(e) => findMouseLocation(e)}
      >
        <img
          className='icon'
          src={icon.icon}
          alt=''
          id={icon.name}
        />

        {icon.rename === true ? (
          <input
            type='text'
            ref={inputRef}
            style={{ width: "80%" }}
            onKeyDown={(e) => handleKeyDown(e, currentFocus)}
            onChange={(e) => setInput(e.target.value)}
          />
        ) : (
          icon.name
        )}
        
      </div>
    );
}