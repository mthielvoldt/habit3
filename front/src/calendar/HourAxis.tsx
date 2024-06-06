import React, {useState} from "react";
import HourLabel from "./HourLabel";

const hours = [...Array(24).keys()];

export default function HourAxis({}) {

  return (
    <div id="hour-axis">
      {hours.map(hour => (
        <HourLabel key={hour} hour={hour}/>
      ))}
    </div>
  );
}
