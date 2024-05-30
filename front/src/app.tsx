import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import Header from './Header';
import RoleBar from './RoleBar';

function App() {
  const [roles, setRoles] = useState([
    { roleTitle: 'Role 1', rocks: [{ text: 'Rock 1' }, { text: 'Rock 2' }] },
    { roleTitle: 'Role 2', rocks: [{ text: 'Rock 1' }] },
  ]);

  const addRole = () => {
    const newRole = { roleTitle: `Role ${roles.length + 1}`, rocks: [] };
    setRoles([...roles, newRole]);
  };

  return (
    <div className="App">
      <Header />
      <div id="content" className="d-flex">
        <RoleBar roles={roles} addRole={addRole} />
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
