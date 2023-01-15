import { useState, useRef, createRef } from 'react';
import '../../../styles/paint/canvas.scss'
import PixelBox from './PixelBox';

interface Props {
    chosenColor: string | undefined;
    brushSize: number | "";
    eye: boolean;
    getColor: (event: any) => void;
}

export default function PaintCanvas({ chosenColor, brushSize, eye, getColor }: Props) {

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

    // maps through array and set a ref on each one based on index
    const elementsRef = useRef(array.map(() => createRef<HTMLDivElement>()));
    return (
        <div id="paint-canvas"
            onMouseDown={() => setDraw(true)}
            onMouseUp={() => setDraw(false)}
            onMouseLeave={() => setDraw(false)} >

            {array.map((a, index) => {
                return (
                    // maps through array and set a ref on each one based on index
                    <div className='helperDiv' ref={elementsRef.current[index]} key={index}>

                        <PixelBox
                            key={index}
                            elementsRef={elementsRef}
                            index={index}
                            chosenColor={chosenColor}
                            draw={draw}
                            brushSize={brushSize}
                            eye={eye}
                            getColor={getColor}
                        />
                    </div>
                );
            })
            }
        </div>
    )
}