import axios from "axios";
import { useEffect, useState } from 'react';


export default function Weather() {

    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState<any | undefined>();

    // fetch weather from api //
    async function getWeather() {
        try {
            setLoading(true);
            const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=houston&APPID=24c9ca958f3c17129e987bac3597de6a&units=imperial');
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

    useEffect(() => {
        if (weather) {
            console.log(weather);
        }
    }, [weather]);

    return (
        <span className="task-item">
            {!loading ?
                weather ?
                <div className="weather" style={{
                    display: 'flex', gap: '8px', alignItems: 'center'
                }}>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].id} />
                    <span>{Math.floor(weather.main.temp)}°F</span>
                    <span>{weather.weather[0].main}</span>
                </div>
                    : null
                : null
            }
        </span>
    )
}