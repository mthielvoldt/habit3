import React, { useState } from 'react';
import Role from './Role';

const RoleBar = ({ roles, addRole }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <aside id="sidebar" className="bg-light border-right">
      <div className="sidebar-header p-3 border-bottom d-flex justify-content-between align-items-center">
        <span>Roles</span>
        <div>
          <button className="btn btn-secondary btn-sm mr-2" onClick={toggleEditing}>
            {isEditing ? 'Stop Editing' : 'Edit All'}
          </button>
          {isEditing && (
            <button className="btn btn-primary btn-sm" onClick={addRole}>Add Role</button>
          )}
        </div>
      </div>
      <div className="p-3">
        {roles.map((role, index) => (
          <Role key={index} roleTitle={role.roleTitle} rocks={role.rocks} isEditing={isEditing} />
        ))}
      </div>
    </aside>
  );
};

export default RoleBar;
