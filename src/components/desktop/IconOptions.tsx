import '../../styles/desktop.scss'
import { useEffect } from 'react';

interface Props {
  desktopIcon: {
    name: string;
    icon: string;
    rename: boolean;
    type: string;
    open: boolean;
  }[];

  setDesktopIcon: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        icon: string;
        rename: boolean;
        type: string;
        open: boolean;
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
    
    const openIcon = (name: string) => {
        let nameIndex = desktopIcon.map((icon)=>{
            if(name === icon.name){
             
                return {...icon, open: true}
               } else {
                return {...icon, open: false}
               }
            
        })
        setDesktopIcon(nameIndex)
    }
        
    return (
        <div className="icon-options">
            <ul>
                <li onClick={()=> openIcon(currentFocus)}>Open</li>
                <li onClick={()=> renameIcon(currentFocus)}>Rename</li>
                <li onClick={()=> deleteIcon(currentFocus)}>Delete</li>
            </ul>
        </div>
    )
}