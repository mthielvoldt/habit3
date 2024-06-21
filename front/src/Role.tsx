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
        {isEditing ?
          <div className='input-group'>
            <input
              type="text"
              value={role.roleTitle}
              onChange={handleTitleChange}
              className="form-control"
            />
            <button className="btn btn-danger btn-sm ml-2" onClick={() => dispatch(deleteRoleAction(role.id))}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </button>
          </div>
          :
          <span className="font-weight-bold">{role.roleTitle}</span>
        }
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
