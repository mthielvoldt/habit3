import React, {useState} from "react";
import Day from "./Day";

export default function EventSpace({days}) {

  return (
    <div id="calendar-events">
      {days.map(day => (
        <Day
          key={day.dayOfWeek}
          day={day}
        />
      ))}
    </div>
  );
}
