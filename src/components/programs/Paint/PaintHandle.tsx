import '../../../styles/paint/handle.scss';
import paintIcon from '../../../assets/microsoft-paint.png';
import { VscChromeMinimize } from 'react-icons/vsc';
import { RxCross2 } from 'react-icons/rx';
import { BsChevronUp } from 'react-icons/bs';
import { IoHelpCircleSharp } from 'react-icons/io5';
import { minimizeProgram } from "../../../helper/Minimize";

interface Props {
    tasks: any;
    setTask: any;
    programHandle: (programName: string, status: boolean) => void;
}

export default function PaintHandle({ programHandle, tasks, setTask }: Props) {

    return (
        <div id="paint-handle">
            <div className="handle-left">
                <div className="handle-top">
                    <img src={paintIcon} alt="icon" />
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
                    <VscChromeMinimize size={20}
                        onClick={() => minimizeProgram('Paint', tasks, setTask)} />
                    <RxCross2 size={20} className="exit"
                        onClick={() => programHandle('Paint', false)} />
                </div>
                <div className="handle-bottom">
                    <button><BsChevronUp size={12} color="grey" strokeWidth={1} /></button>
                    <button><IoHelpCircleSharp size={20} color="rgb(0, 102, 255)" /></button>
                </div>
            </div>
        </div>
    )
}