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

export default function Calendar({ appts, week, addAppt, updateApptTime, deleteAppt }) {

  return (
    <div id="calendar" className="bg-light">
      <DayAxis days={days}/>
      <div id="hours-and-events">
        <HourAxis />
        <EventSpace days={days} week={week} appts={appts} addAppt={addAppt} updateApptTime={updateApptTime} deleteAppt={deleteAppt} />
      </div>
    </div>
  )

}