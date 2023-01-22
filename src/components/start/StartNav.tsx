import { AiOutlinePicture, AiOutlinePoweroff } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiFileBlank } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { useEffect, useState } from 'react';

interface Props {
  isHover: boolean;
  isClicked: boolean;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StartNav({ isClicked, isHover, setIsHover }: Props) {

  // new state so we can delay the display of sidebar after hovering //
  const [isShow, setIsShow] = useState(false);

useEffect(() => {
  if (isHover == false) {
    const timeout = setTimeout(() => setIsShow(!isShow), 700);
    return () => clearInterval(timeout);
  } 
  else {
    const timeout = setTimeout(() => setIsShow(!isShow), 1200);
    return () => clearInterval(timeout);
  }
}, [isHover])

  return (
    <div
      className='start-navBar'
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      style={
        isShow
          ? { width: "50%", boxShadow: "3px 1px 8px #1a1a1a" }
          : { width: "60px" }
      }
    >
      <div id='start-hamburger'>
        <RxHamburgerMenu size={22} />
        {isShow ? <span style={{ fontWeight: "600" }}>START</span> : null}
      </div>
      <div className='start-bottomGroup' >
        <div className='start-utility'>
          <CgProfile size={21} />
          {isShow ? <span>Profile</span> : null}
        </div>
        <div className='start-utility'>
          <BiFileBlank size={21} />
          {isShow ? <span>Documents</span> : null}
        </div>

        <div className='start-utility'>
          <AiOutlinePicture size={21} />
          {isShow ? <span>Pictures</span> : null}
        </div>
        <div className='start-utility'>
          <CiSettings size={21} />
          {isShow ? <span>Settings</span> : null}
        </div>
        <div className='start-utility'>
          <AiOutlinePoweroff size={21} />
          {isShow ? <span>Power</span> : null}
        </div>
      </div>
    </div>
  );
}
