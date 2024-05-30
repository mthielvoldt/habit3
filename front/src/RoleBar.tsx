import React from 'react';
import Role from './Role';

function RoleBar({ roles, addRole }) {
  return (
    <aside id="sidebar" className="bg-light border-right">
      <div className="sidebar-header p-3 border-bottom d-flex justify-content-between align-items-center">
        <span>Roles</span>
        <button className="btn btn-primary btn-sm" onClick={addRole}>Add Role</button>
      </div>
      <div className="p-3">
        {roles.map((role, index) => (
          <Role key={index} roleTitle={role.roleTitle} rocks={role.rocks} />
        ))}
      </div>
    </aside>
  );
};

export default RoleBar;
