import { useEffect, useRef, useState } from "react";

interface Props {
  chosenColor: string | undefined;
  draw: boolean;
  index: number;
  
  elementsRef: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>;
}

export default function PixelBox ({ chosenColor, draw, index, elementsRef}: Props) {

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


    const up = document.getElementById(`${index + 73 }`)
    const down = document.getElementById(`${index - 73 }`)
    const left = document.getElementById(`${index - 1}`)
    const right = document.getElementById(`${index + 1}`)
    
    const nextChild = () =>{
        if(!chosenColor) return;
        boxRef.current.style.backgroundColor = chosenColor; 
        if(right && up && left && down ){

            right.style.backgroundColor = chosenColor
            // up.style.backgroundColor = chosenColor
            // left.style.backgroundColor = chosenColor
            down.style.backgroundColor = chosenColor

        }
    }


    
    return (
      <div
        className='box'
        id={index.toString()}
        ref={boxRef}
       
        onMouseEnter={() =>
          draw
            ? nextChild()
            : null
        }
      ></div>
    );
}