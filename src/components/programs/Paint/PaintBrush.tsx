import paintingIcon from "../../../assets/illustrator.png";
import { GoTriangleDown } from "react-icons/go";

interface Props {
    brushMenu: boolean;
    setBrushMenu: React.Dispatch<React.SetStateAction<boolean>>;
    brushSize: number | "";
    closeBrushMenu: () => void;
    handleBrushSize: (size: number) => void;
}

export default function PaintBrush({
    brushMenu,
    setBrushMenu,
    brushSize,
    closeBrushMenu,
    handleBrushSize
}: Props) {

    const toggleBrushMenu = () => {
        setBrushMenu(!brushMenu);
    }

    return (
        <div id="paint-brush" onClick={(e) => e.stopPropagation()}>

            {brushSize !== 0 ?
                /* blue border and background on button if brushsize is not 0 */
                <button id="menu-panel" onClick={toggleBrushMenu}
                    style={{
                        backgroundColor: 'rgba(104, 186, 241, 0.45)',
                        border: '1px solid rgb(91, 189, 255)'
                    }}>
                    <img src={paintingIcon} alt="brush size" />
                    <span style={{ borderColor: 'rgb(91, 189, 255)' }}>Brush Sizes</span>
                    <GoTriangleDown size={10} />
                </button>
                :
                <button id="menu-panel" onClick={toggleBrushMenu}
                    style={{
                        background: 'none',
                        border: '1px solid grey'
                    }}>
                    <img src={paintingIcon} alt="brush size" />
                    <span style={{ borderColor: 'grey' }}>Brush Sizes</span>
                    <GoTriangleDown size={10} />
                </button>
            }

            {brushMenu ?
                <div className="menu-container" onClick={closeBrushMenu}>
                    <ul className="menu">
                        <li onClick={() => handleBrushSize(10)}>
                            <span style={{ height: '10px' }}></span>
                        </li>
                        <li onClick={() => handleBrushSize(20)}>
                            <span style={{ height: '20px' }}></span>
                        </li>
                    </ul>
                </div>
                : null}
        </div>
    )
}