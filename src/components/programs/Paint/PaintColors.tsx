import '../../../styles/paintcolors.scss'
import { useEffect, useState } from 'react';
import { PhotoshopPicker } from 'react-color';


interface Props {
    chosenColor: string | undefined;
    setChosenColor: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function PaintColors({ chosenColor, setChosenColor }: Props) {

    // state for color picker display //
    const [picker, setPicker] = useState(false);

    // function for opening and closing color picker //
    const handlePicker = () => {
        setPicker(!picker);
    }

    // state for current color selected/hovered in the color picker //
    const [currentColor, setCurrentColor] = useState<string | undefined>("#ffffff");

    // state for all previous chosen colors //
    const [colorList, setColorList] = useState<string[]>(["#000000"]);

    // add to array whenver a new color is chosen //
    useEffect(() => {
        if (chosenColor !== undefined) {
            // do not allow two of the same colors to be in the array //
            if (!(colorList.filter(e => e === chosenColor).length > 0)) {
                // sets a max limit of 30, then deletes the first color to add the latest //
                if (colorList.length === 30) {
                    let temp = colorList.slice();
                    temp.shift();
    
                    if (temp !== undefined) {
                        temp.push(chosenColor);
                        setColorList(temp);
                        console.log(colorList)
                    }
                }

                else {
                    setColorList(prev => [...prev, chosenColor]);
                }
            }
        }
    }, [chosenColor]);

    const getColor = (color: string) => {
        setChosenColor(color);
    }

    return (
        <div id="paint-colors">
            {/* color changer button which will open color picker */}
            <button id="picker-btn" onClick={handlePicker}>
                <div id="picker-color" style={{ backgroundColor: chosenColor }}> </div>
                <span>Color Changer</span>
            </button>

            {/* mapping colorList to render a button for each color in the array */}
            <div id="color-btns">
                {colorList.map(cl => {
                    return (
                        <button key={cl} onClick={() => getColor(cl)}>
                            <span style={{ backgroundColor: cl }}> </span>
                        </button>
                    )
                })}
            </div>

            {/* color picker shows up if picker is true */}
            {picker ?
                <PhotoshopPicker
                    color={currentColor}
                    onChange={(updatedColor) =>
                        setCurrentColor(updatedColor.hex)
                    }
                    onAccept={() => {
                        setChosenColor(currentColor);
                        handlePicker();
                    }
                    }
                    onCancel={handlePicker}
                />
                : null}
        </div>
    )
}