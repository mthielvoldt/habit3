import React, { useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import RoleBar from './RoleBar';
import './App.css';
import rolesReducer from './rolesReducer';

export const initial_state = [
  { id: 1, roleTitle: 'Role 1', rocks: [{ id: 1, text: 'Rock 1' }, { id: 2, text: 'Rock 2' }] },
  { id: 2, roleTitle: 'Role 2', rocks: [{ id: 3, text: 'Rock 1' }] },
];

function App() {
  const [roles, dispatch] = useReducer(rolesReducer, initial_state);

  const addRole = () => {
    dispatch({ type: "addRole"});
  };

  const updateRoleTitle = (roleId, newTitle) => {
    dispatch({type: "updateRoleTitle", roleId: roleId, newTitle: newTitle})
  };

  const deleteRole = (roleId) => {
    dispatch({type: "deleteRole", roleId: roleId});
  };

  const addRock = (roleId) => {
    dispatch({type: "addRock", roleId: roleId});
  };

  const updateRockText = (roleId, rockId, newText) => {
    dispatch({type: "updateRockText", roleId: roleId, rockId: rockId, newText: newText});
  };

  const deleteRock = (roleId, rockId) => {
    dispatch({type: "deleteRock", roleId: roleId, rockId: rockId});
  };

  return (
    <div className="App">
      <Header />
      <div id="content" className="d-flex">
        <RoleBar
          roles={roles}
          roleStateDispatch = {dispatch}
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
