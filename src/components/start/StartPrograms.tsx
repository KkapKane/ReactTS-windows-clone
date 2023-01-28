import { useContext, ReactNode } from "react";
import { FcCalculator } from "react-icons/fc";
import paint from "../../assets/paint.png";
import audition from "../../assets/audition.png";
import maple from "../../assets/maplestory-logo.png";
import arashiyama from "../../assets/arashiyama.png";
import { taskType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Context";
import { FaYoutube, FaTwitter, FaGithub, FaGithubAlt } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";

export default function StartPrograms() {
  const { programs, setPrograms }: any = useContext(Programs);
  const { tasks, setTask }: any = useContext(Tasks);

  // makes the program visible or not. (close or open program)
  const programHandle = (
    programName: string,
    icon: ReactNode,
    visible: boolean
  ) => {
    const newProgram = programs.map((program: any) => {
      if (program.name === programName) {
        return { ...program, visible: visible };
      } else {
        return { ...program, visible: false };
      }
    });

    setPrograms(newProgram);
    //if there is already a program open, close program down and open the new one that was just clicked.
    if (tasks.length > 3) {
      let newState = tasks;
      newState.pop();
      setTask(newState);
    }

    //if this program already exist in the task bar just return
    const index = tasks.findIndex(
      (task: taskType) => task.name === programName
    );
    if (index > -1) {
      return;
    }
    //this adds the program to the task list so it appears in the task bar
    setTask([
      ...tasks,
      { name: programName, icon: icon, isHover: false, minimized: false },
    ]);
  };

  return (
    <div id='start-programs'>
      <div className='left'>
        <span
          onClick={() =>
            programHandle("Calculator", <FcCalculator size={30} />, true)
          }
        >
          <FcCalculator size={30} />
          Calculator
        </span>
        <span onClick={() => programHandle("Dance Game", audition, true)}>
          <img src={audition} alt='audition' />
          Dance Game
        </span>
        
        <span onClick={() => programHandle("Paint", paint, true)}>
          <img id='paint-png' src={paint} alt='paint' />
          Paint
        </span>
      </div>
      <div className='right'>
        <div className='title'>Apps</div>
        <span
          onClick={() =>
            programHandle("Youtube", <FaYoutube size={30} color='red' />, true)
          }
        >
          <div className="image">
            <FaYoutube size={42} color='red' />
          </div>
          <p>Youtube</p>
        </span>
        <span
          onClick={() =>
            programHandle(
              "Twitter",
              <FaTwitter size={30} color='#1d9bf0' />,
              true
            )
          }
        >
          <div className="image">
            <FaTwitter size={42} color='#1d9bf0' />
          </div>
          <p>Twitter</p>
        </span>
        <span onClick={() => programHandle("Dance Game", audition, true)}>
          <div className="image">
            <img src={audition} alt='audition' />
          </div>
          <p>Dance Game</p>
        </span>
        <span onClick={() => programHandle("MapleStore", maple, true)}>
          <div className="image">
            <img src={maple} alt='maple' />
          </div>
          <p>MapleStore</p>
        </span>
        <span onClick={() => programHandle("Arashiyama", arashiyama, true)}>
          <div className="image">
            <img src={arashiyama} alt='arashiyama' />
          </div>
          <p>Arashiyama Store</p>
        </span>
        <span
          onClick={() => programHandle("Todo", <FcTodoList size={30} />, true)}
        >
          <div className="image">
            <FcTodoList size={42} />
          </div>
          <p>To Do List</p>
        </span>
        <a href='https://github.com/KkapKane' target='_blank'>
          <div className="image">
            <FaGithub size={42} />
          </div>
          <p>GitHub/KkapKane</p>
        </a>
        <a href='https://github.com/lisa-go' target='_blank'>
          <div className="image">
            <FaGithubAlt size={42} />
          </div>
          <p>GitHub/lisa-go</p>
        </a>
      </div>
    </div>
  );
}
