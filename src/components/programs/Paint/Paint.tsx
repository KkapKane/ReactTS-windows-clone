import { useState } from "react";
import PaintHandle from "./PaintHandle";
import PaintRibbon from "./PaintRibbon";


export default function Paint () {

    const [brushMenu, setBrushMenu] = useState(false);

    const closeBrushMenu = () => {
        setBrushMenu(false);
    }

    return (
        <div id="paint" onClick={closeBrushMenu}>
            <PaintHandle />
            <PaintRibbon 
                brushMenu={brushMenu}
                setBrushMenu={setBrushMenu}
                closeBrushMenu={closeBrushMenu} />
        </div>
    )
}