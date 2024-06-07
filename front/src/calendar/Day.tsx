import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import * as ts from "./utils/timeUtils";
import Appointment from "./Appointment";

export default function Day({ dayIndex, appts, addAppt }) {
  const [shadowYOffset, setShadowYOffset] = useState(0);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      setDims({width: ref.current.offsetWidth, height: ref.current.offsetHeight});
    }
  }, [ref.current]);
  const [{ isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'rock',
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop: handleDrop
  }), [shadowYOffset])

  const allAppts: ts.Appt[] = appts;
  // filter for just this day's appointments;
  const weekStart = ts.getWeekStart(new Date());
  const dayStart = ts.addDays(weekStart, dayIndex);
  const dayEnd = ts.addDays(dayStart, 1);
  const todaysAppts = ts.getApptsInWindow(allAppts, { start: dayStart, end: dayEnd });

  function handleDrop(item) {
    console.log({shadowYOffset, dims, item})
    const newAppt = new ts.Appt(item.text, {hours: shadowYOffset / 40}, dayStart);
    addAppt(newAppt);
  }

  function handleDragOver(event) {
    const yOffset = event.target.getBoundingClientRect().top;
    console.log({yOffset, mousey: event.clientY});
    setShadowYOffset(event.clientY - yOffset);
  }

  return (
    <div className="day" ref={ref}>
      <div className="day-inner"
        ref={drop}
        onDragOverCapture={handleDragOver}
        
      >
        {todaysAppts.map((appt, index) =>
          <Appointment
            key={index}
            appt={appt}
            dayStart={dayStart}
            depth={0}
            position={0}
            dayDimensions={dims}
          />
        )}
        <div className="shadow-event"
          style={{ top: shadowYOffset.toString() + 'px', visibility: isOver ? 'visible' : 'hidden' }}
        />
      </div>
    </div>
  );
}