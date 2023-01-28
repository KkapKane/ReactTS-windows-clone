import { Programs, Tasks, dragInfo } from "./components/context/Context";
import { DesktopIconType, taskType } from "./types/project_types";
import { FaYoutube, FaTwitter } from "react-icons/fa";
import fileExplorer from "./assets/file-explorer.png";
import { useState, useRef, useEffect } from "react";
import Desktop from "./components/desktop/Desktop";
import RCMenu from "./components/desktop/RCMenu";
import arashiyama from "./assets/arashiyama.png";
import maple from "./assets/maplestory-logo.png";
import recycle from "./assets/recycle-bin.png";
import { FcCalculator } from "react-icons/fc";
import taskView from "./assets/task-view.png";
import audition from "./assets/audition.png";
import TaskBar from "./components/TaskBar";
import search from "./assets/search.png";
import paint from "./assets/paint.png";
import { FcTodoList } from "react-icons/fc";
import "./styles/style.scss";

function App() {
  // big clock display on click //
  const [clock, setClock] = useState(false);

  const handleClock = () => {
    setClock(!clock);
  };

  // dismiss clock on window click //
  const dismissClock = () => {
    setClock(false);
  };

  //global useContext can be used anywhere.
  const [programs, setPrograms] = useState([
    {
      name: "Calculator",
      icon: <FcCalculator size={30} />,
      visible: false,
      type: "program",
    },
    { name: "Paint", icon: paint, visible: false, type: "program" },
    { name: "Dance Game", icon: audition, visible: false, type: "program" },
    {
      name: "Youtube",
      icon: <FaYoutube size={30} color='red' />,
      visible: false,
      type: "program",
    },
    {
      name: "Twitter",
      icon: <FaTwitter size={30} color='#1d9bf0' />,
      visible: false,
      type: "program",
    },
    { name: "MapleStore", icon: maple, visible: false, type: "program" },
    { name: "Arashiyama", icon: arashiyama, visible: false, type: "program" },
    {
      name: "Todo",
      icon: <FcTodoList size={30} />,
      visible: false,
      type: "program",
    },
  ]);

  //global useContext but for Tasks

  const [tasks, setTask] = useState<taskType[]>([
    { name: "Search", icon: search, hover: false, minimized: false },
    { name: "Task view", icon: taskView, hover: false, minimized: false },
    {
      name: "File Explorer",
      icon: fileExplorer,
      hover: false,
      minimized: false,
    },
  ]);

      
  const [allFiles, setAllFiles] = useState<DesktopIconType[]>([
    {
      name: "Recycle Bin",
      icon: recycle,
      rename: false,
      type: "bin",
      open: false,
      parent: "",
      filePath: [],
    },
  ]);

  const [dragContainerInfo, setDragContainerInfo] = useState({
    diffX: 0,
    diffY: 0,
    dragging: false,
    styles: {},
  });

  const [whichMenu, setWhichMenu] = useState("");

  //calculator client dom node
  const calcRef = useRef<HTMLDivElement>(null);
  //paint client dom node
  const paintRef = useRef<HTMLDivElement>(null);

  //app.tsx client dom node
  const containerRef = useRef<HTMLDivElement>(null);
  const rcMenuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLImageElement>(null);

  const [currentFocus, setCurrentFocus] = useState("");
  const [currentDrag, setCurrentDrag] = useState(-1);
  //id of the element the mouse is on
  const [finalMouseDestination, setFinalMouseDestination] = useState<DesktopIconType | undefined>();
  useEffect(() => {
    //closes the right click menu if clicked anywhere on the desktop
    document.body.addEventListener("click", (event: MouseEvent) => {
      if (!rcMenuRef.current) return;
      rcMenuRef.current.style.display = "none";
    });

    //prevents right click on webpage so implementing our own right click function is possible
    document.addEventListener("contextmenu", (event: MouseEvent) => {
      if (!event.target) return;
      const target = event.target as HTMLDivElement;
      setCurrentFocus(target.id);
      const x = event.clientX;
      const y = event.clientY;
      event.preventDefault();

      if (!rcMenuRef.current) return;
      //sets the right click menu div from none to flex and then put it at the position of mouse
      rcMenuRef.current.style.display = "flex";
      rcMenuRef.current.style.left = `${x}px`;
      rcMenuRef.current.style.top = `${y}px`;
      setWhichMenu(target.className);
    });

    const cleanUp = () => {
      document.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      document.body.removeEventListener("click", () => {
        if (!rcMenuRef.current) return;
        rcMenuRef.current.style.display = "none";
      });
    };
    return cleanUp;
  }, []);

  useEffect(() => {
    //creates a clone of the icon being clicked and put it at mouse position
    const createIconClone = (event: MouseEvent) => {
      event.preventDefault();
      const target = event.target as HTMLDivElement;
      // setCurrentFocus(target.id)
      let currentTaskIndex = allFiles.findIndex(
        (icon: DesktopIconType) => icon.name === target.id
      );
      setCurrentDrag(currentTaskIndex);
      const x = event.clientX;
      const y = event.clientY;
      if (dragRef.current) {
        dragRef.current.style.left = `${x}px`;
        dragRef.current.style.top = `${y}px`;
      }
    };

    const moveIconClone = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      if (dragRef.current) {
        dragRef.current.style.left = `${x}px`;
        dragRef.current.style.top = `${y}px`;
      }
    };

    const letGoIcon = () => {
      setCurrentDrag(-1);
      if (currentDrag === -1 || allFiles[currentDrag] == finalMouseDestination )  return;
      if(!finalMouseDestination) return;
      if (finalMouseDestination.type == "bin") {
        const index = allFiles.findIndex(
          (icon: DesktopIconType) => icon.name !== allFiles[currentDrag]?.name
        );
        if (index > -1) {
          setAllFiles(
            allFiles.filter(
              (icon: DesktopIconType) =>
                icon.name !== allFiles[currentDrag]?.name
            )
          );
        }
      } else if (finalMouseDestination.type == "folder") {
        //makes the icon on desktop dissapear
        let setParent = allFiles.map((file: DesktopIconType) => {
          if (file.name === allFiles[currentDrag].name) {
            return { ...file, parent: finalMouseDestination.name };
          } else {
            return { ...file, parent: file.parent };
          }
        });
        let setPath = setParent.map((file: DesktopIconType) => {
          if (file.name === allFiles[currentDrag].name) {
            return {
              ...file,
              filePath: [...file.filePath, finalMouseDestination.name],
            };
          } else {
            return { ...file, filePath: file.filePath };
          }
        });
        setAllFiles(setPath);
      }
    };

    document.body.addEventListener("mousedown", createIconClone);
    document.body.addEventListener("mouseup", letGoIcon);
    document.body.addEventListener("mousemove", moveIconClone);

    console.log(allFiles);
    const cleanUp = () => {
      document.body.removeEventListener("mousedown", createIconClone);
      document.body.removeEventListener("mousemove", moveIconClone);
      document.body.removeEventListener("mouseup", letGoIcon);
    };
    return cleanUp;
  }, [finalMouseDestination, allFiles]);

  return (
    //can retrieve programs data anywhere if it's wrapped inside programs.provider
    <dragInfo.Provider value={{ dragContainerInfo, setDragContainerInfo }}>
      <Programs.Provider value={{ programs, setPrograms }}>
        <Tasks.Provider value={{ tasks, setTask }}>
          <div className='App' onClick={dismissClock} ref={containerRef}>
            <RCMenu
              rcMenuRef={rcMenuRef}
              whichMenu={whichMenu}
              currentFocus={currentFocus}
              inputRef={inputRef}
              setAllFiles={setAllFiles}
              allFiles={allFiles}
            />
            <Desktop
              paintRef={paintRef}
              calcRef={calcRef}
              programs={programs}
              containerRef={containerRef}
              currentFocus={currentFocus}
              inputRef={inputRef}
              setfinalMouseDestination={setFinalMouseDestination}
              allFiles={allFiles}
              setAllFiles={setAllFiles}
            />
            {currentDrag !== -1 ? (
              <img
                src={allFiles[currentDrag].icon}
                ref={dragRef}
                style={{ position: "absolute", opacity: ".7" }}
              ></img>
            ) : null}
            <TaskBar
              handleClock={handleClock}
              clock={clock}
              setAllFiles={setAllFiles}
              allFiles={allFiles}
            />
          </div>
        </Tasks.Provider>
      </Programs.Provider>
    </dragInfo.Provider>
  );
}

export default App;
