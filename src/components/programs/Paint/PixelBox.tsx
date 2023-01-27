import { useRef } from "react";

interface Props {
  chosenColor: string | undefined;
  draw: boolean;
  index: number;
  brushSize: number | "";
  eye: boolean;
  getColor: (event: any) => void;
}

export default function PixelBox({ chosenColor, draw, index, brushSize, eye, getColor }: Props) {

  const boxRef: any = useRef(null);

  const down = document.getElementById(`${index - 73}`)
  const right = document.getElementById(`${index + 1}`)

  const nextChild = () => {
    if (!chosenColor) return;
    boxRef.current.style.backgroundColor = chosenColor;

    if (brushSize == 20) {
      if (right && down) {
        // drawing on right side of canvas does not transfer to the left //
        if (boxRef.current.id % 73 === 72) {
          down.style.backgroundColor = chosenColor;
        }
        else {
          right.style.backgroundColor = chosenColor;
          down.style.backgroundColor = chosenColor;
        }
      }
    }
    else if (brushSize == 10) return;
  }

  return (
    <div
      className='box'
      id={index.toString()}
      ref={boxRef}
      onClick={(e) => getColor(e)}
      onMouseEnter={() =>
        !eye ? draw ? nextChild()
          : null : null} >
    </div>
  );
}