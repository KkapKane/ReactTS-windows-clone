import OpenedFile from "./OpenedFile";
import { DesktopIconType } from "../../types/project_types";


interface Props {

  findMouseLocation: (event: React.MouseEvent<HTMLDivElement>) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
 
  inputRef: React.RefObject<HTMLInputElement>;



  currentFocus: string;
  icon: DesktopIconType;
 
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    name: string
  ) => void;
}

export default function DesktopIcon({icon, currentFocus, inputRef,  findMouseLocation, handleKeyDown, setInput}: Props){
    return (
      <div
        className='desktop-icon'
        id={icon.name}
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