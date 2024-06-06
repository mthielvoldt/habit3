import React, { useState } from "react";
import './Calendar.css';
import DayAxis from "./DayAxis";
import HourAxis from "./HourAxis";
import EventSpace from "./EventSpace";

const days = [
  {dayOfWeek: "Sunday"},
  {dayOfWeek: "Monday"},
  {dayOfWeek: "Tuesday"},
  {dayOfWeek: "Wednesday"},
  {dayOfWeek: "Thursday"},
  {dayOfWeek: "Friday"},
  {dayOfWeek: "Saturday"}
]

const initialEvents = [
  {
    name: "Event 1",
    start: Date(),
    minutes: 60
  }
]

export default function Calendar({ }) {
  const [events, setEvents] = useState(initialEvents);

  return (
    <div id="calendar">
      <DayAxis days={days}/>
      <div id="hours-and-events">
        <HourAxis />
        <EventSpace days={days}/>
      </div>
    </div>
  )

}