import React, {useState} from "react";
import { useDrop } from "react-dnd";

export default function Day({day}) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'rock',
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <div className="day" ref={drop} style={{ backgroundColor: isOver ? 'red' : 'white'}}>
      {canDrop ? 'Release to drop' : 'drag a rock here'}
    </div>
  );
}