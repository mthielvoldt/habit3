import React, {useState} from "react";


export default function HourLabel({hour}) {

  return (
    <div className="hour-label">
      <p>{hour}</p>
    </div>
  );
}