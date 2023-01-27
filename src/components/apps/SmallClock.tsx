import { useEffect, useState } from "react";
import "../../styles/smallClock.scss"
import BigClock from "./BigClock";
import moment from "moment";

interface Props {
    clock: boolean;
    handleClock: () => void;
}

export default function SmallClock({ handleClock, clock }: Props) {

    // get current time //
    const [current, setCurrent] = useState(new Date());

    useEffect(() => {
        // updates time every second //
        const interval = setInterval(() => { setCurrent(new Date()) }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    // state & functions for hover status for the tooltip visibility //
    const [hover, setHover] = useState(false);

    return (
        <div id="small-clock"
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={(e) => e.stopPropagation()}>

            {hover === true ? clock === false ?
                <div id="clock-tooltip">{moment(current).format("dddd, DD MMMM, YYYY")}</div>
                : null : null}

            <div id="clock-container" onClick={handleClock}>
                <span>{moment(current).format("hh:mm A")}</span>
                <span>{moment(current).format("DD/MM/YYYY")}</span>
            </div>

            {clock ? <BigClock current={current} /> : null}
        </div>
    )
}