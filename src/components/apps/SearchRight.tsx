import axios from 'axios';
import moment from 'moment';
import wikiLogo from '../../assets/Wikipedia-logo.png';
import { useState, useEffect, useRef } from 'react';
import News from './News';
import { BiTrendingUp } from 'react-icons/bi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import '../../styles/searchright.scss';

export default function SearchRight() {

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
            getRandomBirth();
            getRandomEvents();
        }
    }, [tih])


    // states for person //
    const [birthPerson, setBirthPerson] = useState<any>();
    const [bpPic, setBpPic] = useState<string>();

    // get random featured birth of the day //
    const getRandomBirth = () => {
        const births = tih.data.Births;
        let random = Math.floor(Math.random() * births.length);
        const person = births[random];
        setBirthPerson(person);
    }

    // get image of person once there is a person selected //
    useEffect(() => {
        getImage(birthPerson, setBpPic);
    }, [birthPerson])

    // get image for random featured birth //
    async function getImage(y: any, setyPic: React.Dispatch<React.SetStateAction<string | undefined>>) {
        try {
            setLoading(true);
            const { data } = await axios.get(
                'https://en.wikipedia.org/w/api.php?action=query&titles=' +
                y?.links[0]?.title +
                '&format=json&prop=pageimages&pithumbsize=500' + '&origin=*');

            const info = data.query.pages;
            let picSrc = info[Object.keys(info)[0]].thumbnail.source;
            setyPic(picSrc);
            setLoading(false);
        }
        catch (error) {
            return;
        }
    }

    // states for events //
    const [eventA, setEventA] = useState<any>();
    const [aPic, setAPic] = useState<string>();
    const [eventB, setEventB] = useState<any>();
    const [bPic, setBPic] = useState<string>();
    const [eventC, setEventC] = useState<any>();
    const [cPic, setCPic] = useState<string>();

    // get 4 random today in history events //
    const getRandomEvents = () => {
        const allEvents = tih.data.Events;
        let a = Math.floor(Math.random() * allEvents.length);
        let b = Math.floor(Math.random() * allEvents.length);
        let c = Math.floor(Math.random() * allEvents.length);

        // call function again if there are duplicates //
        if (a == b || a == c || b == c) {
            getRandomEvents();
        }

        else {
            setEventA(allEvents[a]);
            setEventB(allEvents[b]);
            setEventC(allEvents[c]);
        }
    }

    // get image of events once selected //
    useEffect(() => {
        getImage(eventA, setAPic);
        getImage(eventB, setBPic);
        getImage(eventC, setCPic);
    }, [eventA, eventB, eventC]);

    // scroll //
    const eventRef = useRef<null | HTMLDivElement>(null);
    const [eventPos, setEventPos] = useState<number>(0);
    const [maxEventPos, setMaxEventPos] = useState<number>(0);

    const newsRef = useRef<null | HTMLDivElement>(null);
    const [newsPos, setNewsPos] = useState<number>(0);
    const [maxNewsPos, setMaxNewsPos] = useState<number>(0);

    const scroll = (
        ref: React.MutableRefObject<HTMLDivElement | null>,
        direction: string) => {
        if (ref.current) {
            if (direction == 'right') {
                if (ref == eventRef) {
                    ref.current.scrollLeft += 200;
                    setEventPos(eventPos + 200);
                }
                else if (ref == newsRef) {
                    ref.current.scrollLeft += 350;
                    setNewsPos(newsPos + 350);
                }
            }
            if (direction == 'left') {
                if (ref == eventRef) {
                    ref.current.scrollLeft -= 200;
                    setEventPos(eventPos - 200);
                }
                else if (ref == newsRef) {
                    ref.current.scrollLeft -= 350;
                    setNewsPos(newsPos - 350);
                }
            }
        }
    }

    useEffect(() => {
        if (eventRef.current) {
            setMaxEventPos(eventRef.current.scrollWidth);
        }
    }, []);
    
    useEffect(() => {
        if (newsRef.current) {
            setMaxNewsPos(newsRef.current.scrollWidth);
        }
    }, [newsPos]);


    // quote of the day //
    const [quote, setQuote] = useState<any | undefined>();
    async function getQuote() {
        try {
            const { data } = await axios.get('https://api.quotable.io/random?maxLength=100')
            setQuote(data)
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getQuote();
    }, [])


    return (
        <div className="right">
            {!loading ?
                <div id="tih-container">
                    <div className="title">
                        Today • {moment(current).format("DD MMMM")}
                    </div>
                    {birthPerson ?
                        <div id='img-container'>
                            <img src={bpPic == undefined ? wikiLogo : bpPic} alt={birthPerson?.links[0]?.title} />
                            <a id="label" href={birthPerson?.links[0]?.link} target="_blank">
                                {birthPerson.links[0].title}'s birthday</a>
                        </div>
                        : null}
                </div>

                : null}

            {!loading ?
                <div id="events-container">
                    <div className="title">
                        Today in History
                    </div>
                    <div id="events-items" ref={eventRef}>
                        {eventPos !== 0 ?
                            <button className='left-btn' onClick={() => scroll(eventRef, 'left')}>
                                <BsChevronLeft />
                            </button>
                            : null}

                        {eventA ?
                            <div className="event">
                                <img src={aPic == undefined ? wikiLogo : aPic} alt={eventA?.links[0]?.title} />
                                <div className="event-text">
                                    {eventA.year}
                                    <a href={eventA.links[0].link} target="_blank">{eventA.text}</a>
                                </div>
                            </div>
                            : null}
                        {eventB ?
                            <div className="event">
                                <img src={bPic == undefined ? wikiLogo : bPic} alt={eventB?.links[0]?.title} />
                                <div className="event-text">
                                    {eventB.year}
                                    <a href={eventB.links[0].link} target="_blank">{eventB.text}</a>
                                </div>
                            </div>
                            : null}
                        {eventC ?
                            <div className="event">
                                <img src={cPic == undefined ? wikiLogo : cPic} alt={eventC?.links[0]?.title} />
                                <div className="event-text">
                                    {eventC.year}
                                    <a href={eventC.links[0].link} target="_blank">{eventC.text}</a>
                                </div>
                            </div>
                            : null}

                        {quote ?
                            <div className="quote-container">
                                <div id="quote">"{quote.content}"</div>
                                <div id="author">{quote.author}</div>
                                <div className="title">Quote of the day</div>
                            </div>
                            : null}

                        {tih ?
                            <div className="event">
                                <img src={wikiLogo} alt='wiki' />
                                <div className="event-text">
                                    On this day...
                                    <a href={tih.url} target="_blank">See All Events</a>
                                </div>
                            </div>
                            : null}

                        {maxEventPos !== 0 ?
                            maxEventPos >= eventPos ?
                                <button className='right-btn' onClick={() => scroll(eventRef, 'right')}>
                                    <BsChevronRight />
                                </button>
                                : null : null}
                    </div>
                </div>
                : null}

            <div id="trending-container">
                <div id="trending">
                    <BiTrendingUp />
                    Trending News from the web
                </div>
                <div id="news-container" ref={newsRef}>
                    {newsPos !== 0 ?
                        <button className='left-btn' onClick={() => scroll(newsRef, 'left')}>
                            <BsChevronLeft />
                        </button>
                        : null}
                    <News />
                    {maxNewsPos !== 0 ?
                        maxNewsPos >= newsPos ?
                            <button className='right-btn' onClick={() => scroll(newsRef, 'right')}>
                                <BsChevronRight />
                            </button>
                            : null : null}
                </div>
            </div>
        </div>
    )
}