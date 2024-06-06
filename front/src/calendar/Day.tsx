import React, { useState } from "react";
import { useDrop } from "react-dnd";

export default function Day({ day }) {
  const [shadowYOffset, setShadowYOffset] = useState(0);
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
    console.log({
      yValue: shadowYOffset,
      day: day.dayOfWeek,
      name: item.text,
    });
  }

  function handleDragOver(event) {
    const yOffset = event.target.getBoundingClientRect().top;
    setShadowYOffset(event.clientY - yOffset);
  }

  return (
    <div
      className="day"
      ref={drop}
      onDragOverCapture={handleDragOver}
    >
      <div className="shadow-event"
        style={{ top: shadowYOffset.toString() + 'px', visibility: isOver ? 'visible' : 'hidden' }}
      />
    </div>
  );
}