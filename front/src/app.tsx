import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import Header from './Header'
import Role from './Role';

function App() {
  const [state, setState] = useState(0);

  const roles = [
    { roleTitle: 'Role 1', rocks: [{ text: 'Rock 1' }, { text: 'Rock 2' }] },
    { roleTitle: 'Role 2', rocks: [{ text: 'Rock 1' }] },
  ];

  return (
    <div className="App">
      <Header />
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