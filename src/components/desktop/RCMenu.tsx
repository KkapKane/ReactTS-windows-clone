import "../../styles/RCMenu.scss";
import "../../assets/folder.png";
import DesktopOption from "./DesktopOptions";
import IconOptions from "./IconOptions";
import { DesktopIconType } from "../../types/project_types";

interface Props {
  rcMenuRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  setDesktopIcon: React.Dispatch<React.SetStateAction<DesktopIconType[]>>;
  desktopIcon: DesktopIconType[];
  whichMenu: string;
  currentFocus: string;
  allFiles: any
  setAllFiles: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        icon: string;
        rename: boolean;
        type: string;
        open: boolean;
        content: never[];
      }[]
    >
  >;
}

export default function RCMenu({
  rcMenuRef,
  setDesktopIcon,
  desktopIcon,
  whichMenu,
  currentFocus,
  inputRef,
  setAllFiles,
  allFiles

}: Props) {
  return (
    <div id='rc-menu' ref={rcMenuRef}>
      {whichMenu == "icon" || whichMenu == "desktop-icon" ? (
        <IconOptions desktopIcon={desktopIcon} setDesktopIcon={setDesktopIcon} currentFocus={currentFocus} inputRef={inputRef} allFiles={allFiles} setAllFiles={setAllFiles}/>
      ) : (
        <DesktopOption
          desktopIcon={desktopIcon}
          setDesktopIcon={setDesktopIcon}
          setAllFiles={setAllFiles}
          allFiles={allFiles}
        />
      )}
    </div>
  );
}
