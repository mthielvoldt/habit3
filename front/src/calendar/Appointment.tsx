import React from "react";
import { Appt } from "./utils/timeUtils";
import { useDrag } from "react-dnd";

export default function Appointment({ appt, dayStart, depth, position, dayDimensions, deleteAppt }) {
  const appointment: Appt = appt;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'appt',
    item: appt,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [appt]);

  let topVal = (appointment.start - dayStart) / (24 * 3600 * 1000) * dayDimensions.height;
  let height = (appointment.durationMinutes / (24 * 60) * dayDimensions.height);

  const top_str = topVal.toString() + 'px';
  const height_str = height.toString() + 'px';
  const width_str = dayDimensions.width.toString() + 'px';

  return (
    <div ref={drag} className="appointment draggable"
      style={{ top: top_str, height: height_str, width: width_str }}
    >
      <span>{appt.summary}</span>
      <a className="appt-trash" href="#" onClick={() => deleteAppt(appt.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </a>

    </div>
  )
}