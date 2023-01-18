import {useState, useEffect} from 'react';
import News from './components/apps/News'
import { BiTrendingUp} from 'react-icons/bi'
import './styles/search.scss'
import axios from 'axios'

export default function Search(){

    const [photo,setPhoto] = useState()
    const [loading, setLoading] = useState(false)
    const apiKey = '563492ad6f91700001000001e07dd8365f884d199cec10a23b55a4bc'

    const getPhoto = async(picture: string) =>{
        setLoading(true)
        const {data} = await axios.get(`https://api.pexels.com/v1/search?query=${picture}`, {
            headers: {
                Authorization: apiKey,
            },
        });
        setPhoto(data.photos[0].src.medium);
        setLoading(false)
    }

useEffect(()=>{
getPhoto('war')
},[])

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
            <div id='img-container'>
            <img src={photo} id='aurora-img'/> 
            <div id="label">Aurora</div>
            </div>
            : null}
            <div id="news-container">
                <div id="trending">
                <BiTrendingUp/>
                Trending News from the web
                </div>
            <News />
            </div>
           
            </div>
            </div>
            <input type="text" />
        </div>
    )
}