import React, {useState} from "react";
import DayLabel from "./DayLabel";

export default function DayAxis({days}) {

  return (
    <div id="day-axis">
      {days.map(day => (
        <DayLabel
          key={day.dayOfWeek}
          day={day}
        />
      ))}
      
    </div>
  );
}
