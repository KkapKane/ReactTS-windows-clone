import { useState } from "react";
import PaintHandle from "./PaintHandle";
import PaintRibbon from "./PaintRibbon";


export default function Paint () {

    // state for brush menu display //
    const [brushMenu, setBrushMenu] = useState(false);

    // function for closing brush menu //
    const closeBrushMenu = () => {
        setBrushMenu(false);
    }

    // state for the color saved that will be used if mouse clicks canvas now //
    const [chosenColor, setChosenColor] = useState<string | undefined>("#000000");



    return (
        <div id="paint" onClick={closeBrushMenu}>
            <PaintHandle />
            <PaintRibbon 
                brushMenu={brushMenu}
                setBrushMenu={setBrushMenu}
                closeBrushMenu={closeBrushMenu} 
                chosenColor={chosenColor}
                setChosenColor={setChosenColor} />
        </div>
    )
}