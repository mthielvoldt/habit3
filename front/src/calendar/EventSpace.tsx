import React, {useState} from "react";
import Day from "./Day";

export default function EventSpace({days, week, appts, addAppt, updateApptTime, deleteAppt}) {
  

  return (
    <div id="calendar-events">
      {days.map((day, index) => (
        <Day
          key={day.dayOfWeek}
          dayIndex={index}
          week={week}
          appts={appts}
          addAppt={addAppt}
          updateApptTime={updateApptTime}
          deleteAppt={deleteAppt}
        />
      ))}
    </div>
  );
}
