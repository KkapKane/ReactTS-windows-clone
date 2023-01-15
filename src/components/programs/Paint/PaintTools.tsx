import eraseIcon from '../../../assets/eraser.png';
import eyedropIcon from '../../../assets/eye-dropper.png';
import trashIcon from '../../../assets/trash-can.png';

interface Props {
    eye: boolean;
    setChosenColor: React.Dispatch<React.SetStateAction<string | undefined>>;
    activeEye: () => void;
}

export default function PaintTools({ setChosenColor, activeEye, eye }: Props) {

    const clearAll = () => {
        const boxes = Array.from(
            document.getElementsByClassName('box') as HTMLCollectionOf<HTMLElement>,
        );

        boxes.forEach(box => {
            box.style.backgroundColor = 'white';
        });
    }

    return (
        <div id="paint-tools">
            <div className="tool-btns">
                <button onClick={() => setChosenColor('#ffffff')}><img src={eraseIcon} alt="erase" /></button>
                <button onClick={clearAll}><img src={trashIcon} alt="clear all" /></button>

                {/* highlight eyedropper button if currently active */}
                {eye ?
                    <button onClick={activeEye}
                        style={{
                            backgroundColor: 'rgba(104, 186, 241, 0.45)',
                            border: '1px solid rgb(91, 189, 255)'
                        }}>
                        <img src={eyedropIcon} alt="eyedropper" />
                    </button>
                    :
                    <button onClick={activeEye}>
                        <img src={eyedropIcon} alt="eyedropper" />
                    </button>
                }
            </div>
            <div className="paint-title">
                Tools
            </div>
        </div>
    )
}