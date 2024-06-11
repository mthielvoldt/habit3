import React from "react";
import { Appt } from "./utils/timeUtils";

export default function Appointment({appt, dayStart, depth, position, dayDimensions}) {

  const appointment: Appt = appt;

  let topVal = (appointment.start - dayStart) / (24*3600*1000) * dayDimensions.height;
  let height = (appointment.durationMinutes / (24*60) * dayDimensions.height );

  const top_str = topVal.toString() + 'px';
  const height_str = height.toString() + 'px';
  const width_str = dayDimensions.width.toString() + 'px';

  return (
    <div className="appointment"
      style={{top: top_str, height: height_str, width: width_str}}
    >
      {appt.summary}
    </div>
  )
}