import { useState } from 'react';
import moment from "moment";
import '../styles/smallclock.scss'

export default function SmallClock() {
    // get current time //
    const current: any = new Date();

    // get formatted dates and times //
    const dayDate: any = moment(current).format("dddd, DD MMMM, YYYY");
    const date: any = moment(current).format("DD/MM/YYYY");
    const time: any = moment(current).format("HH:mm A");

    // state & functions for hover status for the tooltip visibility //
    const [hover, setHover] = useState(false);

    const handleMouseIn = () => {
        setHover(true);
    }

    const handleMouseOut = () => {
        setHover(false);
    }

    return (
        <div id="small-clock" onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}>
            { hover ? <div id="clock-tooltip">{dayDate}</div> : null}
            <div id="clock-container">
                <span>{time}</span>
                <span>{date}</span>
            </div>
        </div>
    )
}