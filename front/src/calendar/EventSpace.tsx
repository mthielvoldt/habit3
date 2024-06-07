import React, {useState} from "react";
import Day from "./Day";
import { mockAppts } from "../../mockData";

export default function EventSpace({days}) {
  const [appts, setAppts] = useState(mockAppts);

  function addAppt(newAppt) {
    const newAppts = [...appts, newAppt]
    
    console.log(newAppts);
    setAppts(newAppts);
  }

  return (
    <div id="calendar-events">
      {days.map((day, index) => (
        <Day
          key={day.dayOfWeek}
          dayIndex={index}
          appts={appts}
          addAppt={addAppt}
        />
      ))}
    </div>
  );
}
