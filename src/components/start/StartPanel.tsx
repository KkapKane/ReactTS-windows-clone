import StartNav from "./StartNav";
import StartPrograms from "./StartPrograms";



interface Props {
  isHover: boolean;
  isClicked: boolean;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StartPanel({isClicked, isHover, setIsHover} : Props) {
  return (
    <div id='start-panel' style={isClicked ? { display: "flex" } : {}}>
      <StartNav
        isClicked={isClicked}
        isHover={isHover}
        setIsHover={setIsHover}
      />
      <StartPrograms  />
    </div>
  );
}
