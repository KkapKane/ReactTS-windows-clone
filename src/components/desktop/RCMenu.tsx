import "../../styles/RCMenu.scss";
import "../../assets/folder.png";
import DesktopOption from "./DesktopOptions";
import IconOptions from "./IconOptions";

interface Props {
  rcMenuRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  setDesktopIcon: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        icon: string;
        rename: boolean;
      }[]
    >
  >;
  desktopIcon: {
    name: string;
    icon: string;
    rename: boolean;
  }[];

  whichMenu: string;
  currentFocus: string;
}

export default function RCMenu({
  rcMenuRef,
  setDesktopIcon,
  desktopIcon,
  whichMenu,
  currentFocus,
  inputRef

}: Props) {
  return (
    <div id='rc-menu' ref={rcMenuRef}>
      {whichMenu == "icon" || whichMenu == "desktop-icon" ? (
        <IconOptions desktopIcon={desktopIcon} setDesktopIcon={setDesktopIcon} currentFocus={currentFocus} inputRef={inputRef}/>
      ) : (
        <DesktopOption
          desktopIcon={desktopIcon}
          setDesktopIcon={setDesktopIcon}
        />
      )}
    </div>
  );
}
