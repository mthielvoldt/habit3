import React from "react";
import 'bootstrap/dist/js/bootstrap';

export default function Intro({ }) {
  return (
    <div className="btn-group dropend ms-auto me-2">
      <a className='btn btn-light dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false">
        Intro
      </a>
      <div id="about-dropdown" className="dropdown-menu col-md-6">
        <h4>Recommended Workflow</h4>
        <p>Each week, before the week starts:</p>
        <ol className="mb-3">
          <li><h5>Review roles</h5>Do they still reflect your key relationships and responsibiliites to others and to yourself?</li>
          <li><h5>Choose big rocks</h5>For each role, ask, "What could I do this week in this role to make the most positive difference?"</li>
          <li><h5>Schedule rocks</h5>Drag the rocks onto your calendar and size them appropriately.</li>
        </ol>
        <a className="btn btn-sm btn-info"
          href="https://www.youtube.com/watch?v=7yMh2QNRc_M"
          target="_blank" rel="noopener noreferrer">
          Video: Stephen Covey on Weekly Planning
        </a>
      </div>
    </div>
  )
}