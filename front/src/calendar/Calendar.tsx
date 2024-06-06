import React, { useState } from "react";
import './Calendar.css';
import DayAxis from "./DayAxis";
import HourAxis from "./HourAxis";
import EventSpace from "./EventSpace";


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
      <DayAxis />
      <div id="hours-and-events">
        <HourAxis />
        <EventSpace />
      </div>
    </div>
  )

}