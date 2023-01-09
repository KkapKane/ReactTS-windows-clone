import { useEffect, useState } from 'react';
import moment from "moment";
import '../styles/smallclock.scss'
import BigClock from './BigClock';

interface Props {
    clock: boolean;
    handleClock: () => void;
}

export default function SmallClock({ handleClock, clock }: Props) {

    // get current time //
    const [current, setCurrent] = useState(new Date());

    // get formatted dates and times //
    const dayDate: String = moment(current).format("dddd, DD MMMM, YYYY");
    const date: String = moment(current).format("DD/MM/YYYY");
    const time: String = moment(current).format("hh:mm A");

    useEffect(() => {
        // updates time every second //
        const interval = setInterval(() => { setCurrent(new Date()) }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, []);


    // state & functions for hover status for the tooltip visibility //
    const [hover, setHover] = useState(false);

    const handleMouseIn = () => {
        setHover(true);
    }

    const handleMouseOut = () => {
        setHover(false);
    }

    return (
        <div id="small-clock"
            onMouseOver={handleMouseIn}
            onMouseOut={handleMouseOut}
            onClick={(e) => e.stopPropagation()}>

            {hover === true ? clock === false ? <div id="clock-tooltip">{dayDate}</div> : null : null}

            <div id="clock-container" onClick={handleClock}>
                <span>{time}</span>
                <span>{date}</span>
            </div>

            {clock ? <BigClock 
                current={current}
                setCurrent={setCurrent}
                dayDate={dayDate}
                /> : null}
        </div>
    )
}