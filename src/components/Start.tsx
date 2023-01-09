import '../styles/start.scss'
import { AiFillWindows } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useState } from 'react'

export default function Start(){

    const [isClicked, setIsClicked] = useState(false)

    return (
        <div id="start"><AiFillWindows size={25} onClick={()=> setIsClicked(!isClicked)}/>
        <div id="start-panel" style={isClicked ? {display: "flex"} : {}}>
            <div className="start-navBar">
            <span id='start-hamburger'>
            <RxHamburgerMenu size={22}/>
            </span>
            <div className="start-bottomGroup">
            <span className='start-utility'>Profile</span>
            <span className='start-utility'>Documents</span>
            <span className='start-utility'>Pictures</span>
            <span className='start-utility'>Settings</span>
            <span className='start-utility'>Power</span>
            </div>  

            </div>
        </div>
        </div>
    )
}