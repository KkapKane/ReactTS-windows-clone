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
            getRandomEvents();
        }
    }, [tih])


    // get random featured birth of the day //
    const [birthPerson, setBirthPerson] = useState<any>();
    const [bpPic, setBpPic] = useState<string>();
    const getRandomBirth = () => {
        const births = tih.data.Births;
        let random = Math.floor(Math.random() * births.length);
        const person = births[random];
        setBirthPerson(person);
    }

    useEffect(() => {
        getImage(birthPerson, setBpPic);
    }, [birthPerson])

    // get image for random featured birth //
    async function getImage(y: any, setPic: React.Dispatch<React.SetStateAction<string | undefined>>) {
        try {
            setLoading(true);
            const { data } = await axios.get(
                'https://cors-anywhere.herokuapp.com/' +
                'https://en.wikipedia.org/w/api.php?action=query&titles=' +
                y?.links[0]?.title +
                '&format=json&prop=pageimages&pithumbsize=500', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            });

            const info = data.query.pages;
            let picSrc = info[Object.keys(info)[0]].thumbnail.source;
            setPic(picSrc);
            setLoading(false);
        }
        catch (error) {
            console.error(error)
        }
    }


    // get 4 random today in history events //
    const getRandomEvents = () => {
        const allEvents = tih.data.Events;
        let a = Math.floor(Math.random() * allEvents.length);
        let b = Math.floor(Math.random() * allEvents.length);
        let c = Math.floor(Math.random() * allEvents.length);
        let d = Math.floor(Math.random() * allEvents.length);

        // call function again if there are duplicates //
        if (a == b || a == c || a == d ||
            b == c || b == d || c == d) {
            getRandomEvents();
        }
        let eventA = allEvents[a];
        eventA['pic'] = 'hello';
        /* console.log(eventA); */
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
                            {birthPerson ?
                                <div id='img-container'>
                                    <img src={bpPic} alt={birthPerson?.links[0]?.title} />
                                    <a id="label" href={birthPerson?.links[0]?.link} target="_blank">
                                        {birthPerson.links[0].title}'s birthday</a>
                                </div>
                                : null}
                        </div>

                        : null}
                    <div id="trending-container">
                        <div id="trending">
                            <BiTrendingUp />
                            Trending News from the web
                        </div>
                        <div id="news-container">
                            <News />
                        </div>
                    </div>


                </div>
            </div>
            <input type="text" />
        </div>
    )
}