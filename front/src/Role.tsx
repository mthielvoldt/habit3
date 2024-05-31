import React from 'react';
import Rock from './Rock';

const Role = ({ role, isEditing, dispatch }) => {

  // adds roll id
  const handleTitleChange = (e) => {
    updateRoleTitle(role.id, e.target.value);
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

  const deleteRock = (roleId, rockId) => {
    dispatch({type: "deleteRock", roleId: roleId, rockId: rockId});
  };

  const updateRockText = (rockId, newText) => {
    dispatch({type: "updateRockText", roleId: role.id, rockId: rockId, newText: newText});
  };

  return (
    <div className="role mb-3">
      <div className="role-header d-flex justify-content-between align-items-center mb-2">
        {isEditing ? (
          <input
            type="text"
            value={role.roleTitle}
            onChange={handleTitleChange}
            className="form-control"
          />
        ) : (
          <span className="font-weight-bold">{role.roleTitle}</span>
        )}
        {isEditing && (
          <button className="btn btn-danger btn-sm ml-2" onClick={() => deleteRole(role.id)}>
            Delete
          </button>
        )}
      </div>
      <div className="role-rocks">
        {role.rocks.map(rock => (
          <Rock
            key={rock.id}
            rock={rock}
            isEditing={isEditing}
            updateRockText={updateRockText}
            deleteRock={() => deleteRock(role.id, rock.id)}
          />
        ))}
        {isEditing && (
          <button className="btn btn-primary btn-sm mt-2" onClick={() => addRock(role.id)}>
            Add Rock
          </button>
        )}
      </div>
    </div>
  );
};

export default Role;
