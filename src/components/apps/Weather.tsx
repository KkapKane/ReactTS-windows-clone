import '../../styles/weathernews.scss';
import axios from "axios";
import { useEffect, useState } from 'react';
import News from './News';


export default function Weather() {

    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState<any | undefined>();

    // fetch weather from api //
    async function getWeather() {
        try {
            setLoading(true);
            const { data } = await axios.get(
                'https://api.openweathermap.org/data/2.5/weather?q=' +
                'houston' +
                '&APPID=24c9ca958f3c17129e987bac3597de6a&units=imperial');

            setWeather(data);
            setLoading(false);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
            getWeather();
    }, []);

    // state for news display on weather hover // 
    const [hover, setHover] = useState(false);

    const handleHover = () => {
        setHover(false);
    }

    // news disappears after a 3 second delay //
    const timeoutNews = () => {
        const timeout = setTimeout(handleHover, 3000);
        return () => clearTimeout(timeout);
    }

    return (
        <span className="task-item"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={timeoutNews} >
            {/* weather displays when there is weather data*/}
            {!loading ?
                weather ?
                    <div id="weather">
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].id} />
                        <span>{Math.floor(weather.main.temp)}°F</span>
                        <span>{weather.weather[0].main}</span>
                    </div>
                    : null
                : null
            }

            {/* news panel display when weather is hovered */}
            {hover ?
                <News
                    />
                : null
            }
        </span>
    )
}