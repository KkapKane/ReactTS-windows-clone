import '../../../styles/paint/ribbon.scss';
import PaintBrush from './PaintBrush';
import PaintColors from './PaintColors';
import PaintTools from './PaintTools';

interface Props {
    brushMenu: boolean;
    setBrushMenu: React.Dispatch<React.SetStateAction<boolean>>
    chosenColor: string | undefined;
    setChosenColor: React.Dispatch<React.SetStateAction<string | undefined>>;
    closeBrushMenu: () => void;
    handleBrushSize: (size: number) => void;
}

export default function PaintRibbon ({ brushMenu, setBrushMenu, closeBrushMenu, chosenColor, setChosenColor, handleBrushSize }: Props) {

    return (
        <div id="paint-ribbon">
            <PaintTools />
            <PaintBrush 
                brushMenu={brushMenu}
                setBrushMenu={setBrushMenu}
                closeBrushMenu={closeBrushMenu}
                handleBrushSize={handleBrushSize} 
                />
            <PaintColors 
                chosenColor={chosenColor}
                setChosenColor={setChosenColor} />
        </div>
    )
}