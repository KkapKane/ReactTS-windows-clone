import paintingIcon from '../../../assets/illustrator.png';
import { GoTriangleDown } from 'react-icons/go';

interface Props {
    brushMenu: boolean;
    setBrushMenu: React.Dispatch<React.SetStateAction<boolean>>
    closeBrushMenu: () => void;
    handleBrushSize: (size: number) => void;
}

export default function PaintBrush ({ brushMenu, setBrushMenu, closeBrushMenu, handleBrushSize }: Props) {

    const toggleBrushMenu = () => {
        setBrushMenu(!brushMenu);
    }

    return (
        <div id="paint-brush" onClick={(e) => e.stopPropagation()}>
            <button id="menu-panel" onClick={toggleBrushMenu}>
                <img src={paintingIcon} alt="brush size" />
                <span>Brush Sizes</span>
                <GoTriangleDown size={10}/>
            </button>
            {brushMenu ? 
                <div className="menu-container" onClick={closeBrushMenu}>
                    <ul className="menu">
                        <li onClick={() => handleBrushSize(10)}><span style={{height: '10px'}}></span></li>
                        <li onClick={() => handleBrushSize(20)}><span style={{height: '20px'}}></span></li>
                    </ul>
                </div> 
                : null }
        </div>
    )
}