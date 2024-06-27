import React, { useState } from 'react';
import Role from './Role';
import { addRoleAction } from './rolesReducer';

const RoleBar = ({ roles, dispatch, save }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    // transitioning from editing to not editing, save roles to google.
    if (isEditing) {
      save();
    }
    setIsEditing(!isEditing);
  };

  function addRole() {
    dispatch(addRoleAction());
  };

  return (
    <aside id="sidebar" data-testid="rolebar-instance" className="bg-light border-right">
      <div id="sidebar-header">
        <h5>Life Roles</h5>
        <button id="editing-btn" className="btn btn-secondary btn-sm" onClick={toggleEditing}>
          {isEditing ? 'Stop Editing' : 'Edit All'}
        </button>
      </div>
      <div id="roles-container">
        {roles.map(role => (
          <Role
            key={role.id}
            role={role}
            isEditing={isEditing}
            dispatch={dispatch}
          />
        ))}
        {isEditing && (
          <div className="mt-3">
            <button id="add-role-btn" className="btn btn-primary btn-sm w-100" onClick={addRole}>Add Role</button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RoleBar;
