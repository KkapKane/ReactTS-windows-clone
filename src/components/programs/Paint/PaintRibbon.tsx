import '../../../styles/paintribbon.scss';
import PaintBrush from './PaintBrush';
import PaintTools from './PaintTools';

interface Props {
    brushMenu: boolean;
    setBrushMenu: React.Dispatch<React.SetStateAction<boolean>>
    closeBrushMenu: () => void;
}

export default function PaintRibbon ({ brushMenu, setBrushMenu, closeBrushMenu }: Props) {

    return (
        <div id="paint-ribbon">
            <PaintTools />
            <PaintBrush 
                brushMenu={brushMenu}
                setBrushMenu={setBrushMenu}
                closeBrushMenu={closeBrushMenu} />
        </div>
    )
}