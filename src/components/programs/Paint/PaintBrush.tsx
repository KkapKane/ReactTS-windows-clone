import paintingIcon from '../../../assets/illustrator.png';
import { GoTriangleDown } from 'react-icons/go';

interface Props {
    brushMenu: boolean;
    setBrushMenu: React.Dispatch<React.SetStateAction<boolean>>
    closeBrushMenu: () => void;
}

export default function PaintBrush ({ brushMenu, setBrushMenu, closeBrushMenu }: Props) {

    const openBrushMenu = () => {
        setBrushMenu(true);
    }

    return (
        <div id="paint-brush" onClick={(e) => e.stopPropagation()}>
            <button id="menu-panel" onClick={() => openBrushMenu()}>
                <img src={paintingIcon} alt="brush size" />
                <span>Brush Sizes</span>
                <GoTriangleDown size={10}/>
            </button>
            {brushMenu ? 
                <div className="menu-container">
                    <ul className="menu">
                        <li><span style={{height: '1px'}}></span></li>
                        <li><span style={{height: '3px'}}></span></li>
                        <li><span style={{height: '5px'}}></span></li>
                        <li><span style={{height: '8px'}}></span></li>
                    </ul>
                </div> 
                : null }
        </div>
    )
}