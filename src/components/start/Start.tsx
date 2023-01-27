import { useEffect, useState } from "react";
import "../../styles/start.scss";
import StartPanel from "./StartPanel";
import windows from "../../assets/windows.png";

export default function Start() {

  const [isClicked, setIsClicked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  //close the start-panel if clicked anywhere outside
  useEffect(() => {
    document.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLDivElement;
      if (target.className !== "start-icon") {
        setIsClicked(false);
      }
    });
  }, []);

  return (
    <div
      id='start'
      className='start-icon'
      onClick={() => setIsClicked(!isClicked)} >
      <img
        src={windows}
        onClick={() => setIsClicked(!isClicked)}
        className='start-icon'
        alt='' />
      <StartPanel
        isClicked={isClicked}
        isHover={isHover}
        setIsHover={setIsHover}
        />
    </div>
  );
}
