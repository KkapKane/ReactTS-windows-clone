
import '../../styles/searchLeft.scss'
import { useContext } from 'react';
import { programHandle } from '../../helper/ProgramHandle';
import { Programs, Tasks } from '../context/Programs';


interface Props {
  suggestions: any;
  setSearchDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  openIcon: (name: string) => void;
}
export default function SearchLeft({suggestions, setSearchDisplay, openIcon}:Props) {

    const openProgram = (name:string,bool:boolean,programs:any,tasks:any,setTask:any,setPrograms:any, type: string) => {
        if(type ==='program'){

            programHandle(
              name,
              bool,
              programs,
              tasks,
              setTask,
              setPrograms
            );
        }
        else {
            openIcon(name)
        }
        setSearchDisplay(false)
    }
    const { programs, setPrograms }: any = useContext(Programs);
    const { tasks, setTask }: any = useContext(Tasks);

 


    return (
        <div id="search-left">
            {suggestions ? suggestions.map((suggestion: any)=>{
                return (
                    <div className='search-icons' id={suggestion.name} onClick={()=>  openProgram(suggestion.name,true, programs, tasks, setTask, setPrograms, suggestion.type)}>
                    {typeof suggestion.icon == 'string' ? <img src={suggestion.icon} alt={suggestion.name} /> : suggestion.icon}
                    {suggestion.name}
                    </div>
                )
            }):null} 
        </div>
    )
}