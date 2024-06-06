import React, { useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import RoleBar from './RoleBar';
import './App.css';
import rolesReducer from './rolesReducer';
import Calendar from './calendar/Calendar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App({ initialRoles }) {
  const [roles, dispatch] = useReducer(rolesReducer, initialRoles);

  return (
    <>
      <Header />
      <main id="main-content">
        <DndProvider backend={HTML5Backend}>
          <RoleBar
            roles={roles}
            dispatch={dispatch}
          />
          <Calendar />
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
