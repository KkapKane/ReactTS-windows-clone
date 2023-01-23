import '../../styles/search.scss';
import SearchRight from './SearchRight';
import { useState, useEffect, useRef, useContext } from 'react';
import { Programs } from '../context/Programs';
import { DesktopIconType } from '../../types/project_types';
import SearchLeft from './SearchLeft';
import { VscSearch } from 'react-icons/vsc'

interface Props {
  desktopIcon: DesktopIconType[];
  setSearchDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  setDesktopIcon: any;
}

export default function Search({ desktopIcon, setSearchDisplay, setDesktopIcon }: Props) {

  const [input, setInput] = useState('')
  const { programs, setPrograms }: any = useContext(Programs);
  const [suggestions, setSuggestions]: any = useState()
  const searchRef = useRef<HTMLInputElement>(null);

  const getAutoComplete = (query: string) => {
    let everyFile = [...programs, ...desktopIcon]

    let result: string[] = everyFile.filter((ev) => ev.name.toLowerCase().includes(query.toLowerCase()))
    setSuggestions(result)
  }

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [])
  useEffect(() => {
    getAutoComplete(input)
  }, [input])

  const openIcon = (name: string) => {
    let nameIndex = desktopIcon.map((icon) => {
      if (name === icon.name) {
        return { ...icon, open: true };
      } else {
        return { ...icon, open: false };
      }
    });
    setDesktopIcon(nameIndex);
  };

  return (
    <div id="search" onClick={(e) => e.stopPropagation()}>
      <div className="middle">
        <SearchLeft
          suggestions={suggestions}
          setSearchDisplay={setSearchDisplay}
          openIcon={openIcon} 
          />
        <SearchRight />
      </div>
      <div id="search-input">
        <VscSearch size={20} />
        <input type="text"
          ref={searchRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type here to search' 
          />
      </div>
    </div>
  )
}