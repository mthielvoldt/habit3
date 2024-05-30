import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import Role from './Role';

function App() {
  const [state, setState] = useState(0);

  const roles = [
    { roleTitle: 'Role 1', rocks: [{ text: 'Rock 1' }, { text: 'Rock 2' }] },
    { roleTitle: 'Role 2', rocks: [{ text: 'Rock 1' }] },
  ];

  return (
    <div className="App">
      <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            Weekly Planner
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" id="aboutWidget">
                  About
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userWidget"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="avatar_placeholder.png"
                    alt="Avatar"
                    className="rounded-circle"
                    width="30"
                    height="30"
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="userWidget"
                >
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div id="content" className="d-flex">
        <aside id="sidebar" className="bg-light border-right">
          <div className="sidebar-header p-3 border-bottom d-flex justify-content-between align-items-center">
            <span>Roles</span>
            <button className="btn btn-primary btn-sm">Add Role</button>
          </div>
          <div className="p-3">
            {roles.map((role, index) => (
              <Role key={index} roleTitle={role.roleTitle} rocks={role.rocks} />
            ))}
          </div>
        </aside>

        <main id="main-content" className="container mt-4">
          <h1>Welcome to your Weekly Planner</h1>
          {/* Your content goes here */}
        </main>
      </div>

      <footer className="footer bg-light py-3 mt-auto">
        <div className="container">
          <span className="text-muted">
            © 2024 Weekly Planner. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;