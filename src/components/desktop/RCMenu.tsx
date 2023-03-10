import "../../styles/RCMenu.scss";
import DesktopOption from "./DesktopOptions";
import IconOptions from "./IconOptions";
import "../../assets/folder.png";
import { DesktopIconType } from "../../types/project_types";

interface Props {
  rcMenuRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  whichMenu: string;
  currentFocus: string;
  allFiles: any
  setAllFiles: React.Dispatch<
    React.SetStateAction<DesktopIconType[]>>;
}

export default function RCMenu({
  rcMenuRef,
  whichMenu,
  currentFocus,
  inputRef,
  setAllFiles,
  allFiles
}: Props) {

  return (
    <div id='rc-menu' ref={rcMenuRef}>
      {whichMenu == "icon" || whichMenu == "desktop-icon" ? (
        <IconOptions
          currentFocus={currentFocus}
          inputRef={inputRef}
          allFiles={allFiles}
          setAllFiles={setAllFiles}
          />
      ) : (
        <DesktopOption
          setAllFiles={setAllFiles}
          allFiles={allFiles}
        />
      )}
    </div>
  );
}
