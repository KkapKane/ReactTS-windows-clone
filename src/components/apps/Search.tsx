import '../../styles/search.scss';
import SearchRight from './SearchRight';


export default function Search() {



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
            <input type="text" />
        </div>
    )
}