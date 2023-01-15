import '../../../styles/paint/colors.scss'
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
    const [colorList, setColorList] = useState<any[]>(["rgb(0, 0, 0)"]);

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
                        let rgb = hexToRgb(chosenColor);
                        temp.push(rgb);
                        setColorList(temp);
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

    // function to convert hex colors to rgb //
    function hexToRgb(hex: any) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function ({ m, r, g, b }: any) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
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