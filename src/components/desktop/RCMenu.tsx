import "../../styles/RCMenu.scss";
import "../../assets/folder.png";
import DesktopOption from "./DesktopOptions";
import IconOptions from "./IconOptions";
import { DesktopIconType } from "../../types/project_types";

interface Props {
  rcMenuRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;

  whichMenu: string;
  currentFocus: string;
  allFiles: DesktopIconType[];
  setAllFiles: React.Dispatch<React.SetStateAction<DesktopIconType[]>>;
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
        <IconOptions currentFocus={currentFocus} inputRef={inputRef} allFiles={allFiles} setAllFiles={setAllFiles}/>
      ) : (
        <DesktopOption
       
          setAllFiles={setAllFiles}
          allFiles={allFiles}
        />
      )}
    </div>
  );
}
