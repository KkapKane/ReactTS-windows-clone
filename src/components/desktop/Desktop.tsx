import "../../styles/desktop.scss";
import Paint from "../../components/programs/Paint/Paint";
import Calculator from "../../components/programs/Calculator";
import Audition from "../../components/programs/Audition";
import { useState, useRef } from "react";
import OpenedFile from "./OpenedFile";

interface Props {
  setDesktopIcon: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        icon: string;
        rename: boolean;
        type: string;
        open: boolean;
      }[]
    >
  >;

  desktopIcon: {
    name: string;
    icon: string;
    rename: boolean;
    type: string;
    open: boolean;
  }[];
  calcRef: React.RefObject<HTMLDivElement>;
  audiRef: React.RefObject<HTMLDivElement>;
  paintRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  programs: {
    name: string;
    visible: boolean;
  }[];
  setfinalMouseDestination: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        icon: string;
        rename: boolean;
        type: string;
        open: boolean;
      }
    >
  >;
  containerRef: React.RefObject<HTMLDivElement>;
  currentFocus: string;
}

export default function Desktop({
  desktopIcon,
  paintRef,
  calcRef,
  audiRef,
  programs,
  containerRef,
  currentFocus,
  setDesktopIcon,
  inputRef,
  setfinalMouseDestination
}: Props) {
  const [input, setInput] = useState("");

  //detects if Enter Key is pressed, if so then run map to find currentfocused matching icon name in desktopicon array and change name of it to the input state
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    name: string
  ) => {
    if (event.key === "Enter") {
      let newName = desktopIcon.map((icon) => {
        if (icon.name === name) {
          return { ...icon, name: input, rename: false };
        } else {
          return { ...icon, name: icon.name };
        }
      });
      //tries to find if the current name being type already exist in desktopicon array or not.
      const index = desktopIcon.findIndex(
        (iconName) => iconName.name === input
      );
      if (input === "" || index !== -1) {
        return;
      }
      setDesktopIcon(newName);
    }
  };
  const findMouseLocation = (event: React.MouseEvent<HTMLDivElement>) => {
    let target = event.target as HTMLDivElement;
    const index = desktopIcon.findIndex((iconName) => iconName.name === target.id);
    setfinalMouseDestination(desktopIcon[index]);
  };

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
      {desktopIcon.map((icon, index) => {
        return (
          <div
            className='desktop-icon'
            id={desktopIcon[index].name}
            onMouseDown={() => {
            }}
            onMouseEnter={(e) => findMouseLocation(e)}
          >
            <img
              className='icon'
              src={desktopIcon[index].icon}
              alt=''
              id={desktopIcon[index].name}
            />

            {desktopIcon[index].rename === true ? (
              <input
                type='text'
                ref={inputRef}
                style={{ width: "80%" }}
                onKeyDown={(e) => handleKeyDown(e, currentFocus)}
                onChange={(e) => setInput(e.target.value)}
              />
            ) : (
              desktopIcon[index].name
            )}
            {desktopIcon[index].open === true ? (
              <OpenedFile
                currentFocus={currentFocus}
                desktopIcon={desktopIcon}
                icon={icon}
                setDesktopIcon={setDesktopIcon}
                containerRef={containerRef}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
