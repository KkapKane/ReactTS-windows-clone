import OpenedFile from "./OpenedFile";
import { DesktopIconType } from "../../types/project_types";


interface Props {
  setfinalMouseDestination: React.Dispatch<
    React.SetStateAction<DesktopIconType>
  >;
  setDesktopIcon: React.Dispatch<React.SetStateAction<DesktopIconType[]>>;
  findMouseLocation: (event: React.MouseEvent<HTMLDivElement>) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
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

export default function DesktopIcon({icon, index, containerRef,desktopIcon, currentFocus, inputRef,  findMouseLocation, handleKeyDown, setInput, setDesktopIcon}: Props){
    return (
      <div
        className='desktop-icon'
        id={desktopIcon[index].name}
        onMouseDown={() => {}}
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
            
            desktopIcon={desktopIcon}
            icon={icon}
            setDesktopIcon={setDesktopIcon}
            containerRef={containerRef}
          />
        ) : null}
      </div>
    );
}