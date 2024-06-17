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
  const [{ isOver, dragItemType }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: ['appt', 'rock', 'end-time'],
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      dragItemType: monitor.getItemType()
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
        const newAppt = new ts.Appt(item.text, { hours: pointerYInDay / 40 }, dayStart);
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
      case "end-time": {
        console.log("end-time dropped for appt Id:", item.id);
        const newEndTime = ts.offsetTime({ hours: pointerYInDay / 40}, dayStart);
        if (newEndTime - item.start > 15*60000) {
          updateApptTime(item.id, item.start, newEndTime);
        }
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
    return isOver && ['appt', 'rock'].includes(dragItemType)? 'visible' : 'hidden'
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
          />
        )}
        <div className="shadow-event"
          style={{ top: pointerYInDay.toString() + 'px', visibility: getShadowVisibility()  }}
        />
      </div>
    </div>
  );
}