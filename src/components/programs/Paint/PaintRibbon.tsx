import '../../../styles/paintribbon.scss';
import PaintBrush from './PaintBrush';
import PaintColors from './PaintColors';
import PaintTools from './PaintTools';

interface Props {
    brushMenu: boolean;
    setBrushMenu: React.Dispatch<React.SetStateAction<boolean>>
    chosenColor: string | undefined;
    setChosenColor: React.Dispatch<React.SetStateAction<string | undefined>>;
    closeBrushMenu: () => void;
}

export default function PaintRibbon ({ brushMenu, setBrushMenu, closeBrushMenu, chosenColor, setChosenColor }: Props) {

    return (
        <div id="paint-ribbon">
            <PaintTools />
            <PaintBrush 
                brushMenu={brushMenu}
                setBrushMenu={setBrushMenu}
                closeBrushMenu={closeBrushMenu} />
            <PaintColors 
                chosenColor={chosenColor}
                setChosenColor={setChosenColor} />
        </div>
    )
}