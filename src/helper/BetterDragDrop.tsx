


 export const dragStart = (e: React.MouseEvent, handleName: string, setFileContainerInfo: any, fileContainerInfo: any, helperHandleRef: any) =>{
   let target = e.target as HTMLDivElement;
   const x = e.clientX - target.getBoundingClientRect().left - 600;
   const y = e.clientY - target.getBoundingClientRect().top - 400;
   if (helperHandleRef.current) {
     helperHandleRef.current.style.display = "flex";
     helperHandleRef.current.style.left = `${x}px`;
     helperHandleRef.current.style.top = `${y}px`;
     console.log("y");
     console.log(x, y);
   } 

  if(target.id == handleName || target.className == handleName || target.className =='extended-handle')
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
    if( e.clientY > 740){
       setFileContainerInfo({...fileContainerInfo, dragging: false})
        console.log(e.clientY)
    }
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
   fileContainerInfo: any,
   helperHandleRef: any
 ) => {

   setFileContainerInfo({ ...fileContainerInfo, dragging: false });
   if (helperHandleRef.current) {
     helperHandleRef.current.style.display = "none";
   }
 };  