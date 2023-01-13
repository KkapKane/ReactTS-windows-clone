import '../../../styles/painthandle.scss';
import paintIcon from '../../../assets/microsoft-paint.png';
import saveIcon from '../../../assets/save-file.png';
import { ImUndo2, ImRedo2 } from 'react-icons/im';
import { RiEjectFill } from 'react-icons/ri';
import { VscChromeMinimize, VscPrimitiveSquare } from 'react-icons/vsc';
import { RxCross2 } from 'react-icons/rx';
import { BsChevronUp } from 'react-icons/bs';
import { IoHelpCircleSharp } from 'react-icons/io5'

export default function PaintHandle() {

    return (
        <div id="paint-handle">
            <div className="handle-left">
                <div className="handle-top">
                    <img src={paintIcon} alt="icon" />
                    <span></span>
                    <img src={saveIcon} alt="save" />
                    <ImUndo2 size={15} />
                    <ImRedo2 size={15} />
                    <RiEjectFill size={10} className="quick-access" />
                    <span></span>
                    <p>Untitled - Paint</p>
                </div>
                <div className="handle-bottom">
                    <button className="file">File</button>
                    <button className="home-btn">Home</button>
                </div>
            </div>
            <div className="handle-right">
                <div className="handle-top">
                    <VscChromeMinimize size={20} />
                    <VscPrimitiveSquare size={20} />
                    <RxCross2 size={20} className="exit" />
                </div>
                <div className="handle-bottom">
                    <button><BsChevronUp size={12} color="grey" strokeWidth={1} /></button>
                    <button><IoHelpCircleSharp size={20} color="rgb(0, 102, 255)" /></button>
                </div>
            </div>
        </div>
    )
}