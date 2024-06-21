import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import * as ts from "./utils/timeUtils";
import Appointment from "./Appointment";

export default function Day({ dayIndex, appts, addAppt, updateApptTime, deleteAppt }) {
  const [pointerYInDay, setpointerYInDay] = useState(0);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      setDims({ width: ref.current.offsetWidth, height: ref.current.offsetHeight });
    }
  }, [ref.current]);
  const [{ isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: ['appt', 'rock'],
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: handleDrop
  }), [pointerYInDay])

  const allAppts: ts.Appt[] = appts;
  // filter for just this day's appointments;
  const weekStart = ts.getWeekStart(new Date());
  const dayStart = ts.addDays(weekStart, dayIndex);
  const dayEnd = ts.addDays(dayStart, 1);
  const todaysAppts = ts.getApptsInWindow(allAppts, { start: dayStart, end: dayEnd });

  function handleDrop(item: any, monitor) {
    switch (monitor.getItemType()) {
      case "rock": {
        console.log("rock dropped");
        const newAppt = new ts.Appt(item.text, { hours: pointerYInDay / 40, rockId: item.id}, dayStart);
        addAppt(newAppt);
        break;
      }
      case "appt": {
        console.log("appt dropped");
        const newStart = ts.offsetTime({ hours: pointerYInDay / 40 }, dayStart);
        const newEndTime = ts.offsetTime({ minutes: item.durationMinutes }, newStart);
        updateApptTime(item.id, newStart, newEndTime);
        break;
      }
      default: {
        console.log("unexpected item type in handleDrop():", monitor.getItemType(), item);
      }
    }
    // console.log({ shadowYOffset, dims, item });
  }

  function handleDragOver(event) {
    const yOffset = document.getElementById('calendar-events').getBoundingClientRect().top;
    // console.log({yOffset, mousey: event.clientY});
    const localY = event.clientY - yOffset;
    setpointerYInDay(localY);

  }
  function getShadowVisibility() {
    return isOver ? 'visible' : 'hidden';
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
            deleteAppt={deleteAppt}
            updateApptTime={updateApptTime}
          />
        )}
        <div className="shadow-event"
          style={{ top: pointerYInDay.toString() + 'px', visibility: getShadowVisibility()  }}
        />
      </div>
    </div>
  );
}