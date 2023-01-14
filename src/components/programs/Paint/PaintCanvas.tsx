import { useState } from 'react';
import '../../../styles/paint/canvas.scss'
import PixelBox from './PixelBox';


interface Props {
    chosenColor: string | undefined;
    brushSize: number | "";
}

export default function PaintCanvas({ chosenColor, brushSize }: Props) {

    // create canvas //
    let array: number[] = [];

    const makeGrid = (num: number) => {
        for (let i = 0; i < num; i++) {
            for (let j = 0; j < num; j++) {
                array.push(j);
            }
        }
    }

    makeGrid(64);

    // state for mouse hover //
    const [draw, setDraw] = useState(false);

    return (
        <div id="paint-canvas"
            onMouseDown={() => setDraw(true)}
            onMouseUp={() => setDraw(false)} >
            {array.map((a, index) => {
                return (
                    <PixelBox
                        index={index}
                        chosenColor={chosenColor}
                        draw={draw}
                    />
                )
            })
            }
        </div>
    )
}