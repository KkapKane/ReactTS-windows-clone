import personalize from "../../assets/personalize.png";
import folder from "../../assets/folder.png";
import textDoc from "../../assets/textDoc.png"
import { useState } from "react";
import { DesktopIconType } from "../../types/project_types";

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
  const [delayHandler, setDelayHandler] = useState<number | null | undefined>(
    null
  );

  // makes hovering over the 'new' option not pop out instantly
  const mouseEnter = () => {
    setDelayHandler(
      setTimeout(() => {
        setShowOption(true);
      }, 500)
    );
  };

  //only goes away if mouse leaves the new extra-option div
  const mouseLeave = (e: React.ChangeEvent<any>): void => {
    if (typeof delayHandler == "number") {
      setShowOption(false);

      clearTimeout(delayHandler);
    }
  };

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
        icon: folder, rename: false, type: 'folder', open: false, parent:'', filePath: []
      },
    ]);
    setAllFiles([
      ...allFiles,
      {
        name: folderCount == 0 ? `New Folder` : `New Folder(${folderCount})`,
        icon: folder, rename: false, type: 'folder', open: false, parent:'', filePath:[]
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
        parent: '',
        filePath: []
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
        parent: '',
        filePath: []
      },
    ]);
  }
  return (
    <div id='desktop-options'>
      <ul>
        <li>View</li>
        <li>Sort by</li>
        <li>Refresh</li>
      </ul>
      <hr />
      <div className='new' onMouseEnter={() => mouseEnter()}>
        New
      </div>
      {showOption ? (
        <div id='extra-option' onMouseLeave={(e) => mouseLeave(e)}>
          <span onClick={() => makeFolder()}>New Folder</span>
          <span onClick={()=> makeTextDoc()}>Text Document</span>
        </div>
      ) : null}
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
