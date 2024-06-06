import React, { useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import RoleBar from './RoleBar';
import './App.css';
import rolesReducer from './rolesReducer';
import Calendar from './calendar/Calendar';

function App({ initialRoles }) {
  const [roles, dispatch] = useReducer(rolesReducer, initialRoles);

  return (
    <>
      <Header />
      <main id="main-content">
        <RoleBar
          roles={roles}
          dispatch={dispatch}
        />
        <Calendar />
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
