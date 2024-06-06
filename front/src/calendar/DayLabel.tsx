import React, {useState} from "react";


export default function DayLabel({day}) {

  return (
    <div className="day-label">
      <h4>{day.dayOfWeek}</h4>
    </div>
  );
}