import personalize from "../../assets/personalize.png";
import folder from "../../assets/folder.png";
import textDoc from "../../assets/textDoc.png"
import { useState } from "react";
import { DesktopIconType } from "../../types/project_types";
import { BsChevronRight } from 'react-icons/bs';

interface Props {
  setDesktopIcon: React.Dispatch<React.SetStateAction<DesktopIconType[]>>;
  desktopIcon: DesktopIconType[];
  setAllFiles: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        icon: string;
        rename: boolean;
        type: string;
        open: boolean;
        content: never[];
      }[]
    >
  >;
  allFiles: any;
}

export default function DesktopOptions({ desktopIcon, setDesktopIcon, setAllFiles, allFiles }: Props) {
  const [showOption, setShowOption] = useState(false);

  // makes hovering over the 'new' option not pop out instantly
  let timer: any = 0;
  const TIMEOUT = 500;

  function mouseEnter() {
    timer = setTimeout(() => {
      setShowOption(true);
    }, TIMEOUT)
  }

  //only goes away if mouse leaves the new extra-option div
  function mouseLeave() {
    setShowOption(false);
    clearTimeout(timer);
  }

  const makeFolder = () => {
    let folderCount = 0;
    desktopIcon.forEach((element, index, array) => {
      //if desktopIcon array already contains an object with the name New Folder then add to folder count
      if (
        element.name.match(/New Folder/g) ||
        element.name.match(/^New Folder$/)
      ) {
        folderCount++;
      }
    });
    setDesktopIcon([
      ...desktopIcon,
      {
        name: folderCount == 0 ? `New Folder` : `New Folder(${folderCount})`,
        icon: folder, rename: false, type: 'folder', open: false, show: true, content: [], parent: ''
      },
    ]);
    setAllFiles([
      ...allFiles,
      {
        name: folderCount == 0 ? `New Folder` : `New Folder(${folderCount})`,
        icon: folder, rename: false, type: 'folder', open: false, show: true, content: [], parent: ''
      },
    ]);
  };

  const makeTextDoc = () => {
    let textDocCount = 0;
    desktopIcon.forEach((element, index, array) => {
      //if desktopIcon array already contains an object with the name New Folder then add to folder count
      if (
        element.name.match(/New Text Document/g) ||
        element.name.match(/^New Text Document$/)
      ) {
        textDocCount++;
      }
    });
    setDesktopIcon([
      ...desktopIcon,
      {
        name: textDocCount == 0 ? `New Text Document.txt` : `New Text Document(${textDocCount}).txt`,
        icon: textDoc,
        rename: false,
        type: 'text_document',
        open: false,
        show: true,
        parent: ''
      },
    ]);
    setAllFiles([
      ...allFiles,
      {
        name: textDocCount == 0 ? `New Text Document.txt` : `New Text Document(${textDocCount}).txt`,
        icon: textDoc,
        rename: false,
        type: 'text_document',
        open: false,
        show: true,
        parent: ''
      },
    ]);
  }
  return (
    <div id='desktop-options'>
      <ul>
        <li><p>View</p> <BsChevronRight size={16} /></li>
        <li><p>Sort by</p> <BsChevronRight size={16} /></li>
        <li>Refresh</li>
      </ul>
      <hr />
      <div className='new' onMouseEnter={mouseEnter}>
        <p>New</p> <BsChevronRight size={16} />
      </div>
      {showOption ? (
        <div id='extra-option' onMouseLeave={mouseLeave}>
          <span onClick={() => makeFolder()}>New Folder</span>
          <span onClick={() => makeTextDoc()}>Text Document</span>
        </div>
      ) : null}
      <hr />
      <div className='display-settings'>
        <span>
          <img src={personalize} alt='personalize' />
          Display Settings
        </span>
        <span>
          <img src={personalize} alt='personalize' />
          Personalize
        </span>
      </div>
    </div>
  );
}
