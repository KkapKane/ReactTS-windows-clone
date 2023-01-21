import '../../styles/search.scss';
import SearchRight from './SearchRight';
import { useState, useEffect } from 'react';

export default function Search() {

    const [input, setInput] = useState('')

    useEffect(()=>{
        console.log(input)
    },[input])

    return (
        <div id="search" onClick={(e) => e.stopPropagation()}>
            <div id="nav">NAV BAR</div>
            <div className="middle">
                <div className="left">
                    <div id="system-files">


                    </div>
                </div>
                <SearchRight />
            </div>
            <input type="text"  onChange={(e)=> setInput(e.target.value)}/>
        </div>
    )
}