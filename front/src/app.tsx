import React, { useEffect, useReducer, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import RoleBar from './RoleBar';
import './App.css';
import rolesReducer from './rolesReducer';
import Calendar from './calendar/Calendar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as gcal from './calendar/GCalActions';
import * as tu from "./calendar/utils/timeUtils"

const noUser = {name: "", avatar: ""};
const noAppts: tu.Appt[] = [];

function App({ initialRoles }) {
  const [roles, dispatch] = useReducer(rolesReducer, initialRoles);
  const [appts, setAppts] = useState(noAppts);
  const [user, setUser] = useState(noUser);
  useEffect(syncGoogle, []);

  function addAppt(newAppt: tu.Appt) {
    gcal.addEvent(newAppt);
    setAppts([...appts, newAppt]);
  }

  function syncGoogle() {
    let ignore = false;

    async function fetchWhenReady() {
      if (ignore) {
        console.log("This sync call ignored, aborting fetch attempts.");
      } else if (gcal.isClientReady()) {
        const {events, user} = await gcal.fetchEvents(); // a promise
        // TODO: handle ignore if it comes after fetch request is sent.
        replaceAppts(events);
        console.log("user:", user);
        setUser(user);
      } else {
        console.log("Schedule fetch retry for later.");
        setTimeout(fetchWhenReady, 500);
      }
    }
    fetchWhenReady();
    return () => {
      console.log('Ignoring this call to sync.');
      ignore = true;
    }
  }

  function replaceAppts(events) {
    console.log("gEvents\n", events);
    const newAppts = events.map(tu.apptFromGEvent);
    setAppts(newAppts);
  }

  function signOut() {
    gcal.handleSignoutClick();
    setAppts(noAppts);
    setUser(noUser);
    // setTimeout(syncGoogle, 1000);
    syncGoogle();
  }


  return (
    <>
      <Header signOut={signOut} user={user}/>
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
