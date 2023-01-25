import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

type colorCombo = {
    backgroundColor: string;
    color: string;
}

export default function News() {

    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState<any[] | undefined>();

    async function getNews() {
        try {
            setLoading(true);
            const { data } = await axios.get(
                'https://newsapi.org/v2/top-headlines?country=us&apiKey=' +
                '74e9bda30eea425781bff6a334093b25'
            )
            setNews(data.articles);
            setLoading(false);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getNews();
    }, []);

    // array for random color combinations for article cards //
    const colorCombo: colorCombo[] = [
        {
            backgroundColor: '#E9D758',
            color: '#000'
        },
        {
            backgroundColor: '#297373',
            color: '#fff'
        },
        {
            backgroundColor: '#FF8552',
            color: '#000'
        },
        {
            backgroundColor: '#BF8B85',
            color: '#fff'
        },
        {
            backgroundColor: '#5D5F71',
            color: '#fff'
        },
        {
            backgroundColor: '#934683',
            color: '#fff'
        },
        {
            backgroundColor: '#FCC8C2',
            color: '#000'
        },
        {
            backgroundColor: '#2B3A67',
            color: '#fff'
        },
        {
            backgroundColor: '#66999B',
            color: '#fff'
        },
        {
            backgroundColor: '#F9C784',
            color: '#000'
        },
        {
            backgroundColor: '#493843',
            color: '#fff'
        },
        {
            backgroundColor: '#61988E',
            color: '#fff'
        },
        {
            backgroundColor: '#A0B2A6',
            color: '#000'
        },
        {
            backgroundColor: '#101D42',
            color: '#fff'
        },
        {
            backgroundColor: '#0D1317',
            color: '#fff'
        },
        {
            backgroundColor: '#5A5353',
            color: '#fff'
        },
        {
            backgroundColor: '#A07178',
            color: '#fff'
        },
        {
            backgroundColor: '#FFFC99',
            color: '#000'
        },
        {
            backgroundColor: '#E6B89C',
            color: '#000'
        },
        {
            backgroundColor: '#9CAFB7',
            color: '#000'
        },
    ]

    return (
        <div id="news">
            {!loading ?
                news ?
                    news.map((n, index) => {
                        return (
                            <a className="article"
                                href={n.url}
                                target="_blank"
                                key={index}
                                style={{
                                    backgroundColor: colorCombo[index].backgroundColor,
                                    color: colorCombo[index].color
                                }} >
                                <div className="text">
                                    <div className="header">
                                        {n.source.name} • {moment(n.publishedAt).fromNow()}
                                    </div>
                                    <div className="title">
                                        {n.title}
                                    </div>
                                </div>
                                <img src={n.urlToImage} alt={n.source.id} />
                            </a>
                        );
                    })
                    : null
                : null
            }
        </div>
    )
}