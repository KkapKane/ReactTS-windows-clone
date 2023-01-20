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
  //   calcRef: React.RefObject<HTMLDivElement>;
  //   audiRef: React.RefObject<HTMLDivElement>;
  //   paintRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;

  setfinalMouseDestination: React.Dispatch<
    React.SetStateAction<{
      name: string;
      icon: string;
      rename: boolean;
      type: string;
      open: boolean;
    }>
  >;
  containerRef: React.RefObject<HTMLDivElement>;
  currentFocus: string;
  icon: {
    name: string;
    icon: string;
    rename: boolean;
    type: string;
    open: boolean;
  };
  index: number;
  findMouseLocation: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    name: string
  ) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;

 
}

export default function DesktopIcon({icon, index, containerRef,desktopIcon, currentFocus, inputRef, setfinalMouseDestination, findMouseLocation, handleKeyDown, setInput, setDesktopIcon}: Props){
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
            currentFocus={currentFocus}
            desktopIcon={desktopIcon}
            icon={icon}
            setDesktopIcon={setDesktopIcon}
            containerRef={containerRef}
            index={index}
            inputRef={inputRef}
            findMouseLocation={findMouseLocation}
            handleKeyDown={handleKeyDown}
            setInput={setInput}
            setfinalMouseDestination={setfinalMouseDestination}
          />
        ) : null}
      </div>
    );
}