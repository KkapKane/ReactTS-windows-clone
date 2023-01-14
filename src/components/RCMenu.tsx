import '../styles/RCMenu.scss'
import personalize from '../assets/personalize.png'

interface Props {
   rcMenuRef: React.RefObject<HTMLDivElement>;
}


export default function RCMenu({rcMenuRef} : Props ){
     return (
       <div id='rc-menu' ref={rcMenuRef}>
         <ul>
           <li>View</li>
           <li>Sort by</li>
           <li>Refresh</li>
         </ul>
         <hr />
         <div className="new">New</div>
         <hr />
         <div className='display-settings'>
           <span>
             <img src={personalize} alt='' />
             Display Settings
           </span>
           <span>
             <img src={personalize} alt='' />
             Personalize
           </span>
         </div>
       </div>
     );
}