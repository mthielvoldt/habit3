import React from "react";
import { Appt } from "./utils/timeUtils";
import { useDrag } from "react-dnd";

export default function Appointment({appt, dayStart, depth, position, dayDimensions}) {
  const appointment: Appt = appt;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'appt',
    item: appt,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [appt]);

  let topVal = (appointment.start - dayStart) / (24*3600*1000) * dayDimensions.height;
  let height = (appointment.durationMinutes / (24*60) * dayDimensions.height );

  const top_str = topVal.toString() + 'px';
  const height_str = height.toString() + 'px';
  const width_str = dayDimensions.width.toString() + 'px';

  return (
    <div ref={drag} className="appointment draggable"
      style={{top: top_str, height: height_str, width: width_str}}
    >
      {appt.summary}
    </div>
  )
}