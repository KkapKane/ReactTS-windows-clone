import '../styles/bigclock.scss'

interface Props {
    current: Date;
    setCurrent: React.Dispatch<React.SetStateAction<Date>>;
    dayDate: String;
}

export default function BigClock ({ current, setCurrent, dayDate } : Props) {

    return (
        <div id="big-clock" onClick={(e) => e.stopPropagation()}>
            Big Clock
        </div>
    )
}