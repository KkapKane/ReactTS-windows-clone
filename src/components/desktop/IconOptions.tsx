import '../../styles/desktop.scss'
import { useEffect } from 'react';

interface Props {
  desktopIcon: {
    name: string;
    icon: string;
    rename: boolean;
  }[];

  setDesktopIcon: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        icon: string;
        rename: boolean;
      }[]
    >
  >;
  currentFocus: string;
  inputRef: React.RefObject<HTMLInputElement>;
 
}

export default function IconOptions({desktopIcon, setDesktopIcon,currentFocus,inputRef}: Props){

    

   const renameIcon = async(name: string) =>{
    let inputTimer = setTimeout(()=>{
        if(inputRef.current){
           
            inputRef.current.focus()
        }

    },10)
        let nameIndex = desktopIcon.map((icon)=>{
            if(name === icon.name){

                return {...icon, rename: true} 
            }else {
                return {...icon, rename: false}
            }
        })
        setDesktopIcon(nameIndex)
 
        return ()=> clearTimeout(inputTimer)
    }

    const deleteIcon = (name: string) => {
        let newList = desktopIcon.filter((icon) => icon.name !== name)
        setDesktopIcon(newList)
    }    
        
        
    return (
        <div className="icon-options">
            <ul>
                <li>Open</li>
                <li onClick={()=> renameIcon(currentFocus)}>Rename</li>
                <li onClick={()=> deleteIcon(currentFocus)}>Delete</li>
            </ul>
        </div>
    )
}