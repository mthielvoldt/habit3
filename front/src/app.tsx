import React, { useEffect, useReducer, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import RoleBar from './RoleBar';
import './App.css';
import rolesReducer from './rolesReducer';
import Calendar from './calendar/Calendar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchEvents, handleSignoutClick } from './calendar/GCalActions';
import * as tu from "./calendar/utils/timeUtils"

function App({ initialRoles }) {
  const [roles, dispatch] = useReducer(rolesReducer, initialRoles);
  const [appts, setAppts] = useState([]);
  useEffect(syncCalendar, []);

  function addAppt(newAppt) {
    const newAppts = [...appts, newAppt]

    console.log(newAppts);
    setAppts(newAppts);
  }

  function syncCalendar() {
    let ignore = false;
    console.log("syncCalendar");

    function fetchWhenReady() {
      if (ignore) {
        console.log("Fetch ignored, aborting.");
      } else if (typeof window.gapiClientInitialized !== "undefined") {
        const gEventsPromise = fetchEvents(); // a promise
        replaceAppts(gEventsPromise);
      } else {
        console.log("retrying later");
        setTimeout(fetchWhenReady, 500);
      }
    }
    fetchWhenReady();
    return () => {
      console.log('Ignoring this sync');
      ignore = true;
    }
  }

  async function replaceAppts(gEventsPromise) {
    const gEvents = await gEventsPromise;
    console.log("gEvents\n", gEvents);
    const newAppts = gEvents.map(tu.apptFromGEvent);
    setAppts(newAppts);
  }


  return (
    <>
      <Header syncCalendar={syncCalendar} />
      <main id="main-content">
        <DndProvider backend={HTML5Backend}>
          <RoleBar
            roles={roles}
            dispatch={dispatch}
          />
          <Calendar appts={appts} addAppt={addAppt} />
        </DndProvider>
      </main>
      <footer className="footer bg-light py-3 mt-auto">
        <div className="container">
          <span className="text-muted">© 2024 Weekly Planner. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}

export default App;
