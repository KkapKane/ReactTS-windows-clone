import { useEffect, useRef } from "react";

interface Props {
    chosenColor: string | undefined;
    draw: boolean;
    index: number;
}

export default function PixelBox ({ chosenColor, draw, index }: Props) {

    const boxRef: any = useRef(null);

    const getnextID = (id : string) => {
        if (draw === true) {
            let next = parseInt(id) + 1;
            let nextBox = document.getElementById(next.toString()) as HTMLElement;

            if (chosenColor !== undefined) {
                nextBox.style.setProperty('background-color', `${chosenColor}`);
            }
        }
    }

    return (
        <div className="box" id={index.toString()}
            ref={boxRef}
            onMouseEnter={() => draw ? boxRef.current.style.backgroundColor = chosenColor : null}
            
            >
    
        </div>
    )
}