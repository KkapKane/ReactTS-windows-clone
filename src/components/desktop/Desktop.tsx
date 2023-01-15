import '../../styles/desktop.scss'

interface Props {
  desktopIcon: {
    name: string;
    icon: string;
  }[];
  
}

export default function Desktop({desktopIcon}: Props){


  
    return (
        <div id="desktop">
            {desktopIcon.map((cell, index)=> {
                return ( 
                    <div className='desktop-icon'>
                        <img className='icon' src={desktopIcon[index].icon} alt="" />
                        {desktopIcon[index].name}
                    </div>
                )
            })}
        </div>
    )
}