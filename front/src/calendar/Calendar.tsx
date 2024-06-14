import React, { useState } from "react";
import './Calendar.css';
import DayAxis from "./DayAxis";
import HourAxis from "./HourAxis";
import EventSpace from "./EventSpace";

const days = [
  {dayOfWeek: "Su"},
  {dayOfWeek: "Mo"},
  {dayOfWeek: "Tu"},
  {dayOfWeek: "We"},
  {dayOfWeek: "Th"},
  {dayOfWeek: "Fr"},
  {dayOfWeek: "Sa"}
]

export default function Calendar({ appts, addAppt, updateApptTime }) {

  return (
    <div id="calendar">
      <DayAxis days={days}/>
      <div id="hours-and-events">
        <HourAxis />
        <EventSpace days={days} appts={appts} addAppt={addAppt} updateApptTime={updateApptTime} />
      </div>
    </div>
  )

}