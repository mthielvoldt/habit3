import React, { useEffect, useReducer, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import RoleBar from './RoleBar';
import './App.css';
import rolesReducer, { replaceAllRoles } from './rolesReducer';
import Calendar from './calendar/Calendar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as gcal from './calendar/GCalActions';
import * as tu from "./calendar/utils/timeUtils"

const noUser = { name: "", avatar: "" };
const noAppts: tu.Appt[] = [];
let rolesAppt: tu.Appt;

function App({ initialRoles }) {
  const [roles, dispatch] = useReducer(rolesReducer, initialRoles);
  const [appts, setAppts] = useState(noAppts);
  const [user, setUser] = useState(noUser);
  const [week, setWeek] = useState(0);
  useEffect(syncGoogle, []);

  async function addAppt(newAppt: tu.Appt) {
    const newApptWithID = tu.apptFromGEvent(await gcal.addEvent(newAppt));
    setAppts([...appts, newApptWithID]);
    console.log("newAppt", newApptWithID);
  }

  async function updateApptTime(apptId: string, newStartTime: number, newEndTime: number) {
    // 
    const start = { dateTime: new Date(newStartTime).toISOString() };
    const end = { dateTime: new Date(newEndTime).toISOString() };
    const updatedAppt = tu.apptFromGEvent(await gcal.patchEvent(apptId, { start, end }));

    // Create a copy of appts[] without mutating the original.
    const newAppts = appts.map(appt => ((appt.id === apptId) ? updatedAppt : appt));
    setAppts(newAppts);
  }

  async function deleteAppt(apptId: string) {
    console.log("deleteAppt id:", apptId);
    const success = await gcal.deleteEvent(apptId);
    if (success) {
      setAppts(appts.filter(appt => (appt.id !== apptId)));
    }
  }

  function syncGoogle() {
    let ignore = false;

    async function fetchWhenReady() {
      if (ignore) {
        console.log("This sync call ignored, aborting fetch attempts.");
      } else if (gcal.isClientReady()) {
        const { events, user, rolesEvent } = await gcal.fetchAll(); // a promise
        // TODO: handle ignore if it comes after fetch request is sent.
        replaceAppts(events);
        console.log("user:", user);
        setUser(user);
        rolesAppt = tu.apptFromGEvent(rolesEvent)
        dispatch(replaceAllRoles(rolesAppt.description));
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

  async function changeWeek(type: string) {
    let newWeek = week;
    switch (type) {
      case "forward":
        newWeek += 1;
        break;
      case "backward":
        newWeek -= 1;
        break;
      case "reset":
        newWeek = 0;
        break;
    }
    const events = await gcal.fetchEvents(newWeek);
    console.log("newWeek: ", newWeek);
    replaceAppts(events);
    setWeek(newWeek);
  }

  function saveRoles() {
    rolesAppt.description = JSON.stringify(roles);
    gcal.updateEvent(rolesAppt);
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
    dispatch(replaceAllRoles("[]"));
    // setTimeout(syncGoogle, 1000);
    syncGoogle();
  }


  return (
    <>
      <Header signOut={signOut} user={user} changeWeek={changeWeek} />
      <main id="main-content">
        <DndProvider backend={HTML5Backend}>
          <RoleBar
            roles={roles}
            dispatch={dispatch}
            save={saveRoles}
          />
          <Calendar appts={appts} week={week} addAppt={addAppt} updateApptTime={updateApptTime} deleteAppt={deleteAppt} />
        </DndProvider>
      </main>
    </>
  );
}

export default App;
