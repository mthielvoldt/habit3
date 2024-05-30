import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import RoleBar from './RoleBar';
import './App.css';

function App() {
  const [roles, setRoles] = useState([
    { id: 1, roleTitle: 'Role 1', rocks: [{ id: 1, text: 'Rock 1' }, { id: 2, text: 'Rock 2' }] },
    { id: 2, roleTitle: 'Role 2', rocks: [{ id: 3, text: 'Rock 1' }] },
  ]);

  const addRole = () => {
    const newRole = {
      id: roles.length + 1,
      roleTitle: `Role ${roles.length + 1}`,
      rocks: [],
    };
    setRoles([...roles, newRole]);
  };

  const updateRoleTitle = (roleId, newTitle) => {
    setRoles(roles.map(role => (role.id === roleId ? { ...role, roleTitle: newTitle } : role)));
  };

  const deleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const addRock = (roleId) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const newRock = { id: role.rocks.length + 1, text: `New Rock ${role.rocks.length + 1}` };
        return { ...role, rocks: [...role.rocks, newRock] };
      }
      return role;
    }));
  };

  const updateRockText = (roleId, rockId, newText) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const updatedRocks = role.rocks.map(rock => (rock.id === rockId ? { ...rock, text: newText } : rock));
        return { ...role, rocks: updatedRocks };
      }
      return role;
    }));
  };

  const deleteRock = (roleId, rockId) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const updatedRocks = role.rocks.filter(rock => rock.id !== rockId);
        return { ...role, rocks: updatedRocks };
      }
      return role;
    }));
  };

  return (
    <div className="App">
      <Header />
      <div id="content" className="d-flex">
        <RoleBar
          roles={roles}
          addRole={addRole}
          updateRoleTitle={updateRoleTitle}
          deleteRole={deleteRole}
          addRock={addRock}
          updateRockText={updateRockText}
          deleteRock={deleteRock}
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
