import pencilIcon from '../../../assets/edit.png';
import fillIcon from '../../../assets/fill-color.png';
import eraseIcon from '../../../assets/eraser.png';
import eyedropIcon from '../../../assets/eye-dropper.png';


export default function PaintTools () {

    return (
        <div id="paint-tools">
            <div className="tool-btns">
                <button><img src={pencilIcon} alt="pencil" /></button>
                <button><img src={fillIcon} alt="fill" style={{transform: 'scaleX(-1)', WebkitTransform: 'scaleX(-1)'}}/></button>
                <button><img src={eraseIcon} alt="erase" /></button>
                <button><img src={eyedropIcon} alt="eyedropper" /></button>
            </div>
            <div className="paint-title">
                Tools
            </div>
        </div>
    )
}