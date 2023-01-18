import { useState, useEffect } from 'react';
import News from './News';
import { BiTrendingUp } from 'react-icons/bi';
import '../../styles/search.scss';
import axios from 'axios';
import moment from 'moment';

export default function Search() {

    const [loading, setLoading] = useState(false);

    // display today's date //
    const [current, setCurrent] = useState(new Date());

    // get today in history events //
    const [tih, setTih] = useState<any>();

    async function getTih() {
        try {
            setLoading(true);
            const { data } = await axios.get('https://history.muffinlabs.com/date');
            setTih(data);
            setLoading(false);
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTih();
    }, [])

    useEffect(() => {
        if (tih) {
            console.log(tih);
            getRandomBirth();
        }
    }, [tih])

    // get random featured birth of the day //
    const [birthName, setBirthName] = useState<string>();
    const getRandomBirth = () => {
        const births = tih.data.Births;
        let random = Math.floor(Math.random() * births.length);
        const person = births[random];
        let name = person.links[0].title;
        getBirthImage(name);
        setBirthName(name);
    }


    // get image for random featured birth //
    const [birthPhoto, setBirthPhoto] = useState<string>();
    async function getBirthImage(name: string) {
        try {
            setLoading(true);
            const { data } = await axios.get(
                'https://cors-anywhere.herokuapp.com/' +
                'https://en.wikipedia.org/w/api.php?action=query&titles=' +
                name +
                '&format=json&prop=pageimages&pithumbsize=500', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            });

            const info = data.query.pages;
            let picSrc = info[Object.keys(info)[0]].thumbnail.source;
            setBirthPhoto(picSrc);
            setLoading(false);
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div id="search">
            <div id="nav">NAV BAR</div>
            <div className="middle">
                <div className="left">
                    <div id="system-files">


                    </div>
                </div>
                <div className="right">
                    {!loading ?
                        <div id="tih-container">
                            <div className="title">
                                Today • {moment(current).format("DD MMMM")}
                            </div>
                            <div id='img-container'>
                                <img src={birthPhoto} alt={birthName} />
                                <div id="label">{birthName}</div>
                            </div>
                        </div>

                        : null}
                    <div id="trending">
                        <BiTrendingUp />
                        Trending News from the web
                    </div>
                    <div id="news-container">

                        <News />
                    </div>

                </div>
            </div>
            <input type="text" />
        </div>
    )
}