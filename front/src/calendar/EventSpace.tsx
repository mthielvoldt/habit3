import React, {useState} from "react";
import Day from "./Day";

export default function EventSpace({days, appts, addAppt, updateApptTime}) {
  

  return (
    <div id="calendar-events">
      {days.map((day, index) => (
        <Day
          key={day.dayOfWeek}
          dayIndex={index}
          appts={appts}
          addAppt={addAppt}
          updateApptTime={updateApptTime}
        />
      ))}
    </div>
  );
}
