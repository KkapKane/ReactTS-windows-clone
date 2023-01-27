import '../../styles/bigClock.scss';
import moment from 'moment';
import Calendar from 'react-calendar';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface Props {
    current: Date;
}

export default function BigClock({ current }: Props) {

    const day: number = parseInt(moment(current).format("DD"));
    const month: number = parseInt(moment(current).format("MM")) - 1;
    const year: number = parseInt(moment(current).format("YYYY"));

    return (
        <div id="big-clock" onClick={(e) => e.stopPropagation()}>
            <div id="clock-time">
                <div id="current-time">
                    <span className="time">{moment(current).format("h:mm:ss")}</span>
                    <span className="ampm">{moment(current).format("A")}</span>
                </div>
                <div id="current-date">
                    {moment(current).format("dddd, MMMM DD, YYYY")}
                </div>
            </div>
            <div id="clock-calendar">
                <Calendar
                    value={current}
                    calendarType="US"
                    nextLabel={<IoIosArrowDown />}
                    prevLabel={<IoIosArrowUp />}
                    tileClassName={({ date, view }) =>
                        view === 'month' &&
                            date.getDate() === day ?
                            date.getMonth() === month ?
                                date.getFullYear() === year ? 'today'
                                    : null : null : null}
                />
            </div>
        </div>
    )
}