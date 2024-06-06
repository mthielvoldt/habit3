import React, {useState} from "react";
import { useDrop } from "react-dnd";

export default function Day({day}) {
  const [yValue, setYValue] = useState(12);
  const [{ isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'rock',
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop: handleDrop
  }))

  function handleDrop(item, monitor) {
    console.log(yValue);
    console.log(day.dayOfWeek)
    console.log(item);
    console.log(monitor);
  }

  function handleMouseOver(event) {
    if (event.clientY !== 0) {
      setYValue(event.clientY);
    }
  }

  return (
    <div
      className="day"
      ref={drop}
      onDragOverCapture={handleMouseOver}
    >
      <div className="shadow-event"
        style={{top: yValue.toString()+'px', visibility: isOver ? 'visible' : 'hidden'}}>
      </div>
    </div>
  );
}