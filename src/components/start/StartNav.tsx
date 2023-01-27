import { AiOutlinePicture, AiOutlinePoweroff } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiFileBlank } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";

interface Props {
  isHover: boolean;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StartNav({ isHover, setIsHover }: Props) {

  let timer: any = 0;
  const TIMEOUT = 1500;

  function mouseEnter() {
    timer = setTimeout(() => {
      setIsHover(true);
    }, TIMEOUT)
  }

  function mouseLeave() {
    setIsHover(false);
    clearTimeout(timer);
  }

  return (
    <div
      className='start-navBar'
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      style={
        isHover
          ? { width: "50%", boxShadow: "2px 1px 7px #1a1a1a" }
          : { width: "60px" }
      }
    >
      <div id='start-hamburger'>
        <RxHamburgerMenu size={22} />
        {isHover ? <span style={{ fontWeight: "600" }}>START</span> : null}
      </div>
      <div className='start-bottomGroup' >
        <div className='start-utility'>
          <CgProfile size={21} />
          {isHover ? <span>Profile</span> : null}
        </div>
        <div className='start-utility'>
          <BiFileBlank size={21} />
          {isHover ? <span>Documents</span> : null}
        </div>

        <div className='start-utility'>
          <AiOutlinePicture size={21} />
          {isHover ? <span>Pictures</span> : null}
        </div>
        <div className='start-utility'>
          <CiSettings size={21} />
          {isHover ? <span>Settings</span> : null}
        </div>
        <div className='start-utility'>
          <AiOutlinePoweroff size={21} />
          {isHover ? <span>Power</span> : null}
        </div>
      </div>
    </div>
  );
}
