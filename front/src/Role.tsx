import React from 'react';
import Rock from './Rock';
import { updateRoleTitleAction, deleteRoleAction, addRockAction, deleteRockAction, updateRockTextAction } from './rolesReducer';

const Role = ({ role, isEditing, dispatch }) => {

  // adds roll id
  const handleTitleChange = (e) => {
    dispatch(updateRoleTitleAction(role.id, e.target.value));
  };

  const updateRockText = (rockId, newText) => {
    dispatch(updateRockTextAction(role.id, rockId, newText));
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
          <button className="btn btn-danger btn-sm ml-2" onClick={() => dispatch(deleteRoleAction(role.id))}>
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
            deleteRock={() => dispatch(deleteRockAction(role.id, rock.id))}
          />
        ))}
        {isEditing && (
          <button className="btn btn-primary btn-sm mt-2" onClick={() => dispatch(addRockAction(role.id))}>
            Add Rock
          </button>
        )}
      </div>
    </div>
  );
};

export default Role;
