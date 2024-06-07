import React, { useState } from "react";
import { useDrop } from "react-dnd";
import * as ts from "./utils/timeUtils";

export default function Day({ dayIndex, appts }) {
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

  const allAppts: ts.Appt[] = appts;
  // filter for just this day's appointments;
  const weekStart = ts.getWeekStart(new Date());
  const dayStart = ts.addDays(weekStart, dayIndex);

  const todaysAppts = ts.getApptsInWindow(
    allAppts, 
    {start: dayStart, end: ts.addDays(dayStart, 1)}
  );
  const todaysApptNames = ts.getNamesAsString(todaysAppts);

  function handleDrop(item, monitor) {
    console.log({
      yValue: shadowYOffset,
      day: dayIndex,
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
      {todaysApptNames}
      <div className="shadow-event"
        style={{ top: shadowYOffset.toString() + 'px', visibility: isOver ? 'visible' : 'hidden' }}
      />
    </div>
  );
}