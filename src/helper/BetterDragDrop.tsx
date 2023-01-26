


 export const dragStart = (e: React.MouseEvent, handleName: string, setFileContainerInfo: any, fileContainerInfo: any) =>{
    
  let target = e.target as HTMLDivElement
  if(target.id == handleName || target.className == handleName)
  setFileContainerInfo({...fileContainerInfo, 
    diffX: e.screenX - target.getBoundingClientRect().left,
    diffY: e.screenY - target.getBoundingClientRect().top,
    dragging: true  
  })
  
 }
 export const dragging = (
   e: React.MouseEvent,
   setFileContainerInfo: any,
   fileContainerInfo: any
 ) => {
   if (fileContainerInfo.dragging) {
     let left = e.screenX - fileContainerInfo.diffX;
     let top = e.screenY - fileContainerInfo.diffY;
     setFileContainerInfo({
       ...fileContainerInfo,
       styles: { left: left, top: top },
     });
   }
 };  
 export const dragEnd = (
   e: React.MouseEvent,
   setFileContainerInfo: any,
   fileContainerInfo: any
 ) => {
   setFileContainerInfo({ ...fileContainerInfo, dragging: false });
 };  