import React, { useState } from 'react';
import Role from './Role';
import { addRoleAction } from './rolesReducer';

const RoleBar = ({ roles, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  function addRole() {
    dispatch(addRoleAction());
  };

  return (
    <aside id="sidebar" data-testid="rolebar-instance" className="bg-light border-right">
      <div className="sidebar-header p-3 border-bottom d-flex justify-content-between align-items-center">
        <span>Roles</span>
        <button id="editing-btn" className="btn btn-secondary btn-sm" onClick={toggleEditing}>
          {isEditing ? 'Stop Editing' : 'Edit All'}
        </button>
      </div>
      <div className="p-3">
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
            <button className="btn btn-primary btn-sm w-100" onClick={addRole}>Add Role</button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RoleBar;
