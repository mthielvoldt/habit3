import React, { useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import RoleBar from './RoleBar';
import './App.css';
import rolesReducer from './rolesReducer';

function App({ initialRoles }) {
  const [roles, dispatch] = useReducer(rolesReducer, initialRoles);

  return (
    <div className="App">
      <Header />
      <div id="content" className="d-flex">
        <RoleBar
          roles={roles}
          dispatch={dispatch}
        />
        <main id="main-content" className="container mt-4">
          <h1>Welcome to your Weekly Planner</h1>
        </main>
      </div>
      <footer className="footer bg-light py-3 mt-auto">
        <div className="container">
          <span className="text-muted">© 2024 Weekly Planner. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
