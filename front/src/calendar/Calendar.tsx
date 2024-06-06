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