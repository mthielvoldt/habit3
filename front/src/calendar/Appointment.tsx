import React, { useState, useEffect } from "react";
import { Appt, offsetTime } from "./utils/timeUtils";
import { useDrag } from "react-dnd";
import "bootstrap/dist/css/bootstrap.min.css"

export default function Appointment({ appt, dayStart, depth, position, dayDimensions, deleteAppt, updateApptTime }:
  {
    appt: Appt;
    dayStart: number;
    depth: number;
    position: number;
    dayDimensions: { height: number, width: number };
    deleteAppt: (apptId: string) => null;
    updateApptTime: (apptId: string, newStartTime: number, newEndTime: number) => null;
  }) {
  const getHeightFromDuration = () => appt.durationMinutes / (24 * 60) * dayDimensions.height;
  const [height, setHeight] = useState(getHeightFromDuration());
  const [{ }, dragAppt] = useDrag(() => ({
    type: 'appt',
    item: appt,
    collect: (monitor) => ({}),
  }), [appt]);

  // Update height if the day's duration changes.  Need this because the height state obscures
  // the dependency on appt.durationMinutes.
  useEffect( () => setHeight(getHeightFromDuration), [appt.durationMinutes]);


  let topVal = (appt.start - dayStart) / (24 * 3600 * 1000) * dayDimensions.height;

  function handleResizeStart(ev) {
    // This doesn't depend on Appointment state, so we can link it directly to the document,
    // (and not link to this component) since it doesn't need to be updated Appt state changes.
    document.onpointermove = handleResizeDrag;
    document.onpointerup = resetToPreResizeState;
  }

  function handleResizeDrag(ev) {
    ev.preventDefault();
    const dayTop = document.getElementById('calendar-events').getBoundingClientRect().top;
    const newHeight = ev.clientY - dayTop - topVal + 5;
    console.log("pageY: ", ev.clientY, "dayTop:", dayTop, " topVal: ", topVal, " newHeight: ", newHeight);
    setHeight(newHeight);
  }

  function handleResizeStop(ev) {
    // this function gets updated with new height state because it's linked to the component.
    ev.preventDefault();
    console.log("end-time dropped for appt Id:", appt.id, " height: ", height);
    const newDurationMins = height / 40 * 60;
    resetToPreResizeState();
    if (newDurationMins > 15) {
      const newEndTime = offsetTime({ minutes: newDurationMins }, appt.start);
      console.log("newEndTime: ", new Date(newEndTime));
      updateApptTime(appt.id, appt.start, newEndTime);
    }
  }

  function resetToPreResizeState() {
    document.onpointermove = null;
    document.onpointerup = null;
    setHeight(getHeightFromDuration());
  }

  const height_str = height.toString() + 'px';
  const top_str = topVal.toString() + 'px';
  const width_str = dayDimensions.width.toString() + 'px';

  return (
    <div className="appointment" style={{ top: top_str, height: height_str, width: width_str }}>
      <div ref={dragAppt} className="draggable">
        <span>{appt.summary}</span>
        <a className="appt-trash" href="#" onClick={() => deleteAppt(appt.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </a>
      </div>
      <div className="appt-resize" onPointerDown={handleResizeStart} onPointerUp={handleResizeStop}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grip-horizontal" viewBox="0 0 16 16">
          <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
      </div>
    </div>
  )
}