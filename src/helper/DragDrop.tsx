

export function dragDrop(
  targetRef: React.RefObject<HTMLDivElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  targetHandle: string,
  coords: React.MutableRefObject<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>,
  isClicked: React.MutableRefObject<boolean>
) {
  if (!targetRef.current || !containerRef.current) return;

  const box = targetRef.current;
  const container = containerRef.current;

  const onMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.id === targetHandle || target.className === targetHandle) {
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
     var waitClick = setTimeout(()=>{

        isClicked.current = true;
      }, 10)
      waitClick
    }
    return ()=> clearTimeout(waitClick)
  };
  const onMouseUp = (e: MouseEvent) => {
    isClicked.current = false;
    coords.current.lastX = box.offsetLeft ;
    coords.current.lastY = box.offsetTop;

    
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!isClicked.current) return;

    box.style.top = `${e.clientY}px`;
    box.style.left = `${e.clientY}px`;
    const nextX = e.clientX - coords.current.startX + coords.current.lastX;
    const nextY = e.clientY - coords.current.startY + coords.current.lastY;
    box.style.top = `${nextY}px`;
    box.style.left = `${nextX}px`;

  };

  box.addEventListener("mousedown", onMouseDown);
  box.addEventListener("mouseup", onMouseUp);
  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("mouseleave", onMouseUp);

  const cleanup = () => {
    box.removeEventListener("mousedown", onMouseDown);
    box.removeEventListener("mouseup", onMouseUp);
    box.removeEventListener("mousemove", onMouseMove);
    box.removeEventListener("mouseleave", onMouseUp);
  };

  return cleanup;
}