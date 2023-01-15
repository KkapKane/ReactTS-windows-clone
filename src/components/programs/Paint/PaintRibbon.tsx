import '../../../styles/paint/ribbon.scss';
import PaintBrush from './PaintBrush';
import PaintColors from './PaintColors';
import PaintTools from './PaintTools';

interface Props {
    brushMenu: boolean;
    setBrushMenu: React.Dispatch<React.SetStateAction<boolean>>
    chosenColor: string | undefined;
    setChosenColor: React.Dispatch<React.SetStateAction<string | undefined>>;
    brushSize: number | "";
    eye: boolean;
    closeBrushMenu: () => void;
    handleBrushSize: (size: number) => void;
    activeEye: () => void;
}

export default function PaintRibbon({ brushMenu, setBrushMenu, brushSize, closeBrushMenu, chosenColor, setChosenColor, handleBrushSize, activeEye, eye }: Props) {

    return (
        <div id="paint-ribbon">
            <PaintTools
                setChosenColor={setChosenColor}
                activeEye={activeEye}
                eye={eye}
            />
            <PaintBrush
                brushMenu={brushMenu}
                setBrushMenu={setBrushMenu}
                closeBrushMenu={closeBrushMenu}
                handleBrushSize={handleBrushSize}
                brushSize={brushSize}
            />
            <PaintColors
                chosenColor={chosenColor}
                setChosenColor={setChosenColor}
            />
        </div>
    )
}